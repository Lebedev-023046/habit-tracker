import type { HabitStatus, HabitTotalDays } from '@/entities/habit';
import type { HabitDayStatus } from '@/shared/model/habit-day.model';

export interface DayProgress {
  weekday: string;
  status: HabitDayStatus;
}

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
