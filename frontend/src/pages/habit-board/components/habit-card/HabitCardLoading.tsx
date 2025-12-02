import { Button } from '@/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import styles from './HabitCard.module.css';

export function HabitCardLoading() {
  return (
    <div className={styles.habitCard}>
      <h3>
        <Skeleton width="60%" />
      </h3>

      <div className={styles.skeletonDays}>
        <Skeleton width="2rem" /> / <Skeleton width="2rem" /> days
      </div>

      <div className={styles.skeletonWeekDays}>
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} circle width="1.3rem" height="1.3rem" />
          ))}
      </div>

      <div className={styles.controls}>
        <Button disabled variant="basic">
          Dashboard
        </Button>
        <Button disabled variant="icon">
          <HiOutlineDotsHorizontal size="2.5rem" />
        </Button>
      </div>
    </div>
  );
}
