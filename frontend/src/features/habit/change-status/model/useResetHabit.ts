import { useResetHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function useResetHabit() {
  const mutation = useResetHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit restarted',
    errorMessage: 'Failed to reset habit',
  });
}
