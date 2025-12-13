import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';

import { preloadModalRoot } from '@/shared/modal/modal-root/preload';
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
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../delete-habit-modal').then(m => ({
          Modal: m.DeleteHabitModal,
        })),
      { habitId, habitTitle },
    );
    onClick?.();
  };

  return (
    <Button
      onMouseEnter={preloadModalRoot}
      onClick={handleClick}
      className={styles.buttonTextDanger}
      variant="plain"
    >
      Delete
    </Button>
  );
}
