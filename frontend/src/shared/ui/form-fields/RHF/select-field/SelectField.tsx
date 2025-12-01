import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ClassNamesConfig, StylesConfig } from 'react-select';
import { BaseSelect, type SelectOption } from '../../base/base-select';

interface FormSelectFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;

  options: SelectOption[];

  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  selectClassName?: string;

  styles?: StylesConfig<SelectOption, boolean>;
  classNames?: ClassNamesConfig<SelectOption, boolean>;
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isDisabled,
  isClearable,
  classNames,
  styles,
  isMulti = false,
  options,
  wrapperClassName,
  labelClassName,
  errorClassName,
  selectClassName,
}: FormSelectFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const currentValue = field.value;

  const selectedOption = isMulti
    ? options.filter(option =>
        Array.isArray(currentValue)
          ? currentValue.includes(option.value)
          : false,
      )
    : (options.find(option => option.value === currentValue) ?? undefined);

  return (
    <BaseSelect
      label={label}
      errorText={error?.message}
      wrapperClassName={wrapperClassName}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      selectClassName={selectClassName}
      options={options}
      defaultValue={options[0]}
      value={selectedOption}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isMulti={isMulti}
      placeholder={placeholder}
      onChange={option => {
        if (isMulti) {
          const opts = option as SelectOption[] | null;
          const values = opts?.map(o => o.value) ?? [];
          field.onChange(values);
        } else {
          const opt = option as SelectOption | null;
          field.onChange(opt?.value ?? undefined);
        }
      }}
      onBlur={field.onBlur}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused
            ? 'var(--bg-color-secondary)'
            : 'var(--neutral)',
          boxShadow: 'var(--shadow-common)',
          '&:hover': {
            borderColor: 'var(--bg-color-secondary)',
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? 'var(--success)'
            : 'var(--bg-global)',
          color: 'var(--text-color-primary)',
          '&:hover': {
            backgroundColor: state.isSelected
              ? 'var(--success)'
              : 'var(--neutral)',
            color: 'var(--text-color-primary)',
          },
        }),
        ...styles,
      }}
      classNames={classNames}
    />
  );
}
