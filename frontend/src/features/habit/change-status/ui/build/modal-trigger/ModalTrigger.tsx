import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

import { useModal } from '@/shared/modal/modal-context';
import { MdEmojiEvents } from 'react-icons/md';

interface BuildHabitButtonProps {
  habitId: string;
  habitTitle: string;
  variant: ButtonVariant;
  onClick?: () => void;
}

export function BuildHabitButton({
  habitId,
  habitTitle,
  variant,
}: BuildHabitButtonProps) {
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../complete-habit-confirm-modal').then(m => ({
          Modal: m.CompleteHabitConfirmModal,
        })),
      { habitId, habitTitle },
    );
  };

  return (
    <Button variant={variant} textTone="positive" onClick={handleClick}>
      <MdEmojiEvents size={20} /> Mark as built
    </Button>
  );
}
