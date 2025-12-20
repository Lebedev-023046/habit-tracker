import type { Habit, HabitStatus, HabitTotalDays } from '@/entities/habit';
import { HABIT_STATUS_MAP } from '@/entities/habit/model/constants';
import { type DayProgress } from '@/shared/model/habit-day.model';

export interface HabitListItem {
  id: string;
  title: string;
  status: HabitStatus;

  totalDays: HabitTotalDays;
  daySinceStart: number;

  progress: number;
  currentStreak: number;
  bestStreak: number;

  lastDaysProgress: DayProgress[];
}

class HabitListService {
  constructor() {
    this.buildHabitListViewModel = this.buildHabitListViewModel.bind(this);
  }

  readonly emptyViewModel: HabitListItem = {
    id: '',
    title: 'Not Found',
    status: HABIT_STATUS_MAP.paused,
    progress: 0,
    currentStreak: 0,
    bestStreak: 0,
    daySinceStart: 0,
    totalDays: 30,
    lastDaysProgress: [],
  };

  private mapToListItem(habit: Habit): HabitListItem {
    if (!habit) return this.emptyViewModel;

    return this.emptyViewModel;

    // const { id, title, status, totalDays, dayLogs } = habit;

    // return {
    //   id,
    //   title,
    //   status,

    //   progress: this.getHabitProgress(dayLogs, totalDays),
    //   currentStreak: this.getCurrentStreak(dayLogs),
    //   bestStreak: this.getBestStreak(dayLogs),

    //   daySinceStart: this.getDayNumberSinceStart(dayLogs, totalDays),
    //   totalDays,

    //   lastDaysProgress: this.getLastDaysProgress(dayLogs, 7),
    // };
  }

  buildHabitListViewModel(habits: Habit[]) {
    const groupedHabits: Record<HabitStatus, HabitListItem[]> = {
      active: [],
      paused: [],
      planned: [],
      built: [],
      cancelled: [],
    };

    for (const habit of habits) {
      const habitView = this.mapToListItem(habit);
      groupedHabits[habit.status].push(habitView);
    }

    return groupedHabits;
  }
}

export const habitListService = new HabitListService();
