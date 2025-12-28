import { useModal } from '@/shared/modal/modal-context/ModalContext';

import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

import { GoPlus } from 'react-icons/go';

interface CreateHabitModalTriggerProps {
  variant: ButtonVariant;
  label?: string;
  className?: string;
}

export function CreateHabitModalTrigger({
  variant,
  label = 'Add habit',
  className,
}: CreateHabitModalTriggerProps) {
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../create-habit-modal').then(m => ({
          Modal: m.CreateHabitModal,
        })),
      {},
    );
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleClick}
        className={className}
        align="center"
      >
        <GoPlus size="2.5rem" />
        {label}
      </Button>
    </>
  );
}
