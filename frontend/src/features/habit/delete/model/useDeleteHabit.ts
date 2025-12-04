import { useDeleteHabitBase } from '@/entities/habit/model/RQ/habitBaseHooks';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
