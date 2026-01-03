import { refreshAccessToken } from '@/shared/api/refresh';
import { useAuthStore } from './auth.store';

export async function bootstrapAuth() {
  try {
    const token = await refreshAccessToken();
    useAuthStore.getState().authenticate(token);
  } catch {
    useAuthStore.getState().unauthenticate();
  }
}
