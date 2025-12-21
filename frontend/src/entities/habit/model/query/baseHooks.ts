import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { habitRepo } from '../../api/habitRepo';
import type {
  CreateHabitPayload,
  DeleteHabitPayload,
  GetAllHabitsQuery,
  UpdateHabitPayload,
} from '../../api/types';
import type { Habit } from '../types';
import {
  getAllHabitsQueryOptions,
  getOneHabitQueryOptions,
} from './queryOptions';

export function useGetHabits(params?: GetAllHabitsQuery) {
  const queryOptions = getAllHabitsQueryOptions(params);
  return useQuery(queryOptions);
}
export function useGetHabitsWithStale() {
  const queryOptions = getAllHabitsQueryOptions();
  return useQuery<Habit[]>({
    ...queryOptions,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

export function useGetHabit(id: string) {
  const queryOptions = getOneHabitQueryOptions(id);
  return useQuery(queryOptions);
}

export function useCreateHabitBase() {
  return useMutation<Habit, Error, CreateHabitPayload>({
    mutationFn: habitRepo.createHabit,
  });
}

export function useUpdateHabitBase() {
  return useMutation<Habit, Error, UpdateHabitPayload>({
    mutationFn: habitRepo.updateHabit,
  });
}

export function useDeleteHabitBase() {
  return useMutation<string, Error, DeleteHabitPayload>({
    mutationFn: habitRepo.deleteHabit,
  });
}
