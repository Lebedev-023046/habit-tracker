// pages/auth/register/model/useRegisterForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import { loginSchema, type LoginFormValues } from './login.schema';

export function useLoginForm() {
  const { login, isPending, error, isError } = useLogin();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async values => {
    login(values);
  });

  return {
    control,
    isPending,
    error,
    isError,
    onSubmit,
  };
}
