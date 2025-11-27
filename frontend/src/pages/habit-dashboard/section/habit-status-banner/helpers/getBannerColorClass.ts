import type { HabitStatus } from '@/entities/habit/model/types';
import styles from '../HabitStatusBanner.module.css';

const classNameMap = {
  planned: styles.planned,
  active: styles.active,
  paused: styles.paused,
  cancelled: styles.cancelled,
  built: styles.built,
};

export const getBannerColorClass = (status: HabitStatus) =>
  classNameMap[status];
