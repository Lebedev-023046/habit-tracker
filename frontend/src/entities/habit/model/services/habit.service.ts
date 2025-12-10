import { getTodayUserDayUTC } from '@/shared/utils/time';
import { format, isSameDay, subDays } from 'date-fns';

import { HABIT_DAY_STATUS_MAP } from '@/shared/model/habit-day.model';
import { type HabitDayLog } from '../types';

export class HabitService {
  protected getHabitProgress(habitLogs: HabitDayLog[], totalDays: number) {
    if (!totalDays || !habitLogs || habitLogs.length === 0) return 0;

    let completed = 0;
    for (const log of habitLogs) {
      if (log.status === HABIT_DAY_STATUS_MAP.completed) {
        completed++;
      }
    }

    const percent = (completed / totalDays) * 100;
    return Math.round(percent);
  }

  protected getBestStreak(habitLogs: HabitDayLog[]) {
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

  protected getCurrentStreak(habitLogs: HabitDayLog[]) {
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

  protected getDayNumberSinceStart(
    habitLogs: HabitDayLog[],
    totalDays: number,
  ): number {
    if (!habitLogs?.length) return 0;

    return Math.min(habitLogs.length, totalDays);
  }
  protected getLastDaysProgress(habitLogs: HabitDayLog[], period: number) {
    try {
      const today = getTodayUserDayUTC();

      const normalizedLogs = habitLogs.map(log => ({
        ...log,
        date: new Date(log.date as string),
      }));

      const result = [];

      // строим даты: от today-(period-1) до today
      for (let i = period - 1; i >= 0; i--) {
        const day = subDays(today, i); // тоже "дни пользователя", в UTC

        const foundLog = normalizedLogs.find(l => isSameDay(l.date, day));

        const status = foundLog?.status ?? HABIT_DAY_STATUS_MAP.unmarked;

        result.push({
          weekday: format(day, 'EEE'),
          status,
        });
      }

      return result;
    } catch (error) {
      console.error(error);

      const unmarkedPeriod = period ?? 7;
      return Array.from({ length: unmarkedPeriod }).map(() => ({
        weekday: format(new Date(), 'EEE'),
        status: HABIT_DAY_STATUS_MAP.unmarked,
      }));
    }
  }
}

export const habitService = new HabitService();
