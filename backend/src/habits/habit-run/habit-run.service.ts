import { BadRequestException, Injectable } from '@nestjs/common';
import { ResponseUtil } from 'src/common/utils/response';
import { TimeService } from 'src/common/utils/time/time.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitRunService {
  constructor(
    private prisma: PrismaService,
    private time: TimeService,
  ) {}

  async start(
    userId: string,
    timezone: string,
    habitId: string,
    totalDays: number,
  ) {
    if (totalDays <= 0 || totalDays > 365) {
      throw new BadRequestException('Invalid totalDays value');
    }

    await this.getHabitOrThrow(userId, habitId);

    const existingRun = await this.getActiveRun(userId, habitId);
    if (existingRun) {
      throw new BadRequestException('Habit already started');
    }

    const today = this.time.today(timezone);

    const run = await this.prisma.$transaction(async (tx) => {
      const run = await tx.habitRun.create({
        data: {
          habitId,
          status: 'active',
          totalDays,
          startDate: today,
        },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: { status: 'active' },
      });

      return run;
    });

    return ResponseUtil.success(run);
  }

  async pause(userId: string, habitId: string) {
    const run = await this.getActiveRun(userId, habitId);
    if (!run) {
      throw new BadRequestException('No active habit run to pause');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.habitRun.update({
        where: { id: run.id },
        data: { status: 'paused' },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: { status: 'paused' },
      });
    });

    return ResponseUtil.success({ ...run, status: 'paused' });
  }

  async resume(userId: string, habitId: string) {
    const habit = await this.getHabitOrThrow(userId, habitId);
    if (habit.status !== 'paused') {
      throw new BadRequestException('Habit is not paused');
    }

    const run = await this.getPausedRun(userId, habitId);
    if (!run) {
      throw new BadRequestException('No paused habit run to resume');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.habitRun.update({
        where: { id: run.id },
        data: {
          status: 'active',
        },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: {
          status: 'active',
        },
      });
    });

    return ResponseUtil.success({ ...run, status: 'active' });
  }

  async build(userId: string, timezone: string, habitId: string) {
    const run = await this.getActiveRun(userId, habitId);
    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    const completedDays = await this.prisma.habitDayLog.count({
      where: {
        habitRunId: run.id,
        status: 'completed',
      },
    });

    if (completedDays < run.totalDays) {
      throw new BadRequestException('Goal is not reached yet');
    }

    const today = this.time.today(timezone);

    await this.prisma.$transaction(async (tx) => {
      await tx.habitRun.update({
        where: { id: run.id },
        data: {
          status: 'built',
          builtAt: today,
        },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: {
          status: 'built',
        },
      });
    });

    return ResponseUtil.success({
      ...run,
      status: 'built',
      builtAt: today,
    });
  }

  async cancel(userId: string, timezone: string, habitId: string) {
    const run = await this.getActiveRun(userId, habitId);
    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    const today = this.time.today(timezone);

    await this.prisma.$transaction(async (tx) => {
      await tx.habitRun.update({
        where: { id: run.id },
        data: {
          status: 'cancelled',
          cancelledAt: today,
        },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: {
          status: 'cancelled',
        },
      });
    });

    return ResponseUtil.success({
      ...run,
      status: 'cancelled',
      cancelledAt: today,
    });
  }

  async reset(
    userId: string,
    timezone: string,
    habitId: string,
    totalDays: number,
  ) {
    if (totalDays <= 0 || totalDays > 365) {
      throw new BadRequestException('Invalid totalDays value');
    }

    await this.getHabitOrThrow(userId, habitId);

    const today = this.time.today(timezone);

    const newRun = await this.prisma.$transaction(async (tx) => {
      const activeRun = await this.getActiveRun(userId, habitId);

      if (activeRun) {
        await tx.habitRun.update({
          where: { id: activeRun.id },
          data: {
            status: 'cancelled',
            cancelledAt: today,
          },
        });
      }

      const run = await tx.habitRun.create({
        data: {
          habitId,
          status: 'active',
          totalDays,
          startDate: today,
        },
      });

      await tx.habit.update({
        where: { id: habitId },
        data: {
          status: 'active',
        },
      });

      return run;
    });

    return ResponseUtil.success(newRun);
  }

  // helpers
  private async getHabitOrThrow(userId: string, id: string) {
    const habit = await this.prisma.habit.findUnique({ where: { id, userId } });
    if (!habit) throw new BadRequestException('Habit not found');
    return habit;
  }
  private async getActiveRun(userId: string, habitId: string) {
    return this.prisma.habitRun.findFirst({
      where: { habitId, status: 'active', habit: { userId } },
    });
  }
  private async getPausedRun(userId: string, habitId: string) {
    return this.prisma.habitRun.findFirst({
      where: { habitId, status: 'paused', habit: { userId } },
    });
  }
}
