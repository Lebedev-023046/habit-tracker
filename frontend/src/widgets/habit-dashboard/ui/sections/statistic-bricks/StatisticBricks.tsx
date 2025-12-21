import { usePlural } from '@/shared/hooks/usePlural';
import { Container } from '@/shared/ui/container';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Typography } from '@/shared/ui/typography';
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
      <Typography variant="sectionTitle">{barProgress}%</Typography>
      <ProgressBar progress={barProgress} />
    </div>
  );
};

const Brick = ({ title, subtitle, children }: BrickProps) => {
  return (
    <Container className={styles.brick}>
      <Typography variant="subtitleMuted">{title}</Typography>
      {children}
      <Typography variant="subtitleMuted">{subtitle}</Typography>
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
        <Typography variant="sectionTitle">
          {pluralize(currentStreak)}
        </Typography>
      </Brick>
      <Brick
        title="Longest Streak"
        subtitle="Set a new personal best this month."
      >
        <Typography variant="sectionTitle">{pluralize(bestStreak)}</Typography>
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
