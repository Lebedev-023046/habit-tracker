import { CreateHabitModal } from '@/features/habit/create/ui/create-habit-modal';
import { useModal } from '@/shared/modal/modal-context/ModalContext';
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
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(CreateHabitModal, {});
  };

  return (
    <>
      <Button variant="primary" onClick={handleClick} className={className}>
        <GoPlus size="2.5rem" />
        {label}
      </Button>
    </>
  );
}
