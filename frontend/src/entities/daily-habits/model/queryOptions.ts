import { queryOptions } from '@tanstack/react-query';
import { dailyHabitsRepo } from '../api/dailyHabitsRepo';
import type { DailyHabitsInfo } from '../types';
import { dailyHabitsQueryKeys } from './queryKeys';

export function getDailyHabitsQueryOptions() {
  return queryOptions<DailyHabitsInfo>({
    queryKey: dailyHabitsQueryKeys.root(),
    queryFn: () => dailyHabitsRepo.getDailyHabits(),
  });
}
