import type { HabitStatus } from '@/entities/habit/model/types';

export const KANBAN_COLUMNS = [
  { status: 'planned', title: 'Planned' },
  { status: 'active', title: 'Active' },
  { status: 'paused', title: 'Paused' },
  { status: 'built', title: 'Built' },
  { status: 'cancelled', title: 'Cancelled' },
] satisfies { status: HabitStatus; title: string }[];
