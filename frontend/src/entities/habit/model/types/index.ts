import type { HabitDayStatus } from '@/shared/model/habit-day.model';
import type { DateValue } from '@/shared/types';
import type {
  CREATE_HABIT_STATUS,
  HABIT_STATUSES,
  TOTAL_DAYS_VALUES,
} from '../constants';

export type HabitStatus = (typeof HABIT_STATUSES)[number];
export type HabitTotalDays = (typeof TOTAL_DAYS_VALUES)[number];
export type CreateHabitPayloadStatus = (typeof CREATE_HABIT_STATUS)[number];

export type HabitAction =
  | 'edit'
  | 'activate'
  | 'pause'
  | 'build'
  | 'cancel'
  | 'delete';

export interface Habit {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: HabitTotalDays;
  startDate: DateValue;
  endDate: DateValue;
  createdAt: DateValue;
  updatedAt: DateValue;
  dayLogs: HabitDayLog[];
}

export interface HabitDayLog {
  id: string;
  habitId: string;
  date: DateValue;
  status: HabitDayStatus;
  createdAt: DateValue;
  habit: Habit;
}
