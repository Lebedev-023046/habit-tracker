import type { HabitStatus } from '@/entities/habit/model/types';
import { Subtitle } from '@/shared/ui/subtitle';
import { Droppable } from '@hello-pangea/dnd';
import { HabitKanbanCard } from '../habit-kanban-card/HabitKanbanCard';
import { HabitCardLoading } from '../habit-kanban-card/HabitKanbanCardLoading';

import type { HabitBoardViewModel } from '@/entities/habit/model/services/habitBoard.service';
import styles from './HabitKanbanColumn.module.css';

const LoadingHabitCards = () =>
  Array(2)
    .fill(null)
    .map((_, i) => <HabitCardLoading key={i} />);

interface HabitKanbanColumnProps {
  columnId: HabitStatus;
  title: string;
  columnHabits: HabitBoardViewModel[];
  isLoading: boolean;
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
              columnHabits.map(habit => (
                <HabitKanbanCard key={habit.id} {...habit} />
              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
