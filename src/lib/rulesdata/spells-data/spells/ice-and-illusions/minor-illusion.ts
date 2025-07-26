import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const minorIllusion: Spell = {
	name: 'Minor Illusion',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Sound or Image',
			description:
				'You create a sound or an image of an object within range that lasts for the duration. The illusion ends if you dismiss it for 1 AP or cast this Spell again. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound can continue unabated throughout the duration or you can make discrete sounds at different times before the Spell ends. If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than 1 Space. The image can’t create sound, light, smell, or any other sensory effect. Discerning the Illusion: If the illusion is an image, any physical interaction with the image reveals it to be an illusion as things pass through it. A creature can spend 1 AP to examine the sound or image to attempt to determine if the illusion is real, by making an Investigation Check against your Save DC. Success: The creature discerns that the objects or sounds made by the Spell are illusions. If the illusion is an image, the illusion becomes transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sight and Sound',
			description: 'The illusion can include both a sound and an image.'
		}
	]
};
