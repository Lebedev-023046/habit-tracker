import type { DayProgress } from '@/shared/ui/daily-calendar-progress/DailyCalendarProgress';
import { getTodayUserDayUTC } from '@/shared/utils/time';
import { isSameDay } from 'date-fns';
import { HABIT_DAY_STATUS_MAP } from '../constants';
import type { Habit, HabitDayLog, HabitDayStatus } from '../types';
import { HabitService } from './habit.service';

export interface DailyHabitViewModel {
  id: string;
  title: string;
  daySinceStart: number;
  totalDays: number;
  progress: number;
  currentStreak: number;
  bestStreak: number;
  todayStatus: HabitDayStatus;
  lastWeekProgress: DayProgress[];
}

export class HabitDailyService extends HabitService {
  constructor() {
    super();
  }

  private getHabitProgress(habitLogs: HabitDayLog[], totalDays: number) {
    if (!habitLogs || habitLogs.length === 0) return 0;

    let completed = 0;
    for (const log of habitLogs) {
      if (log.status === HABIT_DAY_STATUS_MAP.completed) {
        completed++;
      }
    }

    const percent = (completed / totalDays) * 100;
    return Math.round(percent);
  }

  private getBestStreak(habitLogs: HabitDayLog[]) {
    if (!habitLogs || habitLogs.length === 0) return 0;

    let best = 0;
    let current = 0;

    for (const log of habitLogs) {
      if (log.status === HABIT_DAY_STATUS_MAP.completed) {
        current += 1;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    }

    return best;
  }

  private getCurrentStreak(habitLogs: HabitDayLog[]) {
    if (!habitLogs || habitLogs.length === 0) return 0;

    let streak = 0;

    let i = habitLogs.length - 1;
    const lastLog = habitLogs[i];

    if (lastLog.status === HABIT_DAY_STATUS_MAP.unmarked) {
      i -= 1;
    }

    for (; i >= 0; i--) {
      const log = habitLogs[i];

      if (log.status === HABIT_DAY_STATUS_MAP.completed) {
        streak += 1;
        continue;
      }

      // любой missed или unmarked в прошлом дне — обрывает стрик
      break;
    }

    return streak;
  }

  private getTodayStatus(dayLogs: HabitDayLog[]): HabitDayStatus {
    try {
      if (!dayLogs?.length) {
        return HABIT_DAY_STATUS_MAP.unmarked;
      }

      const todayUTC = getTodayUserDayUTC();

      const logForToday = dayLogs.find(log =>
        isSameDay(new Date(log.date as string), todayUTC),
      );

      return logForToday?.status ?? HABIT_DAY_STATUS_MAP.unmarked;
    } catch (error) {
      console.error(error);
      return HABIT_DAY_STATUS_MAP.unmarked;
    }
  }

  buildDailyModel(habit: Habit): DailyHabitViewModel {
    if (!habit)
      return {
        id: '',
        title: '',
        daySinceStart: 0,
        totalDays: 0,
        progress: 0,
        currentStreak: 0,
        bestStreak: 0,
        todayStatus: HABIT_DAY_STATUS_MAP.unmarked,
        lastWeekProgress: [],
      };

    const { id, title, dayLogs, totalDays } = habit;

    return {
      id,
      title,
      daySinceStart: this.getDayNumberSinceStart(dayLogs, totalDays),
      totalDays: habit.totalDays,
      progress: this.getHabitProgress(dayLogs, totalDays),
      currentStreak: this.getCurrentStreak(dayLogs),
      bestStreak: this.getBestStreak(dayLogs),
      lastWeekProgress: this.getLastDaysProgress(dayLogs, 7),
      todayStatus: this.getTodayStatus(dayLogs),
    };
  }
}

export const habitDailyService = new HabitDailyService();
