import { useUpsertHabitLogBase } from '@/entities/habit-log/model/habitLogBaseHooks';

export function useUpsertHabit() {
  const mutation = useUpsertHabitLogBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
