import type { TCipPhases } from 'src/sections/cip-gen/types/cip-gen-form';

export const CIP_PHASES: TCipPhases[] = [
  'PREPARATION',
  'EXECUTION',
  'GOLIVE',
  'NOGO',
  'POSTROLLBACK',
];

export const PHASES_COLOR_MAP: Record<TCipPhases, string> = {
  PREPARATION: '#2196F3',
  EXECUTION: '#FF9800',
  GOLIVE: '#4CAF50',
  NOGO: '#F44336',
  POSTROLLBACK: '#9E9E9E',
};
