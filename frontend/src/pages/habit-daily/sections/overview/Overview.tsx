import styles from './Overview.module.css';

export function Overview() {
  const totalCount = 3;
  const completedCount = 1;
  const restCount = totalCount - completedCount;

  const progressBarWidth = `${(completedCount / totalCount) * 100}%`;

  return (
    <section className={styles.overviewWrapper}>
      <h3 className={styles.title}>Today's habits</h3>
      <div className={styles.completedInfo}>
        <p className={styles.subtitle}>Stay consistent small wins add up.</p>
        <p className={styles.subtitle}>
          {completedCount} / {totalCount} completed
        </p>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressBarCompleted}
            style={{ width: progressBarWidth }}
          />
        </div>
      </div>
      <span className={styles.span}>
        Nice start! Complete {restCount} more to close your rings!
      </span>
    </section>
  );
}
