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
  console.log({ logs });

  if (logs.length === 0) {
    return Array.from({ length: period }).map((_, index) => {
      const day = subDays(today, period - 1 - index);

      return {
        weekday: format(day, 'EEE'),
        status: HabitDayStatus.unmarked,
      };
    });
  }

  return Array.from({ length: period }).map((_, index) => {
    const day = subDays(today, period - 1 - index);

    const logForDay = logs.find((log) => isSameDay(log.date, day));

    return {
      weekday: format(day, 'EEE'),
      status: logForDay?.status ?? HabitDayStatus.unmarked,
    };
  });
}
