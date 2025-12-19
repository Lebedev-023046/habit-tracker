import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { useFormContext } from 'react-hook-form';
import type { UpdateHabitFormValues } from '../../model/form/schema';

export function UpdateHabitFields() {
  const { control } = useFormContext<UpdateHabitFormValues>();

  return (
    <InputField
      control={control}
      name="title"
      label="Habit title"
      placeholder="title..."
    />
  );
}
