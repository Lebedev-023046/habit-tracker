import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  barHeight?: string;
}

export function ProgressBar({ barHeight = '6px', progress }: ProgressBarProps) {
  return (
    <div
      className={styles.bar}
      style={{ '--bar-height': barHeight } as React.CSSProperties}
    >
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
