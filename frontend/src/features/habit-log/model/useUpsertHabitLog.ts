import { getDailyHabitsQueryOptions } from '@/entities/daily-habits/model/queryOptions';
import type { DailyHabitItem } from '@/entities/daily-habits/types';
import { useUpsertHabitLogBase } from '@/entities/habit-log';
import { useModal } from '@/shared/modal/modal-context';
import { useQueryClient } from '@tanstack/react-query';

interface useUpsertHabitProps {
  habitId: string;
  goalReached: boolean;
}

export function useUpsertHabit({ habitId, goalReached }: useUpsertHabitProps) {
  const baseMutation = useUpsertHabitLogBase();

  const { openLazyModal } = useModal();

  const queryClient = useQueryClient();

  const dailyHabitsKey = getDailyHabitsQueryOptions().queryKey;

  return {
    ...baseMutation,
    mutate: (
      vars: Parameters<typeof baseMutation.mutate>[0],
      options?: Parameters<typeof baseMutation.mutate>[1],
    ) => {
      baseMutation.mutate(vars, {
        ...options,
        onSettled: async (...args) => {
          await queryClient.invalidateQueries({
            queryKey: dailyHabitsKey,
          });

          const updated = queryClient.getQueryData<{
            habits: DailyHabitItem[];
          }>(dailyHabitsKey);

          const updatedHabit = updated?.habits.find(h => h.id === habitId);

          if (!updatedHabit) return;

          const wasGoalReachedBefore = goalReached;
          const isGoalReachedNow = updatedHabit.goalReached;

          if (!wasGoalReachedBefore && isGoalReachedNow) {
            openLazyModal(
              () =>
                import(
                  '../../habit/change-status/ui/build/complete-habit-success-modal'
                ).then(m => ({
                  Modal: m.CompleteHabitSuccessModal,
                })),
              { habitId, habitTitle: updatedHabit.title },
            );
          }

          options?.onSettled?.(...args);
        },
      });
    },
  };
}
