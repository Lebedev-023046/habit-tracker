import { Button } from '@/shared/ui/button';
import { useEffect, useRef } from 'react';
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
  const { mutate: deleteHabit, isPending } = useDeleteHabit();
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (deleteButtonRef.current) {
      deleteButtonRef.current.focus();
    }
  }, []);

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
        <Button ref={deleteButtonRef} variant="danger" disabled={isPending}>
          Delete
        </Button>
      </div>
    </form>
  );
}
