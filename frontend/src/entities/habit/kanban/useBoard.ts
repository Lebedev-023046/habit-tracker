import type { DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

import type { Habit } from '../model/types';
import { useReorderHabits } from './hooks';

import {
  habitBoardService,
  type HabitKanbanBoardState,
} from '../model/services/habitBoard.service';

export function useBoard(habits: Habit[]) {
  const [board, setBoard] = useState<HabitKanbanBoardState | null>(null);

  const { buildHabitBoard, applyDragToBoard, buildReorderDiffPayload } =
    habitBoardService;

  const { mutate: reorderHabits } = useReorderHabits();

  const handleDragEnd = (result: DropResult) => {
    setBoard(prev => {
      if (!prev) return prev;
      const next = applyDragToBoard(prev, result);

      const payload = buildReorderDiffPayload(prev, next);
      reorderHabits(payload);

      return next;
    });
  };

  useEffect(() => {
    if (!habits.length) return;
    setBoard(buildHabitBoard(habits));
  }, [habits]);

  return { board, handleDragEnd };
}
