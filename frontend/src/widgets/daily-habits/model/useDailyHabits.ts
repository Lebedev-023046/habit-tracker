import { useDailyHabitsBase } from '@/entities/daily-habits/model/baseHooks';

export function useDailyHabits() {
  const { data: dailyHabitsInfo, isLoading, error } = useDailyHabitsBase();

  return {
    dailyHabitsInfo,
    isLoading,
    isError: !!error,
    error,
  };
}
