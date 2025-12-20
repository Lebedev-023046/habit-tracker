import { useGetHabits } from '@/entities/habit/model/query/baseHooks';
import { habitDailyService } from './habitDaily.service';

export function useDailyHabits() {
  const {
    data: habitsInfo,
    isLoading,
    isError,
    error,
  } = useGetHabits({ status: 'active' });

  const { buildDailyHabitsViewModel } = habitDailyService;

  const habits = habitsInfo || [];
  const viewModel = buildDailyHabitsViewModel(habits);

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
