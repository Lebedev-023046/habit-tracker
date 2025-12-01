import { useUpdateHabitBase } from '@/entities/habit/model/habitBaseHooks';

export function useUpdateHabit() {
  const mutation = useUpdateHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
