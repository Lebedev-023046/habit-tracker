import type { DateType } from '@/shared/types';

import { getTodayUserDayUTC, getUserDayUTC } from '@/shared/utils/time';

import {
  HABIT_DAY_STATUS_MAP,
  type DayProgress,
} from '@/shared/model/habit-day.model';
import type { Habit, HabitDayLog, HabitStatus } from '../types';
import { HabitService } from './habit.service';

export interface DashboardHabitViewModel {
  id: string;
  title: string;
  status: HabitStatus;

  plannedEndDate: DateType;
  restDays: number;
  progress: number;

  completedDays: number;
  missedDays: number;

  lastDaysProgress: DayProgress[];

  currentStreak: number;
  bestStreak: number;
}

class HabitDashoardService extends HabitService {
  constructor() {
    super();
  }

  emptyDashboardHabit: DashboardHabitViewModel = {
    id: '',
    title: '',
    plannedEndDate: '',
    restDays: 0,
    progress: 0,
    completedDays: 0,
    missedDays: 0,
    lastDaysProgress: [],
    currentStreak: 0,
    bestStreak: 0,
    status: 'planned',
  };

  private getDayStatusStats(dayLogs: HabitDayLog[]) {
    if (!dayLogs?.length) {
      return { completedDays: 0, missedDays: 0 };
    }

    let completedDays = 0;
    let missedDays = 0;

    for (const log of dayLogs) {
      switch (log.status) {
        case HABIT_DAY_STATUS_MAP.completed:
          completedDays++;
          break;
        case HABIT_DAY_STATUS_MAP.missed:
          missedDays++;
          break;
      }
    }

    return { completedDays, missedDays };
  }

  private getPlannedEndDate(startDate: DateType, totalDays: number): Date {
    const end = new Date(startDate as string);
    end.setUTCDate(end.getUTCDate() + totalDays - 1);

    return getUserDayUTC(end);
  }

  private getRestDays(
    startDate: DateType,
    totalDays: number,
    today: Date = getTodayUserDayUTC(),
  ): number {
    const plannedEnd = this.getPlannedEndDate(startDate, totalDays);

    const diffMs = plannedEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return Math.max(diffDays, 0);
  }

  buildDashboardModel(habit?: Habit): DashboardHabitViewModel {
    if (!habit) return this.emptyDashboardHabit;

    const { id, title, status, dayLogs, totalDays } = habit;

    const { completedDays, missedDays } = this.getDayStatusStats(dayLogs);

    return {
      id,
      title,
      status,
      completedDays,
      missedDays,
      restDays: this.getRestDays(habit.startDate, totalDays),
      plannedEndDate: this.getPlannedEndDate(habit.startDate, totalDays),
      progress: this.getHabitProgress(dayLogs, totalDays),
      lastDaysProgress: this.getLastDaysProgress(dayLogs, 14),
      currentStreak: this.getCurrentStreak(dayLogs),
      bestStreak: this.getBestStreak(dayLogs),
    };
  }
}

export const habitDashboardService = new HabitDashoardService();
