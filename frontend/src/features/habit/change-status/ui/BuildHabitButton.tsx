import type { HabitStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

import { MdEmojiEvents } from 'react-icons/md';

interface BuildHabitButtonProps {
  habitId: string;
  status: HabitStatus;
  variant: ButtonVariant;
  onClick?: () => void;
}

export function BuildHabitButton({
  habitId,
  status,
  variant,
  onClick,
}: BuildHabitButtonProps) {
  const { mutate: updateHabitStatus, isPending } = useUpdateHabitStatus();

  const handleClick = () => {
    const payload = { id: habitId, status };

    console.log({ payload });

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
      textTone="positive"
      onClick={handleClick}
    >
      <MdEmojiEvents size={20} /> Mark as built
    </Button>
  );
}
