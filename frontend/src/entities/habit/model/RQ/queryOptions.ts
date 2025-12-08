import type { ApiResponse } from '@/shared/api/types';
import { queryOptions } from '@tanstack/react-query';
import { habitRepo } from '../../api/habitRepo';
import type { Habit } from '../types';
import { habitQueryKeys } from './queryKeys';

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
