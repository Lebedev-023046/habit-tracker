import { ROUTES } from '@/shared/config/routes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authRepo } from '../api/authRepo';
import type { RegisterFormValues } from '../register/model/register.schema';
import { useAuthStore } from '../session/model/auth.store';

export function useRegister() {
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();

  const {
    mutate: register,
    isPending,
    isError,
    error,
  } = useMutation<
    { accessToken: string },
    Error,
    RegisterFormValues & { timezone?: string }
  >({
    mutationFn: authRepo.register,
    onSuccess: ({ accessToken }) => {
      authenticate(accessToken);
      navigate(ROUTES.habitDaily());
    },
  });

  return {
    register,
    error,
    isError,
    isPending,
  };
}
