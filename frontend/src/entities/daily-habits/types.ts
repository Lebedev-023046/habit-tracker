import type {
  DayProgress,
  HabitDayStatus,
} from '@/shared/model/habit-day.model';

export interface DailyHabitItem {
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

export interface DailyHabitsInfo {
  totalCount: number;
  completedCount: number;
  habits: DailyHabitItem[];
}
