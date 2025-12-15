// features/habit-log/upsert/ui/HabitActionsContainer.tsx

import { HabitActions } from '@/pages/habit-daily/components/habit-actions';
import type { HabitDayStatus } from '@/shared/model/habit-day.model';
import type { UpsertHabitLogPayload } from '../../model/types';
import { useUpsertHabit } from '../../model/useUpsertHabitLog';

interface HabitActionsContainerProps {
  habitName: string;
  todayStatus: HabitDayStatus;
  completePayload: UpsertHabitLogPayload;
  undoPayload: UpsertHabitLogPayload;
  isLoading?: boolean;
}

export function HabitActionsContainer({
  habitName,
  todayStatus,
  completePayload,
  undoPayload,
  isLoading,
}: HabitActionsContainerProps) {
  const { mutate: upsertHabit, isPending } = useUpsertHabit();

  const handleComplete = () => {
    upsertHabit(completePayload);
  };

  const handleUndo = () => {
    upsertHabit(undoPayload);
  };

  return (
    <HabitActions
      todayStatus={todayStatus}
      habitName={habitName}
      isLoading={isLoading}
      isPending={isPending}
      onCompleteClick={handleComplete}
      onUndoClick={handleUndo}
    />
  );
}
