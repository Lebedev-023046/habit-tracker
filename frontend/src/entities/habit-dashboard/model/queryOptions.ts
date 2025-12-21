import { queryOptions } from '@tanstack/react-query';
import { habitDashboardRepo } from '../api/habitDashboardRepo';
import type { DashboardHabitItem } from '../types';
import { habitDashboardQueryKeys } from './queryKey';

export function getDashboardOverviewQueryOptions(habitId: string) {
  return queryOptions<DashboardHabitItem>({
    queryKey: habitDashboardQueryKeys.byId(habitId),
    queryFn: () => habitDashboardRepo.getDashboardOverview(habitId),
  });
}
