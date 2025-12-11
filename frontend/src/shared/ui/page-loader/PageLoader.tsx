import styles from './PageLoader.module.css';

interface PageLoaderProps {
  label?: string;
}

export function PageLoader({
  label = 'Loading your habits…',
}: PageLoaderProps) {
  return (
    <div className={styles.root} aria-busy="true" aria-label={label}>
      <div className={styles.dots}>
        {Array.from({ length: 7 }).map((_, index) => (
          <span
            key={index}
            className={styles.dot}
            style={{ animationDelay: `${index * 0.12}s` }}
          />
        ))}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
