import type { HabitStatus } from '@/entities/habit/model/types';

export const habitStatusBannerTexts = {
  planned: {
    title: 'Ready when you are',
    subtitle: "This habit is planned. Start it whenever you're ready.",
  },
  active: {
    title: "You're on track",
    subtitle: "You're on track to build this habit! Keep going!",
  },
  paused: {
    title: 'Paused for now',
    subtitle: 'This habit is currently paused. Resume anytime.',
  },
  built: {
    title: 'Habit completed',
    subtitle: "You've successfully built this habit. Great job!",
  },
  cancelled: {
    title: 'Habit cancelled',
    subtitle: 'This habit has been cancelled. You can restart it anytime.',
  },
  notFound: {
    title: 'Habit not found',
    subtitle: 'This habit has been deleted or does not exist.',
  },
};

export const getBannerContent = (status: HabitStatus) => {
  if (!habitStatusBannerTexts[status]) {
    return habitStatusBannerTexts.notFound;
  }

  return habitStatusBannerTexts[status];
};
