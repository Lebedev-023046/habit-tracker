import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Section } from '@/shared/ui/section';
import { HabitActions } from '../../sections/habit-actions';
import { DailyCalendarProgress } from '../daily-calendar-progress';
import styles from './HabitItem.module.css';

export function HabitItem() {
  const currentDay = 10;
  const totalDays = 45;
  const streak = 7;

  const persentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  return (
    <Section as="div" className={styles.habitItemWrapper}>
      <Diagram progress={12}>
        <p className={styles.subtitle}>
          Day {currentDay} of {totalDays}
        </p>
        <p className={styles.percentage}>{persentage}%</p>
        <p className={styles.subtitle}>Streak: {streak}</p>
      </Diagram>
      <HabitActions />
      <DailyCalendarProgress />
    </Section>
  );
}
