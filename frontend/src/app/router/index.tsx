import HabitDailyPage from '@/pages/habit-daily/HabitDailyPage';
import NotFound from '@/pages/not-found/NotFound';
import { ROUTES } from '@/shared/config/routes';
import HabitBoardPage from '@pages/habit-board/HabitBoardPage';
import HabitDashboardPage from '@pages/habit-dashboard/HabitDashboardPage';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: ROUTES.habitDaily(),
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HabitDailyPage />,
        handle: { title: 'Today habits' },
      },
      {
        path: ROUTES.habitBoard(),
        element: <HabitBoardPage />,
        handle: { title: 'Habit Management' },
      },
      {
        path: ROUTES.habitDashboard(':habitId'),
        element: <HabitDashboardPage />,
        handle: { title: 'Habit Dashboard' },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
