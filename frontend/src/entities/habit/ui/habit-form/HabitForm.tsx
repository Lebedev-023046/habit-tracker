import { Button } from '@/shared/ui/button';

import { DateField } from '@/shared/ui/form-fields/RHF/date-field';
import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { SelectField } from '@/shared/ui/form-fields/RHF/select-field';
import { type UseFormReturn } from 'react-hook-form';

import styles from './HabitForm.module.css';

import type { SelectOption } from '@/shared/ui/form-fields/base/base-select';
import type {
  CreateHabitFormValues,
  HabitFormValues,
  UpdateHabitFormValues,
} from '../../model/form/schema';
import { CREATE_HABIT_STATUS, TOTAL_DAYS_VALUES } from '../../model/types';

interface HabitFormProps {
  form: UseFormReturn<HabitFormValues>;
  submitLabel?: string;
  errorMessage?: string;
  isSubmitting?: boolean;
  showCancelButton?: boolean;

  onSubmit: (values: UpdateHabitFormValues | CreateHabitFormValues) => void;
  onCancel: () => void;
}

const habitStatusOptions = CREATE_HABIT_STATUS.map(status => ({
  value: status,
  label: status,
}));

const totalDaysOptions: SelectOption[] = TOTAL_DAYS_VALUES.map(days => ({
  value: days,
  label: days.toString(),
}));

export function HabitForm({
  form,
  submitLabel = 'Save habit',
  isSubmitting = false,
  errorMessage,
  showCancelButton = false,
  onSubmit,
  onCancel,
}: HabitFormProps) {
  const hasError = Boolean(errorMessage);
  const errorOpenClassName = hasError ? styles.errorOpen : '';

  const { control, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
      <InputField
        control={control}
        name="title"
        label="Habit title"
        placeholder="title..."
      />

      <SelectField
        control={control}
        name="totalDays"
        label="Total days"
        placeholder="Choose total days"
        options={totalDaysOptions}
        isClearable={false}
      />

      <SelectField
        control={control}
        name="status"
        label="Status"
        placeholder="Choose status"
        options={habitStatusOptions}
        isClearable={false}
      />

      <DateField
        control={control}
        name="startDate"
        label="Start date (optional)"
        placeholder="Pick start date"
      />

      {hasError && (
        <div className={`${styles.error} ${errorOpenClassName}`}>
          <div className={styles.errorContent}>
            <p className={styles.errorText}>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        {showCancelButton && onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button variant="primary" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
