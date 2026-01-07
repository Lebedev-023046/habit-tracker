import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitDayStatus } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { TimeService } from 'src/common/utils/time/time.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitLogService {
  constructor(
    private prisma: PrismaService,
    private readonly time: TimeService,
  ) {}

  async upsert(
    userId: string,
    timezone: string,
    habitId: string,
    status: HabitDayStatus,
    date?: Date,
  ) {
    const run = await this.getActiveRunOrThrow(userId, habitId);

    const today = this.time.today(timezone, date);

    const log = await this.prisma.habitDayLog.upsert({
      where: {
        habitRunId_date: {
          habitRunId: run.id,
          date: today,
        },
      },
      update: { status },
      create: {
        habitRunId: run.id,
        date: today,
        status,
      },
    });

    return ResponseUtil.success(log);
  }

  async remove(userId: string, timezone: string, habitId: string, date?: Date) {
    const run = await this.getActiveRunOrThrow(userId, habitId);
    const today = this.time.today(timezone, date);

    await this.prisma.habitDayLog.delete({
      where: {
        habitRunId_date: {
          habitRunId: run.id,
          date: today,
        },
      },
    });

    return ResponseUtil.success(true);
  }

  async getCurrentRunLogs(userId: string, habitId: string) {
    const run = await this.getActiveRunOrThrow(userId, habitId);

    const logs = await this.prisma.habitDayLog.findMany({
      where: {
        habitRunId: run.id,
      },
      orderBy: { date: 'asc' },
    });

    return ResponseUtil.success(logs);
  }

  private async getActiveRunOrThrow(userId: string, habitId: string) {
    const run = await this.prisma.habitRun.findFirst({
      where: {
        habitId,
        status: 'active',
        habit: { userId },
      },
    });

    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    return run;
  }
}
