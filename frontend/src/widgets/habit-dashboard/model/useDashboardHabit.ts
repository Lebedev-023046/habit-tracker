import { useGetHabit } from '@/entities/habit/model/query/baseHooks';
import { habitDashboardService } from './habitDashboard.service';

export function useDashboardHabit(habitId: string) {
  const { emptyDashboardHabit, buildDashboardViewModel } =
    habitDashboardService;

  if (!habitId) {
    return {
      dashboardHabit: emptyDashboardHabit,
      isLoading: false,
      isError: true,
      error: new Error('Habit id is required'),
    };
  }

  const { data: habitInfo, isLoading, error } = useGetHabit(habitId ?? '');

  const habit = habitInfo;

  const dashboardHabit = habit
    ? buildDashboardViewModel(habit)
    : emptyDashboardHabit;

  return {
    dashboardHabit,
    isLoading,
    isError: !!error,
    error,
  };
}
