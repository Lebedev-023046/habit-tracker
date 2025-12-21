import type { HabitStatus } from '@/entities/habit';
import type { HabitAction } from './types';

export const HABIT_ACTIONS_BY_STATUS: Record<HabitStatus, HabitAction[]> = {
  planned: ['edit', 'start', 'delete'],
  active: ['edit', 'pause', 'build', 'cancel', 'delete'],
  paused: ['edit', 'resume', 'cancel', 'delete'],
  built: ['delete'],
  cancelled: ['delete'],
};
