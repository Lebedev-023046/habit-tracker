// features/auth/model/auth.store.ts
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

  unauthenticate: () => set({ status: 'unauthenticated' }),
}));
