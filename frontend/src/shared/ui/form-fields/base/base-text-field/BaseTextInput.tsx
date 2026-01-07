import { useId, type InputHTMLAttributes } from 'react';
import { ErrorMessage } from '../../error-message';
import styles from './BaseTextInput.module.css';

interface BaseTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  errorText?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  autoComplete?: string;

  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function BaseTextInput({
  label,
  errorText,
  autoComplete,
  leftIcon,
  rightIcon,

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

      <div className={`${styles.inputWrapper} ${hasError ? styles.error : ''}`}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <input
          id={inputId}
          autoComplete={autoComplete}
          className={`${styles.input} ${inputClassName ?? ''}`}
          {...rest}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      <ErrorMessage isError={hasError} message={errorText} />
    </div>
  );
}
