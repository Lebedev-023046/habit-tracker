import type { HabitStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdCancel } from 'react-icons/md';
import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

interface CancelHabitButtonProps {
  onClick?: () => void;
  habitId: string;
  status: HabitStatus;
  variant: ButtonVariant;
}

export function CancelHabitButton({
  habitId,
  status,
  variant,
  onClick,
}: CancelHabitButtonProps) {
  const { mutate: updateHabitStatus, isPending } = useUpdateHabitStatus();

  const handleClick = () => {
    const payload = { id: habitId, status };

    updateHabitStatus(payload, {
      onSuccess: () => {
        onClick?.();
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      variant={variant}
      textTone="neutral"
      onClick={handleClick}
    >
      <MdCancel size={20} /> Discard habit
    </Button>
  );
}
