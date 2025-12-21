import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';
import styles from './SubHeader.module.css';

interface SubHeaderProps {
  title: string;
  streak: number;
  restDays: number;
}

export function SubHeader({ title, streak, restDays }: SubHeaderProps) {
  return (
    <Container className={styles.sectionHeader}>
      <Typography variant="sectionTitle">{title}</Typography>
      <div className={styles.info}>
        <Typography variant="subtitleMuted">{streak}-day steak</Typography>
        <Typography variant="subtitleMuted">{restDays} days left</Typography>
      </div>
    </Container>
  );
}
