import type { HabitDayLog } from '@/entities/habit/model/types';

export type UpsertHabitLogPayload = Partial<Pick<HabitDayLog, 'date'>> &
  Pick<HabitDayLog, 'status' | 'habitId'>;

// export type CreateHabitLogPayload = Pick<
//   HabitDayLog,
//   'status' | 'date' | 'habitId'
// >;

// export type UpdateHabitLogPayload = Pick<HabitDayLog, 'id' | 'status'>;

export type DeleteHabitLogPayload = Pick<HabitDayLog, 'id'>;
