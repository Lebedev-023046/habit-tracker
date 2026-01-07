import { useMutation } from '@tanstack/react-query';
import { authRepo } from '../api/authRepo';
import type { GoogleAuthPayload } from '../api/types';
import { useAuthStore } from '../session/model/auth.store';

export function useGoogleAuth() {
  const { authenticate, startAuthenticating, markUnauthenticated } =
    useAuthStore();

  const {
    mutate: googleAuth,
    isPending,
    isError,
    error,
  } = useMutation<{ accessToken: string }, Error, GoogleAuthPayload>({
    mutationFn: authRepo.googleAuth,
    onMutate: () => startAuthenticating(),
    onSuccess: ({ accessToken }) => authenticate(accessToken),
    onError: () => markUnauthenticated(),
  });

  return {
    googleAuth,
    isError,
    error,
    isPending,
  };
}
