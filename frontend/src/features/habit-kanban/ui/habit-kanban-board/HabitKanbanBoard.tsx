import { useGetHabitsWithStale } from '@/entities/habit/model/RQ/habitBaseHooks';
import { DragDropContext } from '@hello-pangea/dnd';
import { HABIT_KANBAN_COLUMNS } from '../../model/columns';

import { useBoard } from '@/entities/habit/kanban';
import { HabitKanbanColumn } from '../habit-kanban-column';
import styles from './HabitKanbanBoard.module.css';

export function HabitKanbanBoard() {
  const { data: habitsInfo, isLoading } = useGetHabitsWithStale();

  const isInitialLoading = isLoading && !habitsInfo;

  if (habitsInfo?.error) {
    return <div>{habitsInfo?.error}</div>;
  }
  const habits = habitsInfo?.data ?? [];
  const { board, handleDragEnd } = useBoard(habits);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.kanban}>
        {HABIT_KANBAN_COLUMNS.map(column => {
          return (
            <HabitKanbanColumn
              key={column.id}
              title={column.title}
              columnHabits={board ? board[column.id] : []}
              columnId={column.id}
              isLoading={isInitialLoading}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
