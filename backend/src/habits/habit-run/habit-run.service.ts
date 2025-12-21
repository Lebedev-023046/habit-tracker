import { BadRequestException, Injectable } from '@nestjs/common';
import { startOfDay } from 'date-fns';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitRunService {
  constructor(private prisma: PrismaService) {}

  async start(habitId: string, totalDays: number) {
    await this.getHabitOrThrow(habitId);

    const existingRun = await this.getActiveRun(habitId);
    if (existingRun) {
      throw new BadRequestException('Habit already started');
    }

    const run = await this.prisma.habitRun.create({
      data: {
        habitId,
        status: 'active',
        totalDays,
        startDate: startOfDay(new Date()),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'active' },
    });

    return ResponseUtil.success(run);
  }

  async pause(habitId: string) {
    const run = await this.getActiveRun(habitId);
    if (!run) {
      throw new BadRequestException('No active habit run to pause');
    }

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'paused' },
    });

    return ResponseUtil.success(run);
  }

  async resume(habitId: string) {
    const habit = await this.getHabitOrThrow(habitId);
    if (habit.status !== 'paused') {
      throw new BadRequestException('Habit is not paused');
    }

    const run = await this.getActiveRun(habitId);
    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'active' },
    });

    return ResponseUtil.success(run);
  }

  async build(habitId: string) {
    const run = await this.getActiveRun(habitId);
    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    await this.prisma.habitRun.update({
      where: { id: run.id },
      data: {
        status: 'built',
        builtAt: startOfDay(new Date()),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'built' },
    });

    return ResponseUtil.success(run);
  }

  async cancel(habitId: string) {
    const run = await this.getActiveRun(habitId);
    if (!run) {
      throw new BadRequestException('No active habit run');
    }

    await this.prisma.habitRun.update({
      where: { id: run.id },
      data: {
        status: 'cancelled',
        cancelledAt: startOfDay(new Date()),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'cancelled' },
    });

    return ResponseUtil.success(run);
  }

  async reset(habitId: string, totalDays: number) {
    await this.getHabitOrThrow(habitId);

    const activeRun = await this.getActiveRun(habitId);
    if (activeRun) {
      await this.prisma.habitRun.update({
        where: { id: activeRun.id },
        data: {
          status: 'cancelled',
          cancelledAt: startOfDay(new Date()),
        },
      });
    }

    const newRun = await this.prisma.habitRun.create({
      data: {
        habitId,
        status: 'active',
        totalDays,
        startDate: startOfDay(new Date()),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'active' },
    });

    return ResponseUtil.success(newRun);
  }

  // helpers
  private async getHabitOrThrow(id: string) {
    const habit = await this.prisma.habit.findUnique({ where: { id } });
    if (!habit) throw new BadRequestException('Habit not found');
    return habit;
  }
  private async getActiveRun(habitId: string) {
    return this.prisma.habitRun.findFirst({
      where: { habitId, status: 'active' },
    });
  }
}
