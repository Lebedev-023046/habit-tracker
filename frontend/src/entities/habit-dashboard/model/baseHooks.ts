import { useQuery } from '@tanstack/react-query';
import { getDashboardOverviewQueryOptions } from './queryOptions';

export function useHabitDashboardBase(habitId: string) {
  const queryOptions = getDashboardOverviewQueryOptions(habitId);
  return useQuery(queryOptions);
}
