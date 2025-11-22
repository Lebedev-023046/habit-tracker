import { Prisma } from '@prisma/client';

export type CreateHabitDto = Pick<
  Prisma.HabitCreateInput,
  'title' | 'status' | 'totalDays' | 'startDate' | 'endDate'
>;

export type UpdateHabitDto = Pick<
  Prisma.HabitUpdateInput,
  'title' | 'status' | 'totalDays' | 'startDate' | 'endDate'
>;
