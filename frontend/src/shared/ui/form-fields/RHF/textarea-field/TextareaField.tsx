import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { BaseTextareaInput } from '../base/base-textarea-field';

interface FormTextareaFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;

  wrapperClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  rows = 3,
  wrapperClassName,
  textareaClassName,
  labelClassName,
  errorClassName,
}: FormTextareaFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <BaseTextareaInput
      {...field}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      wrapperClassName={wrapperClassName}
      textareaClassName={textareaClassName}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      errorText={error?.message}
    />
  );
}
