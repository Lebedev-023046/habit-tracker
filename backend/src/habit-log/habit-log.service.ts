import { Injectable } from '@nestjs/common';
import { throwError } from 'src/common/helper/error-handling';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDayUTC } from 'src/utils/time';
import {
  CreateHabitLogDto,
  UpdateHabitLogDto,
  UpsertHabitLogDto,
} from './habit-log.dto';

// assuming habitLog as habitDayLog => one log per day!

@Injectable()
export class HabitLogService {
  constructor(private prisma: PrismaService) {}

  async getAllHabitLogs() {
    try {
      const habitLogs = await this.prisma.habitDayLog.findMany();
      console.log(`Found ${habitLogs.length} habitLog logs`);
      return ResponseUtil.success(habitLogs);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting all habitLog logs' });
    }
  }

  async getHabitLogById(id: string) {
    try {
      if (!id) {
        throw new Error('HabitLog ID is required');
      }
      const habitLog = await this.prisma.habitDayLog.findUnique({
        where: { id },
      });
      if (!habitLog) {
        throw new Error(`habitLog with id ${id} not found`);
      }
      console.log(` habitLog with id: ${habitLog?.id} found`);
      return ResponseUtil.success(habitLog);
    } catch (error) {
      throwError({ error, errorMessage: 'Error getting habitLog: ' });
    }
  }

  async upsertHabitLog(data: UpsertHabitLogDto) {
    try {
      const { habitId, date, status } = data;

      const rawDate = date ? new Date(date) : new Date();
      const normalizedDate = getUserDayUTC(rawDate);

      const habitLog = await this.prisma.habitDayLog.upsert({
        where: {
          habitId_date: {
            habitId,
            date: normalizedDate,
          },
        },
        update: { status },
        create: {
          habitId,
          date: normalizedDate,
          status,
        },
      });

      console.log(
        `habitLog for habitId=${habitId} date=${normalizedDate.toISOString()} upserted with status=${status}`,
      );
      return ResponseUtil.success(habitLog);
    } catch (error) {
      throwError({ error, errorMessage: 'Error upserting habitLog: ' });
    }
  }

  async createHabitLog(data: CreateHabitLogDto) {
    try {
      const newHabitLog = await this.prisma.habitDayLog.create({ data });
      console.log(`New HabitLog with id: ${newHabitLog.id} Created`);
      return ResponseUtil.success(newHabitLog);
    } catch (error) {
      throwError({ error, errorMessage: 'Error creating habitLog: ' });
    }
  }

  async updateHabitLog(id: string, data: UpdateHabitLogDto) {
    try {
      const updatedHabitLog = await this.prisma.habitDayLog.update({
        where: { id },
        data,
      });

      console.log(`habitLog with id: ${updatedHabitLog.id} updated`);
      return ResponseUtil.success(updatedHabitLog);
    } catch (error) {
      throwError({ error, errorMessage: 'Error updating habitLog: ' });
    }
  }

  async deleteHabitLog(id: string) {
    try {
      const deletedHabit = await this.prisma.habitDayLog.delete({
        where: { id },
      });
      console.log(`habitLog with id: ${deletedHabit.id} deleted`);
      return ResponseUtil.success(deletedHabit.id);
    } catch (error) {
      throwError({ error, errorMessage: 'Error deleting habitLog: ' });
    }
  }
}
