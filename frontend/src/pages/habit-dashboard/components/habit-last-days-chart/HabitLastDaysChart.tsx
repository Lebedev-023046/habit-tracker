import { Container } from '@/shared/ui/container';
import type { DayProgress } from '@/shared/ui/daily-calendar-progress/DailyCalendarProgress';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './HabitLastDaysChart.module.css';

interface ChartProps {
  lastDaysProgress: DayProgress[];
}

const DayBar = ({ day }: { day: DayProgress }) => {
  const { weekday, status } = day;

  const statusClassName = (() => {
    switch (status) {
      case 'completed':
        return styles.completed;
      case 'missed':
        return styles.missed;
      case 'unmarked':
      default:
        return styles.unmarked;
    }
  })();

  const weekdayLetter = weekday[0].toUpperCase() ?? 'N/A';

  return (
    <div className={styles.bar}>
      <div className={`${styles.indicator} ${statusClassName}`}></div>
      <Subtitle className={styles.label}>{weekdayLetter}</Subtitle>
    </div>
  );
};

export function HabitLastDaysChart({ lastDaysProgress }: ChartProps) {
  return (
    <div className={styles.chart}>
      <h3>Last 14 days</h3>
      <div className={styles.content}>
        <Container as="div">
          <div className={styles.bars}>
            {lastDaysProgress.map((day, index) => (
              <DayBar key={index} day={day} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
