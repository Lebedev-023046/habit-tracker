import { Button } from '@/shared/ui/button';
import styles from './HabitActions.module.css';

export function HabitActions() {
  return (
    <div className={styles.habitActionsWrapper}>
      <h3 className={styles.title}>Morning Run</h3>
      <p className={styles.subtitle}>
        You marked this as done. Keep the streak alive tomorrow.
      </p>
      <div className={styles.controls}>
        <Button disabled variant="primary">
          Completed today
        </Button>
        <Button variant="ghost">Undo</Button>
      </div>
    </div>
  );
}
