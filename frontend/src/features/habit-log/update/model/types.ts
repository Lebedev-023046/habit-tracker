import type { HabitDayStatus } from '@/entities/habit/model/types';

export interface UpsertHabitLogPayload {
  habitId: string;
  status: HabitDayStatus;
  date?: Date;
}
