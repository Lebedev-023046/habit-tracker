import type { DateValue } from '@/shared/types';

import { getTodayUTC, getUserDayUTC } from '@/shared/utils/time';

import {
  HABIT_DAY_STATUS_MAP,
  type DayProgress,
  type HabitDayStatus,
} from '@/shared/model/habit-day.model';
import { format, isSameDay, subDays } from 'date-fns';
import type { HabitStatus } from '../types';
import type { DashboardResponse } from '../types/dashboard';

export interface DashboardHabitItem {
  id: string;
  title: string;
  status: HabitStatus;

  completedDays: number;
  missedDays: number;

  plannedEndDate: DateValue;
  restDays: number;
  progress: number;

  lastDaysProgress: DayProgress[];

  currentStreak: number;
  bestStreak: number;
}

class HabitDashoardService {
  constructor() {
    this.buildDashboardViewModel = this.buildDashboardViewModel.bind(this);
  }

  emptyDashboardHabit: DashboardHabitItem = {
    id: '',
    title: '',
    status: 'planned',

    plannedEndDate: new Date(),
    restDays: 0,

    progress: 0,

    completedDays: 0,
    missedDays: 0,

    lastDaysProgress: [],

    currentStreak: 0,
    bestStreak: 0,
  };

  buildDashboardViewModel(data?: DashboardResponse): DashboardHabitItem {
    if (!data || !data.run) {
      return this.emptyDashboardHabit;
    }

    const { habit, run, logs } = data;

    const startDate = new Date(run.startDate).toISOString();

    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,

      completedDays: run.stats.completedDays,
      missedDays: run.stats.missedDays,

      progress: run.progress.percent,
      currentStreak: run.streak.current,
      bestStreak: run.streak.best,

      plannedEndDate: this.getPlannedEndDate(startDate, run.totalDays),
      restDays: this.getRestDays(startDate, run.totalDays),

      lastDaysProgress: this.getLastDaysProgress(logs, 14),
    };
  }

  private getPlannedEndDate(startDate: string, totalDays: number): Date {
    const end = new Date(startDate);
    end.setUTCDate(end.getUTCDate() + totalDays - 1);
    return getUserDayUTC(end);
  }

  private getRestDays(startDate: string, totalDays: number): number {
    const today = getTodayUTC();
    const plannedEnd = this.getPlannedEndDate(startDate, totalDays);

    const diffMs = plannedEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return Math.max(diffDays, 0);
  }

  private getLastDaysProgress(
    logs: { date: string; status: HabitDayStatus }[],
    period: number,
  ) {
    const today = getTodayUTC();

    const normalizedLogs = logs.map(log => ({
      ...log,
      date: getUserDayUTC(new Date(log.date)),
    }));

    return Array.from({ length: period }).map((_, index) => {
      const day = subDays(today, period - index - 1);

      const foundLog = normalizedLogs.find(l => isSameDay(l.date, day));

      return {
        weekday: format(day, 'EEE'),
        status: foundLog?.status ?? HABIT_DAY_STATUS_MAP.unmarked,
      };
    });
  }
}

export const habitDashboardService = new HabitDashoardService();
