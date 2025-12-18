import type { ModalBaseProps } from '@/shared/modal/types';

import { Typography } from '@/shared/ui/typography';
import { CreateHabitForm } from '../create-habit-form';
import styles from './CreateHabitModal.module.css';

interface CreateHabitModalProps extends ModalBaseProps {
  title?: string;
  subtitle?: string;
}

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({
  title = 'Create Habit',
  subtitle = 'Set up a clear, simple habit you can repeat every day.',
  close,
}) => {
  return (
    <>
      <div className={styles.header}>
        <Typography variant="cardTitle">{title}</Typography>
        <Typography variant="subtitleMuted">{subtitle}</Typography>
      </div>
      <CreateHabitForm onSuccess={close} onCancel={close} />
    </>
  );
};
