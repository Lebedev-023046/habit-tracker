import { format, isSameDay, startOfDay, subDays } from 'date-fns';
import { HABIT_DAY_STATUS_MAP } from '../constants';
import { type HabitDayLog } from '../types';

export class HabitService {
  getLastDaysProgress(habitLogs: HabitDayLog[], period: number) {
    try {
      const today = startOfDay(new Date());

      const normalizedLogs = habitLogs.map(log => ({
        ...log,
        date: startOfDay(new Date(log.date as string)),
      }));

      const result = [];

      // строим даты: от today-(period-1) до today
      for (let i = period - 1; i >= 0; i--) {
        const day = subDays(today, i);

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
