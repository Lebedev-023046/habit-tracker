import { useQuery } from '@tanstack/react-query';
import { getDailyHabitsQueryOptions } from './queryOptions';

export function useDailyHabitsBase() {
  const queryOptions = getDailyHabitsQueryOptions();
  return useQuery(queryOptions);
}
