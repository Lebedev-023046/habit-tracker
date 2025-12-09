import type { DateType } from '@/shared/types';
import type {
  CREATE_HABIT_STATUS,
  HABIT_DAY_STATUS,
  HABIT_STATUS,
  TOTAL_DAYS_VALUES,
} from './constants';

export type HabitStatus = (typeof HABIT_STATUS)[number];
export type HabitTotalDays = (typeof TOTAL_DAYS_VALUES)[number];
export type CreateHabitPayloadStatus = (typeof CREATE_HABIT_STATUS)[number];

export type HabitDayStatus = (typeof HABIT_DAY_STATUS)[number];

export interface Habit {
  id: string;
  title: string;
  status: HabitStatus;
  position: number;
  totalDays: HabitTotalDays;
  startDate: DateType;
  endDate: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  dayLogs: HabitDayLog[];

  // что нужно для daily habits page
  // currentDay: number; // вычисляемое, можно не добавлять
  // steak: number; // вычисляемое
  // bestSteak: number;
  // dayLogs: {
  // 	date, status: 'done' | 'missed'
  // }
}

export interface HabitDayLog {
  id: string;
  habitId: string;
  date: DateType;
  status: HabitDayStatus;
  createdAt: DateType;
  habit: Habit;
}
