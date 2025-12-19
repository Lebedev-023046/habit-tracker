import { type InputHTMLAttributes } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ErrorMessage } from '../../error-message';
import styles from './BaseCheckbox.module.css';

interface BaseCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string;
  errorText?: string;
  wrapperClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function BaseCheckbox({
  label,
  errorText,
  wrapperClassName,
  checkboxClassName,
  labelClassName,
  errorClassName,
  ...rest
}: BaseCheckboxProps) {
  const hasError = Boolean(errorText);

  return (
    <div className={`${styles.field} ${wrapperClassName ?? ''}`}>
      <label className={styles.wrapper}>
        <input {...rest} type="checkbox" className={styles.native} />
        <span className={styles.box}>
          <FaCheck color="var(--bg-color-primary)" className={styles.check} />
        </span>
        <span className={styles.label}>Start habit immediately</span>
      </label>

      <ErrorMessage isError={hasError} message={errorText} />
    </div>
  );
}
