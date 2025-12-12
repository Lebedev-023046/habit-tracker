import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitStatus, Prisma } from '@prisma/client';
import { throwError } from 'src/common/errors';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTodayUserDayUTC } from 'src/utils/time';
import { CreateHabitDto, ReorderHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  private ALLOWED_TRANSITIONS = {
    planned: ['planned', 'active', 'cancelled'],
    active: ['active', 'paused', 'built', 'cancelled'],
    paused: ['paused', 'active', 'cancelled'],
    built: ['built'],
    cancelled: ['cancelled'],
  } as const;

  private canTransition(from: string, to: string) {
    return this.ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
  }

  async getAllHabits(params?: { status?: HabitStatus }) {
    try {
      const prismaQuery: Prisma.HabitFindManyArgs = {
        orderBy: { position: 'asc' },
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
      if (!data.title || data.title.trim().length === 0) {
        throw new Error('Habit title is required');
      }

      if (!data.totalDays || data.totalDays <= 0) {
        throw new Error('Total days must be positive number');
      }

      const isActive = data.status === 'active';

      const startDate = isActive
        ? (data.startDate ?? getTodayUserDayUTC())
        : null;

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
            startDate,
          },
        });
        console.log(
          `New Habit "${newHabit.title}" with id: ${newHabit.id} Created`,
        );
        return ResponseUtil.success(newHabit);
      });
    } catch (error) {
      throwError({ error, errorMessage: 'Error creating habit: ' });
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
      const updatedHabit = await this.prisma.habit.update({
        where: { id },
        data: { status },
      });
      console.log(`Habit with id: ${updatedHabit.id} status updated`);
      return ResponseUtil.success(updatedHabit);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habit status: ' });
    }
  }

  async reorderHabits(data: ReorderHabitDto[]) {
    try {
      const ids = data.map((x) => x.id);

      const current = await this.prisma.habit.findMany({
        where: { id: { in: ids } },
        select: { id: true, status: true, startDate: true },
      });

      const currentById = new Map(current.map((h) => [h.id, h]));

      await this.prisma.$transaction(async (tx) => {
        const today = getTodayUserDayUTC();
        for (const { id, status: nextStatus, position } of data) {
          const prev = currentById.get(id);
          if (!prev) continue;

          if (!this.canTransition(prev.status, nextStatus)) {
            throw new BadRequestException(
              `Transition ${prev.status} -> ${nextStatus} is not allowed`,
            );
          }

          const updateData: Prisma.HabitUpdateInput = {
            status: nextStatus,
            position,
          };

          // planned -> active => проставить startDate, если его не было
          const isPlannedToActive =
            prev.status === 'planned' && nextStatus === 'active';
          const shouldSetStartDate = isPlannedToActive && !prev.startDate;

          if (shouldSetStartDate) {
            updateData.startDate = today;
          }

          await tx.habit.update({
            where: { id },
            data: updateData,
          });
        }
      });

      return ResponseUtil.success(true);
    } catch (error) {
      throwError({ error, errorMessage: 'Error reordering habits: ' });
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
