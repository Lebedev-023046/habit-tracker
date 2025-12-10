import { useUpsertHabitLogBase } from '@/entities/habit-log';

export function useUpsertHabit() {
  const mutation = useUpsertHabitLogBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
