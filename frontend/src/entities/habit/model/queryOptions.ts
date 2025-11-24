import type { ApiResponse } from '@/shared/api/types';
import { queryOptions } from '@tanstack/react-query';
import { habitRepo } from '../api';
import { habitQueryKeys } from './queryKeys';
import type { Habit } from './types';

export function getAllHabitsQueryOptions() {
  return queryOptions<ApiResponse<Habit[]>>({
    queryKey: habitQueryKeys.all(),
    queryFn: () => habitRepo.getAllHabits(),
  });
}
export function getOneHabitQueryOptions(id: string) {
  return queryOptions<ApiResponse<Habit[]>>({
    queryKey: habitQueryKeys.byParams<string>(id),
    queryFn: () => habitRepo.getAllHabits(),
  });
}
