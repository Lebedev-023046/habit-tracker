import type { HabitStatus } from '@/entities/habit';
import styles from './Chip.module.css';

interface ChipProps {
  status: HabitStatus;
  children: React.ReactNode;
}

const statusToClassMap = {
  active: styles.active,
  paused: styles.paused,
  planned: styles.planned,
  built: styles.built,
  cancelled: styles.cancelled,
};

export function Chip({ children, status }: ChipProps) {
  const statusClassName = statusToClassMap[status];

  return <div className={`${styles.chip} ${statusClassName}`}>{children}</div>;
}
