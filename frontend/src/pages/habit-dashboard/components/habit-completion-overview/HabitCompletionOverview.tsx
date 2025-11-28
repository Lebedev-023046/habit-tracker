import { Diagram } from '@/shared/ui/diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './HabitCompletionOverview.module.css';

export function HabitCompletionOverview() {
  const completedDays = 31;
  const missedDays = 7;
  const remainingDays = 31;

  return (
    <div className={styles.overview}>
      <h3>Completion Overview</h3>
      <div className={styles.content}>
        <Diagram progress={69} className={styles.diagram} widthVar="30rem">
          <h4 className={styles.percentage}>69%</h4>
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
            Remaining days: {remainingDays}
          </li>
        </ul>
      </div>
    </div>
  );
}
