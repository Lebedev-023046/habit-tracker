import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Typography } from '@/shared/ui/typography';
import styles from './Overview.module.css';

interface OverviewProps {
  totalCount: number;
  completedCount: number;
}

export function Overview({ totalCount, completedCount }: OverviewProps) {
  const restCount = totalCount - completedCount;

  const barProgress = (completedCount / totalCount) * 100;

  // TODO: create chip component
  return (
    <Container className={styles.overview}>
      <Typography variant="pageTitle">Today's habits</Typography>
      <div className={styles.stats}>
        <Typography variant="subtitleMuted">
          Stay consistent small wins add up.
        </Typography>
        <Typography variant="subtitleMuted">
          {completedCount} / {totalCount} completed
        </Typography>
      </div>
      <ProgressBar progress={barProgress} />

      <Typography variant="body" className={styles.message}>
        {restCount > 0
          ? `Nice start! Complete ${restCount} more to close your rings!`
          : 'Great! You completed all your habits today!'}
      </Typography>
    </Container>
  );
}
