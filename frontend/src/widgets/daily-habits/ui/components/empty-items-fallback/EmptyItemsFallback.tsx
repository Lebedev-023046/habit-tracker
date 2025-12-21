import { CreateHabitModalTrigger } from '@/features/habit/create';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { CiCircleList } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import styles from './EmptyItemsFallback.module.css';

export function EmptyItemsFallback() {
  return (
    <div className={styles.fallback}>
      <Typography variant="sectionTitle">
        There are no active habits today
      </Typography>
      <Typography variant="subtitleMuted">
        You don’t have any active habits yet. Create a new habit or choose one
        from the list to get started.
      </Typography>
      <div className={styles.actions}>
        <CreateHabitModalTrigger variant="primary" label="Create habit" />
        <Button variant="ghost">
          <Link className={styles.link} to={ROUTES.habitsOverview()}>
            <CiCircleList size={20} /> Choose from list
          </Link>
        </Button>
      </div>
    </div>
  );
}
