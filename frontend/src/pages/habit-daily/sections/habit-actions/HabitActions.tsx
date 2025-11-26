import styles from './HabitActions.module.css';

export function HabitActions() {
  return (
    <div className={styles.habitActionsWrapper}>
      <h3 className={styles.title}>Morning Run</h3>
      <p className={styles.subtitle}>
        You marked this as done. Keep the streak alive tomorrow.
      </p>
      <div className={styles.controls}>
        <button disabled className={`${styles.button} ${styles.primary}`}>
          Completed today
        </button>
        <button className={`${styles.button} ${styles.ghost}`}>Undo</button>
      </div>
    </div>
  );
}
