import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useRegister';
import { registerSchema, type RegisterFormValues } from './register.schema';

export function useRegisterForm() {
  const { register, isPending } = useRegister();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async values => {
    register(values);
  });

  return {
    control,
    isPending,
    onSubmit,
  };
}
