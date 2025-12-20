import { useDeleteHabitBase } from '@/entities/habit';
import type { DeleteHabitPayload } from '@/entities/habit/api/types';
import { getHabitOverviewListQueryOptions } from '@/entities/habits-overview/model/queryOptions';
import { toast } from '@/shared/lib/toast';
import { useQueryClient } from '@tanstack/react-query';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();
  const queryClient = useQueryClient();
  const habitOverviewQueryOptions = getHabitOverviewListQueryOptions();

  return {
    ...mutation,
    mutate: (vars: DeleteHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit deleted');
          queryClient.invalidateQueries(habitOverviewQueryOptions);
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || 'Failed to delete habit');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
