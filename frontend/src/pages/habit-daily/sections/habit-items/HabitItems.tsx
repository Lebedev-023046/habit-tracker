import type { DailyHabitViewModel } from '@/entities/habit';
import { HabitItem } from '../../components/habit-item';
import styles from './HabitItems.module.css';

interface HabitItemsProps {
  activeHabits: DailyHabitViewModel[];
  isLoading?: boolean;
}
export function HabitItems({ activeHabits, isLoading }: HabitItemsProps) {
  if (isLoading) {
    const skeletons = Array.from({ length: 3 });

    return (
      <section className={styles.habitCards}>
        {skeletons.map((_, index) => (
          <HabitItem key={index} isLoading />
        ))}
      </section>
    );
  }

  return (
    <section className={styles.habitCards}>
      {activeHabits.map(habit => (
        <HabitItem key={habit.id} isLoading={isLoading} habit={habit} />
      ))}
    </section>
  );
}
