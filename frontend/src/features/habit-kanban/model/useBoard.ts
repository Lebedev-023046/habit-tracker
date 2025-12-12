import type { DragStart, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

import type { ColumnId, DragMeta, Habit } from '@/entities/habit';
import {
  habitBoardService,
  type HabitKanbanBoardState,
} from '@/entities/habit';
import { useReorderHabits } from './useReorderHabits';

type UseBoardOptions = {
  onInvalidMove?: (info: { from: string; to: string }) => void;
};

export function useBoard(habits: Habit[], options?: UseBoardOptions) {
  const [board, setBoard] = useState<HabitKanbanBoardState | null>(null);
  const [dragMeta, setDragMeta] = useState<DragMeta | null>(null);

  const {
    buildHabitBoard,
    applyDragToBoard,
    buildReorderDiffPayload,
    buildDragMeta,
    isAllowedResult,
  } = habitBoardService;

  const { mutate: reorderHabits } = useReorderHabits();

  const handleDragStart = (start: DragStart) => {
    setDragMeta(buildDragMeta(start.source.droppableId as ColumnId));
  };

  const handleDragEnd = (result: DropResult) => {
    setDragMeta(null);
    const { destination, source } = result;

    if (!destination) {
      options?.onInvalidMove?.({ from: source.droppableId, to: 'none' });
      return;
    }

    if (!isAllowedResult(result)) {
      options?.onInvalidMove?.({
        from: source.droppableId,
        to: destination.droppableId,
      });
      return;
    }

    setBoard(prev => {
      if (!prev) return prev;
      const next = applyDragToBoard(prev, result);
      const payload = buildReorderDiffPayload(prev, next);

      if (payload.length) {
        reorderHabits(payload);
      }

      return next;
    });
  };

  useEffect(() => {
    if (!habits.length) {
      setBoard(null);
      return;
    }
    setBoard(buildHabitBoard(habits));
  }, [habits]);

  return { board, dragMeta, handleDragStart, handleDragEnd };
}
