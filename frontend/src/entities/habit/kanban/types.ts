import type { Habit, HabitStatus } from '@/entities/habit/model/types';

export type HabitKanbanItem = Pick<
  Habit,
  'id' | 'title' | 'status' | 'totalDays' | 'startDate' | 'position'
>;

export type HabitKanbanBoardState = Record<HabitStatus, HabitKanbanItem[]>;
