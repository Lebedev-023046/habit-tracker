import { ConfirmModal } from '@/shared/modal/confirm-modal';
import { useDeleteHabit } from '../../model/useDeleteHabit';

interface DeleteHabitModalProps {
  habitId: string;
  habitTitle: string;
  close: () => void;
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
