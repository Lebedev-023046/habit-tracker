import { getDailyHabitsQueryOptions } from '@/entities/daily-habits/model/queryOptions';
import { useCreateHabitBase } from '@/entities/habit';
import type { CreateHabitPayload } from '@/entities/habit/api/types';
import { getHabitOverviewListQueryOptions } from '@/entities/habits-overview/model/queryOptions';
import { toast } from '@/shared/lib/toast';
import { useQueryClient } from '@tanstack/react-query';

export function useCreateHabit() {
  const mutation = useCreateHabitBase();
  const queryClient = useQueryClient();
  const dailyHabitsQueryOptions = getDailyHabitsQueryOptions();
  const habitOverviewQueryOptions = getHabitOverviewListQueryOptions();

  return {
    ...mutation,
    mutate: (vars: CreateHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit created');
          queryClient.invalidateQueries(dailyHabitsQueryOptions);
          queryClient.invalidateQueries(habitOverviewQueryOptions);
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || 'Failed to create habit');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
