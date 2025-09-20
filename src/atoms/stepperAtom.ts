import { atom } from 'recoil';

export const stepperCurrentStepAtom = atom<number>({
  key: 'stepperCurrentStep',
  default: 0,
});

export const stepperStepsAtom = atom<Array<{ id: string | number; label?: string; status?: 'upcoming' | 'in-progress' | 'completed' | 'error' }>>({
  key: 'stepperSteps',
  default: [],
});