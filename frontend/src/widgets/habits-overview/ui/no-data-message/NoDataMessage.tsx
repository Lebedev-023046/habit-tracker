import type { HabitStatus } from '@/entities/habit';
import { Typography } from '@/shared/ui/typography';
import styles from './NoDataMessage.module.css';

export function NoDataMessage({ status }: { status: HabitStatus }) {
  return (
    <div className={styles.noItemsContent}>
      <Typography variant="sectionTitle">No habits here yet</Typography>
      <Typography variant="subtitleMuted">
        Move a habit to {status} to see it here
      </Typography>
    </div>
  );
}
