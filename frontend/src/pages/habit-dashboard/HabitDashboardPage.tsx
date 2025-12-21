import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { HabitDashboard } from '@/widgets/habit-dashboard';

import { useParams } from 'react-router-dom';

export default function HabitDashboardPage() {
  const { habitId } = useParams<{ habitId: string }>();

  if (!habitId) {
    return <GlobalFallback error={new Error('Habit id is missing')} />;
  }

  return <HabitDashboard habitId={habitId} />;
}
