import { Typography } from '@/shared/ui/typography';
import styles from './HabitGroup.module.css';

interface HabitGroupProps extends React.PropsWithChildren {
  label: string;
}

export function HabitGroup({ label, children }: HabitGroupProps) {
  return (
    <div className={styles.group}>
      <Typography variant="subtitleMuted" className={styles.label}>
        {label}
      </Typography>
      <div className={styles.items}>{children}</div>
    </div>
  );
}
