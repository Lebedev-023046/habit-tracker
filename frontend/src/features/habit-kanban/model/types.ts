import type { HabitStatus, HabitTotalDays } from '@/entities/habit/model/types';

export interface HabitKanbanItem {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: HabitTotalDays;
  startDate?: Date | null;
}

export type HabitKanbanBoardState = Record<HabitStatus, HabitKanbanItem[]>;
