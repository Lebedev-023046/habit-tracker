import type { HabitStatus } from '@/entities/habit/model/types';
import { Container } from '@/shared/ui/container';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import styles from './HabitStatusBanner.module.css';
import { getBannerColorClass } from './helpers/getBannerColorClass';
import { getBannerContent } from './helpers/getBannerContent';

interface HabitStatusBannerProps {
  status: HabitStatus;
}

export function HabitStatusBanner({ status }: HabitStatusBannerProps) {
  const colorClass = getBannerColorClass(status);
  const { title, subtitle } = getBannerContent(status);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Container className={`${styles.habitStatusBannerWrapper} ${colorClass}`}>
      <div className={styles.bannerIcon}>
        <FaFontAwesomeFlag color="var(--bg-accent)" size="2rem" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.paragraph}>{subtitle(formattedDate)}</p>
      </div>
    </Container>
  );
}
