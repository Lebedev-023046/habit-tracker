import { useDeleteHabitBase } from '@/entities/habit';

export function useDeleteHabit() {
  const mutation = useDeleteHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
