import styles from './Loading.module.css';

export function LoadingFallback() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeleton} />
    </div>
  );
}
