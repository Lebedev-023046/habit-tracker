import { BuildHabitButton } from '@/features/habit/change-status/ui/build/modal-trigger/ModalTrigger';

import { CancelHabitModalTrigger } from '@/features/habit/change-status/ui/cancel/modal-trigger';
import { PauseHabitButton } from '@/features/habit/change-status/ui/PauseHabitButton';
import { ResumeHabitButton } from '@/features/habit/change-status/ui/ResumeHabitButton';

import { StartHabitModalTrigger } from '@/features/habit/change-status/ui/start/modal-trigger';
import { DeleteHabitModalTrigger } from '@/features/habit/delete';
import { UpdateHabitModalTrigger } from '@/features/habit/update';
import type { HabitAction, HabitActionRenderer } from './types';

export const habitRunActionFactory: Record<HabitAction, HabitActionRenderer> = {
  edit: ({ habit, variant, closeMenu }) => {
    const defaultValues = {
      title: habit.title,
      totalDays: habit.totalDays,
      status: habit.status,
    };

    return (
      <UpdateHabitModalTrigger
        habitId={habit.id}
        defaultValues={defaultValues}
        onClick={closeMenu}
        variant={variant}
      />
    );
  },
  start: ({ habit, variant, closeMenu }) => {
    return (
      <StartHabitModalTrigger
        habitId={habit.id}
        variant={variant}
        onClick={closeMenu}
      />
    );
  },
  resume: ({ habit, variant, closeMenu }) => {
    return (
      <ResumeHabitButton
        habitId={habit.id}
        variant={variant}
        onClick={closeMenu}
      />
    );
  },
  pause: ({ habit, variant, closeMenu }) => {
    return (
      <PauseHabitButton
        habitId={habit.id}
        status="paused"
        variant={variant}
        onClick={closeMenu}
      />
    );
  },
  cancel: ({ habit, closeMenu }) => {
    return (
      <CancelHabitModalTrigger
        habitId={habit.id}
        variant="plain"
        onClick={closeMenu}
      />
    );
  },
  build: ({ habit, closeMenu }) => {
    return (
      <BuildHabitButton
        habitId={habit.id}
        habitTitle={habit.title}
        onClick={closeMenu}
        variant="plain"
      />
    );
  },
  delete: ({ habit, variant, closeMenu }) => {
    return (
      <DeleteHabitModalTrigger
        habitTitle={habit.title}
        habitId={habit.id}
        onClick={closeMenu}
        variant={variant}
      />
    );
  },
};
