export const habitsOverviewQueryKeys = {
  root: ['habit-overview'] as const,
  list: () => [...habitsOverviewQueryKeys.root, 'list'] as const,
};
