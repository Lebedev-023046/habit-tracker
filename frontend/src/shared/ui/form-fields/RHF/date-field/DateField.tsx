import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { BaseDatePicker } from '../../base/base-date-picker';

interface FormDateFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  label?: string;
  placeholder?: string;
  disabled?: boolean;

  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function DateField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  wrapperClassName,
  inputClassName,
  labelClassName,
  errorClassName,
}: FormDateFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const value = field.value as Date | undefined;

  return (
    <BaseDatePicker
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={date => field.onChange(date)}
      disabled={disabled}
      wrapperClassName={wrapperClassName}
      inputClassName={inputClassName}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      errorText={error?.message}
    />
  );
}
