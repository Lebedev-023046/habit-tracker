import { useDailyHabits } from '@/entities/habit';
import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview/Overview';
import { OverviewLoading } from './sections/overview/OverviewLoading';

export default function HabitDailyPage() {
  const { viewModel, isInitialLoading, isError, error } = useDailyHabits();

  if (isError) {
    return <GlobalFallback error={error} />;
  }

  const { totalCount, completedCount, habits } = viewModel;

  return (
    <>
      {isInitialLoading ? (
        <OverviewLoading />
      ) : (
        <Overview totalCount={totalCount} completedCount={completedCount} />
      )}
      <HabitItems activeHabits={habits} isLoading={isInitialLoading} />
    </>
  );
}
