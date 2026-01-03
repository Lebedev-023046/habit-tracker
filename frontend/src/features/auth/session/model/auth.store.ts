import { tokenStore } from '@/shared/api/token.store';
import { create } from 'zustand';

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  authenticate(accessToken: string): void;
  unauthenticate(): void;
}

export const useAuthStore = create<AuthState>(set => ({
  status: 'unknown',

  authenticate: (accessToken: string) => {
    tokenStore.set(accessToken);
    set({ status: 'authenticated' });
  },

  unauthenticate: () => {
    tokenStore.clear();
    set({ status: 'unauthenticated' });
  },
}));
