import React from 'react';
import { skillsData } from '../../../lib/rulesdata/skills';
import { MASTERY_TIERS } from '../../../lib/rulesdata/progression/levelCaps';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import type { MasteryLimitElevation } from '../../../lib/types/effectSystem';

interface BackgroundPointsData {
	skillPointsUsed: number;
	tradePointsUsed: number;
	languagePointsUsed: number;
	baseSkillPoints: number;
	baseTradePoints: number;
	baseLanguagePoints: number;
	availableSkillPoints: number;
	availableTradePoints: number;
	availableLanguagePoints: number;
}

interface PointConversions {
	skillToTradeConversions: number;
	tradeToSkillConversions: number;
	tradeToLanguageConversions: number;
}

interface ConversionActions {
	convertSkillToTrade: () => void;
	convertTradeToSkill: () => void;
	convertTradeToLanguage: () => void;
	resetConversions: () => void;
}

interface MasteryLimits {
	maxSkillMastery: number;
	maxTradeMastery: number;
	currentAdeptCount: number;
	maxAdeptCount: number;
	canSelectAdept: boolean;
	// DC20 0.10 mastery cap system fields
	baselineSkillCap: number;
	baselineTradeCap: number;
	skillEffectiveCaps: Record<string, number>;
	tradeEffectiveCaps: Record<string, number>;
	skillLimitElevations: Record<string, MasteryLimitElevation>;
	tradeLimitElevations: Record<string, MasteryLimitElevation>;
	skillFeatureElevationsAvailable: number;
	tradeFeatureElevationsAvailable: number;
}

interface MasteryInfo {
	level: number;
	name: string;
	bonus: number;
	available: boolean;
}

const getMasteryInfo = (level: number, maxMastery: number): MasteryInfo => {
	const masteryData = MASTERY_TIERS[level] || MASTERY_TIERS[0];
	return {
		level,
		name: masteryData.name,
		bonus: masteryData.bonus,
		available: level <= maxMastery
	};
};

interface SkillsTabProps {
	currentSkills: Record<string, number>;
	currentTrades: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	masteryLimits: MasteryLimits;
	onSkillChange: (skillId: string, newLevel: number) => void;
	onSkillLimitElevationChange?: (
		elevations: Record<string, { source: 'spent_points'; value: number }>
	) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
	currentSkills,
	pointsData,
	conversions,
	actions,
	masteryLimits,
	onSkillChange,
	onSkillLimitElevationChange
}) => {
	// Get effective cap for a skill (baseline + any elevations)
	const getEffectiveCap = (skillId: string): number => {
		return masteryLimits.skillEffectiveCaps?.[skillId] ?? masteryLimits.baselineSkillCap;
	};

	// Check if skill has elevation from spent points
	const hasSpentPointsElevation = (skillId: string): boolean => {
		return masteryLimits.skillLimitElevations?.[skillId]?.source === 'spent_points';
	};

	// Check if skill can have limit elevated (not already elevated, and can afford)
	const canElevateLimitWithPoints = (skillId: string): boolean => {
		if (hasSpentPointsElevation(skillId)) return false;
		// Check if there's a feature elevation available (can't stack)
		// For now, assume no feature elevation - validation will catch conflicts
		const pointsRemaining = pointsData.availableSkillPoints - pointsData.skillPointsUsed;
		return pointsRemaining >= 1;
	};

	// Calculate point cost for a mastery level change
	const calculatePointCost = (skillId: string, targetLevel: number): number => {
		const currentLevel = currentSkills[skillId] || 0;
		const baselineCap = masteryLimits.baselineSkillCap;
		const hasElevation = hasSpentPointsElevation(skillId);

		// If going to level 0, refund all points including any elevation
		if (targetLevel === 0) {
			let refund = currentLevel;
			if (hasElevation) {
				refund += masteryLimits.skillLimitElevations[skillId].value;
			}
			return -refund;
		}

		// If increasing and target exceeds baseline cap
		if (targetLevel > baselineCap && !hasElevation) {
			// Need to pay for elevation (+1) plus the level increase
			const elevationCost = 1;
			const levelCost = targetLevel - currentLevel;
			return elevationCost + levelCost;
		}

		// Simple level change
		return targetLevel - currentLevel;
	};

	const canSelectMastery = (skillId: string, targetLevel: number): boolean => {
		const effectiveCap = getEffectiveCap(skillId);

		// Can always select 0 (untrained)
		if (targetLevel === 0) return true;

		// Check if target exceeds effective cap
		// But allow selecting if we can afford to elevate the limit
		if (targetLevel > effectiveCap) {
			// Can only exceed baseline by 1 tier via spent points
			if (targetLevel > masteryLimits.baselineSkillCap + 1) {
				return false;
			}
			// Must be able to afford elevation + level
			if (!canElevateLimitWithPoints(skillId)) {
				return false;
			}
		}

		const pointCost = calculatePointCost(skillId, targetLevel);
		const pointsRemaining = pointsData.availableSkillPoints - pointsData.skillPointsUsed;

		return pointsRemaining >= pointCost;
	};

	// Handle skill change with automatic elevation
	const handleSkillChange = (skillId: string, targetLevel: number) => {
		const currentLevel = currentSkills[skillId] || 0;
		const baselineCap = masteryLimits.baselineSkillCap;
		const hasElevation = hasSpentPointsElevation(skillId);

		// If increasing above baseline and no elevation, add one
		if (targetLevel > baselineCap && !hasElevation && onSkillLimitElevationChange) {
			const newElevations = {
				...(masteryLimits.skillLimitElevations || {}),
				[skillId]: { source: 'spent_points' as const, value: 1 }
			};
			onSkillLimitElevationChange(newElevations);
		}

		// If decreasing to baseline or below and has elevation, remove it
		if (targetLevel <= baselineCap && hasElevation && onSkillLimitElevationChange) {
			const newElevations = { ...(masteryLimits.skillLimitElevations || {}) };
			delete newElevations[skillId];
			onSkillLimitElevationChange(newElevations);
		}

		onSkillChange(skillId, targetLevel);
	};

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	const skillPointsRemaining = pointsData.availableSkillPoints - pointsData.skillPointsUsed;
	const canConvertSkillToTrade = skillPointsRemaining >= 1;

	return (
		<div className="mx-auto">
			{/* Mastery Limits Info */}
			<div className="bg-muted/30 border-border mb-4 rounded-md border p-3 text-sm">
				<strong>Mastery Limits:</strong> Baseline cap: {masteryLimits.baselineSkillCap} (
				{MASTERY_TIERS[masteryLimits.baselineSkillCap]?.name})
				<div className="text-muted-foreground mt-1">
					You can exceed the baseline cap by spending 1 extra skill point to elevate a skill's
					limit. Each skill can only have 1 limit elevation (from points OR features).
				</div>
				{masteryLimits.skillFeatureElevationsAvailable > 0 && (
					<div className="text-primary mt-1">
						Feature mastery grants available: {masteryLimits.skillFeatureElevationsAvailable}
					</div>
				)}
			</div>

			{/* Points Remaining */}
			<div
				className="text-destructive mb-6 text-center text-lg font-bold"
				data-testid="skill-points-remaining"
			>
				Skill Points: {skillPointsRemaining} / {pointsData.availableSkillPoints} remaining
				{hasConversions && (
					<div className="bg-primary/10 border-primary/20 text-primary mt-2 rounded border px-2 py-1 text-sm">
						Active conversions:{' '}
						{conversions.skillToTradeConversions > 0
							? `${conversions.skillToTradeConversions} skill → ${conversions.skillToTradeConversions * 2} trade`
							: ''}
						{conversions.skillToTradeConversions > 0 &&
						(conversions.tradeToSkillConversions > 0 || conversions.tradeToLanguageConversions > 0)
							? ', '
							: ''}
						{conversions.tradeToSkillConversions > 0
							? `${conversions.tradeToSkillConversions} trade → ${Math.floor(conversions.tradeToSkillConversions / 2)} skill`
							: ''}
						{conversions.tradeToSkillConversions > 0 && conversions.tradeToLanguageConversions > 0
							? ', '
							: ''}
						{conversions.tradeToLanguageConversions > 0
							? `${conversions.tradeToLanguageConversions} trade → ${conversions.tradeToLanguageConversions * 2} language`
							: ''}
					</div>
				)}
				<div className="mt-3 flex flex-wrap justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={actions.convertSkillToTrade}
						disabled={!canConvertSkillToTrade}
						className="border-white/50 bg-transparent"
					>
						Convert 1 Skill → 2 Trade Points
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						className={cn(
							'border-white/50 bg-transparent',
							hasConversions && 'hover:border-destructive hover:text-destructive'
						)}
					>
						Reset Conversions
					</Button>
				</div>
			</div>

			{/* Selection Grid */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{skillsData.map((skill) => {
					const currentLevel = currentSkills[skill.id] || 0;
					const effectiveCap = getEffectiveCap(skill.id);
					const hasElevation = hasSpentPointsElevation(skill.id);
					const masteryInfo = getMasteryInfo(currentLevel, effectiveCap);

					return (
						<div
							key={skill.id}
							data-testid={`skill-item-${skill.id}`}
							className={cn(
								'hover:border-primary rounded-lg border bg-transparent p-4 transition-colors',
								hasElevation ? 'border-yellow-500/50' : 'border-white/50'
							)}
						>
							<div className="mb-2 flex items-center justify-between">
								<h4 className="text-primary text-lg font-semibold tracking-wide uppercase">
									{skill.name}
								</h4>
								<span className="text-muted-foreground text-xs">
									{masteryInfo.name} (+{masteryInfo.bonus}) • {skill.attributeAssociation}
								</span>
							</div>
							{hasElevation && (
								<div className="mb-2 text-xs text-yellow-500">
									⬆ Limit elevated (cap: {effectiveCap})
								</div>
							)}
							<p className="text-muted-foreground mb-3 text-sm">{skill.description}</p>
							<div className="flex flex-wrap gap-2">
								{[0, 1, 2, 3, 4, 5].map((level) => {
									const masteryDisplay = getMasteryInfo(level, 5);
									const canSelect = canSelectMastery(skill.id, level);
									const isActive = currentLevel === level;
									const isDisabled = !canSelect && !isActive;
									const exceedsBaseline = level > masteryLimits.baselineSkillCap;
									const needsElevation = exceedsBaseline && !hasElevation;
									const pointCost = calculatePointCost(skill.id, level);

									return (
										<button
											key={level}
											title={`${masteryDisplay.name} (+${masteryDisplay.bonus})${needsElevation ? ' - requires limit elevation (+1 point)' : ''}${pointCost > 0 ? ` - costs ${pointCost} points` : ''}`}
											onClick={() => {
												if (canSelect || isActive) {
													handleSkillChange(skill.id, level);
												}
											}}
											className={cn(
												'rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
												isActive
													? 'border-primary bg-primary text-primary-foreground'
													: 'text-foreground border-white/50 bg-transparent',
												isDisabled && 'cursor-not-allowed opacity-50',
												!isDisabled && !isActive && 'hover:border-primary',
												needsElevation && canSelect && 'border-yellow-500/50 text-yellow-500'
											)}
										>
											{level}
											{needsElevation && canSelect && <span className="ml-1 text-xs">⬆</span>}
										</button>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SkillsTab;
