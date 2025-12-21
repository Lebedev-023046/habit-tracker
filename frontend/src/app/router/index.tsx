import { ROUTES } from '@/shared/config/routes';

import { RouterErrorBoundary } from '@/shared/ui/error-boundary/RouterErrorBoundary';
import { PageLoader } from '@/shared/ui/page-loader';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

const DailyHabitsPage = lazy(
  () => import('@/pages/daily-habits/DailyHabitsPage'),
);
const HabitsOverviewPage = lazy(
  () => import('@/pages/habits-overview/HabitsOverviewPage'),
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
            <DailyHabitsPage />
          </Suspense>
        ),
        hydrateFallbackElement: <PageFallback />,
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
