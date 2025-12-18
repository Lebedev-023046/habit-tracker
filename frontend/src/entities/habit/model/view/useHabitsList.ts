import { useGetHabits } from '../query/habitBaseHooks';
import { habitListService } from '../services/habitList.service';

export function useHabitsList() {
  const { data: habitsInfo, isLoading, isError, error } = useGetHabits();

  const { buildHabitListViewModel } = habitListService;

  const habits = habitsInfo || [];

  const viewModel = buildHabitListViewModel(habits);

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
