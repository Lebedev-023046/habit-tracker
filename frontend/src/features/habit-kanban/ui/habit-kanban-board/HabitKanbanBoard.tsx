import { HABIT_KANBAN_COLUMNS, habitBoardService } from '@/entities/habit';

import { DragDropContext } from '@hello-pangea/dnd';

import { useGetHabits } from '@/entities/habit/model/query/habitBaseHooks';
import { toast } from '@/shared/lib/toast';
import { useBoard } from '../../model/useBoard';
import { HabitKanbanColumn } from '../habit-kanban-column';
import styles from './HabitKanbanBoard.module.css';

export function HabitKanbanBoard() {
  const { data: habitsInfo, isLoading } = useGetHabits();
  const isInitialLoading = isLoading && !habitsInfo;

  const habits = habitsInfo?.data ?? [];

  console.log({ habits });

  const { board, dragMeta, handleDragStart, handleDragEnd } = useBoard(habits, {
    onInvalidMove: () => toast.warning('Move not allowed'),
  });

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.kanban}>
        {HABIT_KANBAN_COLUMNS.map(column => {
          const isDropDisabled = habitBoardService.isDropDisabled(
            column.id,
            dragMeta,
          );

          return (
            <HabitKanbanColumn
              key={column.id}
              title={column.title}
              columnHabits={board ? board[column.id] : []}
              columnId={column.id}
              isLoading={isInitialLoading}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
