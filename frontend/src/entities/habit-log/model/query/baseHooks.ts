import type { HabitDayLog } from '@/entities/habit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { habitLogRepo } from '../../api/habitLogRepo';
import type {
  DeleteHabitLogPayload,
  UpsertHabitLogPayload,
} from '../../api/types';
import { getHabitLogsQueryOptions } from './queryOptions';

export function useHabitLogsBase(habitId: string) {
  const queryOptions = getHabitLogsQueryOptions(habitId);
  return useQuery<HabitDayLog[]>(queryOptions);
}

export function useUpsertHabitLogBase() {
  return useMutation<
    HabitDayLog,
    Error,
    UpsertHabitLogPayload,
    { previousLogs?: HabitDayLog[] }
  >({
    mutationFn: habitLogRepo.upsertHabitLog,
  });
}

export function useDeleteHabitLogBase() {
  return useMutation<boolean, Error, DeleteHabitLogPayload>({
    mutationFn: ({ habitId, date }) =>
      habitLogRepo.deleteHabitLog(habitId, date),
  });
}
