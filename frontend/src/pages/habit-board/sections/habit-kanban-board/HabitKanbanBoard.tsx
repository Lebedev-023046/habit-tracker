import { useGetHabits } from '@/entities/habit/model/habitBaseHooks';
import type { HabitStatus } from '@/entities/habit/model/types';
import { Subtitle } from '@/shared/ui/subtitle';
import { HabitCard } from '../../components/habit-card';
import { HabitCardLoading } from '../../components/habit-card/HabitCardLoading';
import styles from './HabitKanbanBoard.module.css';

const KANBAN_COLUMNS = [
  { status: 'planned', title: 'Planned' },
  { status: 'active', title: 'Active' },
  { status: 'paused', title: 'Paused' },
  { status: 'built', title: 'Built' },
  { status: 'cancelled', title: 'Cancelled' },
] satisfies { status: HabitStatus; title: string }[];

export function HabitKanbanBoard() {
  const { data: habitsInfo, isLoading } = useGetHabits();

  if (habitsInfo?.error) {
    return <div>{habitsInfo?.error}</div>;
  }

  const habits = habitsInfo?.data ?? [];

  return (
    <div className={styles.kanban}>
      {KANBAN_COLUMNS.map(column => {
        const columnHabits = habits.filter(
          habit => habit.status === column.status,
        );
        return (
          <div key={column.status} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <Subtitle className={styles.columnCount}>
                {columnHabits?.length ?? 0}
              </Subtitle>
            </div>
            <div className={styles.columnBody}>
              {isLoading
                ? Array(2)
                    .fill(null)
                    .map((_, i) => <HabitCardLoading key={i} />)
                : columnHabits.map(habit => (
                    <HabitCard
                      key={habit.id}
                      title={habit.title}
                      totalDays={habit.totalDays}
                    />
                  ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
