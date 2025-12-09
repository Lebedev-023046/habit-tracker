import { HABIT_DAY_STATUS_MAP } from '@/entities/habit/model/constants';
import type { DailyHabitViewModel } from '@/entities/habit/model/services/habitDaily.service';
import { HabitActionsContainer } from '@/features/habit-log/update/ui/habit-actions-container';
import { usePlural } from '@/shared/hooks/usePlural';
import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { Diagram } from '@/shared/ui/diagram/Diagram';
import { Subtitle } from '@/shared/ui/subtitle';
import Skeleton from 'react-loading-skeleton';
import styles from './HabitItem.module.css';

interface HabitItemProps {
  isLoading: boolean;
  habit?: DailyHabitViewModel;
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
    lastWeekProgress,
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
        <Subtitle>
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Day ${daySinceStart} of ${totalDays}`
          )}
        </Subtitle>
        <p className={styles.percentage}>
          {isLoading ? <Skeleton width={75} height={24} /> : `${progress}%`}
        </p>
        <Subtitle>
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `Streak: ${currentStreak}`
          )}
        </Subtitle>
      </Diagram>
      <HabitActionsContainer
        todayStatus={todayStatus}
        habitName={title}
        completePayload={completedPayload}
        undoPayload={undoPayload}
        isLoading={isLoading}
      />
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <p>
            {isLoading ? (
              <Skeleton width={100} height={16} />
            ) : (
              '7-day activity'
            )}
          </p>
          <p>
            {isLoading ? (
              <Skeleton width={130} height={16} />
            ) : (
              `Best Streak: ${pluralize(bestStreak)}`
            )}
          </p>
        </div>
        <DailyCalendarProgress lastWeekProgress={lastWeekProgress} />
      </div>
    </Container>
  );
}
