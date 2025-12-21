import { Button } from '@/shared/ui/button';

import { type FieldValues, type UseFormReturn } from 'react-hook-form';

import styles from './HabitForm.module.css';

interface HabitFormProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
  showCancelButton?: boolean;
  onSubmit: (values: TFormValues) => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

export function HabitForm<TFormValues extends FieldValues>({
  form,
  submitLabel = 'Save habit',
  isSubmitting = false,
  showCancelButton = false,
  children,
  onSubmit,
  onCancel,
}: HabitFormProps<TFormValues>) {
  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
      {/* Form fields */}
      {children}

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
