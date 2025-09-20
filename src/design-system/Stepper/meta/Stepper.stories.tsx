import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import Stepper from '../Stepper';
import { sampleSteps } from './sampleSteps';

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

export const UsingState: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};
