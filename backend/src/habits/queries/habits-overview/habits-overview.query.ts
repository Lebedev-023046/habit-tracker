import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { startOfDay } from 'date-fns';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCurrentHabitDay } from '../calculations/getCurrentHabitDay';
import { getLastDaysProgress } from '../calculations/getLastDaysProgress';
import { calculateProgress } from '../calculations/getProgress';
import { calculateStreaks } from '../calculations/getStreaks';
import { HabitsOverviewListDto } from './habits-overview.dto';

type HabitWithActiveRun = Prisma.HabitGetPayload<{
  include: {
    runs: {
      where: { status: 'active' };
      include: {
        dayLogs: true;
      };
    };
  };
}>;

@Injectable()
export class HabitsOverviewQuery {
  constructor(private prisma: PrismaService) {}

  async getHabitList() {
    const habits = await this.prisma.habit.findMany({
      include: {
        runs: {
          include: {
            dayLogs: {
              orderBy: { date: 'asc' },
            },
          },
        },
      },
    });

    const habitOverviewList = habits.map((habit) =>
      this.mapHabitToListItem(habit),
    );

    return ResponseUtil.success(habitOverviewList);
  }

  private mapHabitToListItem(habit: HabitWithActiveRun): HabitsOverviewListDto {
    const activeRun = habit.runs[0];

    if (!activeRun) {
      return this.buildEmptyItem(habit);
    }

    const logs = activeRun.dayLogs;

    const { percent: progress } = calculateProgress(
      logs.length,
      activeRun.totalDays,
    );

    const { current: currentStreak, best: bestStreak } = calculateStreaks(
      logs,
      startOfDay(new Date()),
    );

    const daySinceStart = getCurrentHabitDay(
      activeRun.startDate,
      startOfDay(new Date()),
    );

    const lastDaysProgress = getLastDaysProgress(logs, 7, new Date());

    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,
      totalDays: activeRun.totalDays,
      daySinceStart,
      progress,
      currentStreak,
      bestStreak,
      lastDaysProgress,
    };
  }

  private buildEmptyItem(
    habit: Pick<HabitWithActiveRun, 'id' | 'title' | 'status'>,
  ): HabitsOverviewListDto {
    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,

      totalDays: 0,
      daySinceStart: 0,
      progress: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastDaysProgress: [],
    };
  }
}
