import { useMutation } from '@tanstack/react-query';
import { habitRunRepo } from '../../api/habitRunRepo';
import type {
  ResetHabitRunPayload,
  StartHabitRunPayload,
} from '../../api/types';

export function useStartHabitRunBase() {
  return useMutation({
    mutationFn: ({
      habitId,
      payload,
    }: {
      habitId: string;
      payload: StartHabitRunPayload;
    }) => habitRunRepo.start(habitId, payload),
  });
}

export function usePauseHabitRunBase() {
  return useMutation({
    mutationFn: ({ habitId }: { habitId: string }) =>
      habitRunRepo.pause(habitId),
  });
}

export function useResumeHabitRunBase() {
  return useMutation({
    mutationFn: ({ habitId }: { habitId: string }) =>
      habitRunRepo.resume(habitId),
  });
}

export function useBuildHabitRunBase() {
  return useMutation({
    mutationFn: ({ habitId }: { habitId: string }) =>
      habitRunRepo.build(habitId),
  });
}

export function useCancelHabitRunBase() {
  return useMutation({
    mutationFn: ({ habitId }: { habitId: string }) =>
      habitRunRepo.cancel(habitId),
  });
}

export function useResetHabitRunBase() {
  return useMutation({
    mutationFn: ({
      habitId,
      payload,
    }: {
      habitId: string;
      payload: ResetHabitRunPayload;
    }) => habitRunRepo.reset(habitId, payload),
  });
}
