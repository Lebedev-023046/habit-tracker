import { HabitCompletionOverview } from '../../components/habit-completion-overview';
import { HabitLastDaysChart } from '../../components/habit-last-days-chart';
import styles from './HabitCharts.module.css';

export function HabitCharts() {
  return (
    <div className={styles.habitChartsWrapper}>
      <HabitCompletionOverview />
      <HabitLastDaysChart />
    </div>
  );
}
