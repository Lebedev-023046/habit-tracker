import { differenceInCalendarDays, startOfDay } from 'date-fns';

/**
 * Возвращает номер дня привычки, начиная с 1.
 *
 * @param startDate - дата старта привычки
 * @param today - текущая дата (передаётся извне)
 */
export function getCurrentHabitDay(startDate: Date, today: Date): number {
  const start = startOfDay(startDate);
  const current = startOfDay(today);

  const diff = differenceInCalendarDays(current, start);

  return Math.max(diff + 1, 1);
}
