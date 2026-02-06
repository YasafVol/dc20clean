/**
 * Enhanced Character Calculator with Effect Attribution
 *
 * This is the unified calculation engine that provides detailed breakdowns
 * for tooltips and real-time validation for the UI.
 */

import type {
	EnhancedCalculationResult,
	EnhancedCharacterBuildData,
	AttributedEffect,
	EnhancedStatBreakdown,
	ValidationResult,
	ValidationError,
	AttributeLimit,
	UnresolvedChoice,
	ChoiceOption,
	TraitChoiceStorage,
	GlobalMagicProfile,
	SpellsKnownSlot
} from '../types/effectSystem';
import type { SpellSource, SpellSchool, SpellTag } from '../rulesdata/schemas/spell.schema';
import {
	type ModifyMasteryCapEffect,
	type IncreaseMasteryCapEffect
} from '../rulesdata/schemas/character.schema';
import {
	resolveClassProgression,
	resolveSubclassFeatures
} from '../rulesdata/classes-data/classProgressionResolver';
import { classesData } from '../rulesdata/loaders/class.loader';
import { findTalentById } from '../rulesdata/classes-data/talents/talent.loader';
import { getLevelCaps } from '../rulesdata/progression/levelCaps';

import { BuildStep } from '../types/effectSystem';
import { getSpellById } from '../rulesdata/spells-data';
import { getLegacyChoiceId, findClassByName } from '../rulesdata/loaders/class-features.loader';
import { traitsData } from '../rulesdata/ancestries/traits';
import { ancestriesData } from '../rulesdata/ancestries/ancestries';
import { barbarianClass } from '../rulesdata/classes-data/features/barbarian_features';
import { clericClass } from '../rulesdata/classes-data/features/cleric_features';
import { hunterClass } from '../rulesdata/classes-data/features/hunter_features';
import { championClass } from '../rulesdata/classes-data/features/champion_features';
import { wizardClass } from '../rulesdata/classes-data/features/wizard_features';
import { monkClass } from '../rulesdata/classes-data/features/monk_features';
import { rogueClass } from '../rulesdata/classes-data/features/rogue_features';
import { sorcererClass } from '../rulesdata/classes-data/features/sorcerer_features';
import { spellbladeClass } from '../rulesdata/classes-data/features/spellblade_features';
import { warlockClass } from '../rulesdata/classes-data/features/warlock_features';
import { bardClass } from '../rulesdata/classes-data/features/bard_features';
import { druidClass } from '../rulesdata/classes-data/features/druid_features';
import { commanderClass } from '../rulesdata/classes-data/features/commander_features';
import { attributesData } from '../rulesdata/attributes';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';
import type { ClassDefinition } from '../rulesdata/schemas/character.schema';
import { CHARACTER_PATHS } from '../rulesdata/progression/paths/paths.data';
import {
	collectGrantedAbilities,
	collectMovements,
	collectConditionalModifiers
} from './calculatorModules/abilityCollection';
import {
	createStatBreakdown,
	createInitiativeBreakdown,
	createMartialCheckBreakdown
} from './calculatorModules/breakdownGeneration';

/**
 * Cross-path grants returned by aggregatePathBenefits (DC20 v0.10 p.161)
 */
interface CrossPathGrants {
	/** Spellcaster taking Martial Path gets Spellcaster Stamina Regen */
	grantsSpellcasterStaminaRegen: boolean;
	/** Martial taking Spellcaster Path must choose a Spell List */
	requiresSpellListChoice: boolean;
	/** Combat Training grants from path progression */
	combatTrainingGrants: string[];
}

/**
 * Helper to aggregate path point benefits based on allocations
 * @param pathPointAllocations - How many points allocated to each path
 * @param classCategory - The class's category (martial/spellcaster/hybrid) for cross-path rules
 * @returns Aggregated benefits from all allocated path levels, including cross-path grants
 */
function aggregatePathBenefits(
	pathPointAllocations?: {
		martial?: number;
		spellcasting?: number;
	},
	classCategory?: 'martial' | 'spellcaster' | 'hybrid'
): {
	totalSP: number;
	totalMP: number;
	totalManeuversKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	crossPathGrants: CrossPathGrants;
} {
	let totalSP = 0;
	let totalMP = 0;
	let totalManeuversKnown = 0;
	let totalCantripsKnown = 0;
	let totalSpellsKnown = 0;

	// Initialize cross-path grants
	const crossPathGrants: CrossPathGrants = {
		grantsSpellcasterStaminaRegen: false,
		requiresSpellListChoice: false,
		combatTrainingGrants: []
	};

	if (!pathPointAllocations) {
		return {
			totalSP,
			totalMP,
			totalManeuversKnown,
			totalCantripsKnown,
			totalSpellsKnown,
			crossPathGrants
		};
	}

	// Martial Path bonuses
	if (pathPointAllocations.martial && pathPointAllocations.martial > 0) {
		const martialPath = CHARACTER_PATHS.find((p) => p.id === 'martial_path');
		if (martialPath) {
			for (let level = 1; level <= pathPointAllocations.martial; level++) {
				const levelData = martialPath.progression.find((p) => p.pathLevel === level);
				if (levelData?.benefits) {
					totalSP += levelData.benefits.staminaPoints || 0;
					totalManeuversKnown += levelData.benefits.maneuversLearned || 0;
				}
			}

			// DC20 v0.10 p.161: Grant Combat Training with Weapons from Martial Path
			crossPathGrants.combatTrainingGrants.push('Weapons');

			// DC20 v0.10 p.161: Spellcaster classes (lacking Stamina Regen) gain
			// "Spellcaster Stamina Regen" when they first invest in Martial Path
			if (classCategory === 'spellcaster') {
				crossPathGrants.grantsSpellcasterStaminaRegen = true;
				console.log('✨ Cross-path grant: Spellcaster Stamina Regen', {
					classCategory,
					martialPoints: pathPointAllocations.martial
				});
			}
		}
	}

	// Spellcaster Path bonuses
	if (pathPointAllocations.spellcasting && pathPointAllocations.spellcasting > 0) {
		const spellcasterPath = CHARACTER_PATHS.find((p) => p.id === 'spellcaster_path');
		if (spellcasterPath) {
			for (let level = 1; level <= pathPointAllocations.spellcasting; level++) {
				const levelData = spellcasterPath.progression.find((p) => p.pathLevel === level);
				if (levelData?.benefits) {
					totalMP += levelData.benefits.manaPoints || 0;
					totalCantripsKnown += levelData.benefits.cantripsLearned || 0;
					totalSpellsKnown += levelData.benefits.spellsLearned || 0;
				}
			}

			// DC20 v0.10 p.161: Grant Combat Training with Spell Focuses from Spellcaster Path
			crossPathGrants.combatTrainingGrants.push('Spell_Focuses');

			// DC20 v0.10 p.161: Martial classes (lacking a Spell List) gain
			// a Spell List of their choice when they first invest in Spellcaster Path
			if (classCategory === 'martial') {
				crossPathGrants.requiresSpellListChoice = true;
				console.log('✨ Cross-path grant: Requires Spell List choice', {
					classCategory,
					spellcastingPoints: pathPointAllocations.spellcasting
				});
			}
		}
	}

	return {
		totalSP,
		totalMP,
		totalManeuversKnown,
		totalCantripsKnown,
		totalSpellsKnown,
		crossPathGrants
	};
}

/**
 * Check if a class's Flavor Feature should be auto-granted (DC20 v0.10 p.161)
 * Rule: "Once you gain 2 Class Features from the same Class, you automatically gain that Class's Flavor Feature."
 *
 * @param classId - The class to check
 * @param unlockedFeatureIds - Feature IDs unlocked from main class progression
 * @param multiclassFeatures - Array of {classId, featureId} from multiclass talents
 * @returns The flavor feature to auto-grant, or null if criteria not met
 */
function checkFlavorFeatureAutoGrant(
	classId: string,
	unlockedFeatureIds: string[],
	multiclassFeatures: Array<{ classId: string; featureId: string }>
): { featureId: string; featureName: string; classId: string } | null {
	const classDefinition = findClassByName(classId);
	if (!classDefinition) return null;

	// Count non-flavor features from this class
	const classFeatures = classDefinition.coreFeatures.filter((f) => !f.isFlavor);

	// Count features unlocked from main class progression
	let featureCount = 0;
	for (const feature of classFeatures) {
		const featureId = feature.id || feature.featureName;
		if (unlockedFeatureIds.includes(featureId)) {
			featureCount++;
		}
	}

	// Count features from multiclass (if targeting this class)
	for (const mc of multiclassFeatures) {
		if (mc.classId === classId) {
			// Verify it's not a flavor feature
			const feature = classFeatures.find((f) => (f.id || f.featureName) === mc.featureId);
			if (feature && !feature.isFlavor) {
				featureCount++;
			}
		}
	}

	console.log('🎭 Flavor Feature check:', {
		classId,
		featureCount,
		threshold: 2,
		qualifies: featureCount >= 2
	});

	// If 2+ features, find and return the flavor feature
	if (featureCount >= 2) {
		const flavorFeature = classDefinition.coreFeatures.find((f) => f.isFlavor);
		if (flavorFeature) {
			return {
				featureId: flavorFeature.id || flavorFeature.featureName,
				featureName: flavorFeature.featureName,
				classId
			};
		}
	}

	return null;
}

/**
 * Convert character context data to enhanced build data
 */
export function convertToEnhancedBuildData(contextData: any): EnhancedCharacterBuildData {
	return {
		id: contextData.id || '',
		finalName: contextData.finalName || '',
		finalPlayerName: contextData.finalPlayerName,
		level: contextData.level || 1,
		usePrimeCapRule: !!contextData.usePrimeCapRule,

		// Use final* if present, else attribute_* (for character creation)
		attribute_might: contextData.finalMight ?? contextData.attribute_might ?? 0,
		attribute_agility: contextData.finalAgility ?? contextData.attribute_agility ?? 0,
		attribute_charisma: contextData.finalCharisma ?? contextData.attribute_charisma ?? 0,
		attribute_intelligence:
			contextData.finalIntelligence ?? contextData.attribute_intelligence ?? 0,

		// combatMastery is calculated in calculateCharacterWithBreakdowns, not stored
		combatMastery: 0, // Will be overridden by calculation

		classId: contextData.classId || '',
		ancestry1Id: contextData.ancestry1Id || undefined,
		ancestry2Id: contextData.ancestry2Id || undefined,

		selectedTraitIds: Array.isArray(contextData.selectedTraitIds)
			? contextData.selectedTraitIds
			: [],
		selectedTraitChoices: contextData.selectedTraitChoices ?? {},
		featureChoices: contextData.selectedFeatureChoices ?? {},
		selectedTalents:
			contextData.selectedTalents && typeof contextData.selectedTalents === 'object'
				? contextData.selectedTalents
				: {},
		selectedSubclass: contextData.selectedSubclass,

		// Multiclass selections (M3.17)
		selectedMulticlassOption: contextData.selectedMulticlassOption,
		selectedMulticlassClass: contextData.selectedMulticlassClass,
		selectedMulticlassFeature: contextData.selectedMulticlassFeature,

		// Pass data as native objects, removing the unnecessary stringify step
		skillsData: contextData.skillsData ?? {},
		tradesData: contextData.tradesData ?? {},
		// Default Common to fluent when empty to match current UI assumptions
		languagesData: contextData.languagesData ?? { common: { fluency: 'fluent' } },

		// Optional manual overrides supported by the engine
		manualPD: contextData.manualPD,
		manualAD: contextData.manualAD,
		manualPDR: contextData.manualPDR,
		activeConditions: Object.entries(
			contextData.characterState?.ui?.activeConditions ?? {}
		)
			.filter(([, isActive]) => Boolean(isActive))
			.map(([conditionId]) => conditionId),

		// Conversions between point pools (for Background step)
		conversions: {
			skillToTrade: contextData.skillToTradeConversions ?? 0,
			tradeToSkill: contextData.tradeToSkillConversions ?? 0,
			tradeToLanguage: contextData.tradeToLanguageConversions ?? 0
		},

		// Path Point Allocations (M3.9)
		pathPointAllocations: contextData.pathPointAllocations,

		// Selections (M3.20 Slot Based)
		selectedSpells: contextData.selectedSpells ?? {},
		selectedManeuvers: contextData.selectedManeuvers ?? [],

		lastModified: Date.now()
	};
}

/**
 * Get class level progression data by ID
 */
function getClassProgressionData(classId: string): any | null {
	const classData = classesData.find((c) => c.id === classId);
	return classData ?? null;
}

/**
 * Get class features by ID (for abilities)
 */
function getClassFeatures(classId: string): ClassDefinition | null {
	switch (classId) {
		case 'barbarian':
			return barbarianClass;
		case 'cleric':
			return clericClass;
		case 'hunter':
			return hunterClass;
		case 'champion':
			return championClass;
		case 'wizard':
			return wizardClass;
		case 'monk':
			return monkClass;
		case 'rogue':
			return rogueClass;
		case 'sorcerer':
			return sorcererClass;
		case 'spellblade':
			return spellbladeClass;
		case 'warlock':
			return warlockClass;
		case 'bard':
			return bardClass;
		case 'druid':
			return druidClass;
		case 'commander':
			return commanderClass;
		default:
			return null;
	}
}

/**
 * Aggregate all effects with source attribution
 */
function aggregateAttributedEffects(buildData: EnhancedCharacterBuildData): AttributedEffect[] {
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
					resolved: !effect.userChoice,
					dependsOnChoice: effect.userChoice ? `${traitId}-${effectIndex}` : undefined
				});
			}
		}
	}

	// Add effects from selected talents (count-based: apply effects multiple times)
	const selectedTalents = buildData.selectedTalents || {};
	for (const [talentId, count] of Object.entries(selectedTalents)) {
		const talent = findTalentById(talentId);
		if (talent?.effects && count > 0) {
			// Apply talent effects 'count' times (e.g., if selected twice, add effects twice)
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
					});
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
								});
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
			const classFeatures = findClassByName(multiclassData.name);
			if (classFeatures) {
				// Find the selected feature
				const feature = classFeatures.coreFeatures.find(
					(f) => f.featureName === buildData.selectedMulticlassFeature
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
							resolved: !effect.userChoice,
							dependsOnChoice: effect.userChoice ? `multiclass_${feature.featureName}` : undefined
						});
					}
				}
			}
		}
	}

	// Add effects from class features
	const classFeatures = getClassFeatures(buildData.classId);
	if (classFeatures) {
		for (const feature of classFeatures.coreFeatures) {
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
							category: `${classFeatures.className} Level ${feature.levelGained}`
						},
						resolved: true
					});
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
									category: `${classFeatures.className} Level ${feature.levelGained}`
								},
								resolved: true
							});
						}
					}
				}
			}

			// Chosen options from feature choices
			if (feature.choices) {
				for (let choiceIndex = 0; choiceIndex < feature.choices.length; choiceIndex++) {
					const choice = feature.choices[choiceIndex];
					// Prefer canonical choice.id, but accept legacy UI key as fallback
					const legacyKey = getLegacyChoiceId(
						classFeatures.className,
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
												category: `${classFeatures.className} Choice`
											},
											resolved: true
										});
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
 * --- Spell System Logic (M3.20) ---
 */

/**
 * Aggregates the character's global magic profile by combining class defaults
 * with expansion effects from features and talents.
 */
function calculateGlobalMagicProfile(
	buildData: EnhancedCharacterBuildData,
	effects: AttributedEffect[]
): GlobalMagicProfile {
	// Get spell restrictions from class features (single source of truth)
	// This replaces the old CLASS_SPELL_CONFIG approach
	const classFeatures = findClassByName(buildData.classId || '');
	const spellList = classFeatures?.spellcasterPath?.spellList;

	const profile: GlobalMagicProfile = {
		// DC20 v0.10: No source restriction - filtering is by school/tag only
		// An empty sources array means "allow all sources" in the filtering logic
		sources: [],
		// Schools from class features (e.g., Bard: ['Enchantment'])
		schools: (spellList?.specificSchools as SpellSchool[]) || [],
		// Tags from class features (e.g., Bard: ['Embolden', 'Enfeeble', 'Healing', 'Illusion', 'Sound'])
		tags: (spellList?.spellTags as SpellTag[]) || []
	};

	// Process Expansion Effects (talents/features that expand spell access)
	for (const effect of effects) {
		if (!effect.resolved) continue;

		// Portal Magic Expansion - adds Teleportation tag
		if ((effect as any).target === 'teleportation_expert') {
			if (!profile.tags.includes('Teleportation' as SpellTag)) {
				profile.tags.push('Teleportation' as SpellTag);
			}
		}

		// Coven's Gift Expansion - adds Curse tag
		if ((effect as any).target === 'curse_school_specialization') {
			if (!profile.tags.includes('Curse' as SpellTag)) {
				profile.tags.push('Curse' as SpellTag);
			}
		}

		// Spellcasting Expansion Talent - adds schools from choice
		if ((effect as any).target === 'spell_list_expansion') {
			const selection = buildData.featureChoices?.['spell_list_expansion'];
			if (selection) {
				// Handle school expansion (selection is an array of schools)
				if (Array.isArray(selection)) {
					selection.forEach((school) => {
						if (!profile.schools.includes(school as SpellSchool)) {
							profile.schools.push(school as SpellSchool);
						}
					});
				}
			}
		}
	}

	return profile;
}

/**
 * Generates the array of SpellsKnownSlots for the character.
 * Processes progression table gains, GRANT_SPELL effects, and talent bonuses.
 */
function generateSpellsKnownSlots(
	buildData: EnhancedCharacterBuildData,
	progressionGains: any,
	effects: AttributedEffect[],
	talentSpellBonus: number = 0
): SpellsKnownSlot[] {
	const slots: SpellsKnownSlot[] = [];
	const classFeatures = getClassFeatures(buildData.classId);

	// 1. Generate Global Class Progression Slots
	// Spells
	for (let i = 0; i < progressionGains.totalSpellsKnown; i++) {
		slots.push({
			id: `global_spell_${i}`,
			type: 'spell',
			sourceName: `${classFeatures?.className || 'Class'} Progression`,
			isGlobal: true
		});
	}

	// 1b. Generate Global Talent Bonus Slots (from MODIFY_STAT spellsKnown)
	for (let i = 0; i < talentSpellBonus; i++) {
		slots.push({
			id: `talent_spell_${i}`,
			type: 'spell',
			sourceName: 'Talent Bonus',
			isGlobal: true
		});
	}

	// 2. Generate Specialized Slots from GRANT_SPELL effects
	effects.forEach((effect, index) => {
		if ((effect as any).type === 'GRANT_SPELL' || (effect as any).type === 'GRANT_CANTRIP') {
			const count = Number((effect as any).value) || 1;

			for (let i = 0; i < count; i++) {
				const slot: SpellsKnownSlot = {
					id: `specialized_${effect.source.id}_${index}_${i}`,
					type: 'spell',
					sourceName: effect.source.name,
					isGlobal: false,
					specificRestrictions: {}
				};

				// Map common GRANT_SPELL targets to restrictions
				const target = (effect as any).target;
				if (target === 'astromancy_school')
					slot.specificRestrictions!.schools = ['Astromancy' as SpellSchool];
				if (target === 'conjuration_school')
					slot.specificRestrictions!.schools = ['Conjuration' as SpellSchool];
				if (target === 'divination_school')
					slot.specificRestrictions!.schools = ['Divination' as SpellSchool];
				if (target === 'elemental_school')
					slot.specificRestrictions!.schools = ['Elemental' as SpellSchool];
				if (target === 'enchantment_school')
					slot.specificRestrictions!.schools = ['Enchantment' as SpellSchool];
				if (target === 'invocation_school')
					slot.specificRestrictions!.schools = ['Invocation' as SpellSchool];
				if (target === 'nullification_school')
					slot.specificRestrictions!.schools = ['Nullification' as SpellSchool];
				if (target === 'transmutation_school')
					slot.specificRestrictions!.schools = ['Transmutation' as SpellSchool];
				if (target === 'illusion_school')
					slot.specificRestrictions!.schools = ['Illusion' as SpellSchool]; // Placeholder for Illusion

				if (target === 'Divine_Spell_List')
					slot.specificRestrictions!.sources = ['Divine' as SpellSource];

				if (target === 'curse_tag') slot.specificRestrictions!.tags = ['Curse' as SpellTag];
				if (target === 'by_tag' && (effect as any).userChoice) {
					// Handle user choice for tag-based grant (Cleric Magic Domain)
					const choiceKey = `${buildData.classId}_Magic_${effect.source.id}`; // Simple mapping
					const chosenTag = buildData.featureChoices?.[choiceKey];
					if (chosenTag) slot.specificRestrictions!.tags = [chosenTag as SpellTag];
				}

				// Surgical grants
				if (target === 'druidcraft') slot.specificRestrictions!.exactSpellId = 'druidcraft';
				if (target === 'Sorcery') slot.specificRestrictions!.exactSpellId = 'sorcery';
				if (target === 'find_familiar') slot.specificRestrictions!.exactSpellId = 'find_familiar';

				// Bard Magical Secrets (Special case: no restrictions)
				if (target === 'any_source' || effect.source.id === 'bard_magical_secrets') {
					slot.specificRestrictions = {}; // Truly any
				}

				slots.push(slot);
			}
		}
	});

	return slots;
}

/**
 * Resolve user choices in effects
 */
function resolveEffectChoices(
	effects: AttributedEffect[],
	choices: TraitChoiceStorage
): AttributedEffect[] {
	return effects.map((effect) => {
		if (!effect.userChoice || !effect.dependsOnChoice) {
			return effect;
		}

		const chosenValue = choices[effect.dependsOnChoice];
		if (!chosenValue) {
			return effect; // Unresolved
		}

		// Resolve the choice
		const resolvedEffect = { ...effect };
		if (effect.target === 'any_attribute' && effect.type === 'MODIFY_ATTRIBUTE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (effect.target === 'any_skill' && effect.type === 'GRANT_SKILL_EXPERTISE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		} else if (effect.target === 'any_trade' && effect.type === 'GRANT_TRADE_EXPERTISE') {
			resolvedEffect.target = chosenValue;
			resolvedEffect.resolved = true;
			resolvedEffect.resolvedValue = chosenValue;
		}

		return resolvedEffect;
	});
}

// createStatBreakdown moved to calculatorModules/breakdownGeneration.ts

/**
 * Validate attribute limits
 */
function validateAttributeLimits(
	buildData: EnhancedCharacterBuildData,
	effects: AttributedEffect[]
): Record<string, AttributeLimit> {
	const limits: Record<string, AttributeLimit> = {};
	const levelCaps = getLevelCaps(buildData.level);

	for (const attr of attributesData) {
		const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
		const traitBonuses = effects
			.filter(
				(effect) =>
					effect.resolved && effect.type === 'MODIFY_ATTRIBUTE' && effect.target === attr.id
			)
			.reduce((sum, effect) => sum + (effect.value as number), 0);

		const current = baseValue + traitBonuses;
		const max = levelCaps.maxAttributeValue;

		limits[attr.id] = {
			current,
			base: baseValue,
			traitBonuses,
			max,
			exceeded: current > max,
			canIncrease: baseValue + traitBonuses + 1 <= max, // Fixed: Check if base can be increased without total exceeding max
			canDecrease: baseValue > -2
		};
	}

	return limits;
}

/**
 * Get unresolved choices for character creation UI
 */
function getUnresolvedChoices(effects: AttributedEffect[]): UnresolvedChoice[] {
	return effects
		.filter((effect) => effect.userChoice && !effect.resolved)
		.map((effect) => {
			const options = getOptionsForEffect(effect);

			return {
				traitId: effect.source.id,
				traitName: effect.source.name,
				effectIndex: 0, // Would need to track this properly
				effect,
				prompt: effect.userChoice!.prompt,
				options,
				isRequired: true
			};
		});
}

/**
 * Get choice options for an effect
 */
function getOptionsForEffect(effect: AttributedEffect): ChoiceOption[] {
	const baseOptions = effect.userChoice?.options || [];

	if (effect.type === 'MODIFY_ATTRIBUTE' && baseOptions.length === 0) {
		return attributesData.map((attr) => ({
			value: attr.id,
			displayName: attr.name,
			description: attr.description,
			isValid: true // Would need proper validation
		}));
	}

	if (effect.type === 'GRANT_SKILL_EXPERTISE' && baseOptions.length === 0) {
		return skillsData.map((skill) => ({
			value: skill.id,
			displayName: skill.name,
			description: skill.description,
			isValid: true
		}));
	}

	if (effect.type === 'GRANT_TRADE_EXPERTISE' && baseOptions.length === 0) {
		return tradesData.map((trade) => ({
			value: trade.id,
			displayName: trade.name,
			description: trade.description,
			isValid: true
		}));
	}

	return baseOptions.map((option) => ({
		value: option,
		displayName: option,
		isValid: true
	}));
}

/**
 * Aggregate all progression gains from level 1 to target level
 */
function aggregateProgressionGains(
	classProgressionData: any,
	targetLevel: number,
	pathPointAllocations?: { martial?: number; spellcasting?: number },
	selectedSubclass?: string,
	classCategory?: 'martial' | 'spellcaster' | 'hybrid'
): {
	totalHP: number;
	totalSP: number;
	totalMP: number;
	totalSkillPoints: number;
	totalTradePoints: number;
	totalAttributePoints: number;
	totalManeuversKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	totalTalents: number;
	totalPathPoints: number;
	totalAncestryPoints: number;
	unlockedFeatureIds: string[];
	pendingSubclassChoices: number;
	crossPathGrants: CrossPathGrants;
} {
	let totalHP = 0;
	let totalSP = 0;
	let totalMP = 0;
	let totalSkillPoints = 0;
	let totalTradePoints = 0;
	let totalAttributePoints = 0;
	let totalManeuversKnown = 0;
	let totalCantripsKnown = 0;
	let totalSpellsKnown = 0;
	let totalTalents = 0;
	let totalPathPoints = 0;
	let totalAncestryPoints = 0;
	const unlockedFeatureIds: string[] = [];
	let pendingSubclassChoices = 0;

	if (!classProgressionData?.levelProgression) {
		return {
			totalHP,
			totalSP,
			totalMP,
			totalSkillPoints,
			totalTradePoints,
			totalAttributePoints,
			totalManeuversKnown,
			totalSpellsKnown,
			totalTalents,
			totalPathPoints,
			totalAncestryPoints,
			unlockedFeatureIds,
			pendingSubclassChoices
		};
	}

	console.log('🔍 AGGREGATION START:', {
		classId: classProgressionData?.id,
		targetLevel,
		hasProgression: !!classProgressionData?.levelProgression,
		progressionLength: classProgressionData?.levelProgression?.length
	});

	for (let level = 1; level <= targetLevel; level++) {
		const levelData = classProgressionData.levelProgression.find((lp: any) => lp.level === level);
		if (!levelData) {
			console.warn(`⚠️ Level ${level} not found in progression!`);
			continue;
		}

		console.log(`📊 Level ${level} data:`, {
			hasGains: !!levelData.gains,
			gains: JSON.stringify(levelData.gains),
			talents: levelData.gains?.talents,
			pathPoints: levelData.gains?.pathPoints
		});

		// Aggregate numeric stats from progression files (gained* fields)
		totalHP += levelData.gainedHealth || levelData.healthPoints || 0;
		totalSP += levelData.gainedStaminaPoints || levelData.staminaPoints || 0;
		totalMP += levelData.gainedManaPoints || levelData.manaPoints || 0;
		totalSkillPoints += levelData.gainedSkillPoints || levelData.skillPoints || 0;
		totalTradePoints += levelData.gainedTradePoints || levelData.tradePoints || 0;
		totalAttributePoints += levelData.gainedAttributePoints || levelData.attributePoints || 0;
		totalManeuversKnown += levelData.gainedManeuversKnown || levelData.maneuversKnown || 0;
		totalSpellsKnown +=
			(levelData.gainedSpellsKnown || levelData.spellsKnown || 0) +
			(levelData.gainedCantripsKnown || levelData.cantripsKnown || 0);

		// Aggregate new structured gains (if present)
		if (levelData.gains) {
			totalTalents += levelData.gains.talents || 0;
			// Support both pathPoints (number) and pathProgression (boolean).
			totalPathPoints += levelData.gains.pathPoints || (levelData.gains.pathProgression ? 1 : 0);
			totalAncestryPoints += levelData.gains.ancestryPoints || 0;

			if (levelData.gains.classFeatures) {
				unlockedFeatureIds.push(...levelData.gains.classFeatures);
			}

			if (levelData.gains.subclassFeatureChoice) {
				pendingSubclassChoices++;
			}
		}
	}

	console.log('✅ AGGREGATION COMPLETE (before path bonuses):', {
		totalTalents,
		totalPathPoints,
		totalSkillPoints,
		totalTradePoints,
		unlockedFeatureIds: unlockedFeatureIds.length,
		totalSP,
		totalMP,
		totalManeuversKnown
	});

	// Add path bonuses to progression totals (with cross-path grants)
	const pathBonuses = aggregatePathBenefits(pathPointAllocations, classCategory);
	totalSP += pathBonuses.totalSP;
	totalMP += pathBonuses.totalMP;
	totalManeuversKnown += pathBonuses.totalManeuversKnown;
	totalCantripsKnown += pathBonuses.totalCantripsKnown;
	totalSpellsKnown += pathBonuses.totalSpellsKnown;

	console.log('✅ PATH BONUSES APPLIED:', {
		pathAllocations: pathPointAllocations,
		classCategory,
		bonuses: pathBonuses,
		crossPathGrants: pathBonuses.crossPathGrants,
		finalSP: totalSP,
		finalMP: totalMP,
		finalManeuvers: totalManeuversKnown
	});

	// Apply subclass features (M3.10c)
	if (selectedSubclass && classProgressionData?.id) {
		try {
			const subclassFeatures = resolveSubclassFeatures(
				classProgressionData.id,
				selectedSubclass,
				targetLevel
			);

			console.log('🎭 SUBCLASS FEATURES APPLIED:', {
				subclass: selectedSubclass,
				featuresCount: subclassFeatures.length,
				featureIds: subclassFeatures.map((f) => f.id || f.featureName)
			});

			// Add subclass feature IDs to unlocked features
			subclassFeatures.forEach((feature) => {
				const featureId = feature.id || feature.featureName;
				if (featureId) {
					unlockedFeatureIds.push(featureId);
				}
			});
		} catch (error) {
			console.error('Failed to resolve subclass features:', error);
		}
	}

	return {
		totalHP,
		totalSP,
		totalMP,
		totalSkillPoints,
		totalTradePoints,
		totalAttributePoints,
		totalManeuversKnown,
		totalCantripsKnown,
		totalSpellsKnown,
		totalTalents,
		totalPathPoints,
		totalAncestryPoints,
		unlockedFeatureIds,
		pendingSubclassChoices,
		crossPathGrants: pathBonuses.crossPathGrants
	};
}

/**
 * Main calculation function with detailed breakdowns
 */
export function calculateCharacterWithBreakdowns(
	buildData: EnhancedCharacterBuildData
): EnhancedCalculationResult {
	// 1. Aggregate all effects with source attribution
	const rawEffects = aggregateAttributedEffects(buildData);

	// 2. Resolve user choices
	const resolvedEffects = resolveEffectChoices(rawEffects, buildData.selectedTraitChoices);
	const activeConditions = new Set(buildData.activeConditions ?? []);

	// 3. Resolve class progression (budgets + features) - only if class is selected
	let resolvedProgression = null;
	if (buildData.classId) {
		try {
			resolvedProgression = resolveClassProgression(buildData.classId, buildData.level);
		} catch (error) {
			// If class progression fails, continue without it (will use defaults)
			console.warn(`Failed to resolve progression for class ${buildData.classId}:`, error);
		}
	}

	// 4. Get legacy class progression data for mana/cantrips/spells (still from tables)
	const classProgressionData = getClassProgressionData(buildData.classId);

	// Get class category for cross-path rules (DC20 v0.10 p.161)
	const classDefinition = buildData.classId ? findClassByName(buildData.classId) : null;
	const classCategory = classDefinition?.classCategory;

	const progressionGains = aggregateProgressionGains(
		classProgressionData,
		buildData.level,
		buildData.pathPointAllocations,
		buildData.selectedSubclass,
		classCategory
	);

	// 4. Create detailed breakdowns
	const breakdowns: Record<string, EnhancedStatBreakdown> = {};

	// Attributes
	for (const attr of attributesData) {
		const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
		breakdowns[`attribute_${attr.id}`] = createStatBreakdown(
			attr.id,
			baseValue,
			resolvedEffects,
			activeConditions
		);
	}

	// Calculate final attribute values
	const finalMight = breakdowns.attribute_might.total;
	const finalAgility = breakdowns.attribute_agility.total;
	const finalCharisma = breakdowns.attribute_charisma.total;
	const finalIntelligence = breakdowns.attribute_intelligence.total;

	// Derived stats - Combat Mastery calculated from level
	const combatMastery = Math.ceil(buildData.level / 2);
	const levelCapsForPrime = getLevelCaps(buildData.level);

	// Health & Resources - use aggregated progression gains
	let finalHPMax = finalMight + progressionGains.totalHP;
	let finalSPMax = progressionGains.totalSP;
	let finalMPMax = progressionGains.totalMP;

	// Do not apply effect modifiers here; breakdowns will add modifiers to base values

	// Defenses with modifiers
	const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
	const baseAD = 8 + combatMastery + finalMight + finalCharisma;
	const pdModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				e.type === 'MODIFY_STAT' &&
				e.target === 'pd' &&
				(!e.condition || activeConditions.has(e.condition))
		)
		.reduce((sum, e) => sum + (e.value as number), 0);
	const adModifiers = resolvedEffects
		.filter(
			(e) =>
				e.resolved &&
				e.type === 'MODIFY_STAT' &&
				e.target === 'ad' &&
				(!e.condition || activeConditions.has(e.condition))
		)
		.reduce((sum, e) => sum + (e.value as number), 0);
	const finalPD = buildData.manualPD ?? basePD + pdModifiers;
	const finalAD = buildData.manualAD ?? baseAD + adModifiers;
	const finalPDR = buildData.manualPDR ?? 0;

	// Determine attribute-driven prime values for legacy behavior
	const maxAttributeValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence);
	const attributesAtMax: Array<'might' | 'agility' | 'charisma' | 'intelligence'> = [];
	if (finalMight === maxAttributeValue) attributesAtMax.push('might');
	if (finalAgility === maxAttributeValue) attributesAtMax.push('agility');
	if (finalCharisma === maxAttributeValue) attributesAtMax.push('charisma');
	if (finalIntelligence === maxAttributeValue) attributesAtMax.push('intelligence');
	const attributePrime = attributesAtMax[0] || 'might';

	const usePrimeCapRule = !!buildData.usePrimeCapRule;
	const primeModifier = usePrimeCapRule ? levelCapsForPrime.maxAttributeValue : maxAttributeValue;
	const primeAttribute = usePrimeCapRule ? 'prime' : attributePrime;

	// Calculate other derived stats first (DC20 sheet: 10 + Combat Mastery + Prime)
	const finalSaveDC = 10 + combatMastery + primeModifier;
	const finalSaveMight = finalMight + combatMastery;
	const finalSaveAgility = finalAgility + combatMastery;
	const finalSaveCharisma = finalCharisma + combatMastery;
	const finalSaveIntelligence = finalIntelligence + combatMastery;
	const finalDeathThreshold = primeModifier + combatMastery; // Prime + Combat Mastery (usually -4)
	const baseMoveSpeed = 5;
	const baseJumpDistance = finalAgility;
	const finalGritPoints = Math.max(0, 2 + finalCharisma); // 2 + Charisma (minimum 0)
	const finalInitiativeBonus = combatMastery + finalAgility; // Combat Mastery + Agility
	// Attribute points handled via breakdowns to avoid double counting

	// Create breakdowns for derived stats
	breakdowns.hpMax = createStatBreakdown('hpMax', finalHPMax, resolvedEffects, activeConditions);
	breakdowns.spMax = createStatBreakdown('spMax', finalSPMax, resolvedEffects, activeConditions);
	breakdowns.mpMax = createStatBreakdown('mpMax', finalMPMax, resolvedEffects, activeConditions);
	breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects, activeConditions);
	breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects, activeConditions);

	// Base 12 + any attribute points gained from leveling
	breakdowns.attributePoints = createStatBreakdown(
		'attributePoints',
		12 + progressionGains.totalAttributePoints,
		resolvedEffects,
		activeConditions
	);

	// --- Spell System (M3.20) ---
	const globalMagicProfile = calculateGlobalMagicProfile(buildData, resolvedEffects);
	// Calculate talent spell bonus early for slot generation (C2)
	const earlySpellBonus = resolvedEffects
		.filter((e) => e.type === 'MODIFY_STAT' && e.target === 'spellsKnown')
		.reduce((s, e) => s + Number(e.value || 0), 0);
	const spellsKnownSlots = generateSpellsKnownSlots(
		buildData,
		progressionGains,
		resolvedEffects,
		earlySpellBonus
	);

	// Movement breakdowns
	breakdowns.move_speed = createStatBreakdown(
		'moveSpeed',
		baseMoveSpeed,
		resolvedEffects,
		activeConditions
	);
	breakdowns.jump_distance = createStatBreakdown(
		'jumpDistance',
		baseJumpDistance,
		resolvedEffects,
		activeConditions
	);

	// Use breakdown totals for final values to avoid double counting
	finalHPMax = breakdowns.hpMax.total;
	finalSPMax = breakdowns.spMax.total;
	finalMPMax = breakdowns.mpMax.total;
	const finalMoveSpeed = breakdowns.move_speed.total;
	const finalJumpDistance = breakdowns.jump_distance.total;
	const finalAttributePoints = breakdowns.attributePoints.total;

	// Rest Points must be calculated AFTER HP breakdown is applied
	const finalRestPoints = finalHPMax; // Rest Points = HP Max (post-effects)

	// Combat breakdowns
	const attackSpellCheckBase = combatMastery + primeModifier;
	breakdowns.attack_spell_check = createStatBreakdown(
		'attackSpellCheck',
		attackSpellCheckBase,
		resolvedEffects,
		activeConditions
	);
	breakdowns.save_dc = createStatBreakdown(
		'saveDC',
		finalSaveDC,
		resolvedEffects,
		activeConditions
	);

	// Initiative breakdown (via breakdownGeneration module)
	breakdowns.initiative = createInitiativeBreakdown(combatMastery, finalAgility, finalInitiativeBonus);

	// 4.5. Compute background points (ported from useBackgroundPoints)
	const skills = buildData.skillsData ?? {};
	const trades = buildData.tradesData ?? {};
	const languages = buildData.languagesData ?? { common: { fluency: 'fluent' } };

	// Get mastery limit elevations from spent points (not from features)
	const skillLimitElevations = (buildData as any).skillMasteryLimitElevations ?? {};
	const tradeLimitElevations = (buildData as any).tradeMasteryLimitElevations ?? {};

	// Get the baseline mastery cap from level
	const levelCapsForBackground = getLevelCaps(buildData.level);
	const baselineSkillMasteryTier = levelCapsForBackground.maxSkillMasteryTier;
	const baselineTradeMasteryTier = levelCapsForBackground.maxTradeMasteryTier;

	// Calculate skill points used with correct cost model:
	// - 1 point per mastery level up to baseline cap
	// - For each skill exceeding baseline: +1 point for limit elevation (if not from feature)
	// DC20 Rule: "1 Skill Point to increase its Skill Mastery Limit by 1"
	// Plus "another Skill Point to increase its Skill Mastery Level to meet the new Limit"
	// So: Adept at L1 = 1 (Novice) + 1 (elevate limit) + 1 (Adept level) = 3 points
	let skillPointsUsed = 0;
	for (const [skillId, masteryLevel] of Object.entries(skills)) {
		if (!masteryLevel) continue;
		// Base cost is mastery level
		skillPointsUsed += masteryLevel;
		// If this skill has a spent-points elevation, count that cost too
		const elevation = skillLimitElevations[skillId];
		if (elevation?.source === 'spent_points') {
			skillPointsUsed += elevation.value;
		}
	}

	// Same for trades
	let tradePointsUsed = 0;
	for (const [tradeId, masteryLevel] of Object.entries(trades)) {
		if (!masteryLevel) continue;
		// Base cost is mastery level
		tradePointsUsed += masteryLevel;
		// If this trade has a spent-points elevation, count that cost too
		const elevation = tradeLimitElevations[tradeId];
		if (elevation?.source === 'spent_points') {
			tradePointsUsed += elevation.value;
		}
	}
	const languagePointsUsed = Object.entries(languages).reduce(
		(sum, [id, d]) => (id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2)),
		0
	);

	const bonus = (target: string) =>
		resolvedEffects
			.filter((e) => e.type === 'MODIFY_STAT' && e.target === target)
			.reduce((s, e) => s + Number(e.value || 0), 0);

	// Use aggregated skill/trade points from progression gains + bonuses from effects
	// Base values: 5 skill points, 3 trade points, 2 language points at level 1
	const baseSkillPoints =
		5 + progressionGains.totalSkillPoints + finalIntelligence + bonus('skillPoints');
	const baseTradePoints = 3 + progressionGains.totalTradePoints + bonus('tradePoints');
	const baseLanguagePoints = 2 + bonus('languagePoints'); // Languages stay at 2 (not level-dependent)

	// --- Spells & Maneuvers Step Split (C1, C2, C3) ---
	// Calculate MODIFY_STAT bonuses for maneuvers and spells from talents
	const maneuverBonus = bonus('maneuversKnown');
	const spellBonus = bonus('spellsKnown');

	// Calculate GRANT_MANEUVERS effects from features (e.g., Commander's 4 attack maneuvers)
	const grantedManeuversCount = resolvedEffects
		.filter((e) => {
			if ((e as any).type !== 'GRANT_MANEUVERS') return false;

			// "all_attack" is an access grant, not a numeric "maneuvers known" budget increase.
			const target = String((e as any).target || '').toLowerCase();
			return target !== 'all_attack';
		})
		.reduce((sum, e) => sum + Number((e as any).value || 0), 0);

	// Log the bonuses for debugging
	if (maneuverBonus > 0 || grantedManeuversCount > 0) {
		console.log('🔢 [Calculation] Maneuver bonuses applied:', {
			fromTalents: maneuverBonus,
			fromFeatures: grantedManeuversCount,
			baseFromProgression: progressionGains.totalManeuversKnown
		});
	}
	if (spellBonus > 0) {
		console.log('✨ [Spells] Spell bonus applied:', {
			fromTalents: spellBonus,
			baseFromProgression: progressionGains.totalSpellsKnown
		});
	}

	const {
		skillToTrade = 0,
		tradeToSkill = 0,
		tradeToLanguage = 0
	} = (buildData as any).conversions || {};

	const availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);
	const availableTradePoints = baseTradePoints - tradeToSkill + skillToTrade * 2 - tradeToLanguage;
	const availableLanguagePoints = baseLanguagePoints + tradeToLanguage * 2;

	// Calculate ancestry points
	const selectedTraitCosts = buildData.selectedTraitIds.reduce((total, traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		return total + (trait?.cost || 0);
	}, 0);

	const baseAncestryPoints = 5 + bonus('ancestryPoints'); // Base 5 + any bonuses from effects
	const ancestryPointsUsed = selectedTraitCosts;
	const ancestryPointsRemaining = baseAncestryPoints - ancestryPointsUsed;

	// Background section for UI consumption with detailed breakdown
	const background = {
		baseSkillPoints,
		baseTradePoints,
		baseLanguagePoints,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints,
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		conversions: { skillToTrade, tradeToSkill, tradeToLanguage },
		// Breakdown for UI display
		breakdown: {
			skillPoints: {
				base: 5,
				intelligence: finalIntelligence,
				progression: progressionGains.totalSkillPoints,
				talents: bonus('skillPoints'),
				total: baseSkillPoints
			},
			tradePoints: {
				base: 3,
				progression: progressionGains.totalTradePoints,
				talents: bonus('tradePoints'),
				total: baseTradePoints
			},
			languagePoints: {
				base: 2,
				talents: bonus('languagePoints'),
				total: baseLanguagePoints
			}
		}
	};

	// Ancestry section for UI consumption
	const ancestry = {
		baseAncestryPoints,
		ancestryPointsUsed,
		ancestryPointsRemaining
	};

	// Calculate martial check as max(Acrobatics, Athletics) using EXISTING skill calculations
	// Instead of recalculating, we should access the pre-computed skill totals
	// For now, calculate here but TODO: get from character sheet's getSkillsData()
	const acrobaticsProficiency = skills['acrobatics'] || 0;
	const athleticsProficiency = skills['athletics'] || 0;
	const acrobaticsTotal = finalAgility + acrobaticsProficiency * 2; // Agility + (Proficiency × 2)
	const athleticsTotal = finalMight + athleticsProficiency * 2; // Might + (Proficiency × 2)
	const finalMartialCheck = Math.max(acrobaticsTotal, athleticsTotal);

	// Martial check breakdown (via breakdownGeneration module)
	breakdowns.martial_check = createMartialCheckBreakdown(
		finalAgility,
		finalMight,
		acrobaticsProficiency,
		athleticsProficiency,
		finalMartialCheck
	);

	// 5. Validation with step-aware errors
	const errors: ValidationError[] = [];

	// Ancestry point validation
	if (ancestryPointsUsed > baseAncestryPoints) {
		errors.push({
			step: BuildStep.Ancestry,
			field: 'ancestryPoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${ancestryPointsUsed - baseAncestryPoints} ancestry point(s) over budget.`
		});
	}

	// Background point validation
	if (skillPointsUsed > availableSkillPoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'skillPoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${skillPointsUsed - availableSkillPoints} skill point(s) over budget.`
		});
	}
	if (tradePointsUsed > availableTradePoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'tradePoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${tradePointsUsed - availableTradePoints} trade point(s) over budget.`
		});
	}
	if (languagePointsUsed > availableLanguagePoints) {
		errors.push({
			step: BuildStep.Background,
			field: 'languagePoints',
			code: 'POINTS_OVERBUDGET',
			message: `You are ${languagePointsUsed - availableLanguagePoints} language point(s) over budget.`
		});
	}

	const attributeLimits = validateAttributeLimits(buildData, resolvedEffects);

	// --- START MASTERY CAP CALCULATION ---
	// Get caps from canonical source
	const levelCaps = levelCapsForPrime;

	// Helper to convert skill points to a numeric mastery tier
	const getMasteryTierFromPoints = (points: number): number => {
		if (points >= 5) return 5; // Grandmaster
		if (points >= 4) return 4; // Master
		if (points >= 3) return 3; // Expert
		if (points >= 2) return 2; // Adept
		if (points >= 1) return 1; // Novice
		return 0; // Untrained
	};

	const baseSkillMasteryTier = levelCaps.maxSkillMasteryTier;
	const baseTradeMasteryTier = levelCaps.maxTradeMasteryTier;

	const skillMasteryCapEffects = resolvedEffects.filter(
		(e): e is ModifyMasteryCapEffect | IncreaseMasteryCapEffect =>
			e.type === 'MODIFY_SKILL_MASTERY_CAP' || e.type === 'INCREASE_SKILL_MASTERY_CAP'
	);

	const tradeMasteryCapEffects = resolvedEffects.filter(
		(e): e is ModifyMasteryCapEffect | IncreaseMasteryCapEffect =>
			e.type === 'MODIFY_TRADE_MASTERY_CAP' || e.type === 'INCREASE_TRADE_MASTERY_CAP'
	);

	// Debug logging for mastery cap system (DC20 0.10)
	if (Object.keys(skillLimitElevations).length > 0 || skillMasteryCapEffects.length > 0) {
		console.log('📊 [Mastery Caps] Skill mastery calculation:', {
			level: buildData.level,
			baselineCap: baseSkillMasteryTier,
			elevationsFromPoints: Object.keys(skillLimitElevations).length,
			elevationsFromFeatures: skillMasteryCapEffects.length,
			elevatedSkills: Object.keys(skillLimitElevations)
		});
	}
	if (Object.keys(tradeLimitElevations).length > 0 || tradeMasteryCapEffects.length > 0) {
		console.log('📊 [Mastery Caps] Trade mastery calculation:', {
			level: buildData.level,
			baselineCap: baseTradeMasteryTier,
			elevationsFromPoints: Object.keys(tradeLimitElevations).length,
			elevationsFromFeatures: tradeMasteryCapEffects.length,
			elevatedTrades: Object.keys(tradeLimitElevations)
		});
	}

	// Helper to calculate effective mastery cap for a specific skill
	// DC20 Rule: "When your Skill Mastery Limit increases at the normal level,
	// it continues to benefit from the bonus to its Skill Mastery Limit."
	// This means elevations are PERSISTENT and COMPOUND with level increases.
	const getEffectiveSkillCap = (skillId: string): number => {
		let cap = baseSkillMasteryTier;

		// Add elevation from spent points (if any)
		const spentElevation = skillLimitElevations[skillId];
		if (spentElevation?.source === 'spent_points') {
			cap += spentElevation.value;
		}

		// Add elevation from features (if any) - only 1 bonus per skill
		const featureElevation = skillMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(skillId)
		);
		if (featureElevation) {
			cap += featureElevation.value;
		}

		// Cap at Grandmaster (5)
		return Math.min(cap, 5);
	};

	const getEffectiveTradeCap = (tradeId: string): number => {
		let cap = baseTradeMasteryTier;

		// Add elevation from spent points (if any)
		const spentElevation = tradeLimitElevations[tradeId];
		if (spentElevation?.source === 'spent_points') {
			cap += spentElevation.value;
		}

		// Add elevation from features (if any) - only 1 bonus per trade
		const featureElevation = tradeMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(tradeId)
		);
		if (featureElevation) {
			cap += featureElevation.value;
		}

		// Cap at Grandmaster (5)
		return Math.min(cap, 5);
	};

	// Tally the total budget of exceptions from features
	let totalSkillCapExceptionsBudget = 0;
	for (const effect of skillMasteryCapEffects) {
		totalSkillCapExceptionsBudget += effect.count;
	}

	let totalTradeCapExceptionsBudget = 0;
	for (const effect of tradeMasteryCapEffects) {
		totalTradeCapExceptionsBudget += effect.count;
	}

	// Validate each skill's mastery level against its effective cap
	if (buildData.skillsData) {
		for (const [skillId, masteryLevel] of Object.entries(buildData.skillsData)) {
			if (!masteryLevel) continue;

			const masteryTier = getMasteryTierFromPoints(masteryLevel);
			const effectiveCap = getEffectiveSkillCap(skillId);

			if (masteryTier > effectiveCap) {
				errors.push({
					step: BuildStep.Background,
					field: skillId,
					code: 'MASTERY_CAP_EXCEEDED',
					message: `${skillId} mastery (${masteryTier}) exceeds its cap (${effectiveCap}). Your baseline cap is ${baseSkillMasteryTier}. Spend points to elevate the limit or gain a feature that grants this.`
				});
			}

			// Check if skill exceeds baseline but has no elevation source
			if (masteryTier > baseSkillMasteryTier) {
				const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
				const hasFeatureElevation = skillMasteryCapEffects.some(
					(effect) => !effect.options || effect.options.includes(skillId)
				);

				if (!hasSpentElevation && !hasFeatureElevation) {
					errors.push({
						step: BuildStep.Background,
						field: skillId,
						code: 'INVALID_MASTERY_GRANT',
						message: `${skillId} exceeds baseline cap but has no elevation. You must either spend points to elevate the limit or have a feature that grants this.`
					});
				}
			}
		}
	}

	// Count how many skills use feature elevations (not spent points)
	const skillsUsingFeatureElevation = Object.entries(buildData.skillsData ?? {}).filter(
		([skillId, level]) => {
			if (!level || getMasteryTierFromPoints(level) <= baseSkillMasteryTier) return false;
			const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
			return !hasSpentElevation; // Uses feature elevation
		}
	).length;

	if (skillsUsingFeatureElevation > totalSkillCapExceptionsBudget) {
		errors.push({
			step: BuildStep.Background,
			field: 'skills',
			code: 'MASTERY_CAP_EXCEEDED',
			message: `${skillsUsingFeatureElevation} skills rely on feature mastery grants, but only ${totalSkillCapExceptionsBudget} grants available from features.`
		});
	}

	// Same validation for trades
	if (buildData.tradesData) {
		for (const [tradeId, masteryLevel] of Object.entries(buildData.tradesData)) {
			if (!masteryLevel) continue;

			const masteryTier = getMasteryTierFromPoints(masteryLevel);
			const effectiveCap = getEffectiveTradeCap(tradeId);

			if (masteryTier > effectiveCap) {
				errors.push({
					step: BuildStep.Background,
					field: tradeId,
					code: 'MASTERY_CAP_EXCEEDED',
					message: `${tradeId} mastery (${masteryTier}) exceeds its cap (${effectiveCap}). Your baseline cap is ${baseTradeMasteryTier}. Spend points to elevate the limit or gain a feature that grants this.`
				});
			}

			// Check if trade exceeds baseline but has no elevation source
			if (masteryTier > baseTradeMasteryTier) {
				const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
				const hasFeatureElevation = tradeMasteryCapEffects.some(
					(effect) => !effect.options || effect.options.includes(tradeId)
				);

				if (!hasSpentElevation && !hasFeatureElevation) {
					errors.push({
						step: BuildStep.Background,
						field: tradeId,
						code: 'INVALID_MASTERY_GRANT',
						message: `${tradeId} exceeds baseline cap but has no elevation. You must either spend points to elevate the limit or have a feature that grants this.`
					});
				}
			}
		}
	}

	const tradesUsingFeatureElevation = Object.entries(buildData.tradesData ?? {}).filter(
		([tradeId, level]) => {
			if (!level || getMasteryTierFromPoints(level) <= baseTradeMasteryTier) return false;
			const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
			return !hasSpentElevation; // Uses feature elevation
		}
	).length;

	if (tradesUsingFeatureElevation > totalTradeCapExceptionsBudget) {
		errors.push({
			step: BuildStep.Background,
			field: 'trades',
			code: 'MASTERY_CAP_EXCEEDED',
			message: `${tradesUsingFeatureElevation} trades rely on feature mastery grants, but only ${totalTradeCapExceptionsBudget} grants available from features.`
		});
	}

	// DC20 Rule: "A Skill can only benefit from 1 bonus to its Skill Mastery Limit at a time."
	// Validate that no skill has both spent points elevation AND feature elevation
	if (buildData.skillsData) {
		for (const skillId of Object.keys(buildData.skillsData)) {
			const hasSpentElevation = skillLimitElevations[skillId]?.source === 'spent_points';
			const hasFeatureElevation = skillMasteryCapEffects.some(
				(effect) => !effect.options || effect.options.includes(skillId)
			);

			if (hasSpentElevation && hasFeatureElevation) {
				errors.push({
					step: BuildStep.Background,
					field: skillId,
					code: 'DUPLICATE_MASTERY_ELEVATION',
					message: `${skillId} cannot have both a point-based and feature-based mastery limit increase. A skill can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}

	// Same for trades
	if (buildData.tradesData) {
		for (const tradeId of Object.keys(buildData.tradesData)) {
			const hasSpentElevation = tradeLimitElevations[tradeId]?.source === 'spent_points';
			const hasFeatureElevation = tradeMasteryCapEffects.some(
				(effect) => !effect.options || effect.options.includes(tradeId)
			);

			if (hasSpentElevation && hasFeatureElevation) {
				errors.push({
					step: BuildStep.Background,
					field: tradeId,
					code: 'DUPLICATE_MASTERY_ELEVATION',
					message: `${tradeId} cannot have both a point-based and feature-based mastery limit increase. A trade can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}

	// For UI: levelAllowsUnlimitedMastery means baseline >= Adept, so no special tracking needed
	const levelAllowsUnlimitedMastery = baseSkillMasteryTier >= 2;
	// --- END MASTERY CAP CALCULATION ---

	// Calculate mastery limits in correct interface format
	const currentSkillAdeptCount = buildData.skillsData
		? Object.values(buildData.skillsData).filter((points) => points >= 2).length
		: 0;
	const currentTradeAdeptCount = buildData.tradesData
		? Object.values(buildData.tradesData).filter((points) => points >= 2).length
		: 0;
	const totalCurrentAdeptCount = currentSkillAdeptCount + currentTradeAdeptCount;

	// Calculate mastery limits for UI display
	// If level naturally allows tier 2+, all tiers up to cap are unlimited (like Novice at level 1)
	// Only use slot system for levels below the natural cap (levels 1-4 trying to reach Adept)
	let maxAdeptCount: number;
	let canSelectAdept: boolean;

	if (levelAllowsUnlimitedMastery) {
		// Level 5+: All tiers up to natural cap are unlimited
		maxAdeptCount = 999; // Effectively unlimited for UI
		canSelectAdept = true; // Always can select up to natural cap
	} else {
		// Level 1-4: Players can exceed baseline by:
		// 1. Spending points (1 point to elevate limit + 1 point for level)
		// 2. Having a feature that grants mastery cap increase
		// DC20 Rule: No free slots - must pay or have feature
		const bonusAdeptSlots = skillMasteryCapEffects.reduce(
			(total, effect) => total + effect.count,
			0
		);
		// Feature slots + unlimited paid elevations (but paid costs skill points)
		// For UI purposes, show feature slots as the "free" cap, since spending points is always available
		maxAdeptCount = bonusAdeptSlots;
		// Can always select Adept if willing to pay the point cost
		canSelectAdept = true;
	}

	// Max mastery tier for UI dropdowns
	const maxSkillMastery = baseSkillMasteryTier;
	const maxTradeMastery = baseTradeMasteryTier;

	// --- START SPELL SLOT VALIDATION (M3.20) ---
	if (buildData.selectedSpells) {
		Object.entries(buildData.selectedSpells).forEach(([slotId, spellId]) => {
			const slot = spellsKnownSlots.find((s) => s.id === slotId);
			const spell = getSpellById(spellId);

			if (!slot) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: 'selectedSpells',
					code: 'INVALID_SLOT',
					message: `Selected spell is assigned to a non-existent slot: ${slotId}`
				});
				return;
			}

			if (!spell) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: slotId,
					code: 'INVALID_SPELL',
					message: `Slot ${slot.sourceName} has an invalid spell assigned.`
				});
				return;
			}

			// Validate slot-specific restrictions
			if (slot.specificRestrictions) {
				const { schools, tags } = slot.specificRestrictions;

				if (schools && schools.length > 0) {
					if (!schools.includes(spell.school)) {
						errors.push({
							step: BuildStep.SpellsAndManeuvers,
							field: slotId,
							code: 'SCHOOL_RESTRICTION',
							message: `${spell.name} (${spell.school}) does not match allowed schools for ${slot.sourceName}: ${schools.join(', ')}`
						});
					}
				}

				if (tags && tags.length > 0) {
					const hasValidTag = tags.some((tag: any) => spell.tags?.includes(tag));
					if (!hasValidTag) {
						errors.push({
							step: BuildStep.SpellsAndManeuvers,
							field: slotId,
							code: 'TAG_RESTRICTION',
							message: `${spell.name} does not have any required tags for ${slot.sourceName}: ${tags.join(', ')}`
						});
					}
				}
			}

			// Validate global magic profile (if not already covered by specific restrictions)
			if (slot.isGlobal && globalMagicProfile) {
				const { sources, schools, tags } = globalMagicProfile;

				const matchesSource = sources.some((src: any) => spell.sources.includes(src));
				const matchesSchool = schools.length === 0 || schools.includes(spell.school);
				const matchesTags = tags.length === 0 || tags.some((tag: any) => spell.tags?.includes(tag));

				if (!matchesSource || !matchesSchool || !matchesTags) {
					errors.push({
						step: BuildStep.SpellsAndManeuvers,
						field: slotId,
						code: 'PROFILE_MISMATCH',
						message: `${spell.name} does not match your character's Global Magic Profile.`
					});
				}
			}
		});
	}
	// --- END SPELL SLOT VALIDATION ---

	// Build per-skill/trade effective caps for UI
	const skillEffectiveCaps: Record<string, number> = {};
	const tradeEffectiveCaps: Record<string, number> = {};

	// Calculate effective cap for all skills in the character's data
	if (buildData.skillsData) {
		for (const skillId of Object.keys(buildData.skillsData)) {
			skillEffectiveCaps[skillId] = getEffectiveSkillCap(skillId);
		}
	}

	// Calculate effective cap for all trades in the character's data
	if (buildData.tradesData) {
		for (const tradeId of Object.keys(buildData.tradesData)) {
			tradeEffectiveCaps[tradeId] = getEffectiveTradeCap(tradeId);
		}
	}

	const validation: ValidationResult = {
		isValid: errors.length === 0 && !Object.values(attributeLimits).some((limit) => limit.exceeded),
		errors,
		warnings: [],
		attributeLimits,
		masteryLimits: {
			maxSkillMastery,
			maxTradeMastery,
			currentAdeptCount: totalCurrentAdeptCount,
			maxAdeptCount,
			canSelectAdept,
			// New fields for DC20 0.10 mastery cap system
			baselineSkillCap: baseSkillMasteryTier,
			baselineTradeCap: baseTradeMasteryTier,
			skillEffectiveCaps,
			tradeEffectiveCaps,
			skillLimitElevations: skillLimitElevations,
			tradeLimitElevations: tradeLimitElevations,
			skillFeatureElevationsAvailable: totalSkillCapExceptionsBudget,
			tradeFeatureElevationsAvailable: totalTradeCapExceptionsBudget
		}
	};

	// 6. Collect abilities, movements, and conditional modifiers (via abilityCollection module)
	const grantedAbilities = collectGrantedAbilities(resolvedEffects);
	const movements = collectMovements(resolvedEffects, finalMoveSpeed);
	const conditionalModifiers = collectConditionalModifiers(resolvedEffects);

	// 8. Get unresolved choices
	const unresolvedChoices = getUnresolvedChoices(resolvedEffects);

	return {
		stats: {
			finalMight,
			finalAgility,
			finalCharisma,
			finalIntelligence,
			finalHPMax,
			finalSPMax,
			finalMPMax,
			finalPD,
			finalAD,
			finalPDR,
			finalMoveSpeed,
			finalJumpDistance,
			finalDeathThreshold,
			finalSaveDC,
			finalSaveMight,
			finalSaveAgility,
			finalSaveCharisma,
			finalSaveIntelligence,
			finalInitiativeBonus,
			finalRestPoints,
			finalGritPoints,

			// Prime modifier and combat mastery (needed for UI compatibility)
			finalPrimeModifierValue: primeModifier,
			finalPrimeModifierAttribute: primeAttribute,
			usePrimeCapRule,
			finalCombatMastery: combatMastery,
			finalAttributePoints,

			// Resource spend limits (both equal Combat Mastery per v0.10 rules)
			manaSpendLimit: combatMastery,
			staminaSpendLimit: combatMastery,

			// Combat stats with breakdowns
			finalAttackSpellCheck: attackSpellCheckBase,
			finalMartialCheck: finalMartialCheck,

			// Class and ancestry info for UI
			className: getClassFeatures(buildData.classId)?.className || 'Unknown',
			ancestry1Name: ancestriesData.find((a) => a.id === buildData.ancestry1Id)?.name,
			ancestry2Name: ancestriesData.find((a) => a.id === buildData.ancestry2Id)?.name
		},
		breakdowns,
		grantedAbilities,
		conditionalModifiers,
		combatTraining: [],
		resistances: [],
		vulnerabilities: [],
		senses: [],
		movements,
		background,
		ancestry,
		levelBudgets: {
			totalTalents: progressionGains.totalTalents,
			totalPathPoints: progressionGains.totalPathPoints,
			totalAncestryPoints: progressionGains.totalAncestryPoints,
			totalSkillPoints: progressionGains.totalSkillPoints,
			totalTradePoints: progressionGains.totalTradePoints,
			totalAttributePoints: progressionGains.totalAttributePoints,
			// Include MODIFY_STAT bonuses and GRANT_MANEUVERS effects (C1, C3)
			totalManeuversKnown:
				progressionGains.totalManeuversKnown + maneuverBonus + grantedManeuversCount,
			totalCantripsKnown: progressionGains.totalCantripsKnown,
			// Include MODIFY_STAT bonuses for spells (C2)
			totalSpellsKnown: progressionGains.totalSpellsKnown + spellBonus,
			unlockedFeatureIds: progressionGains.unlockedFeatureIds,
			pendingSubclassChoices: progressionGains.pendingSubclassChoices
		},
		// Cross-path grants (DC20 v0.10 p.161)
		crossPathGrants: progressionGains.crossPathGrants,
		// Auto-granted Flavor Features (DC20 v0.10 p.161)
		autoGrantedFlavorFeatures: (() => {
			const flavorFeatures: Array<{ featureId: string; featureName: string; classId: string }> = [];

			// Build multiclass features array from current selection
			const multiclassFeatures: Array<{ classId: string; featureId: string }> = [];
			if (buildData.selectedMulticlassFeature && buildData.selectedMulticlassClass) {
				multiclassFeatures.push({
					classId: buildData.selectedMulticlassClass,
					featureId: buildData.selectedMulticlassFeature
				});
			}

			// Check main class for flavor feature auto-grant
			if (buildData.classId) {
				const mainClassFlavor = checkFlavorFeatureAutoGrant(
					buildData.classId,
					progressionGains.unlockedFeatureIds,
					multiclassFeatures
				);
				if (mainClassFlavor) {
					flavorFeatures.push(mainClassFlavor);
				}
			}

			// Check multiclass class for flavor feature auto-grant (if applicable)
			if (
				buildData.selectedMulticlassClass &&
				buildData.selectedMulticlassClass !== buildData.classId
			) {
				const multiclassFlavor = checkFlavorFeatureAutoGrant(
					buildData.selectedMulticlassClass,
					[], // No unlocked features from multiclass class progression
					multiclassFeatures
				);
				if (multiclassFlavor) {
					flavorFeatures.push(multiclassFlavor);
				}
			}

			return flavorFeatures.length > 0 ? flavorFeatures : undefined;
		})(),
		resolvedFeatures: resolvedProgression
			? {
					unlockedFeatures: resolvedProgression.unlockedFeatures,
					pendingFeatureChoices: resolvedProgression.pendingFeatureChoices,
					availableSubclassChoice: resolvedProgression.availableSubclassChoice,
					subclassChoiceLevel: resolvedProgression.subclassChoiceLevel
				}
			: {
					unlockedFeatures: [],
					pendingFeatureChoices: [],
					availableSubclassChoice: false,
					subclassChoiceLevel: undefined
				},

		// --- Spell System (M3.20) ---
		globalMagicProfile,
		spellsKnownSlots,

		validation,
		unresolvedChoices,
		cacheTimestamp: Date.now(),
		isFromCache: false
	};
}

