import type { HabitDayLog } from '@/entities/habit';

export type UpsertHabitLogPayload = Pick<HabitDayLog, 'status' | 'habitId'> &
  Partial<Pick<HabitDayLog, 'date'>>;

// export type CreateHabitLogPayload = Pick<
//   HabitDayLog,
//   'status' | 'date' | 'habitId'
// >;

// export type UpdateHabitLogPayload = Pick<HabitDayLog, 'id' | 'status'>;

export type DeleteHabitLogPayload = Pick<HabitDayLog, 'habitId' | 'date'>;
