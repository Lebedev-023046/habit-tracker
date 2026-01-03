import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
import { ROUTES } from '@/shared/config/routes';
import { toast } from '@/shared/lib/toast';
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
    error,
  } = useMutation<{ accessToken: string }, Error, RegisterFormValues>({
    mutationFn: authRepo.register,
    onSuccess: ({ accessToken }) => {
      authenticate(accessToken);
      navigate(ROUTES.habitDaily());
    },
    onError: error => {
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return {
    register,
    error,
    isPending,
  };
}
