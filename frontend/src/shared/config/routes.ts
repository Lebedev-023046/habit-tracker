export const ROUTES = {
  home: () => '/',
  habitsOverview: () => '/habits-overview',
  habitBoard: () => '/habits/board',
  habitDashboard: (habitId: string) => `/habits/${habitId}/dashboard`,
  // habitDaily: () => '/habits/daily',
  habitDaily: () => '/',

  notFound: '*',
} as const;
