import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

import { HabitDayStatus, Prisma } from '@prisma/client';
import { addDays } from 'date-fns';
import { TimeService } from 'src/common/utils/time/time.service';

@Injectable()
export class HabitsCronService {
  private readonly logger = new Logger(HabitsCronService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly time: TimeService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backfillActiveRuns() {
    this.logger.log('Starting daily habit backfill');

    const today = this.time.today();
    const yesterday = addDays(today, -1);

    const activeRuns = await this.prisma.habitRun.findMany({
      where: { status: 'active' },
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
      await this.backfillRun(run, today, yesterday);
    }

    this.logger.log('Finished daily habit backfill');
  }

  private async backfillRun(
    run: {
      id: string;
      dayLogs: { date: Date; status: HabitDayStatus }[];
    },
    today: Date,
    yesterday: Date,
  ) {
    const hasYesterday = run.dayLogs.some(
      (log) => log.date.getTime() === yesterday.getTime(),
    );

    const hasToday = run.dayLogs.some(
      (log) => log.date.getTime() === today.getTime(),
    );

    const logsToCreate: Prisma.HabitDayLogCreateManyInput[] = [];

    if (!hasYesterday) {
      logsToCreate.push({
        habitRunId: run.id,
        date: yesterday,
        status: HabitDayStatus.missed,
      });
    }

    if (!hasToday) {
      logsToCreate.push({
        habitRunId: run.id,
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
