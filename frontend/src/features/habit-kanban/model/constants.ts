import type { HabitKanbanBoardState } from '@/entities/habit/kanban/types';

export const initialBoard: HabitKanbanBoardState = {
  planned: [
    {
      id: '1',
      title: 'Morning run',
      status: 'planned',
      totalDays: 30,
      position: 0,
      startDate: undefined,
    },
    {
      id: '2',
      title: 'Read 10 pages',
      status: 'planned',
      totalDays: 45,
      position: 0,
      startDate: undefined,
    },
  ],
  active: [
    {
      id: '3',
      title: 'No sugar',
      status: 'active',
      totalDays: 60,
      position: 0,
      startDate: undefined,
    },
  ],
  paused: [],
  built: [],
  cancelled: [],
};
