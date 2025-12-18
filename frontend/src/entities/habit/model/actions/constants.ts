import type { HabitAction, HabitStatus } from '../types';

export const HABIT_ACTIONS_BY_STATUS: Record<HabitStatus, HabitAction[]> = {
  planned: ['edit', 'activate', 'cancel', 'delete'],
  active: ['edit', 'pause', 'build', 'cancel', 'delete'],
  paused: ['edit', 'activate', 'cancel', 'delete'],
  built: ['delete'],
  cancelled: ['delete'],
};
