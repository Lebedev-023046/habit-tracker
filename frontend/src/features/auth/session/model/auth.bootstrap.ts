// features/auth/model/auth.bootstrap.ts

import { refreshAccessToken } from '@/shared/api/refresh';
import { useAuthStore } from './auth.store';

let bootstrapped = false;

export async function bootstrapAuth() {
  if (bootstrapped) return;
  bootstrapped = true;

  const { startAuthenticating, authenticate, markUnauthenticated } =
    useAuthStore.getState();

  try {
    startAuthenticating();

    const { accessToken } = await refreshAccessToken();

    authenticate(accessToken);
  } catch {
    markUnauthenticated();
  }
}
