import { useReorderHabitsBase } from '@/entities/habit';

export function useReorderHabits() {
  const mutation = useReorderHabitsBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
