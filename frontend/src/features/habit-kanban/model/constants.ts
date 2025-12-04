import type { HabitKanbanBoardState } from './types';

export const initialBoard: HabitKanbanBoardState = {
  planned: [
    {
      id: '1',
      title: 'Morning run',
      status: 'planned',
      totalDays: 30,
      startDate: null,
    },
    {
      id: '2',
      title: 'Read 10 pages',
      status: 'planned',
      totalDays: 45,
      startDate: null,
    },
  ],
  active: [
    {
      id: '3',
      title: 'No sugar',
      status: 'active',
      totalDays: 60,
      startDate: null,
    },
  ],
  paused: [],
  built: [],
  cancelled: [],
};
