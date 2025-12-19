// src/entities/habit/model/dashboard.types.ts

import type {
  DayProgress,
  HabitDayStatus,
} from '@/shared/model/habit-day.model';
import type { ISODateString } from '@/shared/types';
import type { HabitStatus } from '.';

export interface DashboardHabit {
  id: string;
  title: string;
  status: HabitStatus;
}

export interface DashboardHabitRunStats {
  completedDays: number;
  missedDays: number;
}

export interface DashboardHabitRunProgress {
  percent: number;
  remainingDays: number;
}

export interface DashboardHabitRunStreak {
  current: number;
  best: number;
}

export interface DashboardHabitRun {
  id: string;
  startDate: ISODateString;
  totalDays: number;

  stats: DashboardHabitRunStats;
  progress: DashboardHabitRunProgress;
  streak: DashboardHabitRunStreak;

  todayStatus: HabitDayStatus;
}

export interface DashboardHabitDayLog {
  date: ISODateString;
  status: HabitDayStatus;
}

export interface DashboardResponse {
  habit: DashboardHabit;
  run: DashboardHabitRun | null;
  logs: DashboardHabitDayLog[];
}

export interface DashboardHabitItem {
  id: string;
  title: string;
  status: HabitStatus;

  plannedEndDate: ISODateString;
  restDays: number;

  progress: number;

  completedDays: number;
  missedDays: number;

  lastDaysProgress: DayProgress[];

  currentStreak: number;
  bestStreak: number;
}
