export function calculateProgress(completedDays: number, totalDays: number) {
  if (!totalDays) {
    return { percent: 0, remainingDays: 0 };
  }

  const percent = Math.round((completedDays / totalDays) * 100);
  const remainingDays = Math.max(totalDays - completedDays, 0);

  return {
    percent,
    remainingDays,
  };
}
