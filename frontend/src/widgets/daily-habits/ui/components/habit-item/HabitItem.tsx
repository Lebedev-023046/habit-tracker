import type { DailyHabitItem } from '@/entities/daily-habits/types';
import { HabitActionsContainer } from '@/features/habit-log';
import { usePlural } from '@/shared/hooks/usePlural';
import { HABIT_DAY_STATUS_MAP } from '@/shared/model/habit-day.model';
import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Typography } from '@/shared/ui/typography';
import Skeleton from 'react-loading-skeleton';
import styles from './HabitItem.module.css';

interface HabitItemProps {
  isLoading?: boolean;
  habit?: DailyHabitItem;
}

export function HabitItem({ isLoading, habit }: HabitItemProps) {
  const { pluralize } = usePlural();

  if (!habit) return;

  const {
    id,
    progress,
    daySinceStart,
    totalDays,
    currentStreak,
    title,
    bestStreak,
    lastDaysProgress,
    todayStatus,
  } = habit;

  const [completeStatus, undoStatus] = [
    HABIT_DAY_STATUS_MAP.completed,
    HABIT_DAY_STATUS_MAP.unmarked,
  ];

  const completedPayload = {
    habitId: id,
    status: completeStatus,
  };

  const undoPayload = {
    habitId: id,
    status: undoStatus,
  };

  return (
    <Container as="div" className={styles.habitCard}>
      <Diagram progress={progress} className={styles.progressDiagram}>
        <Typography variant="captionMuted">
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Day ${daySinceStart} of ${totalDays}`
          )}
        </Typography>
        <Typography variant="sectionTitle">
          {isLoading ? <Skeleton width={75} height={24} /> : `${progress}%`}
        </Typography>
        <Typography variant="captionMuted">
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Streak: ${currentStreak}`
          )}
        </Typography>
      </Diagram>
      <HabitActionsContainer
        habitId={id}
        todayStatus={todayStatus}
        habitName={title}
        completePayload={completedPayload}
        undoPayload={undoPayload}
        isLoading={isLoading}
      />
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <Typography variant="subtitleMuted">
            {isLoading ? (
              <Skeleton width={100} height={16} />
            ) : (
              '7-day activity'
            )}
          </Typography>
          <Typography variant="subtitleMuted">
            {isLoading ? (
              <Skeleton width={130} height={16} />
            ) : (
              `Best Streak: ${pluralize(bestStreak)}`
            )}
          </Typography>
        </div>
        <DailyCalendarProgress lastDaysProgress={lastDaysProgress} />
      </div>
    </Container>
  );
}
