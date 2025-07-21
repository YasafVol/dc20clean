import type { ILanguageData } from './types';

export const languagesData: ILanguageData[] = [
	{
		id: 'common',
		name: 'Common',
		type: 'standard', // From DC20 p.18
		description:
			'Common is the most simple and universal language in the world. All Player Characters start Fluent in Common.'
	},
	{
		id: 'elvish',
		name: 'Elvish',
		type: 'standard', // From DC20 p.18
		description: 'Elvish is a fluid and melodic language spoken by Elves. Typical Speakers: Elves.'
	},
	{
		id: 'draconic',
		name: 'Draconic',
		type: 'exotic', // From DC20 p.18
		description:
			'Draconic is a harsh, guttural language spoken by Dragons and Dragonkin. Typical Speakers: Dragons, Dragonkin.'
	},
	{
		id: 'dwarvish',
		name: 'Dwarvish',
		type: 'standard', // From DC20 p.18
		description:
			'Dwarvish is a language of hard consonants and guttural sounds, spoken by Dwarves. Typical Speakers: Dwarves.'
	},
	{
		id: 'gnomish',
		name: 'Gnomish',
		type: 'standard', // From DC20 p.18
		description:
			'Gnomish is a language filled with trills and clicks, spoken by Gnomes. Typical Speakers: Gnomes.'
	},
	{
		id: 'goblin',
		name: 'Goblin',
		type: 'standard', // From DC20 p.18
		description:
			'Goblin is a rough and simple language spoken by Goblins, Hobgoblins, and Bugbears. Typical Speakers: Goblins, Hobgoblins, Bugbears.'
	},
	{
		id: 'halfling',
		name: 'Halfling',
		type: 'standard', // From DC20 p.18
		description:
			'Halfling is a soft and gentle language spoken by Halflings. Typical Speakers: Halflings.'
	},
	{
		id: 'orcish',
		name: 'Orcish',
		type: 'standard', // From DC20 p.18
		description: 'Orcish is a brutal and harsh language spoken by Orcs. Typical Speakers: Orcs.'
	},
	{
		id: 'primordial',
		name: 'Primordial',
		type: 'exotic', // From DC20 p.18
		description: 'Primordial is the language of Elementals. Typical Speakers: Elementals.'
	},
	{
		id: 'celestial',
		name: 'Celestial',
		type: 'exotic', // From DC20 p.18
		description: 'Celestial is the language of Celestials. Typical Speakers: Celestials.'
	},
	{
		id: 'abyssal',
		name: 'Abyssal',
		type: 'exotic', // From DC20 p.18
		description: 'Abyssal is the language of Demons. Typical Speakers: Demons.'
	},
	{
		id: 'infernal',
		name: 'Infernal',
		type: 'exotic', // From DC20 p.18
		description: 'Infernal is the language of Devils. Typical Speakers: Devils.'
	},
	{
		id: 'undercommon',
		name: 'Undercommon',
		type: 'exotic', // From DC20 p.18
		description:
			'Undercommon is a language spoken by inhabitants of the Underdark, such as Drow. Typical Speakers: Drow, Underdark inhabitants.'
	}
];
