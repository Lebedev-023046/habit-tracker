export const habitRunQueryKeys = {
  root: ['habitRun'] as const,
  byHabit: (habitId: string) => [...habitRunQueryKeys.root, habitId] as const,
};
