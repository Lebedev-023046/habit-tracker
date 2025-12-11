import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import Skeleton from 'react-loading-skeleton';
import styles from './Overview.module.css';

export function OverviewLoading() {
  return (
    <Container className={styles.overview}>
      <h2 className={styles.title}>
        <Skeleton width={300} height={32} />
      </h2>
      <div className={styles.stats}>
        <Subtitle>
          <Skeleton width={360} height={24} />
        </Subtitle>
        <Subtitle>
          <Skeleton />
        </Subtitle>
      </div>
      <ProgressBar progress={0} />
      <span>
        <Skeleton width={360} />
      </span>
    </Container>
  );
}
