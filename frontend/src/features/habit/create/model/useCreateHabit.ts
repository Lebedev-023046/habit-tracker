import { useCreateHabitBase } from '@/entities/habit/model/habitBaseHooks';

export function useCreateHabit() {
  const mutation = useCreateHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
