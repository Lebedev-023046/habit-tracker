import { BadRequestException, Injectable } from '@nestjs/common';
import { isSameDay, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

import { calculateProgress } from '../calculations/getProgress';
import { calculateDayStats } from '../calculations/getStats';
import { calculateStreaks } from '../calculations/getStreaks';

@Injectable()
export class HabitDashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(habitId: string) {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit) {
      throw new BadRequestException('Habit not found');
    }

    const run = await this.prisma.habitRun.findFirst({
      where: {
        habitId,
        status: 'active',
      },
      include: {
        dayLogs: {
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!run) {
      return {
        habit,
        run: null,
      };
    }

    const today = startOfDay(new Date());

    const stats = calculateDayStats(run.dayLogs);
    const progress = calculateProgress(stats.completedDays, run.totalDays);

    const streak = calculateStreaks(run.dayLogs, today);

    const todayLog = run.dayLogs.find((log) => isSameDay(log.date, today));

    return {
      habit,
      run: {
        id: run.id,
        startDate: run.startDate,
        totalDays: run.totalDays,

        stats,
        progress,
        streak,

        todayStatus: todayLog?.status ?? 'unmarked',
      },
      logs: run.dayLogs,
    };
  }
}
