import styles from './DailyCalendarProgress.module.css';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const DayStatus = ({ isDone, day }: { isDone: boolean; day: string }) => {
  const isDoneClassName = isDone ? styles.done : styles.notDone;
  const dayLetter = day[0].toUpperCase();

  return (
    <div className={styles.calendarPoint}>
      <div className={`${styles.indicator} ${isDoneClassName}`}></div>
      <p>{dayLetter}</p>
    </div>
  );
};

export function DailyCalendarProgress() {
  return (
    <div className={styles.calendarPointsWrapper}>
      <div className={styles.calendarHeader}>
        <p>7-day actifity</p>
        <p>Best Steak: 12 days</p>
      </div>
      <div className={styles.calendarContent}>
        {/* {DAYS.map(day => renderDayStatus({ isDone: Math.random() > 0.5, day }))} */}
        {DAYS.map((day, index) => (
          <DayStatus key={index} isDone={Math.random() > 0.5} day={day} />
        ))}
      </div>
    </div>
  );
}
