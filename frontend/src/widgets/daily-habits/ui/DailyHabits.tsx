import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { useDailyHabits } from '../model/useDailyHabits';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview';
import { OverviewLoading } from './sections/overview/OverviewLoading';

export function DailyHabits() {
  const { dailyHabitsInfo, isLoading, isError, error } = useDailyHabits();

  if (isLoading) {
    return (
      <>
        <OverviewLoading />
        <HabitItems activeHabits={[]} isLoading />
      </>
    );
  }

  if (isError) {
    return <GlobalFallback error={error} />;
  }

  if (!dailyHabitsInfo) {
    return <GlobalFallback error={new Error("Can't load habits")} />;
  }

  const { totalCount, completedCount, habits } = dailyHabitsInfo;

  if (habits.length === 0) {
    return (
      <>
        <Overview totalCount={0} completedCount={0} />
        <HabitItems activeHabits={[]} isEmpty />
      </>
    );
  }

  return (
    <>
      <Overview totalCount={totalCount} completedCount={completedCount} />
      <HabitItems activeHabits={habits} isLoading={isLoading} />
    </>
  );
}
