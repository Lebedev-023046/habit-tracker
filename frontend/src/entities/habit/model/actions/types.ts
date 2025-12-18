import type { ButtonVariant } from '@/shared/ui/button/types';
import type { JSX } from 'react';
import type { HabitListItem } from '../services/habitList.service';
import type { HabitStatus } from '../types';

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
