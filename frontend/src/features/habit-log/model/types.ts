import type { HabitDayStatus } from '@/shared/model/habit-day.model';

export interface UpsertHabitLogPayload {
  habitId: string;
  status: HabitDayStatus;
  date?: Date;
}
