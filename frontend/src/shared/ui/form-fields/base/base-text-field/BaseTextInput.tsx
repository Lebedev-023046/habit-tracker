import { useId, type InputHTMLAttributes } from 'react';
import { ErrorMessage } from '../../error-message';
import styles from './BaseTextInput.module.css';

interface BaseTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  errorText?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function BaseTextInput({
  label,
  errorText,
  wrapperClassName,
  inputClassName,
  labelClassName,
  errorClassName,
  ...rest
}: BaseTextInputProps) {
  const inputId = useId();

  const hasError = Boolean(errorText);

  return (
    <div className={`${styles.field} ${wrapperClassName ?? ''}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${labelClassName ?? ''}`}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`${styles.input} ${inputClassName ?? ''}`}
        {...rest}
      />

      <ErrorMessage isError={hasError} message={errorText} />
    </div>
  );
}
