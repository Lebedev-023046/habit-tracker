import { PageLoader } from '@/shared/ui/page-loader';
import { SectionState } from '@/shared/ui/section-state';
import { useDailyHabits } from '../model/useDailyHabits';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview';

export function DailyHabits() {
  const { dailyHabitsInfo, isLoading, error } = useDailyHabits();

  return (
    <SectionState
      isLoading={isLoading}
      error={error}
      loadingFallback={<PageLoader />}
    >
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
