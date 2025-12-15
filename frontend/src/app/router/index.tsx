import { ROUTES } from '@/shared/config/routes';

import { RouterErrorBoundary } from '@/shared/ui/error-boundary/RouterErrorBoundary';
import { PageLoader } from '@/shared/ui/page-loader';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

const HabitDailyPage = lazy(() => import('@/pages/habit-daily/HabitDailyPage'));
const HabitManagementPage = lazy(
  () => import('@/pages/habit-management/HabitManagementPage'),
);
const HabitDashboardPage = lazy(
  () => import('@pages/habit-dashboard/HabitDashboardPage'),
);
const NotFound = lazy(() => import('@/pages/not-found/NotFound'));

const PageFallback = () => <PageLoader />;

export const router = createBrowserRouter([
  {
    path: ROUTES.habitDaily(),
    element: <AppLayout />,
    children: [
      {
        index: true,
        handle: { title: 'Today habits' },
        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitDailyPage />
          </Suspense>
        ),
        hydrateFallbackElement: <PageFallback />,
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: ROUTES.HabitManagement(),
        handle: { title: 'My Habits' },
        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitManagementPage />
          </Suspense>
        ),
        hydrateFallbackElement: <PageFallback />,
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: ROUTES.habitDashboard(':habitId'),
        handle: { title: 'Habit Dashboard' },

        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitDashboardPage />
          </Suspense>
        ),
        hydrateFallbackElement: <PageFallback />,
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
