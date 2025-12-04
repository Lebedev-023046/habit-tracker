import type {
  CreateHabitFormValues,
  UpdateHabitFormValues,
} from '../model/form/schema';
import type { Habit, HabitStatus } from '../model/types';

export type CreateHabitPayload = CreateHabitFormValues;
export type UpdateHabitPayload = { id: string } & UpdateHabitFormValues;
export type UpdateHabitStatusPayload = { id: string; status: HabitStatus };
export type UpdateHabitStatusAndPositionPayload = {
  id: string;
  payload: Pick<Habit, 'status' | 'position'>;
};

export type DeleteHabitPayload = { id: string };
