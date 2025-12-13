import type { HabitDayLog } from '@/entities/habit';
import { getAllHabitsQueryOptions } from '@/entities/habit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitLogRepo } from '../api/habitLogRepo';
import type { UpsertHabitLogPayload } from '../api/types';

export function useUpsertHabitLogBase() {
  const queryClient = useQueryClient();

  return useMutation<HabitDayLog, Error, UpsertHabitLogPayload>({
    mutationFn: habitLogRepo.upsertHabitLog,
    async onSuccess(response) {
      console.log(`habit log updated to ${response.status}`);

      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
  });
}
