import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'DesignSystem/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Extend Attack',
    subtext: 'Your Melee Attack Range is increased by 1 Space (or your Ranged Attack Range is increased by 5 Spaces) for the Attack.',
    checked: false,
    disabled: false
  }
};

export const Checked: Story = {
  args: {
    label: 'Power Attack',
    subtext: 'You deal +1 damage with the Attack. You can use this Maneuver multiple times.',
    checked: true,
    disabled: false
  }
};

export const WithoutSubtext: Story = {
  args: {
    label: 'Simple Option',
    checked: false,
    disabled: false
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    subtext: 'This option is currently disabled',
    checked: false,
    disabled: true
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    subtext: 'This option is disabled but checked',
    checked: true,
    disabled: true
  }
};

export const LongText: Story = {
  args: {
    label: 'Sweeping Attack',
    subtext: 'Choose 1 additional target that\'s within 1 Space of the original target that\'s within your Melee Attack Range. Make 1 Attack Check against all targets. Attack Hit: The original target takes your Attack\'s damage, and each additional target Hit takes 1 damage of the same type. You can use this Maneuver multiple times.',
    checked: false,
    disabled: false
  }
};
