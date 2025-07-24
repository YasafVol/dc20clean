import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const silentImage: Spell = {
	name: 'Silent Image',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Image',
			description:
				'You create the image of an object, a creature, or some other visible phenomenon in a 3 Space cube. The image appears at a spot within range and lasts for the duration. The image is purely visual and isn’t accompanied by sound, smell, or other sensory effects. You can spend 1 AP to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural. Discerning the Illusion: Physical interaction with the image reveals it to be an illusion. Alternatively, a creature can spend 1 AP to examine the image to attempt to determine if the illusion is real. The creature makes an Investigation Check against your Save DC. Success: The creature discerns the illusion for what it is, revealing it to be false and making the illusion transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sound and Smell',
			description: 'You can add sounds and a smell to the illusion.'
		}
	]
};
