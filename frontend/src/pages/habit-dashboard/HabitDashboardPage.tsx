import { useDashboardHabit } from '@/entities/habit';
import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { PageLoader } from '@/shared/ui/page-loader';
import { useParams } from 'react-router-dom';
import { HabitCharts } from './sections/habit-charts';
import { HabitStatusBanner } from './sections/habit-status-banner';
import { StatisticBricks } from './sections/statistic-bricks/StatisticBricks';
import { SubHeader } from './sections/sub-header';

export default function HabitDashboardPage() {
  const { habitId } = useParams<{ habitId: string }>();

  if (!habitId) {
    return <GlobalFallback error={new Error('Habit id is missing')} />;
  }

  const { dashboardHabit, isLoading, isError, error } =
    useDashboardHabit(habitId);

  const isInitialLoading = isLoading && !dashboardHabit;

  if (isError) {
    return <GlobalFallback error={error} />;
  }

  if (isInitialLoading) {
    return <PageLoader label="Loading habit..." />;
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
