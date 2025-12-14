import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitStatus, Prisma } from '@prisma/client';
import { throwError } from 'src/common/errors';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTodayUserDayUTC } from 'src/utils/time';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async getAllHabits(params?: { status?: HabitStatus }) {
    try {
      const prismaQuery: Prisma.HabitFindManyArgs = {
        include: {
          dayLogs: {
            orderBy: { date: 'asc' },
          },
        },
      };

      if (params?.status) {
        prismaQuery.where = {
          ...prismaQuery.where,
          status: params.status,
        };
      }

      const habits = await this.prisma.habit.findMany(prismaQuery);

      console.log(`Found ${habits.length} habits`);
      return ResponseUtil.success(habits);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting all habits: ' });
    }
  }

  async getHabitById(id: string) {
    try {
      if (!id) {
        throw new Error('Habit ID is required');
      }
      const habit = await this.prisma.habit.findUnique({
        where: { id },
        include: {
          dayLogs: {
            orderBy: { date: 'asc' },
          },
        },
      });
      if (!habit) {
        throw new Error(`Habit with id ${id} not found`);
      }
      console.log(` Habit with id: ${habit?.id} found`);
      return ResponseUtil.success(habit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting habit: ' });
    }
  }

  async createHabit(data: CreateHabitDto) {
    try {
      const isActive = data.status === 'active';

      const habit = await this.prisma.habit.create({
        data: {
          ...data,
          status: data.status ?? 'planned',
          startDate: isActive ? (data.startDate ?? getTodayUserDayUTC()) : null,
        },
      });

      return ResponseUtil.success(habit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error creating habit' });
    }
  }

  async updateHabit(id: string, data: UpdateHabitDto) {
    try {
      const updatedHabit = await this.prisma.habit.update({
        where: { id },
        data,
      });

      console.log(`Habit with id: ${updatedHabit.id} updated`);
      return ResponseUtil.success(updatedHabit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habit: ' });
    }
  }

  async updateHabitStatus(id: string, status: HabitStatus) {
    try {
      const habit = await this.prisma.habit.findUnique({ where: { id } });
      if (!habit) throw new BadRequestException('Habit not found');

      const shouldStart = habit.status === 'planned' && status === 'active';

      const updated = await this.prisma.habit.update({
        where: { id },
        data: {
          status,
          startDate: shouldStart
            ? (habit.startDate ?? getTodayUserDayUTC())
            : habit.startDate,
        },
      });

      return ResponseUtil.success(updated);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habit status' });
    }
  }

  async deleteHabit(id: string) {
    try {
      const deletedHabit = await this.prisma.habit.delete({ where: { id } });
      console.log(`Habit with id: ${deletedHabit.id} deleted`);
      return ResponseUtil.success(deletedHabit.id);
    } catch (error) {
      throwError({ error, errorMessage: 'Error deleting habit:' });
    }
  }
}
