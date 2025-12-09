// habits-cron.service.ts (или внутри того же habits.service)
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  HabitDayStatus,
  type Habit,
  type HabitDayLog,
  type Prisma,
} from '@prisma/client';
import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

type HabitWithLogs = Habit & { dayLogs: HabitDayLog[] };

@Injectable()
export class HabitsCronService {
  private readonly logger = new Logger(HabitsCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async backfillAllHabitsDaily() {
    this.logger.log('Starting daily habits backfill');

    const today = startOfDay(new Date());

    // Берём только те привычки, которые ещё актуальны (не закончились)
    const habits = await this.prisma.habit.findMany({
      // where: { userId } — если нужно на пользователя фильтровать
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

    const start = startOfDay(startDate);
    const yesterday = addDays(today, -1);
    const plannedEnd = addDays(start, totalDays - 1);

    // Логи создаём до min(вчера, plannedEnd)
    const effectiveEnd = isBefore(yesterday, plannedEnd)
      ? yesterday
      : plannedEnd;
    if (isBefore(effectiveEnd, start)) {
      // ещё нечего заполнять (привычка началась сегодня/вчера и т.п.)
      return;
    }

    const existingDates = new Set(
      dayLogs.map((log) => startOfDay(log.date).getTime()),
    );

    const logsToCreate: Prisma.HabitDayLogCreateManyInput[] = [];

    // 1) missed для всех пропусков до effectiveEnd
    for (
      let day = new Date(start);
      !isAfter(day, effectiveEnd);
      day = addDays(day, 1)
    ) {
      const key = startOfDay(day).getTime();

      if (!existingDates.has(key)) {
        logsToCreate.push({
          habitId,
          date: day,
          status: HabitDayStatus.missed,
        });
      }
    }

    // 2) Сегодняшний unmarked, если ещё нет и привычка активна
    const todayKey = startOfDay(today).getTime();
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
