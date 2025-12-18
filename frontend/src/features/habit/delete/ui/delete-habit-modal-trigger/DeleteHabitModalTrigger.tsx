import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';

import { preloadModalRoot } from '@/shared/modal/modal-root/preload';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdDelete } from 'react-icons/md';

interface DeleteHabitModalTriggerProps {
  onClick?: () => void;
  variant: ButtonVariant;
  habitId: string;
  habitTitle: string;
}

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
      variant={variant}
      textTone="danger"
    >
      <MdDelete size={20} /> Delete
    </Button>
  );
}
