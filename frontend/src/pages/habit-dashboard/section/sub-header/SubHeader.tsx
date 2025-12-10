import { Container } from '@/shared/ui/container';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './SubHeader.module.css';

interface SubHeaderProps {
  title: string;
  steak: number;
  restDays: number;
}

export function SubHeader({ title, steak, restDays }: SubHeaderProps) {
  return (
    <Container className={styles.sectionHeader}>
      <h2>{title}</h2>
      <div className={styles.info}>
        <Subtitle as="h3">{steak}-day steak</Subtitle>
        <Subtitle as="h3">{restDays} days left</Subtitle>
      </div>
    </Container>
  );
}
