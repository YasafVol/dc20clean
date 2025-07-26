import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const mageHand: Spell = {
	name: 'Mage Hand',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Conjuration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spectral Hand',
			description:
				'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as a Free Action. The hand vanishes if it ever moves outside of the Spell’s range or if you cast this Spell again. When you cast the Spell, and by spending 1 AP while the Spell is active, you can control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a container. You can move the hand up to 5 Spaces each time you use it, but it must stay within range. The hand can’t Attack, activate magic items, or carry more than 10 pounds.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range Hand', description: 'The range increases to 20 Spaces.' },
		{ type: 'MP', cost: 1, name: 'Lasting Hand', description: 'The duration increases to 1 hour.' }
	]
};
