import { Container } from '@/shared/ui/container';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './SubHeader.module.css';

export function SubHeader() {
  const steak = 14;
  const restDays = 31;

  return (
    <Container className={styles.subHeaderWrapper}>
      <h2>Habit Title</h2>
      <div className={styles.subHeaderInfo}>
        <Subtitle>{steak}-day steak</Subtitle>
        <Subtitle>{restDays} days left</Subtitle>
      </div>
    </Container>
  );
}
