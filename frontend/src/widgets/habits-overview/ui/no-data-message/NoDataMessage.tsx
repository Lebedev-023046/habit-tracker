import type { HabitStatus } from '@/entities/habit';
import { Typography } from '@/shared/ui/typography';
import styles from './NoDataMessage.module.css';

export function NoDataMessage({ status }: { status: HabitStatus | 'all' }) {
  const isAllHabitsTab = status === 'all';

  const subtitle = isAllHabitsTab
    ? 'Create a habit and start building consistency day by day.'
    : `Move a habit to ${status} to see it here`;

  return (
    <div className={styles.noItemsContent}>
      <Typography variant="sectionTitle">No habits here yet</Typography>
      <Typography variant="subtitleMuted">{subtitle}</Typography>
    </div>
  );
}
