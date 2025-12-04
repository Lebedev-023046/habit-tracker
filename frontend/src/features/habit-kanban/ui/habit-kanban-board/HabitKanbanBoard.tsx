import { useGetHabits } from '@/entities/habit/model/RQ/habitBaseHooks';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useCallback, useState } from 'react';
import { HABIT_KANBAN_COLUMNS } from '../../model/columns';
import { initialBoard } from '../../model/constants';
import { applyDragResult } from '../../model/dnd-helpers';
import type { HabitKanbanBoardState } from '../../model/types';
import { HabitKanbanColumn } from '../habit-kanban-column';
import styles from './HabitKanbanBoard.module.css';

export function HabitKanbanBoard() {
  const [board, setBoard] = useState<HabitKanbanBoardState>(initialBoard);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setBoard(prevBoard => applyDragResult(prevBoard, result));
    },
    [setBoard],
  );

  const { data: habitsInfo, isLoading } = useGetHabits();
  console.log({ habitsInfo });

  // if (habitsInfo?.error) {
  //   return <div>{habitsInfo?.error}</div>;
  // }

  // const habits = habitsInfo?.data ?? [];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.kanban}>
        {HABIT_KANBAN_COLUMNS.map(column => {
          // const columnHabits = board.filter(habit => habit.status === column.id);
          return (
            <HabitKanbanColumn
              key={column.id}
              title={column.title}
              columnHabits={board[column.id]}
              columnId={column.id}
              isLoading={false}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
