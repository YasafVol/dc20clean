/**
 * @file classFeatureDescriptions.ts
 * @description Utility function to get detailed descriptions for class feature choices
 * from the new class features structure.
 */

import { findChoiceOption } from '../rulesdata/loaders/class-features.loader';

/**
 * Gets detailed description for a class feature choice from the new class features structure.
 *
 * @param choiceId - The ID of the feature choice (e.g., 'cleric_divine_domain')
 * @param optionValue - The value of the selected option (e.g., 'knowledge')
 * @returns Detailed description string or null if not found
 */
export function getDetailedClassFeatureDescription(
	choiceId: string,
	optionValue: string
): string | null {
	switch (choiceId) {
		case 'cleric_divine_domain': {
			// Map lowercase option value to proper name for lookup
			const domainNameMap: Record<string, string> = {
				knowledge: 'Knowledge',
				magic: 'Magic',
				divine_damage_expansion: 'Divine Damage Expansion',
				life: 'Life',
				death: 'Death',
				grave: 'Grave',
				light: 'Light',
				dark: 'Dark',
				war: 'War',
				peace: 'Peace',
				order: 'Order',
				chaos: 'Chaos',
				divination: 'Divination',
				trickery: 'Trickery',
				nature: 'Nature',
				tempest: 'Tempest',
				travel: 'Travel',
				ancestral: 'Ancestral'
			};

			const domainName = domainNameMap[optionValue];
			if (!domainName) return null;

			const domainOption = findChoiceOption('Cleric', 'Cleric Order', 0, domainName);
			return domainOption?.description || null;
		}

		case 'monk_stance_choice': {
			const stanceNameMap: Record<string, string> = {
				bear_stance: 'Bear Stance',
				bull_stance: 'Bull Stance',
				cobra_stance: 'Cobra Stance',
				gazelle_stance: 'Gazelle Stance',
				mantis_stance: 'Mantis Stance',
				mongoose_stance: 'Mongoose Stance',
				scorpion_stance: 'Scorpion Stance',
				turtle_stance: 'Turtle Stance',
				wolf_stance: 'Wolf Stance'
			};

			const stanceName = stanceNameMap[optionValue];
			if (!stanceName) return null;

			const stanceOption = findChoiceOption('Monk', 'Monk Stance', 0, stanceName);
			return stanceOption?.description || null;
		}

		// Add other class feature choices here when needed
		default:
			return null;
	}
}

/**
 * Type definition for the mapping of choice IDs to their detailed descriptions.
 * This helps with type safety and documentation of what choices have detailed descriptions.
 */
export type SupportedClassFeatureChoices = 'cleric_divine_domain' | 'monk_stance_choice';

/**
 * Checks if a choice ID has detailed descriptions available.
 *
 * @param choiceId - The choice ID to check
 * @returns True if detailed descriptions are available
 */
export function hasDetailedDescription(choiceId: string): choiceId is SupportedClassFeatureChoices {
	const supportedChoices: SupportedClassFeatureChoices[] = [
		'cleric_divine_domain',
		'monk_stance_choice'
	];
	return supportedChoices.includes(choiceId as SupportedClassFeatureChoices);
}
