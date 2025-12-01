import type {
  CreateHabitFormValues,
  HabitFormValues,
} from '@/entities/habit/model/form/schema';

export function toCreateHabitPayload(
  values: HabitFormValues,
): CreateHabitFormValues {
  const payload = {
    title: values.title,
    status: values.status as 'planned' | 'active',
    totalDays: values.totalDays,
    startDate: values.startDate,
    endDate: values.endDate,
  };

  return payload;
}
