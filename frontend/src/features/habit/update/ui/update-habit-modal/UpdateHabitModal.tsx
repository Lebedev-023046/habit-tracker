import type { UpdateHabitFormValues } from '@/entities/habit/model/form/schema';
import { UpdateHabitForm } from '@/features/habit/update/ui/update-habit-form';
import type { ModalBaseProps } from '@/shared/modal/types';
import { Subtitle } from '@/shared/ui/subtitle';
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
        <h2 className={styles.title}>{title}</h2>
        <Subtitle className={styles.subtitle}>{subtitle}</Subtitle>
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
