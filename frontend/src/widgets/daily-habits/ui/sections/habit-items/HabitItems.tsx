import type { DailyHabitItem } from '@/entities/daily-habits/types';
import { EmptyItemsFallback } from '../../components/empty-items-fallback';
import { HabitItem } from '../../components/habit-item';
import styles from './HabitItems.module.css';

interface HabitItemsProps {
  activeHabits: DailyHabitItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

export function HabitItems({
  activeHabits,
  isLoading,
  isEmpty,
}: HabitItemsProps) {
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

  if (isEmpty) {
    return <EmptyItemsFallback />;
  }

  return (
    <section className={styles.habitCards}>
      {activeHabits.map(habit => (
        <HabitItem key={habit.id} isLoading={isLoading} habit={habit} />
      ))}
    </section>
  );
}
