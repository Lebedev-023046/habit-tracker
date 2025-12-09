import { habitDailyService, type DailyHabitViewModel } from '..';
import { useGetHabits } from '../query/habitBaseHooks';

export interface DailyHabitsViewModel {
  totalCount: number;
  completedCount: number;
  habits: DailyHabitViewModel[];
}

export function useDailyHabits() {
  const { data: habitsInfo, isLoading, isError, error } = useGetHabits();

  const activeHabits =
    habitsInfo?.data?.filter(habit => habit.status === 'active') ?? [];

  const dailyHabits: DailyHabitViewModel[] =
    activeHabits.map(habit => habitDailyService.buildDailyModel(habit)) ?? [];

  const viewModel: DailyHabitsViewModel = {
    totalCount: activeHabits.length,
    completedCount: dailyHabits.filter(
      habit => habit.todayStatus === 'completed',
    ).length,
    habits: dailyHabits,
  };

  return {
    viewModel,
    isLoading,
    isError,
    error,
  };
}
