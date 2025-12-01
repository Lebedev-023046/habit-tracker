import {
  type CreateHabitFormValues,
  type HabitFormValues,
  updateHabitSchema,
} from '@/entities/habit/model/form/schema';
import { HabitForm } from '@/entities/habit/ui/habit-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateHabit } from '../../model/useUpdateHabit';

export interface UpdateHabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateHabitForm({
  onSuccess: handleSuccess,
  onCancel,
}: UpdateHabitFormProps) {
  const { mutate: updateHabit, isPending, error } = useUpdateHabit();

  const form = useForm<CreateHabitFormValues>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: {
      title: '',
      status: 'planned',
      totalDays: 30,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSubmit = (values: HabitFormValues) => {
    const payload = values;
    updateHabit(payload, {
      onSuccess: () => {
        handleSuccess?.();
      },
    });
  };

  return (
    <HabitForm
      form={form}
      submitLabel="Update habit"
      isSubmitting={isPending}
      errorMessage={error ? (error as Error).message : undefined}
      showCancelButton={Boolean(onCancel)}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
