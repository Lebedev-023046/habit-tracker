import { ROUTES } from '@/shared/config/routes';
import { RouterErrorBoundary } from '@/shared/ui/error-boundary/RouterErrorBoundary';
import { PageLoader } from '@/shared/ui/page-loader';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layout/AppLayout';
import { GuestLayout } from '../layout/GuestLayout';
import { ProtectedLayout } from '../layout/ProtectedLayout';

const DailyHabitsPage = lazy(
  () => import('@/pages/daily-habits/DailyHabitsPage'),
);
const HabitsOverviewPage = lazy(
  () => import('@/pages/habits-overview/HabitsOverviewPage'),
);
const HabitDashboardPage = lazy(
  () => import('@/pages/habit-dashboard/HabitDashboardPage'),
);
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const NotFound = lazy(() => import('@/pages/not-found/NotFound'));

const PageFallback = () => <PageLoader />;

export const router = createBrowserRouter([
  // ======================
  // 🔒 PROTECTED ROUTES
  // ======================
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            path: ROUTES.habitDaily(),
            handle: { title: 'Today habits' },
            element: (
              <Suspense fallback={<PageFallback />}>
                <DailyHabitsPage />
              </Suspense>
            ),
            errorElement: <RouterErrorBoundary />,
          },
          {
            path: ROUTES.habitsOverview(),
            handle: { title: 'My Habits' },
            element: (
              <Suspense fallback={<PageFallback />}>
                <HabitsOverviewPage />
              </Suspense>
            ),
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
            errorElement: <RouterErrorBoundary />,
          },
        ],
      },
    ],
  },

  // ======================
  // 👤 AUTH / GUEST ROUTES
  // ======================
  {
    element: <GuestLayout />,
    children: [
      {
        path: ROUTES.auth.login(),
        element: (
          <Suspense fallback={<PageFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },

  // ======================
  // ❌ FALLBACK
  // ======================
  {
    path: '*',
    element: <NotFound />,
  },
]);
