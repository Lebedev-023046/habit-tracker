import { z } from 'zod';
import { HABIT_STATUSES, TOTAL_DAYS_VALUES } from '../constants';

const titleSchema = z
  .string()
  .min(3, 'At least 3 characters')
  .max(30, 'Max 30 characters');

// Для общей формы (edit может иметь любой статус)
const habitStatusSchema = z.enum(HABIT_STATUSES);

// Для создания (только planned | active)
// const createHabitStatusSchema = z.enum(CREATE_HABIT_STATUS);

export const totalDaysSchema = z.union(
  TOTAL_DAYS_VALUES.map(days => z.literal(days)),
);

// ─────────────────────────────
// Базовая схема формы (общая для UI)
// ─────────────────────────────

export const habitFormSchema = z.object({
  title: titleSchema,
  status: habitStatusSchema,
  totalDays: totalDaysSchema,
});

export type HabitFormValues = z.infer<typeof habitFormSchema>;

// ─────────────────────────────
// Схема для создания (ограниченный статус)
// ─────────────────────────────

export const createHabitSchema = habitFormSchema.extend({
  status: habitStatusSchema,
});
export const updateHabitSchema = habitFormSchema.extend({
  status: habitStatusSchema,
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;
export type UpdateHabitFormValues = z.infer<typeof updateHabitSchema>;

// ─────────────────────────────
