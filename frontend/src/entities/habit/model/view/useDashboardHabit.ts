import { useParams } from 'react-router-dom';
import { useGetHabit } from '../query/habitBaseHooks';
import { habitDashboardService } from '../services/habitDashboard.service';

export function useDashboardHabit() {
  const { habitId } = useParams<{ habitId: string }>();

  console.log({ habitId });

  const { data: habitInfo, isLoading, error } = useGetHabit(habitId ?? '');

  const habit = habitInfo?.data;

  console.log({ habit });

  const dashboardHabit = habitDashboardService.buildDashboardModel(habit);

  return {
    dashboardHabit,
    isLoading,
    isError: !!error,
    error,
  };
}
