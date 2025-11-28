import type { CreateHabitPayload } from '@/entities/habit/model/types';
import { HabitForm } from '@/entities/habit/ui/habit-form';
import { useCreateHabit } from '../../model/useCreateHabit';

export interface CreateHabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateHabitForm({
  onSuccess: handleSuccess,
  onCancel,
}: CreateHabitFormProps) {
  const { mutate: createHabit } = useCreateHabit();

  const handleSubmit = (payload: CreateHabitPayload) => {
    createHabit(payload, {
      onSuccess: () => {
        handleSuccess?.();
      },
    });
  };

  return (
    <HabitForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      // isSubmitting={isPending}
      // errorMessage={error ? (error as Error).message : undefined}
      // submitLabel="Create habit"
    />
  );
}
