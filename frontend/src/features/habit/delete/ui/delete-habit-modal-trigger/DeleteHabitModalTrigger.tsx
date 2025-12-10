import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';

import { DeleteHabitModal } from '@/features/habit/delete';
import styles from './DeleteHabitModalTrigger.module.css';

interface DeleteHabitModalTriggerProps {
  habitId: string;
  habitTitle: string;
  onClick?: () => void;
}

export function DeleteHabitModalTrigger({
  habitId,
  habitTitle,
  onClick,
}: DeleteHabitModalTriggerProps) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(DeleteHabitModal, {
      habitId,
      habitTitle,
    });
    onClick?.();
  };
  return (
    <Button
      onClick={handleClick}
      className={styles.buttonTextDanger}
      variant="plain"
    >
      Delete
    </Button>
  );
}
