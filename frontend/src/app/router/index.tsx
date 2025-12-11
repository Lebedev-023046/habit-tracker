import { ROUTES } from '@/shared/config/routes';

import { habitBoardLoader } from '@/pages/habit-board/loader';
import { dailyHabitsLoader } from '@/pages/habit-daily/loader';
import { habitDashboardLoader } from '@/pages/habit-dashboard/loader';
import { RouterErrorBoundary } from '@/shared/ui/error-boundary/RouterErrorBoundary';
import { PageLoader } from '@/shared/ui/page-loader';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

const HabitDailyPage = lazy(() => import('@/pages/habit-daily/HabitDailyPage'));
const HabitBoardPage = lazy(() => import('@pages/habit-board/HabitBoardPage'));
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
        loader: dailyHabitsLoader,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitDailyPage />
          </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: ROUTES.habitBoard(),
        handle: { title: 'Habit Management' },
        loader: habitBoardLoader,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitBoardPage />
          </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: ROUTES.habitDashboard(':habitId'),
        handle: { title: 'Habit Dashboard' },
        loader: habitDashboardLoader,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HabitDashboardPage />
          </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
