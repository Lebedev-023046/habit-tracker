import type { ApiResponse } from '@/shared/api/types';
import { useMutation } from '@tanstack/react-query';
import { habitRepo } from '../api/habitRepo';
import type { HabitReorderPayload } from '../api/types';
import type { Habit } from '../model/types';

export function useReorderHabitsBase() {
  return useMutation<ApiResponse<Habit>, Error, HabitReorderPayload[]>({
    mutationFn: habitRepo.reorderHabits,

    async onError(error) {
      throw new Error(error.message);
    },
  });
}
