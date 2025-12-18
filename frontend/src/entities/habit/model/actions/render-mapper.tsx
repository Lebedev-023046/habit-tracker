import type { HabitAction } from '../types';

import { BuildHabitButton } from '@/features/habit/change-status/ui/BuildHabitButton';
import { CancelHabitButton } from '@/features/habit/change-status/ui/CancelHabitButton';
import { PauseHabitButton } from '@/features/habit/change-status/ui/PauseHabitButton';
import { ActivateHabitButton } from '@/features/habit/change-status/ui/ResumeHabitButton';
import { DeleteHabitModalTrigger } from '@/features/habit/delete';
import { UpdateHabitModalTrigger } from '@/features/habit/update';
import type { HabitActionRenderer } from './types';

export const ACTION_RENDERERS: Record<HabitAction, HabitActionRenderer> = {
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
  activate: ({ habit, variant, closeMenu }) => {
    return (
      <ActivateHabitButton
        habitId={habit.id}
        currentStatus={habit.status}
        status="active"
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
      <CancelHabitButton
        habitId={habit.id}
        status="cancelled"
        variant="plain"
        onClick={closeMenu}
      />
    );
  },
  build: ({ habit, closeMenu }) => {
    return (
      <BuildHabitButton
        habitId={habit.id}
        status="built"
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
