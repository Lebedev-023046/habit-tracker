import { CheckboxField } from '@/shared/ui/form-fields/RHF/checkbox-field';
import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { SelectField } from '@/shared/ui/form-fields/RHF/select-field';
import { useFormContext } from 'react-hook-form';

import { TOTAL_DAYS_VALUES } from '../../model/constants';
import type { CreateHabitFormValues } from '../../model/form/schema';

import { Collapse } from '@/shared/ui/animation';
import { Typography } from '@/shared/ui/typography';
import styles from './HabitForm.module.css';

const totalDaysOptions = TOTAL_DAYS_VALUES.map(days => ({
  value: days,
  label: days.toString(),
}));

export function CreateHabitFields() {
  const { control, watch } = useFormContext<CreateHabitFormValues>();

  const startImmediately = watch('startImmediately');

  return (
    <>
      <InputField
        control={control}
        name="title"
        label="Habit title"
        placeholder="title..."
      />

      <CheckboxField
        control={control}
        name="startImmediately"
        label="Start habit immediately"
      />

      <Collapse isOpen={startImmediately}>
        <SelectField
          control={control}
          name="totalDays"
          label="Total days"
          placeholder="Choose total days"
          options={totalDaysOptions}
          isClearable={false}
        />
      </Collapse>

      <Typography variant="bodyMuted" className={styles.description}>
        {startImmediately
          ? 'This habit will start today'
          : 'You can activate this habit anytime'}
      </Typography>
    </>
  );
}
