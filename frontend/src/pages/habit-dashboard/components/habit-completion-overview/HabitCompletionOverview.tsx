import { Diagram } from '@/shared/ui/diagram';
import { Typography } from '@/shared/ui/typography';
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
      <Typography variant="cardTitle">Completion Overview</Typography>
      <div className={styles.content}>
        <Diagram
          progress={progress}
          className={styles.diagram}
          widthVar="30rem"
        >
          <Typography variant="sectionTitle">{progress}%</Typography>
          <Typography variant="subtitleMuted">overall completion</Typography>
        </Diagram>
        <ul className={styles.legend}>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} ${styles.completed}`} />
            <Typography variant="subtitle">
              Completed days: {completedDays}
            </Typography>
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} ${styles.missed}`} />
            <Typography variant="subtitle">
              Missed days: {missedDays}
            </Typography>
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendIndicator} ${styles.neutral}`} />
            <Typography variant="subtitle">Rest days: {restDays}</Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}
