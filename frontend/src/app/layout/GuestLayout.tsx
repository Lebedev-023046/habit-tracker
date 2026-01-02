import { useAuthStore } from '@/features/auth/model/auth.store';
import { ROUTES } from '@/shared/config/routes';
import { Navigate, Outlet } from 'react-router-dom';

export function GuestLayout() {
  const status = useAuthStore(s => s.status);

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.habitDaily()} replace />;
  }

  return <Outlet />;
}
