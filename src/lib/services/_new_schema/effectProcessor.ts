import type { 
	Effect, 
	StatModifiers, 
	ConditionalModifier, 
	GrantedAbility, 
	EffectProcessingResult 
} from '../../rulesdata/schemas/character.schema';

/**
 * Universal Effect Processing Engine
 * 
 * This is the core of the new data-driven character system.
 * It takes a list of Effect objects from any source (traits, class features, etc.)
 * and processes them into a standardized result format that the calculator can use.
 */

// Initialize empty stat modifiers
function createEmptyStatModifiers(): StatModifiers {
	return {
		// Attributes
		might: 0,
		agility: 0,
		charisma: 0,
		intelligence: 0,

		// Core Stats
		hpMax: 0,
		spMax: 0,
		mpMax: 0,
		pd: 0,
		ad: 0,
		pdr: 0,
		
		// Movement & Combat
		moveSpeed: 0,
		jumpDistance: 0,
		deathThresholdModifier: 0,
		saveDC: 0,
		initiativeBonus: 0,
		
		// Resource Stats
		skillPoints: 0,
		tradePoints: 0,
		languagePoints: 0,
		ancestryPoints: 0,
		restPoints: 0,
		gritPoints: 0,
		
		// Learning Stats
		maneuversKnown: 0,
		techniquesKnown: 0,
		cantripsKnown: 0,
		spellsKnown: 0,
		skillMasteryLimit: 0,
		tradeMasteryLimit: 0,
		knowledgeMasteryLimit: 0
	};
}

// Effect processors for each effect type
const EFFECT_PROCESSORS: Record<string, (effect: Effect, result: EffectProcessingResult) => void> = {
	
	MODIFY_ATTRIBUTE: (effect, result) => {
		if (typeof effect.value === 'number') {
			const attrKey = effect.target as keyof StatModifiers;
			if (attrKey in result.statModifiers) {
				result.statModifiers[attrKey] += effect.value;
			}
		}
	},

	MODIFY_STAT: (effect, result) => {
		if (typeof effect.value === 'number') {
			if (effect.condition) {
				// Conditional modifier - handle by UI
				result.conditionalModifiers.push({
					effect,
					condition: effect.condition,
					description: `${effect.target} ${effect.value > 0 ? '+' : ''}${effect.value} while ${effect.condition}`
				});
			} else {
				// Direct stat modifier
				const statKey = effect.target as keyof StatModifiers;
				if (statKey in result.statModifiers) {
					result.statModifiers[statKey] += effect.value;
				}
			}
		}
	},

	SET_VALUE: (effect, result) => {
		// Handle special value overrides
		if (effect.target === 'jumpCalculationAttribute' && typeof effect.value === 'string') {
			result.grantedAbilities.push({
				name: 'Alternative Jump Calculation',
				description: `Use ${effect.value} instead of Agility for Jump Distance calculation`,
				source: 'Effect',
				type: 'passive'
			});
		}
	},

	GRANT_ABILITY: (effect, result) => {
		if (typeof effect.value === 'string') {
			result.grantedAbilities.push({
				name: effect.target,
				description: effect.value,
				source: 'Effect',
				type: 'active'
			});
		}
	},

	GRANT_RESISTANCE: (effect, result) => {
		result.resistances.push({
			type: effect.target,
			value: effect.value as string
		});
	},

	GRANT_VULNERABILITY: (effect, result) => {
		result.vulnerabilities.push({
			type: effect.target,
			value: effect.value as string
		});
	},

	GRANT_ADV_ON_SAVE: (effect, result) => {
		result.grantedAbilities.push({
			name: `Advantage on ${effect.target} Saves`,
			description: `You have advantage on saves against ${effect.target}`,
			source: 'Effect',
			type: 'passive'
		});
	},

	GRANT_ADV_ON_CHECK: (effect, result) => {
		result.grantedAbilities.push({
			name: `Advantage on ${effect.target} Checks`,
			description: `You have advantage on ${effect.target} checks`,
			source: 'Effect',
			type: 'passive'
		});
	},

	GRANT_COMBAT_TRAINING: (effect, result) => {
		if (typeof effect.target === 'string') {
			result.combatTraining.push(effect.target);
		}
	},

	GRANT_MOVEMENT: (effect, result) => {
		result.movements.push({
			type: effect.target,
			speed: effect.value as string
		});
	},

	GRANT_SENSE: (effect, result) => {
		if (typeof effect.value === 'number') {
			result.senses.push({
				type: effect.target,
				range: effect.value
			});
		}
	},

	GRANT_CHOICE: (effect, result) => {
		// Choices are handled at a higher level - this is just for tracking
		result.grantedAbilities.push({
			name: `Choice: ${effect.target}`,
			description: `You gain a choice for ${effect.target} (value: ${effect.value})`,
			source: 'Effect',
			type: 'passive'
		});
	},

	GRANT_SKILL_EXPERTISE: (effect, result) => {
		if (typeof effect.value === 'object' && effect.value.capIncrease && effect.value.levelIncrease) {
			result.statModifiers.skillMasteryLimit += effect.value.capIncrease;
			result.grantedAbilities.push({
				name: 'Skill Expertise',
				description: `Skill mastery cap and level increased by ${effect.value.capIncrease}`,
				source: 'Effect',
				type: 'passive'
			});
		}
	},

	GRANT_TRADE_EXPERTISE: (effect, result) => {
		if (typeof effect.value === 'object' && effect.value.capIncrease && effect.value.levelIncrease) {
			result.statModifiers.tradeMasteryLimit += effect.value.capIncrease;
			result.grantedAbilities.push({
				name: 'Trade Expertise',
				description: `Trade mastery cap and level increased by ${effect.value.capIncrease}`,
				source: 'Effect',
				type: 'passive'
			});
		}
	},

	GRANT_SPELL: (effect, result) => {
		if (typeof effect.value === 'number') {
			result.statModifiers.spellsKnown += effect.value;
		} else if (typeof effect.value === 'string') {
			result.grantedAbilities.push({
				name: 'Spell Known',
				description: `You know the spell: ${effect.value}`,
				source: 'Effect',
				type: 'passive'
			});
		}
	},

	GRANT_CANTRIP: (effect, result) => {
		if (typeof effect.value === 'number') {
			result.statModifiers.cantripsKnown += effect.value;
		} else if (typeof effect.value === 'string') {
			result.grantedAbilities.push({
				name: 'Cantrip Known',
				description: `You know the cantrip: ${effect.value}`,
				source: 'Effect',
				type: 'passive'
			});
		}
	},

	GRANT_MANEUVERS: (effect, result) => {
		if (effect.value === true || effect.value === 'all_attack') {
			result.grantedAbilities.push({
				name: 'All Attack Maneuvers',
				description: 'You know all Attack maneuvers',
				source: 'Effect',
				type: 'passive'
			});
		} else if (typeof effect.value === 'number') {
			result.statModifiers.maneuversKnown += effect.value;
		}
	},

	GRANT_TECHNIQUES: (effect, result) => {
		if (typeof effect.value === 'number') {
			result.statModifiers.techniquesKnown += effect.value;
		}
	}
};

/**
 * Process a list of effects and return aggregated results
 */
export function processEffects(
	effects: Effect[], 
	userChoices: Record<string, any> = {}
): EffectProcessingResult {
	
	const result: EffectProcessingResult = {
		statModifiers: createEmptyStatModifiers(),
		conditionalModifiers: [],
		grantedAbilities: [],
		combatTraining: [],
		resistances: [],
		vulnerabilities: [],
		senses: [],
		movements: []
	};

	// Process each effect
	for (const effect of effects) {
		// Resolve user choices if needed
		let resolvedEffect = effect;
		if (effect.userChoice && effect.target === 'any_attribute') {
			// Look up the user's choice for this effect
			const choiceKey = `${effect.target}_choice`; // This would need to be more sophisticated
			const userSelection = userChoices[choiceKey];
			if (userSelection) {
				resolvedEffect = {
					...effect,
					target: userSelection,
					userChoice: undefined // Remove the choice requirement
				};
			} else {
				// Choice not yet made - skip processing for now
				continue;
			}
		}

		// Process the effect using the appropriate processor
		const processor = EFFECT_PROCESSORS[resolvedEffect.type];
		if (processor) {
			processor(resolvedEffect, result);
		} else {
			console.warn(`Unknown effect type: ${resolvedEffect.type}`);
		}
	}

	return result;
}

/**
 * Aggregate effects from multiple sources (traits, class features, etc.)
 */
export function aggregateEffectsFromSources(sources: {
	traits: Effect[],
	classFeatures: Effect[],
	choices: Effect[]
}): Effect[] {
	return [
		...sources.traits,
		...sources.classFeatures, 
		...sources.choices
	];
}

/**
 * Get effects that require user choices
 */
export function getUnresolvedChoices(effects: Effect[]): Array<{
	effect: Effect,
	prompt: string,
	options?: string[]
}> {
	return effects
		.filter(effect => effect.userChoice)
		.map(effect => ({
			effect,
			prompt: effect.userChoice!.prompt,
			options: effect.userChoice!.options
		}));
}
