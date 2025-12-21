import { HabitStatus } from '@prisma/client';
import { DayProgress } from '../calculations/types';

export interface DashboardHabitItemDto {
  id: string;
  title: string;
  status: HabitStatus;

  completedDays: number;
  missedDays: number;

  plannedEndDate: Date;
  restDays: number;
  progress: number;

  lastDaysProgress: DayProgress[];

  currentStreak: number;
  bestStreak: number;
}
