import { ROUTES } from '@/shared/config/routes';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../button';
import { Subtitle } from '../../subtitle';
import styles from './GlobalFallback.module.css';
import ErrorBoundaryPic from '/error-boundary-pic.webp';

interface GlobalFallbackProps {
  error: Error | null;
}

export function GlobalFallback({ error }: GlobalFallbackProps) {
  const navigate = useNavigate();

  const errorText =
    error?.message.replace(/Error:/, '').trim() ?? 'Unknown Error';

  const handleRetry = () => navigate(0);

  console.log({ error });

  return (
    <div className={styles.wrapper}>
      <div className={styles.fallback}>
        <div className={styles.image}>
          <img src={ErrorBoundaryPic} alt="error-img" />
        </div>

        <h2 className={styles.title}>We can't reach your data</h2>
        <Subtitle className={styles.subtitle}>
          Your progress is safe, but we're having trouble refreshing your latest
          updates. This is usually fixed by a quick retry
        </Subtitle>
        <p className={styles.error}>Error message: {errorText}</p>
        <div className={styles.controls}>
          <Button className={styles.retry} onClick={handleRetry}>
            Retry
          </Button>
          <Button variant="outlined">
            <Link to={ROUTES.habitDaily()}> Back to Daily view</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
