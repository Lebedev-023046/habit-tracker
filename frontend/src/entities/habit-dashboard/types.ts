import type { DayProgress } from '@/shared/model/habit-day.model';
import type { HabitStatus } from '../habit';

export interface DashboardHabitItem {
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
