import { Subtitle } from '@/shared/ui/subtitle';
import { HabitCard } from '../../components/habit-card';
import styles from './HabitKanbanBoard.module.css';

const COLUMNS = ['Planned', 'Active', 'Paused', 'Built', 'Cancelled'];

export function HabitKanbanBoard() {
  return (
    <div className={styles.kanban}>
      {COLUMNS.map(column => (
        <div key={column} className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>{column}</h3>
            <Subtitle className={styles.columnCount}>0</Subtitle>
          </div>
          <div className={styles.columnBody}>
            <HabitCard />
            {/* <HabitCard />
            <HabitCard />
            <HabitCard /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
