import { useModal } from '@/shared/modal/modal-context/ModalContext';
import { preloadModalRoot } from '@/shared/modal/modal-root/preload';
import { Button } from '@/shared/ui/button';

import { GoPlus } from 'react-icons/go';

interface CreateHabitModalTriggerProps {
  label?: string;
  className?: string;
}

export function CreateHabitModalTrigger({
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
        onMouseEnter={preloadModalRoot}
        variant="primary"
        onClick={handleClick}
        className={className}
      >
        <GoPlus size="2.5rem" />
        {label}
      </Button>
    </>
  );
}
