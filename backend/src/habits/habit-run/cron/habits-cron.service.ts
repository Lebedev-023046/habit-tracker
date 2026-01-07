import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

import { HabitDayStatus, Prisma } from '@prisma/client';
import { startOfDay, subDays } from 'date-fns';
import { TimeService } from 'src/common/utils/time/time.service';

//?? NOTE:
// Currently system works in single timezone (UTC).
// User-specific timezones will be handled later
// via business logic, not cron scheduling.

@Injectable()
export class HabitsCronService {
  private readonly logger = new Logger(HabitsCronService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly time: TimeService,
  ) {}

  @Cron('*/15 * * * *') // каждые 15 минут
  async processHabits() {
    this.logger.log('Running habit cron tick');
    await this.processUsers();
  }

  private async processUsers() {
    const users = await this.prisma.user.findMany({
      where: {
        habits: {
          some: {
            runs: {
              some: { status: 'active' },
            },
          },
        },
      },
      select: {
        id: true,
        timezone: true,
      },
    });

    for (const user of users) {
      await this.processUserHabits(user.id, user.timezone);
    }
  }

  private async processUserHabits(userId: string, timezone: string) {
    const now = this.time.now(timezone);
    const today = startOfDay(now);
    const yesterday = subDays(today, 1);

    const activeRuns = await this.prisma.habitRun.findMany({
      where: {
        status: 'active',
        habit: { userId },
      },
      include: {
        dayLogs: {
          where: {
            date: {
              in: [yesterday, today],
            },
          },
        },
      },
    });

    for (const run of activeRuns) {
      if (run.lastProcessedDay && run.lastProcessedDay >= yesterday) {
        continue;
      }

      await this.backfillRun(run, yesterday, today);

      await this.prisma.habitRun.update({
        where: { id: run.id },
        data: {
          lastProcessedDay: yesterday,
        },
      });
    }
  }

  private async backfillRun(
    run: {
      id: string;
      dayLogs: { date: Date; status: HabitDayStatus }[];
    },
    yesterday: Date,
    today: Date,
  ) {
    const hasYesterday = run.dayLogs.some(
      (log) => log.date.getTime() === yesterday.getTime(),
    );

    const hasToday = run.dayLogs.some(
      (log) => log.date.getTime() === today.getTime(),
    );

    const logs: Prisma.HabitDayLogCreateManyInput[] = [];

    if (!hasYesterday) {
      logs.push({
        habitRunId: run.id,
        date: yesterday,
        status: HabitDayStatus.missed,
      });
    }

    if (!hasToday) {
      logs.push({
        habitRunId: run.id,
        date: today,
        status: HabitDayStatus.unmarked,
      });
    }

    if (!logs.length) return;

    await this.prisma.habitDayLog.createMany({
      data: logs,
      skipDuplicates: true,
    });
  }
}
