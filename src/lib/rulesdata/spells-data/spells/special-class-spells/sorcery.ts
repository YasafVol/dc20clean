import { Spell, SpellSchool, ClassName, PremadeSpellList } from '../../types/spell.types';

export const sorcery: Spell = {
	name: 'Sorcery',
	premadeList: PremadeSpellList.SpecialClass,
	school: SpellSchool.Transmutation,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [ClassName.Sorcerer],
	effects: [
		{
			title: 'Minor Wonder',
			description:
				'You manifest a minor wonder (Divine), a sign of supernatural power (Primal), or arcane prowess (Arcane) depending on which Spell List you have access to. When you gain this Spell, choose from the following types of energy: Fire, Water, Lightning, Earth, Holy, Unholy, or Arcane (which manifests as energy of a specific color). This chosen type will be the form this Spell’s energy takes. You create one of the following magical effects of your chosen energy type within range and can dismiss it by spending 1 AP: Your voice booms up to 3 times louder than normal. You summon harmless magic of your chosen energy type to swirl around you in a visual display. Your eyes glow with your chosen energy type.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Multiple Effects',
			description: 'You can have up to all 3 of the effects going at once.'
		}
	]
};
