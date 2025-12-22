import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { PageLoader } from '@/shared/ui/page-loader';
import { SectionState } from '@/shared/ui/section-state';
import { useDashboardHabit } from '../model/useDashboardHabit';
import { HabitCharts } from './sections/habit-charts';
import { HabitStatusBanner } from './sections/habit-status-banner';
import { StatisticBricks } from './sections/statistic-bricks';
import { SubHeader } from './sections/sub-header';

export function HabitDashboard({ habitId }: { habitId: string }) {
  const { dashboardHabit, isLoading, isError, error } =
    useDashboardHabit(habitId);

  return (
    <SectionState
      isLoading={isLoading && !dashboardHabit}
      error={isError ? error : null}
      loadingFallback={<PageLoader label="Loading habit..." />}
      errorFallback={<GlobalFallback error={error} />}
    >
      {dashboardHabit && (
        <>
          <SubHeader
            title={dashboardHabit.title}
            streak={dashboardHabit.currentStreak}
            restDays={dashboardHabit.restDays}
          />

          <HabitCharts
            completedDays={dashboardHabit.completedDays}
            missedDays={dashboardHabit.missedDays}
            restDays={dashboardHabit.restDays}
            progress={dashboardHabit.progress}
            lastDaysProgress={dashboardHabit.lastDaysProgress}
          />

          <StatisticBricks
            progress={dashboardHabit.progress}
            currentStreak={dashboardHabit.currentStreak}
            bestStreak={dashboardHabit.bestStreak}
          />

          <HabitStatusBanner
            status={dashboardHabit.status}
            plannedEndDate={dashboardHabit.plannedEndDate}
          />
        </>
      )}
    </SectionState>
  );
}
