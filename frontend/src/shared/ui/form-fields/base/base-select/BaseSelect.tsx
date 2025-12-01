import Select, {
  type ClassNamesConfig,
  type Props as ReactSelectProps,
  type StylesConfig,
} from 'react-select';
import styles from './BaseSelect.module.css';

export type SelectOption = {
  value: string | number;
  label: string;
};

interface BaseSelectProps
  extends Omit<
    ReactSelectProps<SelectOption, boolean>,
    'className' | 'options' | 'value' | 'onChange' | 'classNames'
  > {
  label?: string;
  errorText?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  selectClassName?: string;

  options: SelectOption[];
  value: SelectOption | SelectOption[] | undefined;
  onChange: (option: SelectOption | SelectOption[] | undefined) => void;

  styles?: StylesConfig<SelectOption, boolean>;
  classNames?: ClassNamesConfig<SelectOption, boolean>;
}

export function BaseSelect({
  label,
  errorText,
  wrapperClassName,
  labelClassName,
  errorClassName,
  selectClassName,
  options,
  value,
  onChange,
  ...rest
}: BaseSelectProps) {
  const hasError = Boolean(errorText);
  const errorOpenClassName = hasError ? styles.errorOpen : '';
  return (
    <div className={`${styles.field} ${wrapperClassName ?? ''}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName ?? ''}`}>
          {label}
        </label>
      )}

      <Select
        className={selectClassName}
        classNamePrefix="select"
        options={options}
        value={value}
        onChange={option => onChange(option as SelectOption)}
        styles={styles}
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
