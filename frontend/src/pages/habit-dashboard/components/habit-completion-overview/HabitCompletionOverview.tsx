import { Diagram } from '@/shared/ui/diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './HabitCompletionOverview.module.css';

interface DiadramProps {
  completedDays: number;
  missedDays: number;
  restDays: number;

  progress: number;
}

export function HabitCompletionOverview({
  completedDays,
  missedDays,
  restDays,
  progress,
}: DiadramProps) {
  return (
    <div className={styles.overview}>
      <h3>Completion Overview</h3>
      <div className={styles.content}>
        <Diagram
          progress={progress}
          className={styles.diagram}
          widthVar="30rem"
        >
          <h4 className={styles.percentage}>{progress}%</h4>
          <Subtitle>overall completion</Subtitle>
        </Diagram>
        <ul className={styles.legend}>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} completed`} />
            Completed days: {completedDays}
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} missed`} />
            Missed days: {missedDays}
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} ${styles.neutral}`} />
            Remaining days: {restDays}
          </li>
        </ul>
      </div>
    </div>
  );
}
