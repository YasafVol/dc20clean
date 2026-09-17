import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { EnhancedCalculationResult } from '../../../lib/types/effectSystem';
import { buildProgressionFeatureEntries } from '../featureDisplay';

export interface CharacterSheetPresentation {
	resources: {
		mana: {
			current: number;
			maximum: number;
			visible: boolean;
		};
	};
	access: {
		spells: boolean;
		maneuvers: boolean;
	};
	features: {
		metaMagic: boolean;
	};
}

export const EMPTY_CHARACTER_SHEET_PRESENTATION: CharacterSheetPresentation = {
	resources: {
		mana: {
			current: 0,
			maximum: 0,
			visible: false
		}
	},
	access: {
		spells: false,
		maneuvers: false
	},
	features: {
		metaMagic: false
	}
};

function hasCanonicalFeature(character: SavedCharacter, featureId: string): boolean {
	if (!character.className) return false;
	return buildProgressionFeatureEntries(character).some(
		(feature) => feature.id === featureId || feature.id.endsWith(`_${featureId}`)
	);
}

export function createCharacterSheetPresentation(
	character: SavedCharacter | null,
	calculatedData: EnhancedCalculationResult | null
): CharacterSheetPresentation {
	if (!character) return EMPTY_CHARACTER_SHEET_PRESENTATION;

	const maximumMana = calculatedData?.breakdowns?.mpMax?.total ?? character.finalMPMax ?? 0;
	const currentMana = character.characterState?.resources?.current?.currentMP ?? maximumMana;

	return {
		resources: {
			mana: {
				current: currentMana,
				maximum: maximumMana,
				visible: maximumMana > 0
			}
		},
		access: {
			spells:
				(calculatedData?.spellsKnownSlots?.length ?? 0) > 0 || (character.spells?.length ?? 0) > 0,
			maneuvers:
				(calculatedData?.levelBudgets?.totalManeuversKnown ?? 0) > 0 ||
				(character.maneuvers?.length ?? 0) > 0
		},
		features: {
			metaMagic: hasCanonicalFeature(character, 'sorcerer_meta_magic')
		}
	};
}
