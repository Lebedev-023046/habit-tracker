import type { HabitDayLog } from '@/entities/habit/model/types';

export type UpsertHabitLogPayload = Pick<
  HabitDayLog,
  'status' | 'date' | 'habitId'
>;

// export type CreateHabitLogPayload = Pick<
//   HabitDayLog,
//   'status' | 'date' | 'habitId'
// >;

// export type UpdateHabitLogPayload = Pick<HabitDayLog, 'id' | 'status'>;

export type DeleteHabitLogPayload = Pick<HabitDayLog, 'id'>;
