import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitStatus } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async getAllHabits(params?: { status?: HabitStatus }) {
    const habits = await this.prisma.habit.findMany({
      where: params?.status ? { status: params.status } : undefined,
      orderBy: { updatedAt: 'desc' },
    });

    return ResponseUtil.success(habits);
  }

  async getHabitById(id: string) {
    if (!id) {
      throw new BadRequestException('Habit ID is required');
    }

    const habit = await this.prisma.habit.findUnique({
      where: { id },
    });

    if (!habit) {
      throw new BadRequestException('Habit not found');
    }

    return ResponseUtil.success(habit);
  }

  async createHabit(data: CreateHabitDto) {
    const habit = await this.prisma.habit.create({
      data: {
        title: data.title,
        status: 'planned',
      },
    });

    return ResponseUtil.success(habit);
  }

  async updateHabit(id: string, data: UpdateHabitDto) {
    const habit = await this.prisma.habit.update({
      where: { id },
      data,
    });

    return ResponseUtil.success(habit);
  }

  async deleteHabit(id: string) {
    await this.prisma.habit.delete({ where: { id } });
    return ResponseUtil.success(id);
  }
}
