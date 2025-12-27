import { differenceInCalendarDays } from 'date-fns';

/**
 * Возвращает номер дня привычки, начиная с 1.
 *
 * @param startDate - дата старта привычки
 * @param today - текущая дата (передаётся извне)
 */

interface CurrentHabitDayProps {
  startDate: Date;
  today: Date;
  totalDays: number;
  isBuilt: boolean;
}

export function getCurrentHabitDay({
  startDate,
  today,
  totalDays,
  isBuilt,
}: CurrentHabitDayProps): number {
  if (isBuilt) {
    return totalDays;
  }

  const diff = differenceInCalendarDays(today, startDate);

  return Math.max(diff + 1, 1);
}
