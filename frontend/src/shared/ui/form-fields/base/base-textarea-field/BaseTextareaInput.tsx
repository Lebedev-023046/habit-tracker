import { useId, type TextareaHTMLAttributes } from 'react';
import styles from './BaseTextareaInput.module.css';

interface BaseTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  errorText?: string;
  wrapperClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function BaseTextareaInput({
  label,
  errorText,
  wrapperClassName,
  textareaClassName,
  labelClassName,
  errorClassName,
  ...rest
}: BaseTextareaProps) {
  const textareaId = useId();

  const hasError = Boolean(errorText);
  const errorOpenClassName = hasError ? styles.errorOpen : '';

  return (
    <div className={`${styles.field} ${wrapperClassName ?? ''}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`${styles.label} ${labelClassName ?? ''}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={`${styles.textarea} ${textareaClassName ?? ''}`}
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
