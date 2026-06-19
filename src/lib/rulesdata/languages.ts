import { ILanguageData, LanguageFamily } from './schemas/types';

export type LanguageFluency = 'limited' | 'fluent';
export type LanguageSelections = Record<string, { fluency: LanguageFluency }>;

export interface LanguageCompatibilitySelection {
	id: string;
	name: string;
	fluency: LanguageFluency;
	reason: string;
}

export const languageCheckDcByFamily: Record<LanguageFamily, 10 | 15 | 20> = {
	mortal: 10,
	exotic: 15,
	divine: 15,
	outer: 20
};

export const languagesData: ILanguageData[] = [
	{
		id: 'common',
		name: 'Common',
		family: 'mortal',
		typicalSpeakers: 'Civilized Societies',
		checkDc: languageCheckDcByFamily.mortal,
		description:
			'This is a very simple and universal language. All player characters start Fluent in Common at no Language Point cost.'
	},
	{
		id: 'commonsign',
		name: 'Common Sign',
		family: 'mortal',
		typicalSpeakers: 'Deaf, Hard of Hearing, Military, Spies',
		checkDc: languageCheckDcByFamily.mortal,
		description:
			'The Common language serves as a universal trade tongue, mirrored through intricate gestures, facial expressions, and hand movements.'
	},
	{
		id: 'human',
		name: 'Human',
		family: 'mortal',
		typicalSpeakers: 'Humans',
		checkDc: languageCheckDcByFamily.mortal,
		description:
			'There are many dialects of the Human language based on the distance and developments of different human civilizations.'
	},
	{
		id: 'dwarvish',
		name: 'Dwarvish',
		family: 'mortal',
		typicalSpeakers: 'Dwarves',
		checkDc: languageCheckDcByFamily.mortal,
		description:
			'A language of hard consonants and grounded speech passed through Dwarven cultures.'
	},
	{
		id: 'elvish',
		name: 'Elvish',
		family: 'mortal',
		typicalSpeakers: 'Elves',
		checkDc: languageCheckDcByFamily.mortal,
		description: 'A fluid and melodic language spoken across Elven cultures.'
	},
	{
		id: 'gnomish',
		name: 'Gnomish',
		family: 'mortal',
		typicalSpeakers: 'Gnomes',
		checkDc: languageCheckDcByFamily.mortal,
		description: 'A precise language filled with trills, clicks, and technical nuance.'
	},
	{
		id: 'halfling',
		name: 'Halfling',
		family: 'mortal',
		typicalSpeakers: 'Halflings',
		checkDc: languageCheckDcByFamily.mortal,
		description: 'A gentle, practical language carried through close-knit Halfling communities.'
	},
	{
		id: 'orcish',
		name: 'Orcish',
		family: 'mortal',
		typicalSpeakers: 'Orcs',
		checkDc: languageCheckDcByFamily.mortal,
		description: 'A forceful language used across Orcish peoples.'
	},
	{
		id: 'giant',
		name: 'Giant',
		family: 'exotic',
		typicalSpeakers: 'Giants, Giantkin',
		checkDc: languageCheckDcByFamily.exotic,
		description: 'A booming language spoken by Giants and Giantkin.'
	},
	{
		id: 'draconic',
		name: 'Draconic',
		family: 'exotic',
		typicalSpeakers: 'Dragons, Dragonkin',
		checkDc: languageCheckDcByFamily.exotic,
		description: 'A harsh, resonant language spoken by Dragons and Dragonkin.'
	},
	{
		id: 'fey',
		name: 'Fey',
		family: 'exotic',
		typicalSpeakers: 'Fey',
		checkDc: languageCheckDcByFamily.exotic,
		description: 'A whimsical language shaped by the creatures of the Fey realms.'
	},
	{
		id: 'elemental',
		name: 'Elemental',
		family: 'exotic',
		typicalSpeakers: 'Elementals',
		checkDc: languageCheckDcByFamily.exotic,
		legacyIds: ['primordial'],
		description: 'The language of Elementals and elemental forces.'
	},
	{
		id: 'celestial',
		name: 'Celestial',
		family: 'divine',
		typicalSpeakers: 'Angels & Archons',
		checkDc: languageCheckDcByFamily.divine,
		description: 'A radiant language spoken by Angels, Archons, and other divine beings.'
	},
	{
		id: 'fiendish',
		name: 'Fiendish',
		family: 'divine',
		typicalSpeakers: 'Devils & Demons',
		checkDc: languageCheckDcByFamily.divine,
		legacyIds: ['abyssal', 'infernal'],
		description: 'A corrupt divine language shared by Devils, Demons, and other fiends.'
	},
	{
		id: 'deepspeech',
		name: 'Deep Speech',
		family: 'outer',
		typicalSpeakers: 'Aberrations',
		checkDc: languageCheckDcByFamily.outer,
		description: 'An unsettling language spoken by Aberrations and other entities beyond the world.'
	}
];

const languageById = new Map<string, ILanguageData>();
const canonicalLanguageIdById = new Map<string, string>();

for (const language of languagesData) {
	languageById.set(language.id, language);
	canonicalLanguageIdById.set(language.id, language.id);

	for (const legacyId of language.legacyIds ?? []) {
		canonicalLanguageIdById.set(legacyId, language.id);
	}
}

export function getCanonicalLanguageId(languageId: string): string | undefined {
	return canonicalLanguageIdById.get(languageId);
}

export function getLanguageById(languageId: string): ILanguageData | undefined {
	const canonicalId = getCanonicalLanguageId(languageId) ?? languageId;
	return languageById.get(canonicalId);
}

export function formatLanguageIdDisplayName(languageId: string): string {
	return languageId
		.split(/[_-]/g)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

export function getPrimaryLanguageSelectionId(
	language: ILanguageData,
	currentLanguages: LanguageSelections
): string {
	if (currentLanguages[language.id]) {
		return language.id;
	}

	return language.legacyIds?.find((legacyId) => currentLanguages[legacyId]) ?? language.id;
}

export function getLanguageCompatibilitySelections(
	currentLanguages: LanguageSelections
): LanguageCompatibilitySelection[] {
	const entries: LanguageCompatibilitySelection[] = [];
	const accountedIds = new Set<string>();

	for (const language of languagesData) {
		const activeIds = [language.id, ...(language.legacyIds ?? [])].filter(
			(languageId) => currentLanguages[languageId]
		);

		if (activeIds.length === 0) {
			continue;
		}

		const primaryId = activeIds.includes(language.id) ? language.id : activeIds[0];
		accountedIds.add(primaryId);

		for (const extraId of activeIds) {
			if (extraId === primaryId) {
				continue;
			}

			accountedIds.add(extraId);
			entries.push({
				id: extraId,
				name: formatLanguageIdDisplayName(extraId),
				fluency: currentLanguages[extraId].fluency,
				reason: `Legacy alias for ${language.name} still selected separately. Remove it to avoid invisible duplicate Language Point costs.`
			});
		}
	}

	for (const [languageId, data] of Object.entries(currentLanguages)) {
		if (accountedIds.has(languageId)) {
			continue;
		}

		entries.push({
			id: languageId,
			name: formatLanguageIdDisplayName(languageId),
			fluency: data.fluency,
			reason:
				'This legacy language is no longer part of the DC20 0.10.5 catalog. It remains visible here for review and removal only.'
		});
	}

	return entries;
}
