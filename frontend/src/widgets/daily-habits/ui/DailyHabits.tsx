import { SectionState } from '@/shared/ui/section-state';
import { useDailyHabits } from '../model/useDailyHabits';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview';

export function DailyHabits() {
  const { dailyHabitsInfo, isLoading, error } = useDailyHabits();

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  // if (!dailyHabitsInfo) {
  //   return <GlobalFallback error={new Error("Can't load habits")} />;
  // }

  // if (isError) {
  //   return <GlobalFallback error={error} />;
  // }

  // const { totalCount, completedCount, habits } = dailyHabitsInfo;

  // if (habits.length === 0) {
  //   return (
  //     <>
  //       <Overview totalCount={0} completedCount={0} />
  //       <HabitItems activeHabits={[]} isEmpty />
  //     </>
  //   );
  // }

  return (
    <SectionState isLoading={isLoading} error={error}>
      {dailyHabitsInfo && (
        <>
          <Overview
            totalCount={dailyHabitsInfo.totalCount}
            completedCount={dailyHabitsInfo.completedCount}
          />

          <HabitItems
            activeHabits={dailyHabitsInfo.habits}
            isEmpty={dailyHabitsInfo.habits.length === 0}
          />
        </>
      )}
    </SectionState>
  );
}
