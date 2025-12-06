import type { DraggableLocation, DropResult } from '@hello-pangea/dnd';
import type { HabitReorderPayload } from '../api/types';
import { HABIT_STATUS, type Habit, type HabitStatus } from './types';

export type HabitKanbanItem = Pick<
  Habit,
  'id' | 'title' | 'status' | 'totalDays' | 'startDate' | 'position'
>;

export type HabitKanbanBoardState = Record<HabitStatus, HabitKanbanItem[]>;

class HabitBoardService {
  constructor() {
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

  buildHabitBoard(habits: Habit[]): HabitKanbanBoardState {
    const empty: HabitKanbanBoardState = {
      planned: [],
      active: [],
      paused: [],
      built: [],
      cancelled: [],
    };

    habits.forEach(habit => {
      empty[habit.status].push({
        id: habit.id,
        title: habit.title,
        status: habit.status,
        totalDays: habit.totalDays,
        startDate: habit.startDate,
        position: habit.position,
      });
    });

    // сортируем внутри колонок по position
    (Object.keys(empty) as HabitStatus[]).forEach(status => {
      empty[status].sort((a, b) => a.position - b.position);
    });

    return empty;
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

    const movedWithStatus: HabitKanbanItem = {
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
}

export const habitBoardService = new HabitBoardService();
