export const HABIT_STATUS_MAP = {
  planned: 'planned',
  active: 'active',
  paused: 'paused',
  built: 'built',
  cancelled: 'cancelled',
} as const;
export const TOTAL_DAYS_VALUES = [30, 45, 60] as const;
export const CREATE_HABIT_STATUS = ['planned', 'active'] as const;

export const HABIT_STATUSES = Object.values(HABIT_STATUS_MAP);
