import Skeleton from 'react-loading-skeleton';
import styles from './DailyCalendarProgress.module.css';

const DayStatuses = ['completed', 'missed', 'unmarked'] as const;
type DayStatus = (typeof DayStatuses)[number];

export interface DayProgress {
  weekday: string;
  status: DayStatus;
}

interface CommonProps {
  showWeekdayLabels?: boolean;
}

interface DailyCalendarProgressProps extends CommonProps {
  lastDaysProgress: DayProgress[];
  isLoading?: boolean;
  dayIndicatorSize?: string;
  dayIndicatorsGap?: string;
}

interface DayStatusProps extends CommonProps {
  day: DayProgress;
  isLoading?: boolean;
}

const DayStatus = ({
  day,
  isLoading,
  showWeekdayLabels = true,
}: DayStatusProps) => {
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

  const weekdayLetter = isLoading ? (
    <Skeleton width={14} height={16} />
  ) : (
    (weekday[0].toUpperCase() ?? 'N/A')
  );

  return (
    <div className={styles.day}>
      <div
        className={`${styles.indicator} ${statusClassName} ${isLoading && styles.neutral}`}
      ></div>
      {showWeekdayLabels && <p>{weekdayLetter}</p>}
    </div>
  );
};

/**
 *
 * @param showWeekdayLabels - показывать названия дней недели
 * @param dayIndicatorSize - размер индикатора
 * @param dayIndicatorsGap - расстояние между индикаторами
 * @returns JSX
 */
export function DailyCalendarProgress({
  lastDaysProgress,
  isLoading,
  showWeekdayLabels = true,
  dayIndicatorSize = '2rem',
  dayIndicatorsGap = '1rem',
}: DailyCalendarProgressProps) {
  //   const lastDaysProgress = useMemo(
  //   () => buildLast7DaysProgress(logs),
  //   [logs],
  // );

  return (
    <div
      className={styles.calendar}
      style={
        {
          '--indicator-size': dayIndicatorSize,
          '--indicator-gap': dayIndicatorsGap,
        } as React.CSSProperties
      }
    >
      {(lastDaysProgress ?? []).map((day, index) => (
        <DayStatus
          key={index}
          day={day}
          isLoading={isLoading}
          showWeekdayLabels={showWeekdayLabels}
        />
      ))}
    </div>
  );
}
