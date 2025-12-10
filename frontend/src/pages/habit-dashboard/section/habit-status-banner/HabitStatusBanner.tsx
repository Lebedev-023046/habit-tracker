import type { HabitStatus } from '@/entities/habit/model/types';
import type { DateType } from '@/shared/types';
import { Container } from '@/shared/ui/container';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import styles from './HabitStatusBanner.module.css';
import { getBannerColorClass } from './helpers/getBannerColorClass';
import { getBannerContent } from './helpers/getBannerContent';

interface HabitStatusBannerProps {
  status: HabitStatus;
  plannedEndDate: DateType;
}

export function HabitStatusBanner({
  status,
  plannedEndDate,
}: HabitStatusBannerProps) {
  const colorClass = getBannerColorClass(status);
  const { title, subtitle } = getBannerContent(status);

  const formattedDate = new Date(plannedEndDate as string).toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
    },
  );

  return (
    <Container className={`${styles.banner} ${colorClass}`}>
      <div className={styles.icon}>
        <FaFontAwesomeFlag color="var(--bg-accent)" size="2rem" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p>{subtitle(formattedDate)}</p>
      </div>
    </Container>
  );
}
