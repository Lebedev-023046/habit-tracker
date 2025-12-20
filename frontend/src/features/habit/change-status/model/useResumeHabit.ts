import { useResumeHabitRunBase } from '@/entities/habit-run';
import { withToastMutation } from './helpers/withToastMutation';

export function useResumeHabit() {
  const mutation = useResumeHabitRunBase();

  return withToastMutation({
    mutation,
    successMessage: 'Habit resumed',
    errorMessage: 'Failed to resume habit',
  });
}
