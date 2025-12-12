import { Button } from '@/shared/ui/button';

import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { SelectField } from '@/shared/ui/form-fields/RHF/select-field';
import { type UseFormReturn } from 'react-hook-form';

import styles from './HabitForm.module.css';

import type { SelectOption } from '@/shared/ui/form-fields/base/base-select';
import { CREATE_HABIT_STATUS, TOTAL_DAYS_VALUES } from '../../model/constants';
import type {
  CreateHabitFormValues,
  HabitFormValues,
  UpdateHabitFormValues,
} from '../../model/form/schema';
import type { CreateHabitPayloadStatus } from '../../model/types';

const STATUS_HINTS: Record<CreateHabitPayloadStatus, { text: string }> = {
  active: {
    text: 'This habit will start today',
  },
  planned: {
    text: 'You can activate this habit anytime',
  },
};

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
  showCancelButton = false,
  onSubmit,
  onCancel,
}: HabitFormProps) {
  const { control, handleSubmit, watch } = form;

  const status = watch('status') as CreateHabitPayloadStatus;
  const hint = STATUS_HINTS[status];

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

      <p key={status} className={styles.info}>
        {hint.text}
      </p>

      <div className={styles.actions}>
        {showCancelButton && onCancel && (
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            animation="none"
          >
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
