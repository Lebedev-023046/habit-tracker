import { DeleteHabitForm } from '@/features/habit/delete';
import type { ModalBaseProps } from '@/shared/modal/types';
import { Subtitle } from '@/shared/ui/subtitle';
import styles from './DeleteHabitModal.module.css';

interface DeleteHabitModalProps extends ModalBaseProps {
  habitId: string;
  habitTitle: string;
}

export function DeleteHabitModal({
  habitId,
  habitTitle,
  close,
}: DeleteHabitModalProps) {
  return (
    <div className={styles.confirm}>
      <h2 className={styles.title}>Delete Habit?</h2>
      <Subtitle className={styles.subtitle}>
        This action can't be undone. You'll lose all history for this habit:
        <span className={styles.habitTitle}>{habitTitle}</span>
      </Subtitle>
      <DeleteHabitForm habitId={habitId} onCancel={close} onSuccess={close} />
    </div>
  );
}
