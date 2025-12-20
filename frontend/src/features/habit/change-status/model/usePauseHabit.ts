import { usePauseHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function usePauseHabit() {
  const mutation = usePauseHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit paused',
    errorMessage: 'Failed to pause habit',
  });
}
