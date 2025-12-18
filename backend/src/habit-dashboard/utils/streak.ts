import { HabitDayStatus } from '@prisma/client';

export function calculateStreaks(
  logs: { date: Date; status: HabitDayStatus }[],
  today: Date,
) {
  if (!logs.length) {
    return { current: 0, best: 0 };
  }

  let best = 0;
  let current = 0;

  // считаем best streak
  let temp = 0;
  for (const log of logs) {
    if (log.status === 'completed') {
      temp++;
      best = Math.max(best, temp);
    } else {
      temp = 0;
    }
  }

  // считаем current streak
  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i];

    // today может быть unmarked — не ломает стрик
    if (log.status === 'unmarked' && isSameDay(log.date, today)) {
      continue;
    }

    if (log.status === 'completed') {
      current++;
      continue;
    }

    break;
  }

  return { current, best };
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}
