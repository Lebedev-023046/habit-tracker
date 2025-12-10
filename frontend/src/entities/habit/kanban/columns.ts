import type { HabitStatus } from '@/entities/habit';

export interface HabitKanbanColumnConfig {
  id: HabitStatus;
  title: string;
}

export const HABIT_KANBAN_COLUMNS: HabitKanbanColumnConfig[] = [
  { id: 'planned', title: 'Planned' },
  { id: 'active', title: 'Active' },
  { id: 'paused', title: 'Paused' },
  { id: 'built', title: 'Built' },
  { id: 'cancelled', title: 'Cancelled' },
];
