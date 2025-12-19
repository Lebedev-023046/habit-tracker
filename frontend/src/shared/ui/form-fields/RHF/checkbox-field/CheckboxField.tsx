import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { BaseCheckbox } from '../../base/base-checkbox';

interface CheckboxFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  disabled?: boolean;

  // проброс стилей при желании
  wrapperClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function CheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  disabled,
  wrapperClassName,
  checkboxClassName,
  labelClassName,
  errorClassName,
}: CheckboxFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <BaseCheckbox
      checked={Boolean(field.value)}
      onChange={e => field.onChange(e.target.checked)}
      onBlur={field.onBlur}
      name={field.name}
      disabled={disabled}
      label={label}
      wrapperClassName={wrapperClassName}
      checkboxClassName={checkboxClassName}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      errorText={error?.message}
    />
  );
}
