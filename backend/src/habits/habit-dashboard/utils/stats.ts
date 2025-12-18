import { HabitDayStatus } from '@prisma/client';

export function calculateDayStats(logs: { status: HabitDayStatus }[]) {
  let completedDays = 0;
  let missedDays = 0;

  for (const log of logs) {
    if (log.status === 'completed') completedDays++;
    if (log.status === 'missed') missedDays++;
  }

  return { completedDays, missedDays };
}
