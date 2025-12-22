import { Injectable } from '@nestjs/common';
import { HabitDayStatus, Prisma } from '@prisma/client';
import { ResponseUtil } from 'src/common/utils/response';
import { TimeService } from 'src/common/utils/time/time.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCurrentHabitDay } from '../calculations/getCurrentHabitDay';
import { getLastDaysProgress } from '../calculations/getLastDaysProgress';
import { calculateProgress } from '../calculations/getProgress';
import { calculateStreaks } from '../calculations/getStreaks';
import { DailyHabitItemDTO, DailyHabitsDTO } from './daily-habits.dto';

type HabitWithActiveRun = Prisma.HabitGetPayload<{
  include: {
    runs: {
      where: { status: 'active' };
      include: {
        dayLogs: {
          orderBy: { date: 'asc' };
        };
      };
    };
  };
}>;

@Injectable()
export class DailyHabitsQuery {
  constructor(
    private prisma: PrismaService,
    private time: TimeService,
  ) {}

  async getDailyHabits() {
    const today = this.time.today();

    const habits = await this.prisma.habit.findMany({
      where: {
        status: 'active',
        runs: {
          some: { status: 'active' },
        },
      },
      include: {
        runs: {
          where: { status: 'active' },
          include: {
            dayLogs: {
              orderBy: { date: 'asc' },
            },
          },
        },
      },
    });

    const dailyHabits = habits.map((habit) =>
      this.mapHabitToDailyItem(habit, today),
    );

    const completedCount = dailyHabits.filter(
      (habit) => habit.todayStatus === HabitDayStatus.completed,
    ).length;

    const response: DailyHabitsDTO = {
      totalCount: dailyHabits.length,
      completedCount,
      habits: dailyHabits,
    };

    return ResponseUtil.success(response);
  }

  private mapHabitToDailyItem(
    habit: HabitWithActiveRun,
    today: Date,
  ): DailyHabitItemDTO {
    const activeRun = habit.runs[0];

    if (!activeRun) {
      throw new Error(`Active habit ${habit.id} has no active run`);
    }

    const logs = activeRun.dayLogs;
    const completedDays = logs.filter(
      (log) => log.status === HabitDayStatus.completed,
    ).length;

    const todayLog = logs.find((log) => log.date.getTime() === today.getTime());

    const { percent: progress } = calculateProgress(
      completedDays,
      activeRun.totalDays,
    );

    const { current: currentStreak, best: bestStreak } = calculateStreaks(
      logs,
      today,
    );

    const daySinceStart = getCurrentHabitDay(activeRun.startDate, today);

    const lastDaysProgress = getLastDaysProgress(logs, 7, today);

    return {
      id: habit.id,
      title: habit.title,

      todayStatus: todayLog?.status ?? HabitDayStatus.unmarked,
      canUndo: Boolean(todayLog),

      daySinceStart,
      totalDays: activeRun.totalDays,
      progress,

      currentStreak,
      bestStreak,

      lastDaysProgress,
    };
  }
}
