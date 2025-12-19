export { habitRepo } from './api//habitRepo';

export {
  createHabitSchema,
  updateHabitSchema,
  type CreateHabitFormValues,
  type UpdateHabitFormValues,
} from './model/form/schema';

export {
  getAllHabitsQueryOptions,
  getOneHabitQueryOptions,
} from './model/query/queryOptions';

export {
  useCreateHabitBase,
  useDeleteHabitBase,
  useGetHabitsWithStale,
  useUpdateHabitBase,
  useUpdateHabitStatusBase,
} from './model/query/habitBaseHooks';

// export {
//   habitBoardService,
//   type BoardHabitViewModel,
//   type ColumnId,
//   type DragMeta,
//   type HabitKanbanBoardState,
// } from './model/services/habitManagement.service';

export {
  habitDailyService,
  type DailyHabitItem,
  type DailyHabitViewModel,
} from './model/services/habitDaily.service';

export { useDailyHabits } from './model/view/useDailyHabits';
export { useDashboardHabit } from './model/view/useDashboardHabit';

export { HabitForm } from './ui/habit-form';

export type {
  CreateHabitPayloadStatus,
  Habit,
  HabitDayLog,
  HabitStatus,
  HabitTotalDays,
} from './model/types';
