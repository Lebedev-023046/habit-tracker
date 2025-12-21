import { useBuildHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function useBuildHabit() {
  const mutation = useBuildHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit completed 🎉',
    errorMessage: 'Failed to complete habit',
  });
}
