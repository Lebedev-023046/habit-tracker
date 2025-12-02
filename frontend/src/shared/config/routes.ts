export const ROUTES = {
  home: () => '/',
  habitBoard: () => '/habits/board',
  habitDashboard: (habitId: string) => `/habits/${habitId}/dashboard`,
  // habitDaily: () => '/habits/daily',
  habitDaily: () => '/',

  notFound: '*',
} as const;
