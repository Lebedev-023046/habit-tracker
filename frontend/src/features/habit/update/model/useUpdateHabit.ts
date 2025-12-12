import { useUpdateHabitBase } from '@/entities/habit';
import type { UpdateHabitPayload } from '@/entities/habit/api/types';
import { toast } from '@/shared/lib/toast';

export function useUpdateHabit() {
  const mutation = useUpdateHabitBase();

  return {
    ...mutation,
    mutate: (vars: UpdateHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit Updated');
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
