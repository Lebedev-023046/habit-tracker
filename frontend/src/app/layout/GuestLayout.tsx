import { useAuthStore } from '@/features/auth/session/model/auth.store';
import { ROUTES } from '@/shared/config/routes';
import { PageLoader } from '@/shared/ui/page-loader';
import { Navigate, Outlet } from 'react-router-dom';

export function GuestLayout() {
  const status = useAuthStore(s => s.status);

  if (status === 'unknown') {
    return <PageLoader />;
  }

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.habitDaily()} replace />;
  }

  return <Outlet />;
}
