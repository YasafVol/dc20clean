import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import Stepper from '../Stepper';
import { sampleSteps } from './sampleSteps';
import { stepperCurrentStepAtom, stepperStepsAtom } from '../../../atoms/stepperAtom';

const meta: Meta<typeof Stepper> = {
  title: 'Design System/Stepper',
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: sampleSteps,
    current: 1,
  },
};

export const UsingRecoil: Story = {
  decorators: [
    (Story) => (
      <RecoilRoot initializeState={({ set }) => { set(stepperStepsAtom, sampleSteps); set(stepperCurrentStepAtom, 1); }}>
        <Story />
      </RecoilRoot>
    ),
  ],
};
