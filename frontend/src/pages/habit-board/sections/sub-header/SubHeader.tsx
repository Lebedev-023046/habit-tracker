import { Container } from '@/shared/ui/container';
import { GoPlus } from 'react-icons/go';
import styles from './SubHeader.module.css';

export function SubHeader() {
  return (
    <Container className={styles.subHeaderWrapper}>
      <h3 className={styles.title}>Habit Management</h3>
      <div className={styles.controls}>
        <button className={`${styles.addButton}`}>
          <GoPlus /> Add Habit
        </button>
      </div>
    </Container>
  );
}
