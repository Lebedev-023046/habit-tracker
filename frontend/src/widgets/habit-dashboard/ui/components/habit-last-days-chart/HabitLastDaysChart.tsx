import { Container } from '@/shared/ui/container';

import type { DayProgress } from '@/shared/model/habit-day.model';
import { Typography } from '@/shared/ui/typography';
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
      <Typography variant="captionMuted" className={styles.label}>
        {weekdayLetter}
      </Typography>
    </div>
  );
};

export function HabitLastDaysChart({ lastDaysProgress }: ChartProps) {
  return (
    <div className={styles.chart}>
      <Typography variant="cardTitle">Last 14 days</Typography>
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
