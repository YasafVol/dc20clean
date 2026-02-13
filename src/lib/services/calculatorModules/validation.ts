/**
 * Validation Module
 *
 * Validates attribute limits, mastery caps, point budgets, and spell slots.
 * Extracted from the main calculateCharacterWithBreakdowns function.
 */

import type {
	EnhancedCharacterBuildData,
	AttributedEffect,
	ValidationResult,
	ValidationError,
	AttributeLimit,
	SpellsKnownSlot,
	GlobalMagicProfile
} from '../../types/effectSystem';
import {
	type ModifyMasteryCapEffect,
	type IncreaseMasteryCapEffect
} from '../../rulesdata/schemas/character.schema';
import { attributesData } from '../../rulesdata/attributes';
import { getLevelCaps } from '../../rulesdata/progression/levelCaps';
import { getSpellById } from '../../rulesdata/spells-data';
import { BuildStep } from '../../types/effectSystem';

/**
 * Validate attribute limits against level caps
 */
export function validateAttributeLimits(
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
					effect.resolved &&
					(effect as any).type === 'MODIFY_ATTRIBUTE' &&
					(effect as any).target === attr.id
			)
			.reduce((sum, effect) => sum + ((effect as any).value as number), 0);

		const current = baseValue + traitBonuses;
		const max = levelCaps.maxAttributeValue;

		limits[attr.id] = {
			current,
			base: baseValue,
			traitBonuses,
			max,
			exceeded: current > max,
			canIncrease: baseValue + traitBonuses + 1 <= max,
			canDecrease: baseValue > -2
		};
	}

	return limits;
}

export interface ValidationInput {
	buildData: EnhancedCharacterBuildData;
	resolvedEffects: AttributedEffect[];
	skillPointsUsed: number;
	tradePointsUsed: number;
	languagePointsUsed: number;
	availableSkillPoints: number;
	availableTradePoints: number;
	availableLanguagePoints: number;
	baseAncestryPoints: number;
	ancestryPointsUsed: number;
	skillLimitElevations: Record<string, any>;
	tradeLimitElevations: Record<string, any>;
	spellsKnownSlots: SpellsKnownSlot[];
	globalMagicProfile: GlobalMagicProfile;
}

/**
 * Run the full validation pipeline: attribute limits, budget checks,
 * mastery cap validation, and spell slot validation.
 */
export function runValidation(input: ValidationInput): ValidationResult {
	const {
		buildData,
		resolvedEffects,
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints,
		baseAncestryPoints,
		ancestryPointsUsed,
		skillLimitElevations,
		tradeLimitElevations,
		spellsKnownSlots,
		globalMagicProfile
	} = input;

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

	// --- MASTERY CAP VALIDATION ---
	const levelCaps = getLevelCaps(buildData.level);

	const getMasteryTierFromPoints = (points: number): number => {
		if (points >= 5) return 5;
		if (points >= 4) return 4;
		if (points >= 3) return 3;
		if (points >= 2) return 2;
		if (points >= 1) return 1;
		return 0;
	};

	const baseSkillMasteryTier = levelCaps.maxSkillMasteryTier;
	const baseTradeMasteryTier = levelCaps.maxTradeMasteryTier;

	const skillMasteryCapEffects = resolvedEffects.filter(
		(e) =>
			(e as any).type === 'MODIFY_SKILL_MASTERY_CAP' ||
			(e as any).type === 'INCREASE_SKILL_MASTERY_CAP'
	) as unknown as Array<ModifyMasteryCapEffect | IncreaseMasteryCapEffect>;

	const tradeMasteryCapEffects = resolvedEffects.filter(
		(e) =>
			(e as any).type === 'MODIFY_TRADE_MASTERY_CAP' ||
			(e as any).type === 'INCREASE_TRADE_MASTERY_CAP'
	) as unknown as Array<ModifyMasteryCapEffect | IncreaseMasteryCapEffect>;

	// Debug logging
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

	const getEffectiveSkillCap = (skillId: string): number => {
		let cap = baseSkillMasteryTier;
		const spentElevation = skillLimitElevations[skillId];
		if (spentElevation?.source === 'spent_points') cap += spentElevation.value;
		const featureElevation = skillMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(skillId)
		);
		if (featureElevation) cap += (featureElevation as any).value || 1;
		return Math.min(cap, 5);
	};

	const getEffectiveTradeCap = (tradeId: string): number => {
		let cap = baseTradeMasteryTier;
		const spentElevation = tradeLimitElevations[tradeId];
		if (spentElevation?.source === 'spent_points') cap += spentElevation.value;
		const featureElevation = tradeMasteryCapEffects.find(
			(effect) => !effect.options || effect.options.includes(tradeId)
		);
		if (featureElevation) cap += (featureElevation as any).value || 1;
		return Math.min(cap, 5);
	};

	let totalSkillCapExceptionsBudget = 0;
	for (const effect of skillMasteryCapEffects) totalSkillCapExceptionsBudget += effect.count;

	let totalTradeCapExceptionsBudget = 0;
	for (const effect of tradeMasteryCapEffects) totalTradeCapExceptionsBudget += effect.count;

	// Validate skills
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

	const skillsUsingFeatureElevation = Object.entries(buildData.skillsData ?? {}).filter(
		([skillId, level]) => {
			if (!level || getMasteryTierFromPoints(level) <= baseSkillMasteryTier) return false;
			return !(skillLimitElevations[skillId]?.source === 'spent_points');
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

	// Validate trades
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
			return !(tradeLimitElevations[tradeId]?.source === 'spent_points');
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

	// Duplicate elevation check
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
					code: 'DUPLICATE_MASTERY_ELEVATION' as any,
					message: `${skillId} cannot have both a point-based and feature-based mastery limit increase. A skill can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}
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
					code: 'DUPLICATE_MASTERY_ELEVATION' as any,
					message: `${tradeId} cannot have both a point-based and feature-based mastery limit increase. A trade can only benefit from 1 bonus to its Mastery Limit at a time.`
				});
			}
		}
	}

	const levelAllowsUnlimitedMastery = baseSkillMasteryTier >= 2;

	// Mastery limits for UI
	const currentSkillAdeptCount = buildData.skillsData
		? Object.values(buildData.skillsData).filter((points) => points >= 2).length
		: 0;
	const currentTradeAdeptCount = buildData.tradesData
		? Object.values(buildData.tradesData).filter((points) => points >= 2).length
		: 0;
	const totalCurrentAdeptCount = currentSkillAdeptCount + currentTradeAdeptCount;

	let maxAdeptCount: number;
	let canSelectAdept: boolean;

	if (levelAllowsUnlimitedMastery) {
		maxAdeptCount = 999;
		canSelectAdept = true;
	} else {
		const bonusAdeptSlots = skillMasteryCapEffects.reduce(
			(total, effect) => total + effect.count,
			0
		);
		maxAdeptCount = bonusAdeptSlots;
		canSelectAdept = true;
	}

	const maxSkillMastery = baseSkillMasteryTier;
	const maxTradeMastery = baseTradeMasteryTier;

	// --- SPELL SLOT VALIDATION ---
	if (buildData.selectedSpells) {
		Object.entries(buildData.selectedSpells).forEach(([slotId, spellId]) => {
			const slot = spellsKnownSlots.find((s) => s.id === slotId);
			const spell = getSpellById(spellId);

			if (!slot) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: 'selectedSpells',
					code: 'INVALID_SLOT' as any,
					message: `Selected spell is assigned to a non-existent slot: ${slotId}`
				});
				return;
			}

			if (!spell) {
				errors.push({
					step: BuildStep.SpellsAndManeuvers,
					field: slotId,
					code: 'INVALID_SPELL' as any,
					message: `Slot ${slot.sourceName} has an invalid spell assigned.`
				});
				return;
			}

			if (slot.specificRestrictions) {
				const { schools, tags } = slot.specificRestrictions;

				if (schools && schools.length > 0) {
					if (!schools.includes(spell.school)) {
						errors.push({
							step: BuildStep.SpellsAndManeuvers,
							field: slotId,
							code: 'SCHOOL_RESTRICTION' as any,
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
							code: 'TAG_RESTRICTION' as any,
							message: `${spell.name} does not have any required tags for ${slot.sourceName}: ${tags.join(', ')}`
						});
					}
				}
			}

			if (slot.isGlobal && globalMagicProfile) {
				const { sources, schools, tags } = globalMagicProfile;
				const matchesSource = sources.some((src: any) => spell.sources.includes(src));
				const matchesSchool = schools.length === 0 || schools.includes(spell.school);
				const matchesTags =
					tags.length === 0 || tags.some((tag: any) => spell.tags?.includes(tag));

				if (!matchesSource || !matchesSchool || !matchesTags) {
					errors.push({
						step: BuildStep.SpellsAndManeuvers,
						field: slotId,
						code: 'PROFILE_MISMATCH' as any,
						message: `${spell.name} does not match your character's Global Magic Profile.`
					});
				}
			}
		});
	}

	// Build effective caps for UI
	const skillEffectiveCaps: Record<string, number> = {};
	const tradeEffectiveCaps: Record<string, number> = {};
	if (buildData.skillsData) {
		for (const skillId of Object.keys(buildData.skillsData)) {
			skillEffectiveCaps[skillId] = getEffectiveSkillCap(skillId);
		}
	}
	if (buildData.tradesData) {
		for (const tradeId of Object.keys(buildData.tradesData)) {
			tradeEffectiveCaps[tradeId] = getEffectiveTradeCap(tradeId);
		}
	}

	return {
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
			baselineSkillCap: baseSkillMasteryTier,
			baselineTradeCap: baseTradeMasteryTier,
			skillEffectiveCaps,
			tradeEffectiveCaps,
			skillLimitElevations,
			tradeLimitElevations,
			skillFeatureElevationsAvailable: totalSkillCapExceptionsBudget,
			tradeFeatureElevationsAvailable: totalTradeCapExceptionsBudget
		}
	};
}
