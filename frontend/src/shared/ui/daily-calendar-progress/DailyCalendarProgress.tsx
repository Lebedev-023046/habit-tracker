import styles from './DailyCalendarProgress.module.css';

// TODO: когда появятся реальные данные нужно подумать где хранить этот интерфейс
interface DayProgress {
  weekday: string;
  isDone: boolean;
}

interface CommonProps {
  showWeekdayLabels?: boolean;
}

interface DailyCalendarProgressProps extends CommonProps {
  weekdays: DayProgress[];
  dayIndicatorSize?: string;
  dayIndicatorsGap?: string;
}

interface DayStatusProps extends CommonProps {
  day: DayProgress;
}

const DayStatus = ({ day, showWeekdayLabels = true }: DayStatusProps) => {
  const { weekday, isDone } = day;
  const isDoneClassName = isDone ? styles.done : styles.notDone;
  const weekdayLetter = weekday[0].toUpperCase() ?? 'N/A';

  return (
    <div className={styles.calendarDayProgress}>
      <div className={`${styles.indicator} ${isDoneClassName}`}></div>
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
  weekdays,
  showWeekdayLabels = true,
  dayIndicatorSize = '2rem',
  dayIndicatorsGap = '1rem',
}: DailyCalendarProgressProps) {
  return (
    <div
      className={styles.dailyCalendarProgressWrapper}
      style={
        {
          '--indicator-size': dayIndicatorSize,
          '--indicator-gap': dayIndicatorsGap,
        } as React.CSSProperties
      }
    >
      {weekdays.map((day, index) => (
        <DayStatus
          key={index}
          day={day}
          showWeekdayLabels={showWeekdayLabels}
        />
      ))}
    </div>
  );
}
