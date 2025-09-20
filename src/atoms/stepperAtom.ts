import { atom } from 'jotai';

export const stepperCurrentStepAtom = atom<number>(0);

export const stepperStepsAtom = atom<Array<{ id: string | number; label?: string; status?: 'upcoming' | 'in-progress' | 'completed' | 'error' }>>([]);

// Step validation atoms for character creation
export const stepValidationAtom = atom<Record<string, boolean>>({});

// Character creation steps definition
export const characterCreationStepsAtom = atom<Array<{ id: string; label: string; status?: 'upcoming' | 'in-progress' | 'completed' | 'error' }>>([
  { id: 'class', label: 'CLASS' },
  { id: 'features', label: 'FEATURES' },
  { id: 'ancestry', label: 'ANCESTRY' },
  { id: 'attributes', label: 'ATTRIBUTES' },
  { id: 'background', label: 'BACKGROUND' },
  { id: 'spells', label: 'SPELLS &\nMANEUVERS' },
  { id: 'finish', label: 'FINISH' }
]);