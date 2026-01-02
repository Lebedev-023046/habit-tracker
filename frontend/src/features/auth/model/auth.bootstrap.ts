import { refreshAccessToken } from '@/shared/api/refresh';
import { tokenStore } from '@/shared/api/token.store';
import { useAuthStore } from './auth.store';

export async function bootstrapAuth() {
  try {
    const token = await refreshAccessToken();
    tokenStore.set(token);
    useAuthStore.getState().setAuthenticated();
  } catch {
    useAuthStore.getState().logout();
  }
}
