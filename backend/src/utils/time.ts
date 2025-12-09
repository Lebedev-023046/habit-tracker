import { isSameDay } from 'date-fns';

/**
 * TIMEZONE SETTINGS
 * Меняешь здесь — меняется во всём приложении
 */
export const USER_TZ_OFFSET = 3; // GMT+3

/**
 * Перевод локальной даты в UTC с учётом часового пояса пользователя
 */
export function toUTC(date: Date): Date {
  return new Date(date.getTime() - USER_TZ_OFFSET * 60 * 60 * 1000);
}

/**
 * Приводим дату к началу дня в часовом поясе пользователя (GMT+3),
 * а затем конвертируем её в UTC (для хранения в БД).
 */
export function getUTCStartOfUserDay(date: Date): Date {
  const local = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );

  return toUTC(local);
}

/**
 * Получить локальный "сегодня" в UTC формате (для HabitDayLog)
 */
export function getTodayUTC(): Date {
  return getUTCStartOfUserDay(new Date());
}

/**
 * Проверка: лог относится к "сегодня" пользователя
 * log.date — дата в БД (UTC)
 */
export function isLogForToday(logDate: Date): boolean {
  return isSameDay(new Date(logDate), getTodayUTC());
}

/**
 * Создать массив последних N дней (в UTC),
 * где каждый день — начало дня пользователя.
 */
// export function getLastNDaysUTC(n: number): Date[] {
//   const days: Date[] = [];
//   const today = getTodayUTC();

//   for (let i = n - 1; i >= 0; i--) {
//     // берём локальные дни: today-(i дней)
//     const dayLocal = subDays(
//       new Date(), // локальная дата
//       i,
//     );

//     days.push(getUTCStartOfUserDay(dayLocal));
//   }

//   return days;
// }
