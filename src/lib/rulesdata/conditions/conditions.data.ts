// Filename: conditions.data.ts
import { ConditionDefinition } from './conditions.types';

export const ALL_CONDITIONS: ConditionDefinition[] = [
	{
		id: 'bleeding-x',
		name: 'Bleeding X',
		description:
			'You take X True damage at the start of each of your turns. All stacks of the Condition end when you’re subjected to an effect that restores your HP. Alternatively, a creature can attempt to remove 1 or more stacks by taking the Medicine Action.',
		type: 'stacking',
		tags: ['physical', 'damage']
	},
	{
		id: 'blinded',
		name: 'Blinded',
		description:
			'You can’t see (see the Unseen section for more information). All terrain is considered Difficult Terrain for you unless you’re guided by another creature.',
		type: 'absolute',
		tags: ['physical', 'sensory']
	},
	{
		id: 'burning-x',
		name: 'Burning X',
		description:
			'You take X Fire damage at the start of each of your turns. All stacks of the Condition end when you’re doused by at least 1 gallon (4 liters) of water or fully immersed in water. Alternatively, a creature within 1 Space can spend 1 AP to remove 1 stack of the Condition.',
		type: 'stacking',
		tags: ['physical', 'damage']
	},
	{
		id: 'charmed',
		name: 'Charmed',
		description:
			'Your Charmer has ADV on Charisma Checks made against you. You can’t target your Charmer with harmful Attacks or effects.',
		type: 'overlapping',
		tags: ['mental']
	},
	{
		id: 'dazed-x',
		name: 'Dazed X',
		description: 'You have DisADV X on Mental Checks.',
		type: 'stacking',
		tags: ['mental']
	},
	{
		id: 'deafened',
		name: 'Deafened',
		description:
			'You can’t hear (see the Unheard section for more information). You have Resistance (Half) to Sonic damage.',
		type: 'absolute',
		tags: ['physical', 'sensory']
	},
	{
		id: 'disoriented-x',
		name: 'Disoriented X',
		description: 'You have DisADV X on Mental Saves.',
		type: 'stacking',
		tags: ['mental']
	},
	{
		id: 'doomed-x',
		name: 'Doomed X',
		description:
			'Your current and maximum HP is reduced by the value of X. When an effect restores your HP, you regain X less HP than normal. All stacks of the Condition end when you complete a Long Rest.',
		type: 'stacking',
		tags: ['physical']
	},
	{
		id: 'exhaustion-x',
		name: 'Exhaustion X',
		description:
			'You gain a penalty equal to X on all Checks and Saves you make. Your Speed and Save DC is reduced by X. You immediately die if you reach 6 stacks of Exhaustion.',
		type: 'stacking',
		tags: ['physical']
	},
	{
		id: 'exposed-x',
		name: 'Exposed X',
		description: 'Attacks against you have ADV X.',
		type: 'stacking',
		tags: ['physical']
	},
	{
		id: 'frightened',
		name: 'Frightened',
		description:
			'You can’t willingly move closer to the source. You have DisADV on all Checks made against the source.',
		type: 'overlapping',
		tags: ['mental']
	},
	{
		id: 'hindered-x',
		name: 'Hindered X',
		description: 'You have DisADV X on Attacks.',
		type: 'stacking',
		tags: ['physical']
	},
	{
		id: 'immobilized',
		name: 'Immobilized',
		description: 'You can’t move and you have DisADV on Agility Saves.',
		type: 'absolute',
		tags: ['physical', 'movement']
	},
	{
		id: 'impaired-x',
		name: 'Impaired X',
		description: 'You have DisADV X on Physical Checks.',
		type: 'stacking',
		tags: ['physical']
	},
	{
		id: 'incapacitated',
		name: 'Incapacitated',
		description: 'You can’t move or speak. You can’t spend Actions Points or use Minor Actions.',
		type: 'absolute',
		tags: ['physical']
	},
	{
		id: 'intimidated',
		name: 'Intimidated',
		description: 'You have DisADV on all Checks made against the source.',
		type: 'overlapping',
		tags: ['mental']
	},
	{
		id: 'invisible',
		name: 'Invisible',
		description:
			'Creatures can’t see you unless they have the ability to see the Invisible (see the Unseen section for more information).',
		type: 'absolute',
		tags: ['sensory']
	},
	{
		id: 'paralyzed',
		name: 'Paralyzed',
		description:
			'You’re Incapacitated. You automatically fail Physical Saves (except against Poisons and Diseases). Attacks against you have ADV. Attacks made within 1 Space are considered Critical Hits.',
		type: 'absolute',
		tags: ['physical']
	},
	{
		id: 'petrified',
		name: 'Petrified',
		description:
			'You and your mundane belongings are turned into an inanimate substance (often stone). While Petrified, you count as both an object and a creature, and you’re subjected to the following effects: You’re not aware of your surroundings, you’re 10 times heavier than normal, you’re Incapacitated, you automatically fail Physical Saves, attacks against you have ADV, you gain Bludgeoning Vulnerability (Double) and Resistance (Half) to all other damage, and Curses, Diseases, Poisons, or Conditions afflicting you are suspended.',
		type: 'absolute',
		tags: ['physical']
	},
	{
		id: 'poisoned',
		name: 'Poisoned',
		description:
			'You’re Impaired (DisADV on Physical Checks). You take 1 Poison damage at the start of each of your turns.',
		type: 'overlapping',
		tags: ['physical', 'damage']
	},
	{
		id: 'restrained',
		name: 'Restrained',
		description: 'You’re Immobilized. Your Attacks have DisADV. Attacks against you have ADV.',
		type: 'overlapping',
		tags: ['physical', 'movement']
	},
	{
		id: 'slowed-x',
		name: 'Slowed X',
		description: 'Every 1 Space you move costs an extra X Spaces of movement.',
		type: 'stacking',
		tags: ['physical', 'movement']
	},
	{
		id: 'stunned-x',
		name: 'Stunned X',
		description:
			'Your current and maximum AP is reduced by X. While you’re Stunned 4 or higher, you are subjected to the following effects: You’re Incapacitated, Attacks against you have ADV, You automatically fail Physical Saves (except against Poisons and Diseases).',
		type: 'stacking',
		tags: ['physical', 'mental']
	},
	{
		id: 'surprised',
		name: 'Surprised',
		description: 'Your current and maximum AP is reduced by 2.',
		type: 'absolute',
		tags: ['mental']
	},
	{
		id: 'taunted',
		name: 'Taunted',
		description: 'You have DisADV on Attacks against targets other than the source.',
		type: 'overlapping',
		tags: ['mental']
	},
	{
		id: 'terrified',
		name: 'Terrified',
		description:
			'You must spend your turns trying to move as far away as you can from the source as possible. The only Action you can take is the Move Action to try to run away, or the Dodge Action if you are prevented from moving or there’s nowhere farther to move.',
		type: 'overlapping',
		tags: ['mental', 'movement']
	},
	{
		id: 'tethered',
		name: 'Tethered',
		description:
			'You are Tethered to a creature or Space. While Tethered, you can’t move farther than the specified Spaces from the location of your Tether.',
		type: 'overlapping',
		tags: ['physical', 'movement']
	},
	{
		id: 'unconscious',
		name: 'Unconscious',
		description:
			'When you become Unconscious, you immediately drop whatever you are holding and fall Prone. While Unconscious, you’re subjected to the following effects: You’re Incapacitated, You’re not aware of your surroundings, You automatically fail Physical Saves (except against Poisons and Diseases), Attacks against you have ADV, Attacks made within 1 Space are considered Critical Hits.',
		type: 'absolute',
		tags: ['physical']
	},
	{
		id: 'weakened-x',
		name: 'Weakened X',
		description: 'You have DisADV X on Physical Saves.',
		type: 'stacking',
		tags: ['physical']
	}
];
