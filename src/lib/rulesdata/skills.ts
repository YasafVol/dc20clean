import type { ISkillData } from './types';

export const skillsData: ISkillData[] = [
	{
		id: 'athletics',
		name: 'Athletics',
		attributeAssociation: 'might',
		description:
			'Athletics covers activities that involve physical prowess, such as climbing, swimming, and jumping in difficult circumstances, or participating in a Grapple.'
	},
	{
		id: 'intimidation',
		name: 'Intimidation',
		attributeAssociation: 'might',
		description:
			'Intimidation covers attempts to influence a creature’s behavior using threats, hostile actions, and physical violence.'
	},
	{
		id: 'acrobatics',
		name: 'Acrobatics',
		attributeAssociation: 'agility',
		description: 'Acrobatics covers activities that require flexibility, nimbleness, and balance.'
	},
	{
		id: 'trickery',
		name: 'Trickery',
		attributeAssociation: 'agility',
		description:
			'Trickery covers non-verbal means of deceiving others, such as pickpocketing things, concealing an object on your person, or other forms of physical deception.'
	},
	{
		id: 'stealth',
		name: 'Stealth',
		attributeAssociation: 'agility',
		description:
			'Stealth covers attempts to avoid being seen or heard by other creatures, such as sneaking about or hiding behind cover.'
	},
	{
		id: 'animal',
		name: 'Animal',
		attributeAssociation: 'charisma',
		description:
			'Animal covers interactions such as corralling, training, calming, and gauging the intention of Beasts.'
	},
	{
		id: 'insight',
		name: 'Insight',
		attributeAssociation: 'charisma',
		description:
			'Insight governs your ability to discern intentions. This could be from observing a creature’s body language, facial cues, and mannerisms. Alternatively, Insight can represent a gut feeling or intuition about a situation.'
	},
	{
		id: 'influence',
		name: 'Influence',
		attributeAssociation: 'charisma',
		description:
			'Influence covers your attempts to manipulate a creature’s behavior using compelling arguments based on truth, half-truths, lies, or some combination in between.'
	},
	{
		id: 'investigation',
		name: 'Investigation',
		attributeAssociation: 'intelligence',
		description:
			'Investigation covers using your senses to search for and discover things that are not readily observable. You look for clues and then make deductions on those clues to try and discern the locations of things or how they work (finding hidden objects, secret doors, or weak points in structures). It also covers the process of researching information through various texts.'
	},
	{
		id: 'medicine',
		name: 'Medicine',
		attributeAssociation: 'intelligence',
		description:
			'Medicine covers activities that involve medical knowledge and application, such as treating a wounded creature, diagnosing an illness, or identifying a cure to an ailment.'
	},
	{
		id: 'survival',
		name: 'Survival',
		attributeAssociation: 'intelligence',
		description:
			'Survival covers the activities required to survive in the wilderness, such as tracking quarry, foraging for food and water, and navigating through uncharted territory.'
	},
	{
		id: 'awareness',
		name: 'Awareness',
		attributeAssociation: 'prime', // Uses Prime Modifier
		description:
			'Awareness governs your ability to detect the presence of other creatures or objects using your sight, hearing, smell, or other senses.'
	}
];
