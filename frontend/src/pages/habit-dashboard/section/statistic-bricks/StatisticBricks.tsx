import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './StatisticBricks.module.css';

const BrickProgressBar = ({ barProgress }: { barProgress: number }) => {
  return (
    <div className={styles.brickProgressBarWrapper}>
      <h2 className={styles.persentage}>{barProgress}%</h2>
      <ProgressBar progress={barProgress} />
    </div>
  );
};

interface BrickProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Brick = ({ title, subtitle, children }: BrickProps) => {
  return (
    <Container className={styles.brickWrapper}>
      <Subtitle as="h3">{title}</Subtitle>
      {children}
      <Subtitle as="h3">{subtitle}</Subtitle>
    </Container>
  );
};

export function StatisticBricks() {
  return (
    <section className={styles.statisticBricksWrapper}>
      <Brick
        title="Current Streak"
        subtitle="Only 7 days away from your longest streak."
      >
        <h2>14 days</h2>
      </Brick>
      <Brick
        title="Longest Streak"
        subtitle="Set a new personal best this month."
      >
        <h2>21 days</h2>
      </Brick>
      <Brick
        title="Overall completion"
        subtitle="Aim for 80%+ to lock in this habit."
      >
        <BrickProgressBar barProgress={69} />
      </Brick>
    </section>
  );
}
