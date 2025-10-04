import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
	title: 'DesignSystem/Button',
	component: Button
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		label: 'Primary Action',
		bg: '#AD393B' // copper
	}
};
