import { Injectable } from '@nestjs/common';
import { HabitStatus } from '@prisma/client';
import { throwError } from 'src/common/helper/error-handling';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateHabitDto,
  UpdateHabitDto,
  UpdateHabitStatusAndPosition,
} from './habit.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async getAllHabits() {
    try {
      const habits = await this.prisma.habit.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
      console.log(`Found ${habits.length} habits`);
      return ResponseUtil.success(habits);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting all habits' });
    }
  }

  async getHabitById(id: string) {
    try {
      if (!id) {
        throw new Error('Habit ID is required');
      }
      const habit = await this.prisma.habit.findUnique({ where: { id } });
      if (!habit) {
        throw new Error(`Habit with id ${id} not found`);
      }
      console.log(` Habit with id: ${habit?.id} found`);
      return ResponseUtil.success(habit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting habit:' });
    }
  }

  async createHabit(data: CreateHabitDto) {
    try {
      if (!data.title || data.title.trim().length === 0) {
        throw new Error('Habit title is required');
      }

      if (!data.totalDays || data.totalDays <= 0) {
        throw new Error('Total days must be positive number');
      }

      return this.prisma.$transaction(async (tx) => {
        await tx.habit.updateMany({
          where: { status: data.status },
          data: { position: { increment: 1 } },
        });
        const newHabit = await this.prisma.habit.create({
          data: {
            ...data,
            position: 0,
            status: data.status || 'planned',
          },
        });
        console.log(
          `New Habit "${newHabit.title}" with id: ${newHabit.id} Created`,
        );
        return ResponseUtil.success(newHabit);
      });
    } catch (error) {
      throwError({ error, errorMessage: 'Error creating habit:' });
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
      throwError({ error, errorMessage: 'Error updating habit:' });
    }
  }

  async updateHabitStatus(id: string, status: HabitStatus) {
    try {
      const updatedHabit = await this.prisma.habit.update({
        where: { id },
        data: { status },
      });
      console.log(`Habit with id: ${updatedHabit.id} status updated`);
      return ResponseUtil.success(updatedHabit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habit status:' });
    }
  }

  async updateHabitStatusAndPosition(
    id: string,
    payload: UpdateHabitStatusAndPosition,
  ) {
    const { status, position } = payload;

    if (status === undefined && position === undefined) {
      throwError({
        error: new Error('No fields provided'),
        errorMessage: 'Error updating habit:',
      });
    }

    try {
      const data: Partial<UpdateHabitStatusAndPosition> = {};

      if (status !== undefined) data.status = status;
      if (position !== undefined) data.position = position;

      const updatedHabit = await this.prisma.habit.update({
        where: { id },
        data,
      });

      console.log(
        `Habit with id: ${updatedHabit.id} status and position updated`,
      );
      return ResponseUtil.success(updatedHabit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habit status:' });
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
