import {} from '@/entities/habit';
import {
  createHabitSchema,
  type CreateHabitFormValues,
} from '@/features/habit-form/model/schema';
import { HabitForm } from '@/features/habit-form/ui';
import { CreateHabitFields } from '@/features/habit-form/ui/CreateHabitFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateHabit } from '../../model/useCreateHabit';

interface CreateHabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateHabitForm({
  onSuccess: handleSuccess,
  onCancel,
}: CreateHabitFormProps) {
  const { mutate: createHabit, isPending } = useCreateHabit();

  const form = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      title: '',
      startImmediately: false,
      totalDays: 30,
    },
    mode: 'onSubmit',
  });

  const handleSubmit = (values: CreateHabitFormValues) => {
    const payload = {
      title: values.title,
      startImmediately: values.startImmediately,
      totalDays: values.startImmediately ? values.totalDays : undefined,
    };
    createHabit(payload, {
      onSuccess: () => {
        handleSuccess?.();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <HabitForm
        form={form}
        submitLabel="Create habit"
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        onCancel={onCancel}
        showCancelButton
      >
        <CreateHabitFields />
      </HabitForm>
    </FormProvider>
  );
}
