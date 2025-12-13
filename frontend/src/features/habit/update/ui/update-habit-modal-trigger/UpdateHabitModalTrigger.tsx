import type { UpdateHabitFormValues } from '@/entities/habit';
import { useModal } from '@/shared/modal/modal-context';
import { preloadModalRoot } from '@/shared/modal/modal-root/preload';
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
  const { openLazyModal } = useModal();

  const handleClick = () => {
    openLazyModal(
      () =>
        import('../update-habit-modal').then(m => ({
          Modal: m.UpdateHabitModal,
        })),
      { habitId, defaultValues },
    );
    onClick?.();
  };

  return (
    <Button
      onMouseEnter={preloadModalRoot}
      onClick={handleClick}
      variant="plain"
    >
      Edit
    </Button>
  );
}
