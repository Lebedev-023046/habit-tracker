import { useUpdateHabitStatusBase } from '@/entities/habit';

export function useUpdateHabit() {
  const mutation = useUpdateHabitStatusBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
