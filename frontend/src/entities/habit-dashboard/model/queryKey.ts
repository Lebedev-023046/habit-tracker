export const habitDashboardQueryKeys = {
  root: ['habit-dashboard'] as const,
  byId: (habitId: string) =>
    [...habitDashboardQueryKeys.root, 'dashboard', habitId] as const,
};
