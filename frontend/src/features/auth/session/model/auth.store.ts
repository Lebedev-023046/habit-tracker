// features/auth/model/auth.store.ts
import { tokenStore } from '@/shared/api/token.store';
import { create } from 'zustand';

type AuthStatus =
  | 'unknown'
  | 'unauthenticated'
  | 'authenticating'
  | 'authenticated';

interface AuthState {
  status: AuthStatus;
  startAuthenticating(): void;
  authenticate(accessToken: string): void;
  unauthenticate(): void;
  markUnauthenticated(): void;
}

export const useAuthStore = create<AuthState>(set => ({
  status: 'unknown',

  startAuthenticating: () => set({ status: 'authenticating' }),

  authenticate: (accessToken: string) => {
    tokenStore.set(accessToken);
    set({ status: 'authenticated' });
  },

  unauthenticate: () => {
    tokenStore.clear();
    set({ status: 'unauthenticated' });
  },

  markUnauthenticated: () => set({ status: 'unauthenticated' }),
}));
