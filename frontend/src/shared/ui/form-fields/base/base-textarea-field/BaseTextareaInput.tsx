import { useId, type TextareaHTMLAttributes } from 'react';
import { ErrorMessage } from '../../error-message';
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

      <ErrorMessage isError={hasError} message={errorText} />
    </div>
  );
}
