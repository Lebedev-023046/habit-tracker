import styles from './RingLoader.module.css';

interface RingLoaderProps {
  size?: string;
}

export function RingLoader({ size }: RingLoaderProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.ring}
        style={
          {
            '--size': size,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
