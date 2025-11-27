import { StatisticBricks } from './section/ctatistic-bricks/StatisticBricks';
import { HabitStatusBanner } from './section/habit-status-banner';
import { SubHeader } from './section/sub-header';

export default function HabitDashboardPage() {
  return (
    <>
      <SubHeader />
      <StatisticBricks />
      <HabitStatusBanner status="active" />
    </>
  );
}
