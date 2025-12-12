import { useUpdateHabitStatusBase } from '@/entities/habit';
import type { UpdateHabitPayload } from '@/entities/habit/api/types';
import { toast } from '@/shared/lib/toast';

export function useUpdateHabit() {
  const mutation = useUpdateHabitStatusBase();

  return {
    ...mutation,
    mutate: (vars: UpdateHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit status updated');
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || 'Failed to update habit status');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
