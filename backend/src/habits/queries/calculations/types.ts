import { HabitDayStatus } from '@prisma/client';

export interface DayProgress {
  weekday: string;
  status: HabitDayStatus;
}
