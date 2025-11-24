import type { ApiResponse } from '@/shared/api/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { habitRepo } from '../api';
import {
  getAllHabitsQueryOptions,
  getOneHabitQueryOptions,
} from './queryOptions';
import type { CreateHabitPayload, Habit, UpdateHabitPayload } from './types';

export function useGetHabits() {
  const queryOptions = getAllHabitsQueryOptions();
  return useQuery(queryOptions);
}

export function useGetHabit(id: string) {
  const queryOptions = getOneHabitQueryOptions(id);
  return useQuery(queryOptions);
}

export function useCreateHebit() {
  const queryClient = useQueryClient();
  const queryOptions = getAllHabitsQueryOptions();

  return useMutation<ApiResponse<Habit>, Error, CreateHabitPayload>({
    mutationFn: habitRepo.createHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} was created!`);
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}
export function useUpdateHebit() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Habit>, Error, UpdateHabitPayload>({
    mutationFn: habitRepo.updateHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} was updated!`);

      if (!response.data?.id) {
        throw new Error('Habit id not found');
      }

      const queryOptions = getOneHabitQueryOptions(response.data.id);
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Habit>, Error, string>({
    mutationFn: habitRepo.deleteHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} was deleted!`);
      await queryClient.invalidateQueries(getAllHabitsQueryOptions());
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}
