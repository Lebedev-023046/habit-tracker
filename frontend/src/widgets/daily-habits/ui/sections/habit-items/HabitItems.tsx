import type { DailyHabitItem } from '@/entities/daily-habits/types';
import { SectionState } from '@/shared/ui/section-state';
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
  return (
    <SectionState isLoading={isLoading}>
      {isEmpty ? (
        <EmptyItemsFallback />
      ) : (
        <section className={styles.habitCards}>
          {activeHabits.map(habit => (
            <HabitItem key={habit.id} isLoading={isLoading} habit={habit} />
          ))}
        </section>
      )}
    </SectionState>
  );
}
