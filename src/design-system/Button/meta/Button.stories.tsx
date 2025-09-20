import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { colors } from '../../styles/colors';

const meta: Meta<typeof Button> = {
  title: 'DesignSystem/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Action',
    bg: colors.actionButtonBg,
  },
};
