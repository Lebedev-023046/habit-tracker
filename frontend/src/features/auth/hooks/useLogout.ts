import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
import { ROUTES } from '@/shared/config/routes';
import { toast } from '@/shared/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authRepo } from '../api/authRepo';
import { useAuthStore } from '../session/model/auth.store';

export function useLogout() {
  const navigate = useNavigate();
  const { unauthenticate } = useAuthStore();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: authRepo.logout,
    onSuccess: () => {
      unauthenticate();
      navigate(ROUTES.auth.login());
    },

    onError: error => {
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return {
    logout,
    isPending,
  };
}
