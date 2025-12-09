import { useUpsertHabitLogBase } from '@/entities/habit-log/model/habitLogbaseHooks';

export function useUpsertHabit() {
  const mutation = useUpsertHabitLogBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
