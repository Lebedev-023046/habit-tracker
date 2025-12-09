import type { DateType } from '@/shared/types';
import type { DayProgress } from '@/shared/ui/daily-calendar-progress/DailyCalendarProgress';
import type { DraggableLocation, DropResult } from '@hello-pangea/dnd';
import type { HabitReorderPayload } from '../../api/types';
import { HABIT_STATUS } from '../constants';
import type { Habit, HabitStatus, HabitTotalDays } from '../types';
import { HabitService } from './habit.service';

export interface HabitBoardViewModel {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: HabitTotalDays;
  startDate?: DateType;
  position: number;
  daySinceStart: number;
  lastWeekProgress: DayProgress[];
}

export type HabitKanbanBoardState = Record<HabitStatus, HabitBoardViewModel[]>;

class HabitBoardService extends HabitService {
  constructor() {
    super();
    this.buildHabitBoard = this.buildHabitBoard.bind(this);
    this.applyDragToBoard = this.applyDragToBoard.bind(this);
    this.buildReorderDiffPayload = this.buildReorderDiffPayload.bind(this);
  }

  private hasValidDestination(
    result: DropResult,
  ): result is DropResult & { destination: DraggableLocation } {
    return Boolean(result.destination);
  }

  private isSameLocation(
    source: DraggableLocation,
    destination: DraggableLocation,
  ): boolean {
    return (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    );
  }

  private normalizePositions(
    board: HabitKanbanBoardState,
  ): HabitKanbanBoardState {
    const next: HabitKanbanBoardState = { ...board };

    for (const status of HABIT_STATUS) {
      const items = next[status];

      next[status] = items.map((item, index) => ({
        ...item,
        position: index,
      }));
    }

    return next;
  }

  applyDragToBoard(
    board: HabitKanbanBoardState,
    result: DropResult,
  ): HabitKanbanBoardState {
    if (!this.hasValidDestination(result)) return board;

    const { source, destination } = result;
    if (!destination || this.isSameLocation(source, destination)) return board;

    const sourceStatus = source.droppableId as HabitStatus;
    const destStatus = destination.droppableId as HabitStatus;

    const updatedBoard: HabitKanbanBoardState = {
      planned: [...board.planned],
      active: [...board.active],
      paused: [...board.paused],
      built: [...board.built],
      cancelled: [...board.cancelled],
    };

    const sourceColumn = updatedBoard[sourceStatus];
    const destColumn =
      sourceStatus === destStatus ? sourceColumn : updatedBoard[destStatus];

    const [moved] = sourceColumn.splice(source.index, 1);
    if (!moved) return board;

    const movedWithStatus: HabitBoardViewModel = {
      ...moved,
      status: destStatus,
    };

    destColumn.splice(destination.index, 0, movedWithStatus);

    return this.normalizePositions(updatedBoard);
  }

  buildReorderDiffPayload(
    prevBoard: HabitKanbanBoardState,
    nextBoard: HabitKanbanBoardState,
  ) {
    const prevById = new Map<
      string,
      { status: HabitStatus; position: number }
    >();

    for (const status of HABIT_STATUS) {
      prevBoard[status].forEach(item => {
        prevById.set(item.id, { status, position: item.position });
      });
    }

    const updates: HabitReorderPayload[] = [];

    for (const nextStatus of HABIT_STATUS) {
      nextBoard[nextStatus].forEach(item => {
        const prev = prevById.get(item.id);
        const nextPosition = item.position;

        if (
          !prev ||
          prev.status !== nextStatus ||
          prev.position !== nextPosition
        ) {
          updates.push({
            id: item.id,
            status: nextStatus,
            position: nextPosition,
          });
        }
      });
    }

    return updates;
  }

  buildBoardModel(habit: Habit): HabitBoardViewModel {
    if (!habit) {
      return {
        id: '',
        title: '',
        status: 'planned',
        totalDays: 30,
        startDate: undefined,
        position: 0,
        daySinceStart: 0,
        lastWeekProgress: [],
      };
    }

    const { id, title, status, totalDays, startDate, position, dayLogs } =
      habit;

    return {
      id: id,
      title: title,
      status: status,
      totalDays: totalDays,
      startDate: startDate,
      position: position,
      daySinceStart: this.getDayNumberSinceStart(dayLogs, totalDays),
      lastWeekProgress: habitBoardService.getLastDaysProgress(dayLogs, 7),
    };
  }

  buildHabitBoard(habits: Habit[]): HabitKanbanBoardState {
    const empty: HabitKanbanBoardState = {
      planned: [],
      active: [],
      paused: [],
      built: [],
      cancelled: [],
    };

    habits.forEach(habit => {
      const { status } = habit;
      empty[status].push(this.buildBoardModel(habit));
    });

    // сортируем внутри колонок по position
    (Object.keys(empty) as HabitStatus[]).forEach(status => {
      empty[status].sort((a, b) => a.position - b.position);
    });

    return empty;
  }
}

export const habitBoardService = new HabitBoardService();
