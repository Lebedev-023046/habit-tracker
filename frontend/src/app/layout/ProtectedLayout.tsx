import { useAuthStore } from '@/features/auth/session/model/auth.store';
import { PageLoader } from '@/shared/ui/page-loader';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  const status = useAuthStore(s => s.status);

  if (status === 'unknown') {
    return <PageLoader />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
