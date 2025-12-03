import { useGetHabits } from '@/entities/habit/model/habitBaseHooks';
import { HabitCard } from '@/features/habit-kanban/ui/habit-kanban-card';
import { HabitCardLoading } from '@/features/habit-kanban/ui/habit-kanban-card/HabitKanbanCardLoading';
import { Subtitle } from '@/shared/ui/subtitle';
import { KANBAN_COLUMNS } from '../../model/columns';
import styles from './HabitKanbanBoard.module.css';

const LoadingHabitCards = () =>
  Array(2)
    .fill(null)
    .map((_, i) => <HabitCardLoading key={i} />);

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
              {isLoading ? (
                <LoadingHabitCards />
              ) : (
                columnHabits.map((habit, index) => (
                  <HabitCard
                    index={index}
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    status={habit.status}
                    totalDays={habit.totalDays}
                    startDate={habit.startDate}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
