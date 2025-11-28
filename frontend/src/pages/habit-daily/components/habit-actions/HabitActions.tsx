import { Button } from '@/shared/ui/button';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './HabitActions.module.css';

export function HabitActions() {
  return (
    <div className={styles.habitActions}>
      <h3 className={styles.title}>Morning Run</h3>
      <Subtitle>
        You marked this as done. Keep the streak alive tomorrow.
      </Subtitle>
      <div className={styles.controls}>
        <Button disabled variant="primary">
          Completed today
        </Button>
        <Button variant="ghost">Undo</Button>
      </div>
    </div>
  );
}
