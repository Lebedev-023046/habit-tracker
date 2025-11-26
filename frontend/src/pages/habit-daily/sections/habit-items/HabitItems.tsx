import { HabitItem } from '../../components/habit-item';
import styles from './HabitItems.module.css';

const ITEMS = [1, 2, 3];

export function HabitItems() {
  return (
    <section className={styles.HabitItemsWrapper}>
      {ITEMS.map(item => (
        <HabitItem key={item} />
      ))}
    </section>
  );
}
