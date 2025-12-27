import { HabitDayStatus } from '@prisma/client';
import { format, isSameDay, subDays } from 'date-fns';
import { DayProgress } from './types';

interface CurrentHabitDayProps {
  logs: { date: Date; status: HabitDayStatus }[];
  period: number;
  anchorDate: Date;
}

/**
 * Возвращает прогресс за последние N дней (включая today).
 */

export function getLastDaysProgress({
  logs,
  period,
  anchorDate,
}: CurrentHabitDayProps): DayProgress[] {
  if (logs.length === 0) {
    return Array.from({ length: period }).map((_, index) => {
      const day = subDays(anchorDate, period - 1 - index);

      return {
        weekday: format(day, 'EEE'),
        status: HabitDayStatus.unmarked,
      };
    });
  }

  return Array.from({ length: period }).map((_, index) => {
    const day = subDays(anchorDate, period - 1 - index);

    const logForDay = logs.find((log) => isSameDay(log.date, day));

    // TODO: return dayInfo with { weekday, dd/mm/yyyy}

    return {
      weekday: format(day, 'EEE'),
      status: logForDay?.status ?? HabitDayStatus.unmarked,
    };
  });
}
