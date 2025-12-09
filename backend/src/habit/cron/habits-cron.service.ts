// habits-cron.service.ts (или внутри того же habits.service)
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  HabitDayStatus,
  type Habit,
  type HabitDayLog,
  type Prisma,
} from '@prisma/client';
import { addDays, isAfter, isBefore } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTodayUserDayUTC, getUserDayUTC } from 'src/utils/time';
// import { getTodayUTCStartForUser, getUTCStartOfUserDay } from 'src/utils/time';

type HabitWithLogs = Habit & { dayLogs: HabitDayLog[] };

@Injectable()
export class HabitsCronService {
  private readonly logger = new Logger(HabitsCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async backfillAllHabitsDaily() {
    this.logger.log('Starting daily habits backfill');

    const today = getTodayUserDayUTC();
    const habits = await this.prisma.habit.findMany({
      include: {
        dayLogs: {
          orderBy: { date: 'asc' },
        },
      },
    });

    await Promise.all(
      habits.map((habit) => this.backfillHabitDayLogs(habit, today)),
    );

    this.logger.log('Finished daily habits backfill');
  }

  private async backfillHabitDayLogs(habit: HabitWithLogs, today: Date) {
    const { id: habitId, startDate, totalDays, dayLogs } = habit;

    if (!startDate || !totalDays) return;

    const start = getUserDayUTC(new Date(startDate));

    const yesterday = addDays(today, -1);
    const plannedEnd = addDays(start, totalDays - 1);

    const effectiveEnd = isBefore(yesterday, plannedEnd)
      ? yesterday
      : plannedEnd;

    // ещё нечего заполнять (привычка началась сегодня/вчера и т.п.)
    if (isBefore(effectiveEnd, start)) return;

    const existingDates = new Set(
      dayLogs.map((log) => new Date(log.date).getTime()),
    );

    const logsToCreate: Prisma.HabitDayLogCreateManyInput[] = [];

    // 1) missed для всех пропусков до effectiveEnd
    for (
      let day = new Date(start);
      !isAfter(day, effectiveEnd);
      day = addDays(day, 1)
    ) {
      const key = day.getTime();

      if (!existingDates.has(key)) {
        logsToCreate.push({
          habitId,
          date: day, // уже "день пользователя в UTC"
          status: HabitDayStatus.missed,
        });
      }
    }

    // 2) Сегодняшний unmarked, если ещё нет и привычка активна
    const todayKey = today.getTime();
    const hasTodayLog = existingDates.has(todayKey);
    const habitIsActiveToday = !isAfter(today, plannedEnd);

    if (!hasTodayLog && habitIsActiveToday) {
      logsToCreate.push({
        habitId,
        date: today,
        status: HabitDayStatus.unmarked,
      });
    }

    if (logsToCreate.length === 0) return;

    await this.prisma.habitDayLog.createMany({
      data: logsToCreate,
      skipDuplicates: true,
    });
  }
}
