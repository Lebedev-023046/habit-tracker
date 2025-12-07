import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './Overview.module.css';

interface OverviewProps {
  totalCount: number;
  completedCount: number;
}

export function Overview({ totalCount, completedCount }: OverviewProps) {
  const restCount = totalCount - completedCount;

  const barProgress = (completedCount / totalCount) * 100;

  return (
    <Container className={styles.overview}>
      <h2 className={styles.title}>Today's habits</h2>
      <div className={styles.stats}>
        <Subtitle>Stay consistent small wins add up.</Subtitle>
        <Subtitle>
          {completedCount} / {totalCount} completed
        </Subtitle>
      </div>
      <ProgressBar progress={barProgress} />
      <span className={styles.message}>
        Nice start! Complete {restCount} more to close your rings!
      </span>
    </Container>
  );
}
