import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { habitRepo } from '../../api/habitRepo';
import type {
  CreateHabitPayload,
  DeleteHabitPayload,
  GetAllHabitsQuery,
  UpdateHabitPayload,
  UpdateHabitStatusPayload,
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
  const queryClient = useQueryClient();
  const queryOptions = getAllHabitsQueryOptions();

  return useMutation<Habit, Error, CreateHabitPayload>({
    mutationFn: habitRepo.createHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response?.id} was created!`);
      await queryClient.invalidateQueries(queryOptions);
    },
  });
}

export function useUpdateHabitBase() {
  const queryClient = useQueryClient();

  return useMutation<Habit, Error, UpdateHabitPayload>({
    mutationFn: habitRepo.updateHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response?.id} was updated!`);

      if (!response?.id) {
        throw new Error('Habit id not found');
      }

      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
  });
}

export function useUpdateHabitStatusBase() {
  const queryClient = useQueryClient();
  return useMutation<Habit, Error, UpdateHabitStatusPayload>({
    mutationFn: habitRepo.updateHabitStatus,
    async onSuccess(response) {
      console.log(`Habit with id: ${response?.id} status updated!`);
      if (!response?.id) {
        throw new Error('Habit id not found');
      }
      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
  });
}

export function useDeleteHabitBase() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, DeleteHabitPayload>({
    mutationFn: habitRepo.deleteHabit,
    async onSuccess(id) {
      console.log(`Habit with id: ${id} was deleted!`);
      await queryClient.invalidateQueries(getAllHabitsQueryOptions());
    },
  });
}
