import {
  HABIT_DAY_STATUS_MAP,
  type DayProgress,
  type HabitDayStatus,
} from '@/shared/model/habit-day.model';
import { getTodayUserDayUTC } from '@/shared/utils/time';
import { isSameDay } from 'date-fns';
import type { Habit, HabitDayLog } from '../types';
import { HabitService } from './habit.service';

export interface DailyHabitViewModel {
  id: string;
  title: string;
  daySinceStart: number;
  totalDays: number;
  progress: number;
  currentStreak: number;
  bestStreak: number;
  todayStatus: HabitDayStatus;
  lastDaysProgress: DayProgress[];
}

export interface DailyHabitsViewModel {
  totalCount: number;
  completedCount: number;
  habits: DailyHabitViewModel[];
}

export class HabitDailyService extends HabitService {
  constructor() {
    super();
  }

  private getTodayStatus(dayLogs: HabitDayLog[]): HabitDayStatus {
    try {
      if (!dayLogs?.length) {
        return HABIT_DAY_STATUS_MAP.unmarked;
      }

      const todayUTC = getTodayUserDayUTC();

      const logForToday = dayLogs.find(log =>
        isSameDay(new Date(log.date as string), todayUTC),
      );

      return logForToday?.status ?? HABIT_DAY_STATUS_MAP.unmarked;
    } catch (error) {
      console.error(error);
      return HABIT_DAY_STATUS_MAP.unmarked;
    }
  }

  buildDailyModel(habit: Habit): DailyHabitViewModel {
    if (!habit)
      return {
        id: '',
        title: '',
        daySinceStart: 0,
        totalDays: 0,
        progress: 0,
        currentStreak: 0,
        bestStreak: 0,
        todayStatus: HABIT_DAY_STATUS_MAP.unmarked,
        lastDaysProgress: [],
      };

    const { id, title, dayLogs, totalDays } = habit;

    return {
      id,
      title,
      daySinceStart: this.getDayNumberSinceStart(dayLogs, totalDays),
      totalDays: habit.totalDays,
      progress: this.getHabitProgress(dayLogs, totalDays),
      currentStreak: this.getCurrentStreak(dayLogs),
      bestStreak: this.getBestStreak(dayLogs),
      lastDaysProgress: this.getLastDaysProgress(dayLogs, 7),
      todayStatus: this.getTodayStatus(dayLogs),
    };
  }

  buildDailyHabitsViewModel(habits: Habit[]): DailyHabitsViewModel {
    const dailyHabits = habits.map(habit => this.buildDailyModel(habit));
    const completedCount = dailyHabits.filter(
      habit => habit.todayStatus === 'completed',
    ).length;

    return {
      totalCount: habits.length,
      completedCount,
      habits: dailyHabits,
    };
  }
}

export const habitDailyService = new HabitDailyService();
