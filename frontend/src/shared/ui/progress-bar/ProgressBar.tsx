import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  completedBarWidth: string;
  barHeight?: string;
}

export function ProgressBar({
  barHeight = '6px',
  completedBarWidth,
}: ProgressBarProps) {
  return (
    <div className={styles.progressBarWrapper}>
      <div
        style={{ '--barHeight': barHeight } as React.CSSProperties}
        className={styles.progressBar}
      >
        <div
          className={styles.progressBarCompleted}
          style={{ width: completedBarWidth }}
        />
      </div>
    </div>
  );
}
