import { useId, type InputHTMLAttributes } from 'react';
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
  const errorOpenClassName = hasError ? styles.errorOpen : '';

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

      <div
        className={`${styles.error} ${errorClassName ?? ''} ${errorOpenClassName}`}
      >
        <div className={styles.errorContent}>
          <p>{errorText}</p>
        </div>
      </div>
    </div>
  );
}
