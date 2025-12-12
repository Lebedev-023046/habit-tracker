import { useCreateHabitBase } from '@/entities/habit';
import type { CreateHabitPayload } from '@/entities/habit/api/types';
import { toast } from '@/shared/lib/toast';

export function useCreateHabit() {
  const mutation = useCreateHabitBase();

  return {
    ...mutation,
    mutate: (vars: CreateHabitPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit created');
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
