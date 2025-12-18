import type { UpdateHabitFormValues } from '@/entities/habit';
import { useModal } from '@/shared/modal/modal-context';
import { preloadModalRoot } from '@/shared/modal/modal-root/preload';
import { Button } from '@/shared/ui/button';
import type { ButtonVariant } from '@/shared/ui/button/types';
import { MdEdit } from 'react-icons/md';

interface UpdateHabitModalTriggerProps {
  onClick?: () => void;
  variant: ButtonVariant;
  habitId: string;
  defaultValues: UpdateHabitFormValues;
}

export function UpdateHabitModalTrigger({
  onClick,
  variant,
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
      variant={variant}
      textTone="info"
    >
      <MdEdit size={20} /> Edit
    </Button>
  );
}
