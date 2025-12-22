import { HabitDayStatus } from '@prisma/client';
import { format, isSameDay, subDays } from 'date-fns';
import { DayProgress } from './types';

/**
 * Возвращает прогресс за последние N дней (включая today).
 */
export function getLastDaysProgress(
  logs: { date: Date; status: HabitDayStatus }[],
  period: number,
  today: Date,
): DayProgress[] {
  const normalizedLogs = logs.map((log) => ({
    date: log.date,
    status: log.status,
  }));

  return Array.from({ length: period }).map((_, index) => {
    const day = subDays(today, period - 1 - index);

    const logForDay = normalizedLogs.find((log) => isSameDay(log.date, day));

    return {
      weekday: format(day, 'EEE'),
      status: logForDay?.status ?? HabitDayStatus.unmarked,
    };
  });
}
