import type { UpdateHabitFormValues } from '@/entities/habit';
import { UpdateHabitForm } from '@/features/habit/update';
import type { ModalBaseProps } from '@/shared/modal/types';
import { Typography } from '@/shared/ui/typography';
import styles from './UpdateHabitModal.module.css';

interface UpdateHabitModalProps extends ModalBaseProps {
  title?: string;
  subtitle?: string;
  habitId: string;
  defaultValues: UpdateHabitFormValues;
}

export function UpdateHabitModal({
  title = 'Update Habit',
  subtitle = 'Set up a clear, simple habit you can repeat every day.',
  habitId,
  defaultValues,
  close,
}: UpdateHabitModalProps) {
  return (
    <>
      <div className={styles.header}>
        <Typography variant="cardTitle">{title}</Typography>
        <Typography variant="subtitleMuted">{subtitle}</Typography>
      </div>
      <UpdateHabitForm
        onSuccess={close}
        onCancel={close}
        habitId={habitId}
        defaultValues={defaultValues}
      />
    </>
  );
}
