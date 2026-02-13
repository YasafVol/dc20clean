/**
 * Effect Collection Module
 *
 * Aggregates all effects with source attribution from traits, talents,
 * subclass features, multiclass features, and class features.
 * Also handles resolving user choices in effects.
 */

import type {
	EnhancedCharacterBuildData,
	AttributedEffect,
	TraitChoiceStorage
} from '../../types/effectSystem';
import { resolveSubclassFeatures } from '../../rulesdata/classes-data/classProgressionResolver';
import { classesData } from '../../rulesdata/loaders/class.loader';
import { findTalentById } from '../../rulesdata/classes-data/talents/talent.loader';
import { getLegacyChoiceId, findClassByName } from '../../rulesdata/loaders/class-features.loader';
import { traitsData } from '../../rulesdata/ancestries/traits';
import type { ClassDefinition } from '../../rulesdata/schemas/character.schema';

/**
 * Aggregate all effects with source attribution
 */
export function aggregateAttributedEffects(
	buildData: EnhancedCharacterBuildData,
	getClassFeatures: (classId: string) => ClassDefinition | null
): AttributedEffect[] {
	const effects: AttributedEffect[] = [];

	// Add effects from selected traits
	for (const traitId of buildData.selectedTraitIds) {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait?.effects) {
			for (const [effectIndex, effect] of trait.effects.entries()) {
				effects.push({
					...effect,
					source: {
						type: 'trait',
						id: traitId,
						name: trait.name,
						description: trait.description,
						category: 'Selected Trait'
					},
					resolved: !(effect as any).userChoice,
					dependsOnChoice: (effect as any).userChoice
						? `${traitId}-${effectIndex}`
						: undefined
				} as AttributedEffect);
			}
		}
	}

	// Add effects from selected talents (count-based: apply effects multiple times)
	const selectedTalents = buildData.selectedTalents || {};
	for (const [talentId, count] of Object.entries(selectedTalents)) {
		const talent = findTalentById(talentId);
		if (talent?.effects && count > 0) {
			for (let i = 0; i < count; i++) {
				for (const effect of talent.effects) {
					effects.push({
						...effect,
						source: {
							type: 'talent' as const,
							id: talentId,
							name: talent.name,
							description: talent.description,
							category: 'Talent'
						},
						resolved: true
					} as AttributedEffect);
				}
			}
		}
	}

	// Add effects from subclass feature choices
	if (buildData.selectedSubclass && buildData.featureChoices) {
		const subclassFeatures = resolveSubclassFeatures(
			buildData.classId,
			buildData.selectedSubclass,
			buildData.level
		);

		for (const feature of subclassFeatures) {
			if (feature.choices) {
				for (const choice of feature.choices) {
					const choiceKey = `${buildData.classId}_${buildData.selectedSubclass}_${choice.id}`;
					const selections = buildData.featureChoices[choiceKey] || [];

					for (const selectedOptionName of selections) {
						const option = choice.options?.find((opt) => opt.name === selectedOptionName);
						if (option?.effects) {
							for (const effect of option.effects) {
								effects.push({
									...effect,
									source: {
										type: 'subclass_feature_choice' as any,
										id: choice.id,
										name: selectedOptionName,
										description: option.description,
										category: `${buildData.selectedSubclass} - ${feature.featureName}`
									},
									resolved: true
								} as AttributedEffect);
							}
						}
					}
				}
			}
		}
	}

	// Add effects from multiclass feature selection
	if (buildData.selectedMulticlassFeature && buildData.selectedMulticlassClass) {
		const multiclassData = classesData.find((c) => c.id === buildData.selectedMulticlassClass);
		if (multiclassData) {
			const classFeaturesDef = findClassByName(multiclassData.name);
			if (classFeaturesDef) {
				const feature = (classFeaturesDef as any).coreFeatures.find(
					(f: any) => f.featureName === buildData.selectedMulticlassFeature
				);

				if (feature?.effects) {
					for (const effect of feature.effects) {
						effects.push({
							...effect,
							source: {
								type: 'multiclass_feature' as any,
								id: `multiclass_${buildData.selectedMulticlassClass}_${feature.featureName}`,
								name: feature.featureName,
								description: feature.description,
								category: 'Multiclass Feature'
							},
							resolved: !(effect as any).userChoice,
							dependsOnChoice: (effect as any).userChoice
								? `multiclass_${feature.featureName}`
								: undefined
						} as AttributedEffect);
					}
				}
			}
		}
	}

	// Add effects from class features
	const classDef = getClassFeatures(buildData.classId);
	if (classDef) {
		for (const feature of classDef.coreFeatures) {
			// Only apply features the character has unlocked by current level.
			if ((feature.levelGained || 0) > buildData.level) {
				continue;
			}

			// Direct feature effects
			if (feature.effects) {
				for (const effect of feature.effects) {
					effects.push({
						...effect,
						source: {
							type: 'class_feature',
							id: feature.featureName,
							name: feature.featureName,
							description: feature.description,
							category: `${classDef.className} Level ${feature.levelGained}`
						},
						resolved: true
					} as AttributedEffect);
				}
			}

			// Benefits within features
			if (feature.benefits) {
				for (const benefit of feature.benefits) {
					if (benefit.effects) {
						for (const effect of benefit.effects) {
							effects.push({
								...effect,
								source: {
									type: 'class_feature',
									id: `${feature.featureName}_${benefit.name}`,
									name: benefit.name,
									description: benefit.description,
									category: `${classDef.className} Level ${feature.levelGained}`
								},
								resolved: true
							} as AttributedEffect);
						}
					}
				}
			}

			// Chosen options from feature choices
			if (feature.choices) {
				for (let choiceIndex = 0; choiceIndex < feature.choices.length; choiceIndex++) {
					const choice = feature.choices[choiceIndex];
					const legacyKey = getLegacyChoiceId(
						classDef.className,
						feature.featureName,
						choiceIndex
					);
					const userChoice =
						(buildData as any).featureChoices?.[choice.id] ??
						(buildData as any).featureChoices?.[legacyKey];
					if (userChoice) {
						for (const option of choice.options) {
							const isSelected =
								userChoice === option.name ||
								(Array.isArray(userChoice) && userChoice.includes(option.name));
							if (isSelected) {
								if (option.effects) {
									for (const effect of option.effects) {
										effects.push({
											...effect,
											source: {
												type: 'choice',
												id: `${choice.id}_${option.name}`,
												name: option.name,
												description: option.description,
												category: `${classDef.className} Choice`
											},
											resolved: true
										} as AttributedEffect);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return effects;
}

/**
 * Resolve user choices in effects
 */
export function resolveEffectChoices(
	effects: AttributedEffect[],
	choices: TraitChoiceStorage
): AttributedEffect[] {
	return effects.map((effect) => {
		if (!(effect as any).userChoice || !effect.dependsOnChoice) {
			return effect;
		}

		const chosenValue = choices[effect.dependsOnChoice];
		if (!chosenValue) {
			return effect; // Unresolved
		}

		// Resolve the choice
		const resolvedEffect = { ...effect } as any;
		if (
			(effect as any).target === 'any_attribute' &&
			(effect as any).type === 'MODIFY_ATTRIBUTE'
		) {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (
			(effect as any).target === 'any_skill' &&
			(effect as any).type === 'GRANT_SKILL_EXPERTISE'
		) {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (
			(effect as any).target === 'any_trade' &&
			(effect as any).type === 'GRANT_TRADE_EXPERTISE'
		) {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		}

		return resolvedEffect as AttributedEffect;
	});
}
