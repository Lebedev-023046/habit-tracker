// enums из Prisma

export const HabitStatus = {
  planned: 'planned',
  active: 'active',
  paused: 'paused',
  built: 'built',
  cancelled: 'cancelled',
};

export const HabitDayStatus = {
  done: 'done',
  missed: 'missed',
};

export type HabitStatus = keyof typeof HabitStatus;
export type HabitDayStatus = keyof typeof HabitDayStatus;

type DateType = Date | string;

export interface Habit {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: number;
  startDate: DateType | null;
  endDate: DateType | null;
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

export type CreateHabitPayload = Pick<
  Habit,
  'title' | 'status' | 'totalDays'
> & {
  startDate?: Date;
  endDate?: Date;
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
export type UpdateHabitPayload = Optional<
  Omit<Habit, 'createdAt' | 'updatedAt'>
>;
