export const HABIT_STATUS = [
  'planned',
  'active',
  'paused',
  'built',
  'cancelled',
] as const;
export const TOTAL_DAYS_VALUES = [30, 45, 60] as const;
export const CREATE_HABIT_STATUS = ['planned', 'active'] as const;
export const HABIT_DAY_STATUS = ['completed', 'missed'] as const;

export type HabitStatus = (typeof HABIT_STATUS)[number];
export type HabitTotalDays = (typeof TOTAL_DAYS_VALUES)[number];
export type CreateHabitPayloadStatus = (typeof CREATE_HABIT_STATUS)[number];

export type HabitDayStatus = (typeof HABIT_DAY_STATUS)[number];

export type DateType = Date | undefined;

interface HabitBase {
  id: string;
  title: string;
  status: HabitStatus;
  position: number;
  totalDays: HabitTotalDays;
  startDate: DateType;
  endDate: DateType;
}

export interface Habit extends HabitBase {
  createdAt: DateType;
  updatedAt: DateType;
  dayLogs: HabitDayLog[];
}

export interface HabitDayLog {
  id: string;
  habitId: string;
  date: DateType;
  status: HabitDayStatus;
  createdAt: DateType;
  habit: Habit;
}
