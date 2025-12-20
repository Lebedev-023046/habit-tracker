import type { HabitStatus, HabitTotalDays } from '../model/types';

export interface GetAllHabitsQuery {
  id?: string;
  status?: HabitStatus;
}

export interface CreateHabitPayload {
  title: string;
  startImmediately: boolean;
  totalDays?: HabitTotalDays;
}

export interface UpdateHabitPayload {
  id: string;
  title: string;
}

export type DeleteHabitPayload = { id: string };
