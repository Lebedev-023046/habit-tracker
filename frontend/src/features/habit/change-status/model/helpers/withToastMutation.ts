import { getDailyHabitsQueryOptions } from '@/entities/daily-habits/model/queryOptions';
import { getHabitOverviewListQueryOptions } from '@/entities/habits-overview/model/queryOptions';
import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
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
  const dailyHabitsQueryOptions = getDailyHabitsQueryOptions();

  return {
    ...mutation,
    mutate: (vars: TVariables, options?: any) => {
      mutation.mutate(vars, {
        ...options,
        onSuccess: (data, vars, ctx) => {
          toast.success(successMessage);
          queryClient.invalidateQueries(habitOverviewQueryOptions);
          queryClient.invalidateQueries(dailyHabitsQueryOptions);
          options?.onSuccess?.(data, vars, ctx);
        },
        onError: (error, vars, ctx) => {
          const apiErrorMessage = getApiErrorMessage(error);

          const message =
            apiErrorMessage ?? errorMessage ?? 'Something went wrong';

          toast.error(message);
          options?.onError?.(error, vars, ctx);
        },
      });
    },
  };
}
