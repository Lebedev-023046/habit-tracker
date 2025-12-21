import { useStartHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function useStartHabit() {
  const mutation = useStartHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit started!',
    errorMessage: 'Failed to start habit',
  });
}
