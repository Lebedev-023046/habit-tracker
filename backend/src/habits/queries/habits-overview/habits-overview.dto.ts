import { HabitStatus } from '@prisma/client';
import { DayProgress } from '../calculations/types';

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
