import type { Habit } from '@/entities/habit/model/types';
import { HabitItem } from '../../components/habit-item';
import styles from './HabitItems.module.css';

interface HabitItemsProps {
  activeHabits: Habit[];
  isLoading: boolean;
}
export function HabitItems({ activeHabits, isLoading }: HabitItemsProps) {
  if (isLoading) {
    const skeletons = Array.from({ length: 3 });

    return (
      <section className={styles.habitCards}>
        {skeletons.map((_, index) => (
          <HabitItem key={index} isLoading={true} title="" />
        ))}
      </section>
    );
  }

  return (
    <section className={styles.habitCards}>
      {activeHabits.map(item => (
        <HabitItem key={item.id} title={item.title} isLoading={isLoading} />
      ))}
    </section>
  );
}
