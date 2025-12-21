import { queryOptions } from '@tanstack/react-query';

import { habitsOverviewRepo } from '../api/habitsOverviewRepo';
import type { HabitsOverviewListItem } from '../types';
import { habitsOverviewQueryKeys } from './queryKeys';

export function getHabitOverviewListQueryOptions() {
  return queryOptions<HabitsOverviewListItem[]>({
    queryKey: habitsOverviewQueryKeys.list(),
    queryFn: () => habitsOverviewRepo.getList(),
  });
}
