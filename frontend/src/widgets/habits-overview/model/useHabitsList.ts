import type { HabitStatus } from '@/entities/habit';
import { useHabitsOverviewListBase } from '@/entities/habits-overview/model/baseHooks';
import type { HabitsOverviewListItem } from '@/entities/habits-overview/types';

export function useHabitOverviewList() {
  const { data, error, ...query } = useHabitsOverviewListBase();

  const grouped: Record<HabitStatus, HabitsOverviewListItem[]> = {
    planned: [],
    active: [],
    paused: [],
    built: [],
    cancelled: [],
  };

  if (data) {
    for (const habit of data) {
      grouped[habit.status].push(habit);
    }
  }

  return {
    ...query,
    groupedHabits: grouped,
  };
}
