import { HabitDayStatus } from '@prisma/client';
import { format, isSameDay, startOfDay, subDays } from 'date-fns';

export interface DayProgress {
  weekday: string;
  status: HabitDayStatus;
}

/**
 * Возвращает прогресс за последние N дней (включая today).
 */
export function getLastDaysProgress(
  logs: { date: Date; status: HabitDayStatus }[],
  period: number,
  today: Date,
): DayProgress[] {
  const normalizedToday = startOfDay(today);

  const normalizedLogs = logs.map((log) => ({
    date: startOfDay(log.date),
    status: log.status,
  }));

  return Array.from({ length: period }).map((_, index) => {
    const day = subDays(normalizedToday, period - 1 - index);

    const logForDay = normalizedLogs.find((log) => isSameDay(log.date, day));

    return {
      weekday: format(day, 'EEE'),
      status: logForDay?.status ?? HabitDayStatus.unmarked,
    };
  });
}
