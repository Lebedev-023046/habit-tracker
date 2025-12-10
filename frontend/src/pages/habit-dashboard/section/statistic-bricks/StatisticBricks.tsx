import { usePlural } from '@/shared/hooks/usePlural';
import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './StatisticBricks.module.css';

interface BrickProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

interface StatisticBricksProps {
  progress: number;
  currentStreak: number;
  bestStreak: number;
}

const BrickProgressBar = ({ barProgress }: { barProgress: number }) => {
  return (
    <div className={styles.progress}>
      <h2>{barProgress}%</h2>
      <ProgressBar progress={barProgress} />
    </div>
  );
};

const Brick = ({ title, subtitle, children }: BrickProps) => {
  return (
    <Container className={styles.brick}>
      <Subtitle as="h3">{title}</Subtitle>
      {children}
      <Subtitle as="h3">{subtitle}</Subtitle>
    </Container>
  );
};

export function StatisticBricks({
  progress,
  currentStreak,
  bestStreak,
}: StatisticBricksProps) {
  const { pluralize } = usePlural();

  return (
    <section className={styles.statistics}>
      <Brick
        title="Current Streak"
        subtitle={`Only ${bestStreak - currentStreak} days away from your longest streak.`}
      >
        <h2>{pluralize(currentStreak)}</h2>
      </Brick>
      <Brick
        title="Longest Streak"
        subtitle="Set a new personal best this month."
      >
        <h2>{pluralize(bestStreak)}</h2>
      </Brick>
      <Brick
        title="Overall completion"
        subtitle="Aim for 80%+ to lock in this habit."
      >
        <BrickProgressBar barProgress={progress} />
      </Brick>
    </section>
  );
}
