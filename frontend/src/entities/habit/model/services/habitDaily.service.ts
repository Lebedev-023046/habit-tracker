import {
  HABIT_DAY_STATUS_MAP,
  type DayProgress,
  type HabitDayStatus,
} from '@/shared/model/habit-day.model';
import { getTodayUserDayUTC } from '@/shared/utils/time';
import { isSameDay } from 'date-fns';
import type { Habit, HabitDayLog } from '../types';
import { HabitService } from './habit.service';

export interface DailyHabitItem {
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

export interface DailyHabitViewModel {
  totalCount: number;
  completedCount: number;
  habits: DailyHabitItem[];
}

export class HabitDailyService extends HabitService {
  constructor() {
    super();
    this.buildDailyHabitsViewModel = this.buildDailyHabitsViewModel.bind(this);
  }

  readonly emptyItem = {
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

  buildDailyHabitItem(habit: Habit): DailyHabitItem {
    if (!habit) return this.emptyItem;

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

  buildDailyHabitsViewModel(habits: Habit[]): DailyHabitViewModel {
    const dailyHabits = habits.map(habit => this.buildDailyHabitItem(habit));
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
