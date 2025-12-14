import { type DayProgress } from '@/shared/model/habit-day.model';
import { HABIT_STATUS_MAP } from '../constants';
import type { Habit, HabitStatus } from '../types';
import { HabitService } from './habit.service';

export interface HabitListItem {
  id: string;
  title: string;
  status: HabitStatus;
  progress: number;
  currentStreak: number;
  bestStreak: number;
  daySinceStart: number;
  totalDays: number;
  lastDaysProgress: DayProgress[];
}

class HabitBoardService extends HabitService {
  constructor() {
    super();
  }

  readonly emptyViewModel: HabitListItem = {
    id: '',
    title: 'Not Found',
    status: HABIT_STATUS_MAP.paused,
    progress: 0,
    currentStreak: 0,
    bestStreak: 0,
    daySinceStart: 0,
    totalDays: 0,
    lastDaysProgress: [],
  };

  mapToListItem(habit: Habit): HabitListItem {
    if (!habit) return this.emptyViewModel;

    const { id, title, status, totalDays, dayLogs } = habit;

    return {
      id,
      title,
      status,

      progress: this.getHabitProgress(dayLogs, totalDays),
      currentStreak: this.getCurrentStreak(dayLogs),
      bestStreak: this.getBestStreak(dayLogs),

      daySinceStart: this.getDayNumberSinceStart(dayLogs, totalDays),
      totalDays,

      lastDaysProgress: this.getLastDaysProgress(dayLogs, 7),
    };
  }

  buildHabitListViewModel(habits: Habit[]) {
    return habits.map(habit => this.mapToListItem(habit));
  }
}

export const habitBoardService = new HabitBoardService();
