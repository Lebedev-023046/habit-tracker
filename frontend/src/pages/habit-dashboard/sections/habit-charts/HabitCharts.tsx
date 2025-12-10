import type { DayProgress } from '@/shared/model/habit-day.model';
import { HabitCompletionOverview } from '../../components/habit-completion-overview';
import { HabitLastDaysChart } from '../../components/habit-last-days-chart';
import styles from './HabitCharts.module.css';

interface HabitChartsProps {
  completedDays: number;
  missedDays: number;
  restDays: number;

  progress: number;
  lastDaysProgress: DayProgress[];
}

export function HabitCharts({
  completedDays,
  missedDays,
  restDays,
  progress,
  lastDaysProgress,
}: HabitChartsProps) {
  return (
    <div className={styles.charts}>
      <HabitCompletionOverview
        completedDays={completedDays}
        missedDays={missedDays}
        restDays={restDays}
        progress={progress}
      />
      <HabitLastDaysChart lastDaysProgress={lastDaysProgress} />
    </div>
  );
}
