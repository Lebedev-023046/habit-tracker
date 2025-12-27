import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { addDays } from 'date-fns';
import { ResponseUtil } from 'src/common/utils/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { getLastDaysProgress } from '../calculations/getLastDaysProgress';
import { calculateProgress } from '../calculations/getProgress';
import { calculateDayStats } from '../calculations/getStats';
import { calculateStreaks } from '../calculations/getStreaks';
import { DashboardHabitItemDto } from './habit-dashboard.dto';

type HabitWithRuns = Prisma.HabitGetPayload<{
  include: {
    runs: {
      include: {
        dayLogs: true;
      };
    };
  };
}>;

@Injectable()
export class HabitDashboardOverviewQuery {
  constructor(private readonly prisma: PrismaService) {}

  // for one habit
  async getHabitDashboardOverview(habitId: string) {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
      include: {
        runs: {
          orderBy: { startDate: 'desc' },
          take: 1,
          include: {
            dayLogs: {
              orderBy: { date: 'asc' },
            },
          },
        },
      },
    });

    if (!habit) {
      return new NotFoundException(`Habit with id: ${habitId} not found`);
    }

    const item = this.mapHabitToDashboardItem(habit);

    return ResponseUtil.success(item);
  }

  // for all habits
  // async getHabitsOverview() {
  //   const habits = await this.prisma.habit.findMany({
  //     include: {
  //       runs: {
  //         where: { status: 'active' },
  //         include: {
  //           dayLogs: {
  //             orderBy: { date: 'asc' },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   const items = habits.map((habit) => this.mapHabitToDashboardItem(habit));

  //   return ResponseUtil.success(items);
  // }

  private mapHabitToDashboardItem(habit: HabitWithRuns): DashboardHabitItemDto {
    // get relevant run
    const run = habit.runs[0];

    if (!run) {
      return this.buildEmptyItem(habit);
    }

    const logs = run.dayLogs;

    const { completedDays, missedDays } = calculateDayStats(logs);
    const { remainingDays: restDays, percent: progress } = calculateProgress(
      completedDays,
      run.totalDays,
    );

    const plannedEndDate = addDays(run.startDate, run.totalDays);

    const lastDaysProgress = getLastDaysProgress({
      logs,
      period: 14,
      anchorDate: run.builtAt ?? new Date(),
    });

    const { best: bestStreak, current: currentStreak } = calculateStreaks(
      run.dayLogs,
      new Date(),
    );

    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,

      completedDays,
      missedDays,

      plannedEndDate,
      restDays,
      progress,

      lastDaysProgress,

      currentStreak,
      bestStreak,
    };
  }

  private buildEmptyItem(
    habit: Pick<HabitWithRuns, 'id' | 'title' | 'status'>,
  ): DashboardHabitItemDto {
    const lastDaysProgress = getLastDaysProgress({
      logs: [],
      period: 14,
      anchorDate: new Date(),
    });

    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,

      completedDays: 0,
      missedDays: 0,

      plannedEndDate: new Date(),
      restDays: 0,
      progress: 0,

      lastDaysProgress,

      currentStreak: 0,
      bestStreak: 0,
    };
  }
}
