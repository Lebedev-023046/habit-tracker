import type { ApiResponse } from '@/shared/api/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { habitRepo } from '../../api';
import type {
  CreateHabitPayload,
  DeleteHabitPayload,
  UpdateHabitPayload,
  UpdateHabitStatusAndPositionPayload,
  UpdateHabitStatusPayload,
} from '../../api/types';
import {
  getAllHabitsQueryOptions,
  getOneHabitQueryOptions,
} from '../RQ/queryOptions';
import type { Habit } from '../types';

export function useGetHabits() {
  const queryOptions = getAllHabitsQueryOptions();
  return useQuery(queryOptions);
}

export function useGetHabit(id: string) {
  const queryOptions = getOneHabitQueryOptions(id);
  return useQuery(queryOptions);
}

export function useCreateHabitBase() {
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

export function useUpdateHabitBase() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Habit>, Error, UpdateHabitPayload>({
    mutationFn: habitRepo.updateHabit,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} was updated!`);

      if (!response.data?.id) {
        throw new Error('Habit id not found');
      }

      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}

export function useUpdateHabitStatusBase() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Habit>, Error, UpdateHabitStatusPayload>({
    mutationFn: habitRepo.updateHabitStatus,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} status updated!`);
      if (!response.data?.id) {
        throw new Error('Habit id not found');
      }
      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}

export function useUpdateHabitStatusAndPositionBase() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<Habit>,
    Error,
    UpdateHabitStatusAndPositionPayload
  >({
    mutationFn: habitRepo.updateHabitStatusAndPosition,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} status updated!`);
      if (!response.data?.id) {
        throw new Error('Habit id not found');
      }
      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}

export function useDeleteHabitBase() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Habit>, Error, DeleteHabitPayload>({
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
