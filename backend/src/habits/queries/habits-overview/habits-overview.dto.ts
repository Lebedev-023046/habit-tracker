import { HabitDayStatus, HabitStatus } from '@prisma/client';

interface DayProgress {
  weekday: string;
  status: HabitDayStatus;
}

export class HabitsOverviewListDto {
  id: string;
  title: string;
  status: HabitStatus;

  totalDays: number;
  daySinceStart: number;

  progress: number;
  currentStreak: number;
  bestStreak: number;

  lastDaysProgress: DayProgress[];
}
