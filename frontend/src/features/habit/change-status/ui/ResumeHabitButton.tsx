import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';

import { HiPlay } from 'react-icons/hi2';
import { useResumeHabit } from '../model/useResumeHabit';

interface ResumeHabitButtonProps {
  habitId: string;
  variant: ButtonVariant;
  onClick?: () => void;
}

export function ResumeHabitButton({
  habitId,
  variant,
  onClick,
}: ResumeHabitButtonProps) {
  const { mutate: resumeHabit } = useResumeHabit();

  const handleClick = () => {
    resumeHabit(
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
      disabled={false}
      variant={variant}
      textTone="success"
      onClick={handleClick}
    >
      <HiPlay size={20} /> Resume
    </Button>
  );
}
