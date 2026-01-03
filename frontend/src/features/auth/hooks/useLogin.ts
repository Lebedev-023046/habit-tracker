import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
import { ROUTES } from '@/shared/config/routes';
import { toast } from '@/shared/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authRepo } from '../api/authRepo';
import type { LoginFormValues } from '../login/model/login.schema';
import { useAuthStore } from '../session/model/auth.store';

export function useLogin() {
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation<{ accessToken: string }, Error, LoginFormValues>({
    mutationFn: authRepo.login,
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
    login,
    isError,
    error,
    isPending,
  };
}
