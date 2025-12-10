import type { UpdateHabitFormValues } from '@/entities/habit';
import { UpdateHabitModal } from '@/features/habit/update';
import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';

interface UpdateHabitModalTriggerProps {
  onClick?: () => void;
  habitId: string;
  defaultValues: UpdateHabitFormValues;
}

export function UpdateHabitModalTrigger({
  onClick,
  habitId,
  defaultValues,
}: UpdateHabitModalTriggerProps) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(UpdateHabitModal, {
      habitId,
      defaultValues,
    });
    onClick?.();
  };

  return (
    <Button onClick={handleClick} variant="plain">
      Edit
    </Button>
  );
}
