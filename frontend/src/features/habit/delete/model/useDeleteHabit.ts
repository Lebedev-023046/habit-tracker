import { useDeleteHabitBase } from '@/entities/habit';
import type { DeleteHabitPayload } from '@/entities/habit/api/types';
import { toast } from '@/shared/lib/toast';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();

  return {
    ...mutation,
    mutate: (vars: DeleteHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit deleted');
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
