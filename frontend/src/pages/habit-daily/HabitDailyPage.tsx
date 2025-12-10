import { useDailyHabits } from '@/entities/habit/model/view/useDailyHabits';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview/Overview';

export default function HabitDailyPage() {
  const { viewModel, isLoading, isError, error } = useDailyHabits();
  const isInitialLoading = isLoading && !viewModel;

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalCount, completedCount, habits } = viewModel;

  return (
    <>
      <Overview totalCount={totalCount} completedCount={completedCount} />
      <HabitItems activeHabits={habits} isLoading={isInitialLoading} />
    </>
  );
}
