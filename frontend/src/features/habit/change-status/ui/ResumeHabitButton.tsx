import type { HabitStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

import { HiPlay } from 'react-icons/hi2';

interface ActivateHabitButtonProps {
  habitId: string;
  status: HabitStatus;
  currentStatus: HabitStatus;
  variant: ButtonVariant;
  onClick?: () => void;
}

export function ActivateHabitButton({
  habitId,
  status,
  currentStatus,
  variant,
  onClick,
}: ActivateHabitButtonProps) {
  const { mutate: updateHabitStatus, isPending } = useUpdateHabitStatus();

  const label = currentStatus === 'planned' ? 'Start habit' : 'Resume habit';

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
      textTone="success"
      onClick={handleClick}
    >
      <HiPlay size={20} /> {label}
    </Button>
  );
}
