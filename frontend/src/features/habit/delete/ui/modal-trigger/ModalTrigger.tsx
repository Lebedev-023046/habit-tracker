import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';

import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdDelete } from 'react-icons/md';

interface DeleteHabitModalTriggerProps {
  onClick?: () => void;
  variant: ButtonVariant;
  habitId: string;
  habitTitle: string;
}

const preloadDeleteHabitModal = () => import('../modal');

export function DeleteHabitModalTrigger({
  onClick,
  variant,
  habitId,
  habitTitle,
}: DeleteHabitModalTriggerProps) {
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../modal').then(m => ({
          Modal: m.DeleteHabitModal,
        })),
      { habitId, habitTitle },
    );
    onClick?.();
  };

  return (
    <Button
      onMouseEnter={preloadDeleteHabitModal}
      onFocus={preloadDeleteHabitModal}
      onClick={handleClick}
      variant={variant}
      textTone="danger"
    >
      <MdDelete size={20} /> Delete
    </Button>
  );
}
