// features/auth/model/auth.bootstrap.ts

import { refreshAccessToken } from '@/shared/api/refresh';
import { useAuthStore } from './auth.store';

export async function bootstrapAuth() {
  try {
    const { accessToken } = await refreshAccessToken();

    useAuthStore.getState().authenticate(accessToken);
  } catch {
    useAuthStore.getState().unauthenticate();
  }
}
