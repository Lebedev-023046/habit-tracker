import { ConfirmModal } from '@/shared/modal/confirm-modal';
import type { ModalBaseProps } from '@/shared/modal/types';
import { useBuildHabit } from '../../../model/useBuildHabit';

interface CompleteHabitConfirmModalProps extends ModalBaseProps {
  habitId: string;
  habitTitle: string;
}

export function CompleteHabitConfirmModal({
  habitId,
  habitTitle,
  close,
}: CompleteHabitConfirmModalProps) {
  const { mutate: builtHabit, isPending } = useBuildHabit();

  return (
    <ConfirmModal
      title={`Finish “${habitTitle}”?`}
      subtitle="This will mark the habit as built and stop daily tracking."
      confirmText="Mark as built"
      cancelText="Cancel"
      confirmVariant="primary"
      isLoading={isPending}
      onConfirm={() => builtHabit({ habitId }, { onSuccess: close })}
      onCancel={close}
      close={close}
    />
  );
}
