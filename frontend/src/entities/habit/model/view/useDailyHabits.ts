import { habitDailyService } from '..';
import { useGetHabits } from '../query/habitBaseHooks';

export function useDailyHabits() {
  const { data: habitsInfo, isLoading, isError, error } = useGetHabits();

  const habits = habitsInfo?.data || [];
  const viewModel = habitDailyService.buildDailyHabitsViewModel(habits);

  const hasData = habits.length > 0;
  const isInitialLoading = isLoading && !hasData;

  return {
    viewModel,
    isLoading,
    isInitialLoading,
    isError,
    error,
  };
}
