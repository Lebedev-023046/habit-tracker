import { initAuthListener } from '@/features/auth/session/model/auth-listener';
import { bootstrapAuth } from '@/features/auth/session/model/auth.bootstrap';
import { useEffect, type PropsWithChildren } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    initAuthListener();
    bootstrapAuth();
  }, []);

  return <>{children}</>;
}
