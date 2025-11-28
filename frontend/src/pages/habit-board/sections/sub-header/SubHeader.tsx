import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { GoPlus } from 'react-icons/go';
import styles from './SubHeader.module.css';

export function SubHeader() {
  return (
    <Container className={styles.sectionHeader}>
      <h3 className={styles.title}>Habit Management</h3>
      <div className={styles.controls}>
        <Button>
          <GoPlus size="2.5rem" />
          Add Habit
        </Button>
      </div>
    </Container>
  );
}
