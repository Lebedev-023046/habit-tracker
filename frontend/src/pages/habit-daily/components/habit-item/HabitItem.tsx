import { Container } from '@/shared/ui/container';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import { HabitActions } from '../../sections/habit-actions';
import { DailyCalendarProgress } from '../daily-calendar-progress';
import styles from './HabitItem.module.css';

export function HabitItem() {
  const currentDay = 10;
  const totalDays = 45;
  const streak = 7;

  const persentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  return (
    <Container as="div" className={styles.habitItemWrapper}>
      <Diagram progress={12}>
        <Subtitle>
          Day {currentDay} of {totalDays}
        </Subtitle>
        <p className={styles.percentage}>{persentage}%</p>
        <Subtitle>Streak: {streak}</Subtitle>
      </Diagram>
      <HabitActions />
      <DailyCalendarProgress />
    </Container>
  );
}
