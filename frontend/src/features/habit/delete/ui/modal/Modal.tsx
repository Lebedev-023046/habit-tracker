import { ConfirmModal } from '@/shared/modal/confirm-modal';
import type { ModalBaseProps } from '@/shared/modal/types';
import { useDeleteHabit } from '../../model/useDeleteHabit';

interface DeleteHabitModalProps extends ModalBaseProps {
  habitId: string;
  habitTitle: string;
}

export function DeleteHabitModal({
  habitId,
  habitTitle,
  close,
}: DeleteHabitModalProps) {
  const { mutate: deleteHabit, isPending } = useDeleteHabit();

  return (
    <ConfirmModal
      title={`Delete “${habitTitle}”?`}
      subtitle="This will permanently delete the habit and all its progress."
      confirmText="Delete"
      cancelText="Cancel"
      confirmVariant="danger"
      isLoading={isPending}
      onConfirm={() =>
        deleteHabit(
          { id: habitId },
          {
            onSuccess: close,
          },
        )
      }
      onCancel={close}
      close={close}
    />
  );
}
