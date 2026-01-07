import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitStatus } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { HabitRunService } from '../habit-run/habit-run.service';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
  constructor(
    private prisma: PrismaService,
    private habitRunService: HabitRunService,
  ) {}

  async getAllHabits(userId: string, params?: { status?: HabitStatus }) {
    const habits = await this.prisma.habit.findMany({
      where: {
        userId,
        ...(params?.status && { status: params.status }),
      },
      orderBy: { updatedAt: 'desc' },
    });

    return ResponseUtil.success(habits);
  }

  async getHabitById(userId: string, id: string) {
    if (!id) {
      throw new BadRequestException('Habit ID is required');
    }

    const habit = await this.prisma.habit.findUnique({
      where: { userId, id },
    });

    if (!habit) {
      throw new BadRequestException('Habit not found');
    }

    return ResponseUtil.success(habit);
  }

  async createHabitWithOptionalStart(
    userId: string,
    timezone: string,
    data: CreateHabitDto,
  ) {
    const habit = await this.prisma.habit.create({
      data: {
        title: data.title,
        status: 'planned',
        userId,
      },
    });

    if (data.startImmediately) {
      if (!data.totalDays) {
        throw new BadRequestException('totalDays required to start habit');
      }

      await this.habitRunService.start(
        userId,
        timezone,
        habit.id,
        data.totalDays,
      );
    }

    return ResponseUtil.success(habit);
  }

  async updateHabit(userId: string, id: string, data: UpdateHabitDto) {
    const habit = await this.prisma.habit.update({
      where: { id, userId },
      data,
    });

    return ResponseUtil.success(habit);
  }

  async deleteHabit(userId: string, id: string) {
    await this.prisma.habit.delete({ where: { id, userId } });
    return ResponseUtil.success(id);
  }
}
