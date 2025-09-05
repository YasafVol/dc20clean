import { useMemo } from 'react';
import { traitsData } from '../rulesdata/ancestries/traits';
import type { CharacterInProgressStoreData } from '../stores/characterContext';

interface AttributeCalculationResult {
	totalPointsAvailable: number;
	pointsSpent: number;
	pointsRemaining: number;
	forcedAdjustments: Array<{
		attribute: string;
		originalValue: number;
		effectiveValue: number;
		pointsCost: number;
	}>;
	isValid: boolean;
}

const getGrantedAttributePoints = (traitIds: string[]): number => {
	let points = 0;
	traitIds.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (!trait?.effects) return;

		trait.effects.forEach((effect) => {
			if (effect.type === 'MODIFY_STAT' && effect.target === 'attributePoints') {
				points += effect.value as number;
			}
		});
	});
	return points;
};

const getCombinedTraitEffects = (
	traitIds: string[],
	traitChoices: Record<string, string>
): Record<string, number> => {
	const effects: Record<string, number> = {
		might: 0,
		agility: 0,
		charisma: 0,
		intelligence: 0
	};

	traitIds.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (!trait?.effects) return;

		trait.effects.forEach((effect, index) => {
			if (effect.type === 'MODIFY_ATTRIBUTE') {
				if (effect.target !== 'any_attribute') {
					effects[effect.target] = (effects[effect.target] || 0) + (effect.value as number);
				} else {
					const choiceKey = `${trait.id}-${index}`;
					const chosenAttribute = traitChoices[choiceKey];
					if (chosenAttribute) {
						effects[chosenAttribute] =
							(effects[chosenAttribute] || 0) + (effect.value as number);
					}
				}
			}
		});
	});

	return effects;
};

export function useAttributeCalculation(
	characterState: CharacterInProgressStoreData
): AttributeCalculationResult {
	const { selectedTraits, selectedTraitChoices, attributes } = characterState;

	return useMemo(() => {
		const grantedPoints = getGrantedAttributePoints(selectedTraits);
		const totalPointsAvailable = 10 + grantedPoints;

		const pointsSpent =
			attributes.might +
			2 +
			(attributes.agility + 2) +
			(attributes.charisma + 2) +
			(attributes.intelligence + 2);

		const traitEffects = getCombinedTraitEffects(selectedTraits, selectedTraitChoices);
		const forcedAdjustments: AttributeCalculationResult['forcedAdjustments'] = [];

		Object.entries(attributes).forEach(([attr, baseValue]) => {
			const effectValue = traitEffects[attr] || 0;
			if (effectValue !== 0) {
				forcedAdjustments.push({
					attribute: attr,
					originalValue: baseValue,
					effectiveValue: baseValue + effectValue,
					pointsCost: effectValue
				});
			}
		});

		const pointsRemaining = totalPointsAvailable - pointsSpent;
		const isValid = pointsRemaining >= 0;

		return {
			totalPointsAvailable,
			pointsSpent,
			pointsRemaining,
			forcedAdjustments,
			isValid
		};
	}, [selectedTraits, selectedTraitChoices, attributes]);
}
