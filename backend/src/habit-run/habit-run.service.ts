import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTodayUTC } from 'src/utils/time';

@Injectable()
export class HabitRunService {
  constructor(private prisma: PrismaService) {}

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
        startDate: getTodayUTC(),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'active' },
    });

    return run;
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

    return run;
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

    return run;
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
        builtAt: getTodayUTC(),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'built' },
    });

    return run;
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
        cancelledAt: getTodayUTC(),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'cancelled' },
    });

    return run;
  }

  async reset(habitId: string, totalDays: number) {
    await this.getHabitOrThrow(habitId);

    const activeRun = await this.getActiveRun(habitId);
    if (activeRun) {
      await this.prisma.habitRun.update({
        where: { id: activeRun.id },
        data: {
          status: 'cancelled',
          cancelledAt: getTodayUTC(),
        },
      });
    }

    const newRun = await this.prisma.habitRun.create({
      data: {
        habitId,
        status: 'active',
        totalDays,
        startDate: getTodayUTC(),
      },
    });

    await this.prisma.habit.update({
      where: { id: habitId },
      data: { status: 'active' },
    });

    return newRun;
  }
}
