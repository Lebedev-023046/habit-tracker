import { Container } from '@/shared/ui/container';
import { CreateHabitModalTrigger } from '@/widgets/habit/create-habit-modal/ui/create-habit-modal-trigger';
import styles from './SubHeader.module.css';

export function SubHeader() {
  return (
    <Container className={styles.sectionHeader}>
      <h3 className={styles.title}>Habit Management</h3>
      <div className={styles.controls}>
        <CreateHabitModalTrigger />
      </div>
    </Container>
  );
}
