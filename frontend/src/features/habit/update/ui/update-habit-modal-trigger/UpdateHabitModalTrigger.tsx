import type { UpdateHabitFormValues } from '@/entities/habit/model/form/schema';
import { useModal } from '@/shared/modal/modal-context';
import { Button } from '@/shared/ui/button';
import { UpdateHabitModal } from '@/widgets/habit/update/update-habit-modal';

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
