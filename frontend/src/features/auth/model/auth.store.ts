import { create } from 'zustand';

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  setAuthenticated(): void;
  logout(): void;
}

export const useAuthStore = create<AuthState>(set => ({
  status: 'unknown',

  setAuthenticated: () => set({ status: 'authenticated' }),

  logout: () => set({ status: 'unauthenticated' }),
}));
