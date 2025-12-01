import { z } from 'zod';
import { HABIT_STATUS, TOTAL_DAYS_VALUES } from '../types';

const titleSchema = z
  .string()
  .min(3, 'At least 3 characters')
  .max(30, 'Max 30 characters');

// Для общей формы (edit может иметь любой статус)
const habitStatusSchema = z.enum(HABIT_STATUS);

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
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
});

export type HabitFormValues = z.infer<typeof habitFormSchema>;

// ─────────────────────────────
// Схема для создания (ограниченный статус)
// ─────────────────────────────

export const createHabitSchema = habitFormSchema
  .extend({
    status: habitStatusSchema,
  })
  .refine(
    data => {
      if (data.status === 'active') {
        return !!data.startDate;
      }
      return true;
    },
    {
      path: ['startDate'],
      message: 'Active habit must have a start date',
    },
  );
export const updateHabitSchema = habitFormSchema.extend({
  status: habitStatusSchema,
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;
export type UpdateHabitFormValues = z.infer<typeof updateHabitSchema>;

// ─────────────────────────────
