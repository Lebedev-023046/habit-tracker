import type { DateType } from '@/shared/types';

import type { DayProgress } from '@/shared/model/habit-day.model';
import type { DraggableLocation, DropResult } from '@hello-pangea/dnd';
import type { HabitReorderPayload } from '../../api/types';
import { HABIT_STATUS } from '../constants';
import type { Habit, HabitStatus, HabitTotalDays } from '../types';
import { HabitService } from './habit.service';

export type ColumnId = HabitStatus;

export interface DragMeta {
  sourceColumnId: ColumnId;
}

export interface BoardHabitViewModel {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: HabitTotalDays;
  startDate?: DateType;
  position: number;
  daySinceStart: number;
  lastDaysProgress: DayProgress[];
}

export type HabitKanbanBoardState = Record<HabitStatus, BoardHabitViewModel[]>;

const ALLOWED_TRANSITIONS: Record<ColumnId, ColumnId[]> = {
  planned: ['planned', 'active', 'cancelled'],
  active: ['active', 'paused', 'built', 'cancelled'],
  paused: ['paused', 'active', 'cancelled'],
  built: ['built'],
  cancelled: ['cancelled'],
};

class HabitBoardService extends HabitService {
  constructor() {
    super();
    this.buildHabitBoard = this.buildHabitBoard.bind(this);
    this.applyDragToBoard = this.applyDragToBoard.bind(this);
    this.buildReorderDiffPayload = this.buildReorderDiffPayload.bind(this);

    // dnd methods
    this.isAllowedResult = this.isAllowedResult.bind(this);
    this.buildDragMeta = this.buildDragMeta.bind(this);
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

    const movedWithStatus: BoardHabitViewModel = {
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

  private canDrop(
    sourceColumnId: ColumnId,
    destinationColumnId: ColumnId,
  ): boolean {
    if (sourceColumnId === destinationColumnId) return true;
    return (
      ALLOWED_TRANSITIONS[sourceColumnId]?.includes(destinationColumnId) ??
      false
    );
  }

  buildDragMeta(sourceColumnId: ColumnId): DragMeta | null {
    if (!sourceColumnId) return null;
    return { sourceColumnId: sourceColumnId as ColumnId };
  }

  isDropDisabled(
    destinationColumnId: ColumnId,
    dragMeta: DragMeta | null,
  ): boolean {
    if (!dragMeta) return false;
    return !this.canDrop(dragMeta.sourceColumnId, destinationColumnId);
  }

  isAllowedResult(result: DropResult): boolean {
    const { destination, source } = result;
    if (!destination) return false;

    const from = source.droppableId as ColumnId;
    const to = destination.droppableId as ColumnId;

    return this.canDrop(from, to);
  }

  buildBoardModel(habit: Habit): BoardHabitViewModel {
    if (!habit) {
      return {
        id: '',
        title: '',
        status: 'planned',
        totalDays: 30,
        startDate: undefined,
        position: 0,
        daySinceStart: 0,
        lastDaysProgress: [],
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
      lastDaysProgress: this.getLastDaysProgress(dayLogs, 7),
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
