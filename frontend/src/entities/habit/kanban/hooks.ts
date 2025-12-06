import type { ApiResponse } from '@/shared/api/types';
import { useMutation } from '@tanstack/react-query';
import { habitRepo } from '../api';
import type { HabitReorderPayload } from '../api/types';
import type { Habit } from '../model/types';

export function useReorderHabits() {
  return useMutation<ApiResponse<Habit>, Error, HabitReorderPayload[]>({
    mutationFn: habitRepo.reorderHabits,
    async onSuccess(response) {
      console.log(`Habit with id: ${response.data?.id} was created!`);
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });
}
