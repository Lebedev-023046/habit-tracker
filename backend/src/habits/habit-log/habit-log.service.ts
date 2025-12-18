import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitDayStatus } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDayUTC } from 'src/utils/time';

@Injectable()
export class HabitLogService {
  constructor(private prisma: PrismaService) {}

  private async getActiveRunOrThrow(habitId: string) {
    const run = await this.prisma.habitRun.findFirst({
      where: {
        habitId,
        status: 'active',
      },
    });

    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    return run;
  }

  async upsert(habitId: string, status: HabitDayStatus, date?: Date) {
    const run = await this.getActiveRunOrThrow(habitId);

    const normalizedDate = getUserDayUTC(date ?? new Date());

    const log = await this.prisma.habitDayLog.upsert({
      where: {
        habitRunId_date: {
          habitRunId: run.id,
          date: normalizedDate,
        },
      },
      update: { status },
      create: {
        habitRunId: run.id,
        date: normalizedDate,
        status,
      },
    });

    return ResponseUtil.success(log);
  }

  async remove(habitId: string, date?: Date) {
    const run = await this.getActiveRunOrThrow(habitId);
    const normalizedDate = getUserDayUTC(date ?? new Date());

    await this.prisma.habitDayLog.delete({
      where: {
        habitRunId_date: {
          habitRunId: run.id,
          date: normalizedDate,
        },
      },
    });

    return ResponseUtil.success(true);
  }

  async getCurrentRunLogs(habitId: string) {
    const run = await this.getActiveRunOrThrow(habitId);

    const logs = await this.prisma.habitDayLog.findMany({
      where: {
        habitRunId: run.id,
      },
      orderBy: { date: 'asc' },
    });

    return ResponseUtil.success(logs);
  }
}
