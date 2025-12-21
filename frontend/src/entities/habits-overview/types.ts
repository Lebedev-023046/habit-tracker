import type { HabitStatus, HabitTotalDays } from '@/entities/habit';
import type { DayProgress } from '@/shared/model/habit-day.model';

export interface HabitsOverviewListItem {
  id: string;
  title: string;
  status: HabitStatus;

  totalDays: HabitTotalDays;
  daySinceStart: number;

  progress: number;
  currentStreak: number;
  bestStreak: number;

  lastDaysProgress: DayProgress[];
}
