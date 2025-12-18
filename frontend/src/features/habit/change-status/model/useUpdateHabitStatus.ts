import { useUpdateHabitStatusBase } from '@/entities/habit';
import type { UpdateHabitStatusPayload } from '@/entities/habit/api/types';
import { toast } from '@/shared/lib/toast';

export function useUpdateHabitStatus() {
  const mutation = useUpdateHabitStatusBase();

  return {
    ...mutation,
    mutate: (vars: UpdateHabitStatusPayload, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success(`Habit status moved to ${data?.status}`);
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
