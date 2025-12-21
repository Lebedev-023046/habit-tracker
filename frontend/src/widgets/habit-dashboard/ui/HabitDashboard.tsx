import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { PageLoader } from '@/shared/ui/page-loader';
import { useDashboardHabit } from '../model/useDashboardHabit';
import { HabitCharts } from './sections/habit-charts';
import { HabitStatusBanner } from './sections/habit-status-banner';
import { StatisticBricks } from './sections/statistic-bricks';
import { SubHeader } from './sections/sub-header';

export function HabitDashboard({ habitId }: { habitId: string }) {
  const { dashboardHabit, isLoading, isError, error } =
    useDashboardHabit(habitId);

  const isInitialLoading = isLoading && !dashboardHabit;

  if (isInitialLoading) {
    return <PageLoader label="Loading habit..." />;
  }

  if (isError || !dashboardHabit) {
    return <GlobalFallback error={error} />;
  }
  const {
    title,
    status,
    currentStreak,
    bestStreak,
    completedDays,
    missedDays,
    restDays,
    progress,
    plannedEndDate,
    lastDaysProgress,
  } = dashboardHabit;

  return (
    <>
      <SubHeader title={title} streak={currentStreak} restDays={restDays} />
      <HabitCharts
        completedDays={completedDays}
        missedDays={missedDays}
        restDays={restDays}
        progress={progress}
        lastDaysProgress={lastDaysProgress}
      />
      <StatisticBricks
        progress={progress}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
      />
      <HabitStatusBanner status={status} plannedEndDate={plannedEndDate} />
    </>
  );
}
