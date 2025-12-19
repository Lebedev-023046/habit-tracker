import type { HabitStatus } from '@/entities/habit';
import type { DateValue } from '@/shared/types';
import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import styles from './HabitStatusBanner.module.css';
import { getBannerColorClass } from './helpers/getBannerColorClass';
import { getBannerContent } from './helpers/getBannerContent';

interface HabitStatusBannerProps {
  status: HabitStatus;
  plannedEndDate: DateValue;
}

export function HabitStatusBanner({
  status,
  plannedEndDate,
}: HabitStatusBannerProps) {
  const colorClass = getBannerColorClass(status);
  const { title, subtitle } = getBannerContent(status);

  const formattedDate = new Date(plannedEndDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Container className={`${styles.banner} ${colorClass}`}>
      <div className={styles.icon}>
        <FaFontAwesomeFlag color="var(--bg-accent)" size="2rem" />
      </div>
      <div className={styles.content}>
        <Typography variant="sectionTitle">{title}</Typography>
        <Typography variant="subtitle">{subtitle(formattedDate)}</Typography>
      </div>
    </Container>
  );
}
