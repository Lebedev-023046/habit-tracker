import { Button } from '@/shared/ui/button';
import { useDeleteHabit } from '../../model/useDeleteHabit';
import styles from './DeleteHabitForm.module.css';

interface DeleteHabitFormProps {
  habitId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DeleteHabitForm({
  habitId,
  onSuccess: handleSuccess,
  onCancel,
}: DeleteHabitFormProps) {
  const { mutate: deleteHabit, isPending, error } = useDeleteHabit();

  const errorMessage = error ? (error as Error).message : undefined;
  const hasError = Boolean(errorMessage);
  const errorOpenClassName = hasError ? styles.errorOpen : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteHabit(
      { id: habitId },
      {
        onSuccess: () => {
          handleSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.actions}>
        <Button
          variant="ghost"
          animation="none"
          disabled={isPending}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button variant="danger" disabled={isPending}>
          Delete
        </Button>
      </div>
      {hasError && (
        <div className={`${styles.error} ${errorOpenClassName}`}>
          <div className={styles.errorContent}>
            <p className={styles.errorText}>{errorMessage}</p>
          </div>
        </div>
      )}
    </form>
  );
}
