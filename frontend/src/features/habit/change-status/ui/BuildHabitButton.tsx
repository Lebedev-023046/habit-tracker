import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

// import { useUpdateHabitStatus } from '../model/useUpdateHabitStatus';

import { MdEmojiEvents } from 'react-icons/md';
import { useBuildHabit } from '../model/useBuildHabit';

interface BuildHabitButtonProps {
  habitId: string;
  variant: ButtonVariant;
  onClick?: () => void;
}

export function BuildHabitButton({
  habitId,
  variant,
  onClick,
}: BuildHabitButtonProps) {
  const { mutate: builtHabit, isPending } = useBuildHabit();

  const handleClick = () => {
    builtHabit(
      { habitId },
      {
        onSuccess: () => {
          onClick?.();
        },
      },
    );
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
