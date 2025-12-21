import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { HiPlay } from 'react-icons/hi';

interface ModalTriggerProps {
  onClick?: () => void;
  variant: ButtonVariant;
  habitId: string;
}

export function StartHabitModalTrigger({
  habitId,
  variant,
  onClick,
}: ModalTriggerProps) {
  const { openLazyModal } = useModal();
  const handleClick = () => {
    openLazyModal(
      () =>
        import('../modal').then(m => ({
          Modal: m.Modal,
        })),
      { habitId },
    );
    onClick?.();
  };

  return (
    <Button variant={variant} textTone="success" onClick={handleClick}>
      <HiPlay size={20} /> Start
    </Button>
  );
}
