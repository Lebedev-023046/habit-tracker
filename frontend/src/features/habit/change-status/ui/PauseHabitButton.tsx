import type { HabitStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdPause } from 'react-icons/md';
import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

interface PauseHabitButtonProps {
  onClick?: () => void;
  habitId: string;
  status: HabitStatus;
  variant: ButtonVariant;
}

export function PauseHabitButton({
  habitId,
  status,
  variant,
  onClick,
}: PauseHabitButtonProps) {
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
      textTone="warning"
      onClick={handleClick}
    >
      <MdPause size={20} /> Pause
    </Button>
  );
}
