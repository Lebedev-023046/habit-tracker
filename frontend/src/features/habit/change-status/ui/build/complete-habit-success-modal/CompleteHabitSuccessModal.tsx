import type { ModalBaseProps } from '@/shared/modal/types';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { useBuildHabit } from '../../../model/useBuildHabit';
import styles from './CompleteHabitSuccessModal.module.css';

interface CompleteHabitSuccessModalProps extends ModalBaseProps {
  habitId: string;
  habitTitle: string;
}

export function CompleteHabitSuccessModal({
  habitId,
  habitTitle,
  close,
}: CompleteHabitSuccessModalProps) {
  const { mutate: builtHabit, isPending } = useBuildHabit();

  const handleKeepTracking = () => {
    close();
  };

  const handleMarkAsBuilt = () => {
    builtHabit({ habitId }, { onSuccess: close });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.picture}>
        <img src="./build-modal-pic.webp" alt="success picture" />
      </div>
      <Typography variant="sectionTitle">
        You’ve reached your goal with “{habitTitle}”!
      </Typography>
      <Typography variant="subtitleMuted">
        How would you like to continue with this habit?
      </Typography>
      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          onClick={handleKeepTracking}
          className={styles.button}
          disabled={isPending}
        >
          Keep tracking
        </Button>
        <Typography variant="bodyMuted">
          Continue marking this habit daily and keep your streak going
        </Typography>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={handleMarkAsBuilt}
          className={styles.button}
        >
          Mark as built
        </Button>
        <Typography variant="bodyMuted">
          Finish this habit and keep it as a completed achievement
        </Typography>
      </div>
    </div>
  );
}
