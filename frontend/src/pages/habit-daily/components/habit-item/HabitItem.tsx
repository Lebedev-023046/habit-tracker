import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import Skeleton from 'react-loading-skeleton';
import { HabitActions } from '../habit-actions';
import styles from './HabitItem.module.css';

// TODO: replace it with real data

const statuses = ['completed', 'missed', 'unmarked'] as const;

const weekdays = [
  {
    weekday: 'monday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'tuesday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'wednesday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'thursday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'friday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'saturday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    weekday: 'sunday',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
];

console.log({ weekdays });

interface HabitItemProps {
  title: string;
  isLoading: boolean;
}

export function HabitItem({ title = 'Not found', isLoading }: HabitItemProps) {
  const currentDay = 10;
  const totalDays = 45;
  const streak = 7;

  const percentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  return (
    <Container as="div" className={styles.habitCard}>
      <Diagram progress={12} className={styles.progressDiagram}>
        <Subtitle>
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Day ${currentDay} of ${totalDays}`
          )}
        </Subtitle>
        <p className={styles.percentage}>
          {isLoading ? <Skeleton width={75} height={24} /> : `${percentage}%`}
        </p>
        <Subtitle>
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Streak: ${streak}`
          )}
        </Subtitle>
      </Diagram>
      <HabitActions habitName={title} />
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <p>
            {isLoading ? (
              <Skeleton width={100} height={16} />
            ) : (
              '7-day activity'
            )}
          </p>
          <p>
            {isLoading ? (
              <Skeleton width={130} height={16} />
            ) : (
              'Best Streak: 12 days'
            )}
          </p>
        </div>
        <DailyCalendarProgress weekdays={weekdays} />
      </div>
    </Container>
  );
}
