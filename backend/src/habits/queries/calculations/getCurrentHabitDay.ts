import { differenceInCalendarDays } from 'date-fns';

/**
 * Возвращает номер дня привычки, начиная с 1.
 *
 * @param startDate - дата старта привычки
 * @param today - текущая дата (передаётся извне)
 */
export function getCurrentHabitDay(startDate: Date, today: Date): number {
  const diff = differenceInCalendarDays(today, startDate);

  return Math.max(diff + 1, 1);
}
