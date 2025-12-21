import { queryClient } from '@/app/providers/react-query';
import { getDailyHabitsQueryOptions } from '@/entities/daily-habits/model/queryOptions';
import type { DailyHabitsInfo } from '@/entities/daily-habits/types';
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
  const dailyHabitsKey = getDailyHabitsQueryOptions().queryKey;

  return useMutation<
    HabitDayLog,
    Error,
    UpsertHabitLogPayload,
    { dailyHabitsInfo?: DailyHabitsInfo }
  >({
    mutationFn: habitLogRepo.upsertHabitLog,
    onMutate: async vars => {
      await queryClient.cancelQueries({
        queryKey: dailyHabitsKey,
      });

      const dailyHabitsInfo = queryClient.getQueryData(dailyHabitsKey);

      queryClient.setQueryData(dailyHabitsKey, old => {
        if (!old) return old;

        return {
          ...old,
          habits: old.habits.map(habit =>
            habit.id === vars.habitId
              ? { ...habit, todayStatus: vars.status }
              : habit,
          ),
        };
      });

      return { dailyHabitsInfo };
    },

    onError: (_error, _vars, ctx) => {
      if (ctx?.dailyHabitsInfo) {
        queryClient.setQueryData(dailyHabitsKey, ctx.dailyHabitsInfo);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: dailyHabitsKey,
      });
    },
  });
}

export function useDeleteHabitLogBase() {
  return useMutation<boolean, Error, DeleteHabitLogPayload>({
    mutationFn: ({ habitId, date }) =>
      habitLogRepo.deleteHabitLog(habitId, date),
  });
}
