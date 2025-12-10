import { useUpdateHabitBase } from '@/entities/habit';

export function useUpdateHabit() {
  const mutation = useUpdateHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
