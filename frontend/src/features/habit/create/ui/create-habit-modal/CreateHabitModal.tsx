import type { ModalBaseProps } from '@/shared/modal/types';
import { Subtitle } from '@/shared/ui/subtitle';
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
        <h2 className={styles.title}>{title}</h2>
        <Subtitle className={styles.subtitle}>{subtitle}</Subtitle>
      </div>
      <CreateHabitForm onSuccess={close} onCancel={close} />
    </>
  );
};
