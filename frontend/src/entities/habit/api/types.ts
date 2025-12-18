import type {
  CreateHabitFormValues,
  UpdateHabitFormValues,
} from '../model/form/schema';
import type { HabitStatus } from '../model/types';

export interface GetAllHabitsQuery {
  id?: string;
  status?: HabitStatus;
}

export type CreateHabitPayload = CreateHabitFormValues;
export type UpdateHabitPayload = { id: string } & UpdateHabitFormValues;
export type UpdateHabitStatusPayload = { id: string; status: HabitStatus };

export type DeleteHabitPayload = { id: string };
