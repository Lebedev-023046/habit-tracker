import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import Skeleton from 'react-loading-skeleton';
import styles from './Overview.module.css';

export function OverviewLoading() {
  return (
    <Container className={styles.overview}>
      <h2 className={styles.title}>
        <Skeleton width={300} height={32} />
      </h2>
      <div className={styles.stats}>
        <div>
          <Skeleton width={360} height={24} />
        </div>
        <div>
          <Skeleton />
        </div>
      </div>
      <ProgressBar progress={0} />
      <span>
        <Skeleton width={360} />
      </span>
    </Container>
  );
}
