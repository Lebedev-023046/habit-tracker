import { getHabitOverviewListQueryOptions } from '@/entities/habits-overview/model/queryOptions';
import { toast } from '@/shared/lib/toast';
import { useQueryClient, type UseMutationResult } from '@tanstack/react-query';

type WithToastOptions<TData, TVariables, TContext> = {
  successMessage: string;
  errorMessage?: string;
  mutation: UseMutationResult<TData, Error, TVariables, TContext>;
};

export function withToastMutation<TData, TVariables, TContext = unknown>({
  mutation,
  successMessage,
  errorMessage,
}: WithToastOptions<TData, TVariables, TContext>) {
  const queryClient = useQueryClient();
  const habitOverviewQueryOptions = getHabitOverviewListQueryOptions();

  return {
    ...mutation,
    mutate: (vars: TVariables, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success(successMessage);
          queryClient.invalidateQueries(habitOverviewQueryOptions);
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          toast.error(error.message || errorMessage || 'Something went wrong');
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
