import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdCancel } from 'react-icons/md';
// import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

interface ModalTriggerProps {
  onClick?: () => void;
  habitId: string;
  variant: ButtonVariant;
}
export function CancelHabitModalTrigger({
  habitId,
  variant,
  onClick,
}: ModalTriggerProps) {
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../modal').then(m => ({
          Modal: m.CancelHabitModal,
        })),
      { habitId },
    );
    onClick?.();
  };

  return (
    <Button
      disabled={false}
      variant={variant}
      textTone="neutral"
      onClick={handleClick}
    >
      <MdCancel size={20} /> Discard habit
    </Button>
  );
}
