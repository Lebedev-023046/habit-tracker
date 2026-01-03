import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { BaseTextInput } from '../../base/base-text-field';

interface FormTextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;

  // icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  autoComplete?: string;

  // проброс стилей при желании
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,

  leftIcon,
  rightIcon,

  autoComplete,

  wrapperClassName,
  inputClassName,
  labelClassName,
  errorClassName,
}: FormTextFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <BaseTextInput
      autoFocus
      {...field}
      type={type}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      wrapperClassName={wrapperClassName}
      inputClassName={inputClassName}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      errorText={error?.message}
      autoComplete={autoComplete}
    />
  );
}
