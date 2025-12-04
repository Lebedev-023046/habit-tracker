import { useCreateHabitBase } from '@/entities/habit/model/RQ/habitBaseHooks';

export function useCreateHabit() {
  const mutation = useCreateHabitBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
