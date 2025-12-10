export const HABIT_DAY_STATUS = ['completed', 'missed', 'unmarked'] as const;

export type HabitDayStatus = (typeof HABIT_DAY_STATUS)[number];

export const HABIT_DAY_STATUS_MAP = Object.fromEntries(
  HABIT_DAY_STATUS.map(s => [s, s]),
) as Record<HabitDayStatus, HabitDayStatus>;

export interface DayProgress {
  weekday: string;
  status: HabitDayStatus;
}
