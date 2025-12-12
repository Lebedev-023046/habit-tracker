import { useUpsertHabitLogBase } from '@/entities/habit-log';
import { toast } from '@/shared/lib/toast';
import type { UpsertHabitLogPayload } from './types';

export function useUpsertHabit() {
  const mutation = useUpsertHabitLogBase();

  return {
    ...mutation,
    mutate: (vars: UpsertHabitLogPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success('Habit log updated');
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || 'Failed to update habit log');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
