import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker, UI } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CiCalendar } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import { ErrorMessage } from '../../error-message';
import styles from './BaseDatePicker.module.css';

interface BaseDatePickerProps {
  label?: string;
  placeholder?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  errorText?: string;

  // классы как в других компонентах
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;

  disabled?: boolean;
}

export function BaseDatePicker({
  label,
  placeholder = 'Select date',
  value,
  onChange,
  errorText,
  wrapperClassName,
  inputClassName,
  labelClassName,
  disabled,
}: BaseDatePickerProps) {
  const hasError = Boolean(errorText);

  const { ref: popoverRef } = useClickOutside<HTMLDivElement>(() =>
    setOpen(false),
  );

  const [open, setOpen] = useState(false);

  const formatted = value ? format(value, 'dd.MM.yyyy') : '';

  const handleSelect = (date?: Date) => {
    onChange(date);
    setOpen(false);
  };

  const openDatePicker = () => {
    if (!disabled) setOpen(true);
  };

  return (
    <div className={`${styles.field} ${wrapperClassName ?? ''}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName ?? ''}`}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          type="text"
          readOnly
          disabled={disabled}
          value={formatted}
          placeholder={placeholder}
          onClick={() => openDatePicker()}
          className={`${styles.input} ${inputClassName ?? ''} ${
            disabled ? styles.inputDisabled : ''
          }`}
        />
        <MdClear size="2rem" onClick={() => onChange(undefined)} />
        <CiCalendar size="2rem" onClick={() => openDatePicker()} />
      </div>

      <div
        ref={popoverRef}
        className={`${styles.popover} ${open && !disabled ? styles.popoverOpen : ''}`}
      >
        <div className={styles.popoverContent}>
          <DayPicker
            animate
            mode="single"
            navLayout="around"
            selected={value ?? undefined}
            disabled={{ before: new Date() }}
            onSelect={handleSelect}
            className={styles.calendar}
            classNames={{
              [UI.Months]: styles.rdpMonths,
              [UI.MonthCaption]: styles.monthsCaption,
              [UI.CaptionLabel]: styles.captionLabel,
              [UI.MonthGrid]: styles.monthGrid,
              [UI.Weekdays]: styles.weekdays,
            }}
          />
        </div>
      </div>

      <ErrorMessage isError={hasError} message={errorText} />
    </div>
  );
}
