import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Typography } from '@/shared/ui/typography';
import styles from './Overview.module.css';

interface OverviewProps {
  totalCount: number;
  completedCount: number;
}

export function Overview({ totalCount, completedCount }: OverviewProps) {
  const hasHabits = totalCount > 0;
  // const isAllCompleted = hasHabits && completedCount === totalCount;
  const remainingCount = Math.max(totalCount - completedCount, 0);

  const barProgress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const message = !hasHabits
    ? 'No habits scheduled for today'
    : remainingCount > 0
      ? `Keep going! ${remainingCount} habit${
          remainingCount > 1 ? 's' : ''
        } left for today`
      : 'Great! You completed all your habits today!';

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
        {message}
      </Typography>
    </Container>
  );
}
