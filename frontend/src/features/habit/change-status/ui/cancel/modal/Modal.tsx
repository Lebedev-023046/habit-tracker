import { ConfirmModal } from '@/shared/modal/confirm-modal';
import { useCancelHabit } from '../../../model/useCancelHabit';

export function CancelHabitModal({
  habitId,
  close,
}: {
  habitId: string;
  close: () => void;
}) {
  const { mutate: cancelHabit, isPending } = useCancelHabit();

  return (
    <ConfirmModal
      title="Stop working on this habit?"
      subtitle="Your progress will be saved. You can start again later."
      confirmText="Cancel habit"
      cancelText="Keep habit"
      isLoading={isPending}
      onConfirm={() =>
        cancelHabit(
          { habitId },
          {
            onSuccess: () => close(),
          },
        )
      }
      onCancel={close}
      close={close}
    />
  );
}
