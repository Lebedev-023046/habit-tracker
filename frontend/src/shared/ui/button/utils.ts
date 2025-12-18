import { stateClassMap } from './constants';
import type { ResolveStateMap } from './types';

export function resolveVariantStateClass({ variant, active }: ResolveStateMap) {
  if (!variant) return '';

  const stateMap = stateClassMap[variant];
  if (!stateMap) return '';

  if (active && stateMap.active) return stateMap.active;

  return '';
}
