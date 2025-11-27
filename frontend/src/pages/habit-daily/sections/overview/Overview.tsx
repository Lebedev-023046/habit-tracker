import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './Overview.module.css';

export function Overview() {
  const totalCount = 3;
  const completedCount = 1;
  const restCount = totalCount - completedCount;

  const progressBarWidth = `${(completedCount / totalCount) * 100}%`;

  return (
    <Container className={styles.overviewWrapper}>
      <h2 className={styles.title}>Today's habits</h2>
      <div className={styles.completedInfo}>
        <Subtitle>Stay consistent small wins add up.</Subtitle>
        <Subtitle>
          {completedCount} / {totalCount} completed
        </Subtitle>
      </div>
      <ProgressBar completedBarWidth={progressBarWidth} />
      <span className={styles.span}>
        Nice start! Complete {restCount} more to close your rings!
      </span>
    </Container>
  );
}
