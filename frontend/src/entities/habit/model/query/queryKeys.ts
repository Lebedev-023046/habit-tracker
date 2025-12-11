import type { GetAllHabitsQuery } from '../../api/types';

export const habitQueryKeys = {
  root: ['habits'] as const,
  list: (params?: GetAllHabitsQuery) =>
    params
      ? ([...habitQueryKeys.root, 'list', params] as const)
      : ([...habitQueryKeys.root, 'list'] as const),

  // all: () => [...habitQueryKeys.root, 'all'] as const,
  // active: () => [...habitQueryKeys.root, 'active'] as const,
  // byParams: <T>(params?: T) => [...habitQueryKeys.all(), params] as const,
};

export type HabitQueryKeys = typeof habitQueryKeys;
