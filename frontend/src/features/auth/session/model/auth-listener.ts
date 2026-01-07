import { authEvents } from '@/shared/auth/auth-events';
import { useAuthStore } from './auth.store';

export function initAuthListener() {
  authEvents.onUnauthorized(() => {
    useAuthStore.getState().unauthenticate();
  });
}
