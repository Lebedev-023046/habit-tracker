export function calculateProgress(completedDays: number, totalDays: number) {
  if (!totalDays) {
    return { percent: 0, remainingDays: 0 };
  }

  const safeCompleted = Math.min(completedDays, totalDays);

  const percent = Math.round((safeCompleted / totalDays) * 100);
  const remainingDays = Math.max(totalDays - safeCompleted, 0);

  return {
    percent,
    remainingDays,
  };
}
