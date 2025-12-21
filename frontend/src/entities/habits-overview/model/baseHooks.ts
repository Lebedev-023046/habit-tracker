import { useQuery } from '@tanstack/react-query';
import { getHabitOverviewListQueryOptions } from './queryOptions';

export function useHabitsOverviewListBase() {
  const queryOptions = getHabitOverviewListQueryOptions();
  return useQuery(queryOptions);
}
