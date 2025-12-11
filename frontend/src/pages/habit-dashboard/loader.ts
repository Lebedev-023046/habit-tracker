import { queryClient } from '@/app/providers/react-query';
import { getOneHabitQueryOptions } from '@/entities/habit';

export async function habitDashboardLoader({
  params,
}: {
  params: { habitId?: string };
}) {
  const habitId = params.habitId;

  if (!habitId) {
    throw new Response('Habit id is required', { status: 400 });
  }

  await queryClient.ensureQueryData(getOneHabitQueryOptions(habitId));

  return null;
}
