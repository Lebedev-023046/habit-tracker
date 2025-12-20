import { useUpdateHabitBase } from '@/entities/habit';
import type { UpdateHabitPayload } from '@/entities/habit/api/types';
import { getHabitOverviewListQueryOptions } from '@/entities/habits-overview/model/queryOptions';
import { toast } from '@/shared/lib/toast';
import { useQueryClient } from '@tanstack/react-query';

export function useUpdateHabit() {
  const mutation = useUpdateHabitBase();
  const queryClient = useQueryClient();
  const habitOverviewQueryOptions = getHabitOverviewListQueryOptions();

  return {
    ...mutation,
    mutate: (vars: UpdateHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit Updated');
          queryClient.invalidateQueries(habitOverviewQueryOptions);
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || 'Failed to update habit');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
