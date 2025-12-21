import type { HabitStatus } from '@/entities/habit';
import { HABIT_STATUS_MAP } from '@/entities/habit/model/constants';

const { active, ...rest } = HABIT_STATUS_MAP;
export const filterValues = ['all', active, ...Object.values(rest)] as [
  'all',
  ...HabitStatus[],
];

export const groupValues = filterValues.filter(
  value => value !== 'all',
) as HabitStatus[];
