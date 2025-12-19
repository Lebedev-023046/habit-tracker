import {
  HabitForm,
  updateHabitSchema,
  type UpdateHabitFormValues,
} from '@/entities/habit';
import { UpdateHabitFields } from '@/entities/habit/ui/habit-form/UpdateHabitFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useUpdateHabit } from '../../model/useUpdateHabit';

export interface UpdateHabitFormProps {
  habitId: string;
  defaultValues: UpdateHabitFormValues;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateHabitForm({
  habitId,
  defaultValues,
  onSuccess: handleSuccess,
  onCancel,
}: UpdateHabitFormProps) {
  const { mutate: updateHabit, isPending } = useUpdateHabit();

  const form = useForm<UpdateHabitFormValues>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues,
    mode: 'onSubmit',
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
    <FormProvider {...form}>
      <HabitForm
        form={form}
        submitLabel="Update habit"
        isSubmitting={isPending}
        showCancelButton
        onCancel={onCancel}
        onSubmit={handleSubmit}
      >
        <UpdateHabitFields />
      </HabitForm>
    </FormProvider>
  );
}
