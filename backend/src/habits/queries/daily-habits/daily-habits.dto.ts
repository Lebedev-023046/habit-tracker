import { HabitDayStatus } from '@prisma/client';
import { DayProgress } from '../calculations/types';

export class DailyHabitItemDTO {
  id: string;
  title: string;

  daySinceStart: number;
  progress: number;
  totalDays: number;

  goalReached: boolean;

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
