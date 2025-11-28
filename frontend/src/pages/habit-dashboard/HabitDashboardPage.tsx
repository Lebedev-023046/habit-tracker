import { HabitCharts } from './section/habit-charts';
import { HabitStatusBanner } from './section/habit-status-banner';
import { StatisticBricks } from './section/statistic-bricks/StatisticBricks';
import { SubHeader } from './section/sub-header';

export default function HabitDashboardPage() {
  return (
    <>
      <SubHeader />
      <HabitCharts />
      <StatisticBricks />
      <HabitStatusBanner status="active" />
    </>
  );
}
