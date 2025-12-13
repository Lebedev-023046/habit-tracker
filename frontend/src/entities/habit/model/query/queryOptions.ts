import { queryOptions } from '@tanstack/react-query';
import { habitRepo } from '../../api/habitRepo';
import type { GetAllHabitsQuery } from '../../api/types';
import type { Habit } from '../types';
import { habitQueryKeys } from './queryKeys';

export function getAllHabitsQueryOptions(params?: GetAllHabitsQuery) {
  return queryOptions<Habit[]>({
    queryKey: habitQueryKeys.list(params),
    queryFn: () => habitRepo.getAllHabits(params),
  });
}

export function getOneHabitQueryOptions(id: string) {
  return queryOptions<Habit>({
    queryKey: habitQueryKeys.byId(id),
    queryFn: () => habitRepo.getHabit(id),
  });
}
