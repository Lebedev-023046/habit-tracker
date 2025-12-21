import { useHabitDashboardBase } from '@/entities/habit-dashboard/model/baseHooks';

export function useDashboardHabit(habitId: string) {
  const {
    data: dashboardHabit,
    isLoading,
    error,
  } = useHabitDashboardBase(habitId);

  return {
    dashboardHabit,
    isLoading,
    isError: !!error,
    error,
  };
}
