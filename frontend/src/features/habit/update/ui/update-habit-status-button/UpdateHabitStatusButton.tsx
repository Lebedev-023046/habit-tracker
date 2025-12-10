import type { HabitStatus } from '@/entities/habit';
import { Button } from '@/shared/ui/button';
import { useUpdateHabit } from '../../model/useUpdateHabit';

interface UpdateHabitStatusButtonProps {
  habitId: string;
  status: HabitStatus;
  children: React.ReactNode;
  onClick?: () => void;
}

export function UpdateHabitStatusButton({
  habitId,
  status,
  children,
  onClick: onOuterClick,
}: UpdateHabitStatusButtonProps) {
  const { mutate: updateHabitStatus, isPending } = useUpdateHabit();

  const handleClick = () => {
    const payload = { id: habitId, status };

    updateHabitStatus(payload, {
      onSuccess: () => {
        onOuterClick?.();
      },
    });
  };

  return (
    <Button disabled={isPending} onClick={handleClick} variant="plain">
      {children}
    </Button>
  );
}
