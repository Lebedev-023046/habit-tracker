import type { HabitTotalDays } from '@/entities/habit';
import { TOTAL_DAYS_VALUES } from '@/entities/habit/model/constants';
import { HabitForm } from '@/features/habit-form/ui';
import { SelectField } from '@/shared/ui/form-fields/RHF/select-field';
import type { SelectOption } from '@/shared/ui/form-fields/base/base-select';
import { FormProvider, useForm } from 'react-hook-form';
import { useStartHabit } from '../../../model/useStartHabit';

interface FormProps {
  habitId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  totalDays: HabitTotalDays;
}

const totalDaysOptions: SelectOption[] = TOTAL_DAYS_VALUES.map(days => ({
  value: days,
  label: days.toString(),
}));

export function Form({ habitId, onSuccess, onCancel }: FormProps) {
  const form = useForm<{ totalDays: HabitTotalDays }>({
    mode: 'onSubmit',
    defaultValues: {
      totalDays: TOTAL_DAYS_VALUES[0],
    },
  });

  const { control } = form;
  const { mutate: startHabit, isPending } = useStartHabit();

  const handleSubmit = (values: FormValues) => {
    const payload = { habitId, ...values };

    startHabit(payload, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <HabitForm
        form={form}
        isSubmitting={isPending}
        submitLabel="Start habit"
        showCancelButton
        onCancel={onCancel}
        onSubmit={handleSubmit}
      >
        <SelectField
          control={control}
          name="totalDays"
          label="Total days"
          placeholder="Choose total days"
          options={totalDaysOptions}
          isClearable={false}
        />
      </HabitForm>
    </FormProvider>
  );
}
