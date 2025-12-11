import { queryClient } from '@/app/providers/react-query';
import { getAllHabitsQueryOptions } from '@/entities/habit';

export async function dailyHabitsLoader() {
  await queryClient.ensureQueryData(getAllHabitsQueryOptions());

  return null;
}
