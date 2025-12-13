import {
  HabitForm,
  updateHabitSchema,
  type HabitFormValues,
  type UpdateHabitFormValues,
} from '@/entities/habit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateHabit } from '../../model/useUpdateHabit';

export interface UpdateHabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  habitId: string;
  defaultValues: UpdateHabitFormValues;
}

export function UpdateHabitForm({
  onSuccess: handleSuccess,
  onCancel,
  habitId,
  defaultValues,
}: UpdateHabitFormProps) {
  const { mutate: updateHabit, isPending } = useUpdateHabit();

  const form = useForm<HabitFormValues>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: defaultValues ?? {
      title: '',
      status: 'planned',
      totalDays: 30,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSubmit = (values: UpdateHabitFormValues) => {
    const payload = { id: habitId, ...values };
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
      showCancelButton={Boolean(onCancel)}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
