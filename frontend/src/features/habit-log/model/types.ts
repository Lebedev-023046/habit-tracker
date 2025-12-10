import type { HabitDayStatus } from '@/entities/habit';

export interface UpsertHabitLogPayload {
  habitId: string;
  status: HabitDayStatus;
  date?: Date;
}
