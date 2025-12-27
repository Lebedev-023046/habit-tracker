import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { TimeService } from 'src/common/utils/time/time.service';
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
  constructor(
    private prisma: PrismaService,
    private time: TimeService,
  ) {}

  async getHabitList() {
    const habits = await this.prisma.habit.findMany({
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

    const habitOverviewList = habits.map((habit) =>
      this.mapHabitToListItem(habit),
    );

    return ResponseUtil.success(habitOverviewList);
  }

  private mapHabitToListItem(habit: HabitWithActiveRun): HabitsOverviewListDto {
    // get relevant run
    const run = habit.runs[0];

    if (!run) {
      return this.buildEmptyItem(habit);
    }

    const logs = run.dayLogs;
    const today = this.time.today();

    const { percent: progress } = calculateProgress(logs.length, run.totalDays);

    const { current: currentStreak, best: bestStreak } = calculateStreaks(
      logs,
      today,
    );

    const daySinceStart = getCurrentHabitDay({
      startDate: run.startDate,
      today,
      totalDays: run.totalDays,
      isBuilt: habit.status === 'built',
    });

    const lastDaysProgress = getLastDaysProgress({
      logs,
      period: 7,
      anchorDate: run.builtAt ?? new Date(),
    });

    return {
      id: habit.id,
      title: habit.title,
      status: habit.status,
      totalDays: run.totalDays,
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
