import { traitsData } from '../rulesdata/traits';
import { ancestriesData } from '../rulesdata/ancestries';
import type { ITrait, ITraitEffect } from '../rulesdata/types';

export interface ProcessedTraitEffects {
	attributeModifiers: {
		might: number;
		agility: number;
		charisma: number;
		intelligence: number;
	};
	staticBonuses: {
		hpMax: number;
		mpMax: number;
		spMax: number;
		pd: number;
		ad: number;
		moveSpeed: number; // in spaces
		deathThreshold: number;
		jumpDistance: number;
		initiativeBonus: number;
	};
	resistances: Array<{
		type: string;
		value: number | string;
	}>;
	vulnerabilities: Array<{
		type: string;
		value: number;
	}>;
	abilities: string[];
	conditionalEffects: Array<{
		type: string;
		condition: string;
		target: string;
		value: any;
	}>;
	sizeModification?: string;
	userChoicesRequired: Array<{
		traitId: string;
		effect: ITraitEffect;
		prompt: string;
		options?: string[];
	}>;
}

// Initialize empty processed effects
function createEmptyEffects(): ProcessedTraitEffects {
	return {
		attributeModifiers: {
			might: 0,
			agility: 0,
			charisma: 0,
			intelligence: 0
		},
		staticBonuses: {
			hpMax: 0,
			mpMax: 0,
			spMax: 0,
			pd: 0,
			ad: 0,
			moveSpeed: 0,
			deathThreshold: 0,
			jumpDistance: 0,
			initiativeBonus: 0
		},
		resistances: [],
		vulnerabilities: [],
		abilities: [],
		conditionalEffects: [],
		userChoicesRequired: []
	};
}

// Get default traits for an ancestry
function getDefaultTraitsForAncestry(ancestryId: string | null): string[] {
	if (!ancestryId) return [];
	
	const ancestry = ancestriesData.find(a => a.id === ancestryId);
	return ancestry?.defaultTraitIds || [];
}

// Effect processors for different trait effect types
const EFFECT_PROCESSORS: Record<string, (effect: ITraitEffect, results: ProcessedTraitEffects, traitId: string) => void> = {
	MODIFY_ATTRIBUTE: (effect, results, traitId) => {
		if (effect.target && typeof effect.value === 'number') {
			// Handle user choice required
			if (effect.userChoiceRequired) {
				results.userChoicesRequired.push({
					traitId,
					effect,
					prompt: effect.userChoiceRequired.prompt,
					options: effect.userChoiceRequired.options
				});
				return;
			}
			
			// Apply direct attribute modification
			const attrKey = effect.target as keyof typeof results.attributeModifiers;
			if (attrKey in results.attributeModifiers) {
				results.attributeModifiers[attrKey] += effect.value;
			}
		}
	},

	MODIFY_HP_MAX_STATIC: (effect, results) => {
		if (typeof effect.value === 'number') {
			results.staticBonuses.hpMax += effect.value;
		}
	},

	MODIFY_MP_MAX: (effect, results) => {
		if (typeof effect.value === 'number') {
			results.staticBonuses.mpMax += effect.value;
		}
	},

	MODIFY_PD: (effect, results) => {
		if (typeof effect.value === 'number') {
			if (effect.condition) {
				// Handle conditional PD bonuses
				results.conditionalEffects.push({
					type: 'PD_BONUS',
					condition: effect.condition,
					target: 'pd',
					value: effect.value
				});
			} else {
				results.staticBonuses.pd += effect.value;
			}
		}
	},

	MODIFY_AD: (effect, results) => {
		if (typeof effect.value === 'number') {
			if (effect.condition) {
				// Handle conditional AD bonuses
				results.conditionalEffects.push({
					type: 'AD_BONUS',
					condition: effect.condition,
					target: 'ad',
					value: effect.value
				});
			} else {
				results.staticBonuses.ad += effect.value;
			}
		}
	},

	MODIFY_SPEED: (effect, results) => {
		if (typeof effect.value === 'number') {
			// Convert from internal units (5 = 1 space) to spaces
			results.staticBonuses.moveSpeed += effect.value / 5;
		}
	},

	MODIFY_DEATH_THRESHOLD_MODIFIER: (effect, results) => {
		if (typeof effect.value === 'number') {
			results.staticBonuses.deathThreshold += effect.value;
		}
	},

	MODIFY_JUMP_DISTANCE: (effect, results) => {
		if (typeof effect.value === 'number') {
			results.staticBonuses.jumpDistance += effect.value;
		}
	},

	GRANT_RESISTANCE_HALF: (effect, results) => {
		if (effect.target) {
			results.resistances.push({
				type: effect.target,
				value: 'half'
			});
		}
	},

	GRANT_RESISTANCE_STATIC: (effect, results) => {
		if (effect.target && typeof effect.value === 'number') {
			results.resistances.push({
				type: effect.target,
				value: effect.value
			});
		}
	},

	GRANT_VULNERABILITY_STATIC: (effect, results) => {
		if (effect.target && typeof effect.value === 'number') {
			results.vulnerabilities.push({
				type: effect.target,
				value: effect.value
			});
		}
	},

	MODIFY_SIZE: (effect, results) => {
		if (effect.target) {
			results.sizeModification = effect.target;
		}
	},

	GRANT_ABILITY: (effect, results) => {
		if (effect.value && typeof effect.value === 'string') {
			results.abilities.push(effect.value);
		}
	},

	GRANT_DARKVISION: (effect, results) => {
		if (typeof effect.value === 'number') {
			results.abilities.push(`Darkvision ${effect.value} Spaces`);
		}
	},

	GRANT_CLIMB_SPEED_EQUAL_TO_SPEED: (effect, results) => {
		results.abilities.push('Climb Speed equal to Movement Speed');
	},

	GRANT_SWIM_SPEED_EQUAL_TO_SPEED: (effect, results) => {
		results.abilities.push('Swim Speed equal to Movement Speed');
	},

	GRANT_GLIDE_SPEED: (effect, results) => {
		results.abilities.push('Glide Speed');
	},

	GRANT_ADV_ON_SAVE_VS_CONDITION: (effect, results) => {
		if (effect.target) {
			results.abilities.push(`ADV on Saves vs ${effect.target}`);
		}
	},

	GRANT_ADV_ON_CHECKS: (effect, results) => {
		if (effect.target) {
			results.abilities.push(`ADV on ${effect.target}`);
		}
	},

	IGNORE_DIFFICULT_TERRAIN: (effect, results) => {
		results.abilities.push('Ignore Difficult Terrain');
	},

	GRANT_SKILL_EXPERTISE: (effect, results, traitId) => {
		if (effect.userChoiceRequired) {
			results.userChoicesRequired.push({
				traitId,
				effect,
				prompt: effect.userChoiceRequired.prompt,
				options: effect.userChoiceRequired.options
			});
		} else if (effect.value && typeof effect.value === 'object') {
			results.abilities.push(`Skill Expertise: ${effect.value.skillId || 'Selected Skill'}`);
		}
	},

	GRANT_TRADE_EXPERTISE: (effect, results, traitId) => {
		if (effect.userChoiceRequired) {
			results.userChoicesRequired.push({
				traitId,
				effect,
				prompt: effect.userChoiceRequired.prompt,
				options: effect.userChoiceRequired.options
			});
		} else if (effect.value && typeof effect.value === 'object') {
			results.abilities.push(`Trade Expertise: ${effect.value.tradeId || 'Selected Trade'}`);
		}
	}
};

/**
 * Process trait effects from selected and default traits
 * @param selectedTraitIds Array of manually selected trait IDs
 * @param ancestry1Id First ancestry ID (for default traits)
 * @param ancestry2Id Second ancestry ID (for default traits)
 * @returns Processed trait effects ready for application
 */
export function processTraitEffects(
	selectedTraitIds: string[] = [],
	ancestry1Id: string | null = null,
	ancestry2Id: string | null = null
): ProcessedTraitEffects {
	const results = createEmptyEffects();
	
	// Get all default traits from both ancestries
	const defaultTraits = [
		...getDefaultTraitsForAncestry(ancestry1Id),
		...getDefaultTraitsForAncestry(ancestry2Id)
	];
	
	// Combine all traits (default + selected)
	const allTraitIds = [...new Set([...defaultTraits, ...selectedTraitIds])];
	
	console.log('Processing traits:', {
		defaultTraits,
		selectedTraitIds,
		allTraitIds
	});
	
	// Process each trait
	allTraitIds.forEach(traitId => {
		const trait = traitsData.find(t => t.id === traitId);
		if (!trait || !trait.effects) {
			console.warn(`Trait not found or has no effects: ${traitId}`);
			return;
		}
		
		// Process each effect of the trait
		trait.effects.forEach(effect => {
			const processor = EFFECT_PROCESSORS[effect.type];
			if (processor) {
				try {
					processor(effect, results, traitId);
				} catch (error) {
					console.error(`Error processing effect ${effect.type} for trait ${traitId}:`, error);
				}
			} else {
				console.warn(`No processor found for effect type: ${effect.type} in trait ${traitId}`);
			}
		});
	});
	
	console.log('Processed trait effects:', results);
	
	return results;
}

/**
 * Calculate the total ancestry points cost for given traits
 * @param traitIds Array of trait IDs
 * @returns Total point cost (can be negative for negative traits)
 */
export function calculateTraitCosts(traitIds: string[]): number {
	return traitIds.reduce((total, traitId) => {
		const trait = traitsData.find(t => t.id === traitId);
		return total + (trait?.cost || 0);
	}, 0);
}

/**
 * Get all traits available for selection based on ancestries
 * @param ancestry1Id First ancestry ID
 * @param ancestry2Id Second ancestry ID (optional)
 * @returns Array of available trait objects
 */
export function getAvailableTraits(ancestry1Id: string | null, ancestry2Id: string | null = null): ITrait[] {
	const availableTraitIds = new Set<string>();
	
	// Add traits from first ancestry
	if (ancestry1Id) {
		const ancestry1 = ancestriesData.find(a => a.id === ancestry1Id);
		if (ancestry1) {
			ancestry1.expandedTraitIds.forEach(id => availableTraitIds.add(id));
		}
	}
	
	// Add traits from second ancestry
	if (ancestry2Id) {
		const ancestry2 = ancestriesData.find(a => a.id === ancestry2Id);
		if (ancestry2) {
			ancestry2.expandedTraitIds.forEach(id => availableTraitIds.add(id));
		}
	}
	
	// Convert IDs to trait objects
	return Array.from(availableTraitIds)
		.map(id => traitsData.find(t => t.id === id))
		.filter((trait): trait is ITrait => trait !== undefined);
}