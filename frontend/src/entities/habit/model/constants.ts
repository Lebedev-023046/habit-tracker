import type { HabitDayStatus } from './types';

export const HABIT_STATUS = [
  'planned',
  'active',
  'paused',
  'built',
  'cancelled',
] as const;
export const TOTAL_DAYS_VALUES = [30, 45, 60] as const;
export const CREATE_HABIT_STATUS = ['planned', 'active'] as const;
export const HABIT_DAY_STATUS = ['completed', 'missed', 'unmarked'] as const;

export const HABIT_DAY_STATUS_MAP = Object.fromEntries(
  HABIT_DAY_STATUS.map(s => [s, s]),
) as Record<HabitDayStatus, HabitDayStatus>;
