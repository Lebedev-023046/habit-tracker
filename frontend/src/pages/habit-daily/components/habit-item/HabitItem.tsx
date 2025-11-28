import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import { HabitActions } from '../habit-actions';
import styles from './HabitItem.module.css';

// TODO: replace it with real data

const weekdays = [
  {
    weekday: 'monday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'tuesday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'wednesday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'thursday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'friday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'saturday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'sunday',
    isDone: Math.random() > 0.5,
  },
];

export function HabitItem() {
  const currentDay = 10;
  const totalDays = 45;
  const streak = 7;

  const percentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  return (
    <Container as="div" className={styles.habitCard}>
      <Diagram progress={12} className={styles.progressDiagram}>
        <Subtitle>
          Day {currentDay} of {totalDays}
        </Subtitle>
        <p className={styles.percentage}>{percentage}%</p>
        <Subtitle>Streak: {streak}</Subtitle>
      </Diagram>
      <HabitActions />
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <p>7-day activity</p>
          <p>Best Streak: 12 days</p>
        </div>
        <DailyCalendarProgress weekdays={weekdays} />
      </div>
    </Container>
  );
}
