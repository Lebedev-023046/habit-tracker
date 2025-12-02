import { useUpdateHabitStatusBase } from '@/entities/habit/model/habitBaseHooks';

export function useUpdateHabit() {
  const mutation = useUpdateHabitStatusBase();

  return {
    ...mutation,
    // TODO: add toast here
  };
}
