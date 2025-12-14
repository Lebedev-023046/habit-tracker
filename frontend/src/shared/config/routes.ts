export const ROUTES = {
  home: () => '/',
  HabitManagement: () => '/habit-management',
  habitBoard: () => '/habits/board',
  habitDashboard: (habitId: string) => `/habits/${habitId}/dashboard`,
  // habitDaily: () => '/habits/daily',
  habitDaily: () => '/',

  notFound: '*',
} as const;
