import { useDashboardHabit } from '@/entities/habit/model/view/useDashboardHabit';
import { HabitCharts } from './section/habit-charts';
import { HabitStatusBanner } from './section/habit-status-banner';
import { StatisticBricks } from './section/statistic-bricks/StatisticBricks';
import { SubHeader } from './section/sub-header';

export default function HabitDashboardPage() {
  const { dashboardHabit, isLoading, isError, error } = useDashboardHabit();

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
      <SubHeader title={title} steak={currentStreak} restDays={restDays} />
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
