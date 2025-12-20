import type { HabitDayLog } from '@/entities/habit';
import { queryOptions } from '@tanstack/react-query';
import { habitLogRepo } from '../../api/habitLogRepo';
import { habitLogQueryKeys } from './queryKeys';

export function getHabitLogsQueryOptions(habitId: string) {
  return queryOptions<HabitDayLog[]>({
    queryKey: habitLogQueryKeys.byHabit(habitId),
    queryFn: () => habitLogRepo.getHabitLogs(habitId),
  });
}
