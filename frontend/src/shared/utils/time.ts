// src/shared/utils/time.ts

// Часовой пояс пользователя (Минск, GMT+3)
export const USER_TZ_OFFSET_HOURS = 3;

/**
 * Возвращает "идентификатор дня" пользователя в виде:
 * Date = полночь ЭТОГО дня в UTC.
 *
 * Алгоритм:
 * 1. Сдвигаем момент времени в часовой пояс пользователя (+3 часа)
 * 2. Берём там год/месяц/день
 * 3. Создаём дату в UTC на 00:00 этого дня
 */
export function getUserDayUTC(date: Date): Date {
  // Шаг 1: сдвигаем в зону пользователя
  const shiftedToUserTZ = new Date(
    date.getTime() + USER_TZ_OFFSET_HOURS * 60 * 60 * 1000,
  );

  // Шаг 2+3: берём его "UTC-компоненты" (они уже в "дне пользователя")
  return new Date(
    Date.UTC(
      shiftedToUserTZ.getUTCFullYear(),
      shiftedToUserTZ.getUTCMonth(),
      shiftedToUserTZ.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
}

/**
 * "Сегодня" пользователя, сохранённое как полночь этого дня в UTC.
 * Это то, что нужно писать в HabitDayLog.date
 */
export function getTodayUserDayUTC(): Date {
  return getUserDayUTC(new Date());
}
