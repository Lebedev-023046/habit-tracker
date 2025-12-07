import { Button } from '@/shared/ui/button';
import { Subtitle } from '@/shared/ui/subtitle';
import Skeleton from 'react-loading-skeleton';
import styles from './HabitActions.module.css';

interface HabitActionsProps {
  habitName: string;
  isLoading?: boolean;
}

export function HabitActions({ habitName, isLoading }: HabitActionsProps) {
  return (
    <div className={styles.habitActions}>
      <h3 className={styles.title}>
        {isLoading ? <Skeleton width={100} height={24} /> : `${habitName}`}
      </h3>
      <Subtitle>
        {isLoading ? (
          <Skeleton width={360} height={16} />
        ) : (
          'You marked this as done. Keep the streak alive tomorrow.'
        )}
      </Subtitle>
      <div className={styles.controls}>
        {isLoading ? (
          <Skeleton width={150} height={32} borderRadius="var(--rounded-md)" />
        ) : (
          <Button disabled variant="primary">
            Completed today
          </Button>
        )}
        {isLoading ? (
          <Skeleton width={100} height={32} borderRadius="var(--rounded-md)" />
        ) : (
          <Button variant="ghost">Undo</Button>
        )}
      </div>
    </div>
  );
}
