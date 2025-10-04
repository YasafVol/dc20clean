import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from '../RadioButton';

const meta: Meta<typeof RadioButton> = {
	title: 'DesignSystem/RadioButton',
	component: RadioButton,
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Whether the radio button is selected'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the radio button is disabled'
		}
	}
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
	args: {
		label: 'Combat Training',
		subtext:
			'You can use Weapons you have Training with to make Weapon Attacks. When you do, you add your Proficiency Bonus to your Attack Check.',
		checked: false,
		disabled: false,
		name: 'martial_path',
		value: 'combat_training'
	}
};

export const Selected: Story = {
	args: {
		label: 'Flexible Combat',
		subtext:
			'Choose 2 Disciplines from the list provided by your Ancestry. You gain Training with the Unarmed Attacks of those 2 Disciplines, and can use them to make Weapon Attacks.',
		checked: true,
		disabled: false,
		name: 'martial_path',
		value: 'flexible_combat'
	}
};

export const WithoutSubtext: Story = {
	args: {
		label: 'Fire',
		checked: false,
		disabled: false,
		name: 'divine_damage',
		value: 'fire'
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Option',
		subtext: 'This option is currently disabled',
		checked: false,
		disabled: true,
		name: 'martial_path',
		value: 'disabled_option'
	}
};

export const DisabledSelected: Story = {
	args: {
		label: 'Disabled Selected',
		subtext: 'This option is disabled but selected',
		checked: true,
		disabled: true,
		name: 'martial_path',
		value: 'disabled_selected'
	}
};

export const LongText: Story = {
	args: {
		label: 'Martial Path - Extended Description',
		subtext:
			'This is a very long description that demonstrates how the radio button handles extended text content. It should wrap properly and maintain good readability even with substantial amounts of descriptive text. The layout should remain clean and the text should flow naturally without breaking the component structure or causing any visual issues.',
		checked: false,
		disabled: false,
		name: 'martial_path',
		value: 'long_text_option'
	}
};

export const GroupExample: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<RadioButton
				label="Combat Training"
				subtext="Gain proficiency with weapons"
				name="martial_path_group"
				value="combat_training"
				checked={false}
			/>
			<RadioButton
				label="Flexible Combat"
				subtext="Choose 2 Disciplines from your Ancestry"
				name="martial_path_group"
				value="flexible_combat"
				checked={true}
			/>
			<RadioButton
				label="Unarmed Combat"
				subtext="Master unarmed fighting techniques"
				name="martial_path_group"
				value="unarmed_combat"
				checked={false}
			/>
		</div>
	)
};
