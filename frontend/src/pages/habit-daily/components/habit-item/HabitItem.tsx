import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import { HabitActions } from '../../sections/habit-actions';
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

  const persentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  return (
    <Container as="div" className={styles.habitItemWrapper}>
      <Diagram progress={12} className={styles.diagramOuter}>
        <Subtitle>
          Day {currentDay} of {totalDays}
        </Subtitle>
        <p className={styles.percentage}>{persentage}%</p>
        <Subtitle>Streak: {streak}</Subtitle>
      </Diagram>
      <HabitActions />
      <div className={styles.calendarPointsWrapper}>
        <div className={styles.calendarHeader}>
          <p>7-day actifity</p>
          <p>Best Steak: 12 days</p>
        </div>
        <DailyCalendarProgress weekdays={weekdays} />
      </div>
    </Container>
  );
}
