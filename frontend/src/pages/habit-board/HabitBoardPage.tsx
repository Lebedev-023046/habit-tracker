import { HabitKanbanBoard } from '@/features/habit-kanban';
import { CreateHabitModalTrigger } from '@/features/habit/create';
import { Container } from '@/shared/ui/container';
import styles from './HabitBoardPage.module.css';

export default function HabitBoardPage() {
  return (
    <>
      <Container className={styles.sectionHeader}>
        <h3 className={styles.title}>Habit Management</h3>
        <div className={styles.controls}>
          <CreateHabitModalTrigger />
        </div>
      </Container>
      <HabitKanbanBoard />
    </>
  );
}
