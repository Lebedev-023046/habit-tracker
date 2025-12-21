export type HabitRunStatus = 'active' | 'paused' | 'built' | 'cancelled';

export interface HabitRun {
  id: string;
  habitId: string;
  status: HabitRunStatus;
  totalDays: number;
  startDate: string;
  builtAt?: string | null;
  cancelledAt?: string | null;
}

export interface StartHabitRunArgs {
  habitId: string;
  totalDays: number;
}

export type StartHabitRunPayload = Pick<StartHabitRunArgs, 'totalDays'>;

export interface ResetHabitRunPayload {
  totalDays: number;
}
