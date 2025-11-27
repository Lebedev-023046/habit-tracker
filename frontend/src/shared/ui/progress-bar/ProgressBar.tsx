import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  barHeight?: string;
}

export function ProgressBar({ barHeight = '6px', progress }: ProgressBarProps) {
  return (
    <div
      className={styles.progressBarWrapper}
      style={{ '--bar-height': barHeight } as React.CSSProperties}
    >
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarCompleted}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
