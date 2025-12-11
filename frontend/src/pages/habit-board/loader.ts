import { queryClient } from '@/app/providers/react-query';
import { getAllHabitsQueryOptions } from '@/entities/habit';

export async function habitBoardLoader() {
  await queryClient.ensureQueryData(getAllHabitsQueryOptions());
  return null;
}
