import { useCancelHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function useCancelHabit() {
  const mutation = useCancelHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit canceled',
    errorMessage: 'Failed to cancel habit',
  });
}
