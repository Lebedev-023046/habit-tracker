import { HabitDayStatus } from '@prisma/client';
import { DayProgress } from '../calculations/types';

export class DailyHabitItemDTO {
  id: string;
  title: string;

  canUndo: boolean;

  daySinceStart: number;
  progress: number;
  totalDays: number;

  currentStreak: number;
  bestStreak: number;
  todayStatus: HabitDayStatus;
  lastDaysProgress: DayProgress[];
}

export interface DailyHabitsDTO {
  totalCount: number;
  completedCount: number;
  habits: DailyHabitItemDTO[];
}
