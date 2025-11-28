import { Container } from '@/shared/ui/container';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './HabitLastDaysChart.module.css';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const DAY_STATUSES = WEEKDAYS.map(day => ({
  day: day[0].toUpperCase(),
  isDone: Math.random() > 0.5,
}));

export function HabitLastDaysChart() {
  return (
    <div className={styles.chart}>
      <h3>Last 14 days</h3>
      <div className={styles.content}>
        <Container as="div">
          <div className={styles.bars}>
            {DAY_STATUSES.map((dayStatus, index) => {
              const bgColorClassName = dayStatus.isDone
                ? 'completed'
                : 'missed';
              return (
                <div className={styles.bar} key={index}>
                  <div
                    className={`${styles.indicator} ${bgColorClassName}`}
                  ></div>
                  <Subtitle className={styles.label}>{dayStatus.day}</Subtitle>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}
