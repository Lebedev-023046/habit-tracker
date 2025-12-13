import { useGetHabit } from '../query/habitBaseHooks';
import { habitDashboardService } from '../services/habitDashboard.service';

export function useDashboardHabit(habitId: string) {
  if (!habitId) {
    return {
      dashboardHabit: habitDashboardService.emptyDashboardHabit,
      isLoading: false,
      isError: true,
      error: new Error('Habit id is required'),
    };
  }

  const { data: habitInfo, isLoading, error } = useGetHabit(habitId ?? '');

  const habit = habitInfo;

  const dashboardHabit = habit
    ? habitDashboardService.buildDashboardModel(habit)
    : habitDashboardService.emptyDashboardHabit;

  return {
    dashboardHabit,
    isLoading,
    isError: !!error,
    error,
  };
}
