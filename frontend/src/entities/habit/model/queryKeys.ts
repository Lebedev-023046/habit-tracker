export const habitQueryKeys = {
  root: ['tasks'] as const,
  all: () => [...habitQueryKeys.root, 'all'] as const,
  byParams: <T>(params?: T) => [...habitQueryKeys.all(), params] as const,
};
