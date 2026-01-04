import { useAuthStore } from '@/features/auth/session/model/auth.store';
import { PageLoader } from '@/shared/ui/page-loader';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  const status = useAuthStore(state => state.status);

  if (status === 'unknown') {
    return <PageLoader />;
  }

  return <RouterProvider router={router} />;
}
