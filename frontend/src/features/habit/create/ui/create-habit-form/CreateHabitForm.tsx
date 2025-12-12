import { HabitForm } from '@/entities/habit';

import {
  createHabitSchema,
  type CreateHabitFormValues,
  type HabitFormValues,
} from '@/entities/habit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateHabit } from '../../model/useCreateHabit';

interface CreateHabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateHabitForm({
  onSuccess: handleSuccess,
  onCancel,
}: CreateHabitFormProps) {
  const { mutate: createHabit, isPending, error } = useCreateHabit();

  const form = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      title: '',
      status: 'planned',
      totalDays: 30,
    },
    mode: 'onSubmit',
  });

  const handleSubmit = (values: HabitFormValues) => {
    const payload = values;
    createHabit(payload, {
      onSuccess: () => {
        handleSuccess?.();
      },
    });
  };

  return (
    <HabitForm
      form={form}
      submitLabel="Create habit"
      isSubmitting={isPending}
      errorMessage={error ? (error as Error).message : undefined}
      showCancelButton={Boolean(onCancel)}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
