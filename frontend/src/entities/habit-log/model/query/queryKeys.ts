export const habitLogQueryKeys = {
  root: ['habitLogs'] as const,

  byHabit: (habitId: string) =>
    [...habitLogQueryKeys.root, 'byHabit', habitId] as const,

  byHabitAndDate: (habitId: string, date: string) =>
    [...habitLogQueryKeys.byHabit(habitId), 'date', date] as const,
};

export type HabitLogQueryKeys = typeof habitLogQueryKeys;
