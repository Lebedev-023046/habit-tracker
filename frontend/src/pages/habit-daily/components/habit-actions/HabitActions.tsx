import type { HabitDayStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import { Subtitle } from '@/shared/ui/subtitle';
import Skeleton from 'react-loading-skeleton';
import styles from './HabitActions.module.css';

interface HabitActionsProps {
  habitName: string;
  todayStatus: HabitDayStatus;
  isLoading?: boolean;
  isPending?: boolean;
  onCompleteClick?: () => void;
  onUndoClick?: () => void;
}

export function HabitActions({
  todayStatus,
  habitName,
  isLoading,
  isPending,
  onCompleteClick,
  onUndoClick,
}: HabitActionsProps) {
  const isDisabled = isLoading || isPending;

  const isCompleted = todayStatus === 'completed';
  const isUndo = todayStatus === 'unmarked';

  const isCompletedDisabled = isDisabled || isCompleted;
  const isUndoDisabled = isDisabled || isUndo;

  const subtitleText = {
    completed: 'Nice! Every small win pushes your streak forward.',
    missed: "Today didn't go as planned — but your journey continues.",
    unmarked: "You're one step away from progress. Complete this habit today.",
  };

  return (
    <div className={styles.habitActions}>
      <h3 className={styles.title}>
        {isLoading ? <Skeleton width={100} height={24} /> : `${habitName}`}
      </h3>
      <Subtitle>
        {isLoading ? (
          <Skeleton width={360} height={16} />
        ) : (
          `${subtitleText[todayStatus]}`
        )}
      </Subtitle>
      <div className={styles.controls}>
        {isLoading ? (
          <>
            <Skeleton
              width={150}
              height={32}
              borderRadius="var(--rounded-md)"
            />
            <Skeleton
              width={100}
              height={32}
              borderRadius="var(--rounded-md)"
            />
          </>
        ) : (
          <>
            <Button
              className={styles.actionButton}
              disabled={isCompletedDisabled}
              variant="primary"
              onClick={onCompleteClick}
            >
              {/* Completed today */}
              {isCompleted ? 'Completed today' : 'Mark as done'}
            </Button>
            <Button
              disabled={isUndoDisabled}
              variant="ghost"
              onClick={onUndoClick}
            >
              Undo
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
