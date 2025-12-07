import { useGetHabitsWithStale } from '@/entities/habit/model/RQ/habitBaseHooks';
import { HabitItems } from './sections/habit-items';
import { Overview } from './sections/overview/Overview';

export default function HabitDailyPage() {
  const { data: habitsInfo, isLoading, isError } = useGetHabitsWithStale();

  const isInitialLoading = isLoading && !habitsInfo;

  if (isError) {
    return <div>{habitsInfo?.error}</div>;
  }

  const habits = habitsInfo?.data ?? [];
  const activeHabits = habits.filter(habit => habit.status === 'active');

  const totalCount = activeHabits.length;
  const completedCount = 1;

  return (
    <>
      <Overview totalCount={totalCount} completedCount={completedCount} />
      <HabitItems activeHabits={activeHabits} isLoading={isInitialLoading} />
    </>
  );
}
