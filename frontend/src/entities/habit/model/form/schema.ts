import { z } from 'zod';
import { TOTAL_DAYS_VALUES } from '../constants';

const titleSchema = z
  .string()
  .min(3, 'At least 3 characters')
  .max(50, 'Max 50 characters');

export const totalDaysSchema = z.union(
  TOTAL_DAYS_VALUES.map(days => z.literal(days)),
);

export const createHabitSchema = z
  .object({
    title: titleSchema,
    startImmediately: z.boolean(),
    totalDays: totalDaysSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startImmediately && !data.totalDays) {
      ctx.addIssue({
        path: ['totalDays'],
        message: 'Total days is required when starting habit',
        code: 'custom',
      });
    }
  });

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;

export const updateHabitSchema = z.object({
  title: titleSchema,
});

export type UpdateHabitFormValues = z.infer<typeof updateHabitSchema>;
