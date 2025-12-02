import { useDeleteHabitBase } from '@/entities/habit/model/habitBaseHooks';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
