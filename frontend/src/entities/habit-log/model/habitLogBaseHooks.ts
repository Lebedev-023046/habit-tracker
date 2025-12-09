import { getAllHabitsQueryOptions } from '@/entities/habit/model/query/queryOptions';
import type { HabitDayLog } from '@/entities/habit/model/types';
import type { ApiResponse } from '@/shared/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitLogRepo } from '../api/habitLogRepo';
import type { UpsertHabitLogPayload } from '../api/types';

export function useUpsertHabitLogBase() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<HabitDayLog>, Error, UpsertHabitLogPayload>({
    mutationFn: habitLogRepo.upsertHabitLog,
    async onSuccess(response) {
      console.log(`habit log updated to ${response.data?.status}`);

      const queryOptions = getAllHabitsQueryOptions();
      await queryClient.invalidateQueries(queryOptions);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}
