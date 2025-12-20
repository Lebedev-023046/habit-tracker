import type { HabitStatus } from '@/entities/habit';
import type { ButtonVariant } from '@/shared/ui/button/types';
import type { JSX } from 'react';
import type { HabitListItem } from '../habitList.service';

export type HabitAction =
  | 'edit'
  | 'activate'
  | 'pause'
  | 'build'
  | 'cancel'
  | 'delete';

export interface HabitActionContext {
  habitId: string;
  status: HabitStatus;
  closeMenu?: () => void;
}

export interface HabitActionRendererProps {
  habit: HabitListItem;
  variant: ButtonVariant;
  closeMenu?: () => void;
}

export type HabitActionRenderer = (
  ctx: HabitActionRendererProps,
) => JSX.Element;
