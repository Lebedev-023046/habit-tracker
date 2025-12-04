import type { HabitStatus, HabitTotalDays } from '@/entities/habit/model/types';
import { Subtitle } from '@/shared/ui/subtitle';
import { Droppable } from '@hello-pangea/dnd';
import { HabitKanbanCard } from '../habit-kanban-card/HabitKanbanCard';
import { HabitCardLoading } from '../habit-kanban-card/HabitKanbanCardLoading';
import styles from './HabitKanbanColumn.module.css';

const LoadingHabitCards = () =>
  Array(2)
    .fill(null)
    .map((_, i) => <HabitCardLoading key={i} />);

interface KanbanColumnHabitProps {
  id: string;
  title: string;
  status: HabitStatus;
  totalDays: HabitTotalDays;
  startDate?: Date | null;
}
interface HabitKanbanColumnProps {
  columnId: HabitStatus;
  title: string;
  columnHabits: KanbanColumnHabitProps[];
  isLoading: boolean;
  // id: string;
  // title: string;
  // status: HabitStatus;
  // columnHabits: Habit[];
  // isLoading: boolean;
  // totalDays: HabitTotalDays;
  // startDate: Date | undefined;
}

export function HabitKanbanColumn({
  title,
  columnHabits,
  columnId,
  isLoading,
}: HabitKanbanColumnProps) {
  return (
    <Droppable droppableId={columnId}>
      {provided => (
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>{title}</h3>
            <Subtitle className={styles.columnCount}>
              {columnHabits?.length ?? 0}
            </Subtitle>
          </div>
          <div
            className={styles.columnBody}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isLoading ? (
              <LoadingHabitCards />
            ) : (
              columnHabits.map((habit, index) => (
                <HabitKanbanCard
                  key={habit.id}
                  id={habit.id}
                  index={index}
                  title={habit.title}
                  status={habit.status}
                  totalDays={habit.totalDays}
                  // startDate={habit.startDate}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
