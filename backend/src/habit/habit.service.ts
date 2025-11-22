import { Injectable } from '@nestjs/common';
import { throwError } from 'src/common/helper/error-handling';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async getAllHabits() {
    try {
      const habits = await this.prisma.habit.findMany();
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

      const newHabit = await this.prisma.habit.create({
        data: {
          ...data,
          status: data.status || 'planned',
        },
      });
      console.log(
        `New Habit "${newHabit.title}" with id: ${newHabit.id} Created`,
      );
      return ResponseUtil.success(newHabit);
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
