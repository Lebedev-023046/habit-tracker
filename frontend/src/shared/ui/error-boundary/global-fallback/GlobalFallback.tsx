import { ROUTES } from '@/shared/config/routes';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../button';
import { Typography } from '../../typography';
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.fallback}>
        <div className={styles.image}>
          <img src={ErrorBoundaryPic} alt="error-img" />
        </div>

        <Typography variant="display">We can't reach your data</Typography>
        <Typography variant="subtitleMuted" className={styles.subtitle}>
          Your progress is safe, but we're having trouble refreshing your latest
          updates. This is usually fixed by a quick retry
        </Typography>
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
