import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  autoComplete?: 'current-password' | 'new-password';
}

export function PasswordField<TForm extends FieldValues>({
  control,
  name,
  placeholder,
  autoComplete,
}: Props<TForm>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const PasswordIcon = showPassword ? (
    <BsEye size="2rem" cursor="pointer" onClick={handleShowPassword} />
  ) : (
    <BsEyeSlash size="2rem" cursor="pointer" onClick={handleShowPassword} />
  );

  return (
    <InputField
      name={name}
      placeholder={placeholder ?? name}
      type={showPassword ? 'text' : 'password'}
      leftIcon={<RiLockPasswordLine size="2rem" />}
      rightIcon={PasswordIcon}
      autoComplete={autoComplete}
      control={control}
    />
  );
}
