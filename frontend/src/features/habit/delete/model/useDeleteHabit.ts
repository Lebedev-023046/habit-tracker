import { useDeleteHabitBase } from '@/entities/habit/model/query/habitBaseHooks';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
