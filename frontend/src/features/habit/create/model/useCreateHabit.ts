import { useCreateHabitBase } from '@/entities/habit';

export function useCreateHabit() {
  const mutation = useCreateHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
