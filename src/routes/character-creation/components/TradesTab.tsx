import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
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

const allTradesAndKnowledge = tradesData;

const ATTRIBUTE_LABELS: Record<'might' | 'agility' | 'charisma' | 'intelligence', string> = {
	might: 'Might',
	agility: 'Agility',
	charisma: 'Charisma',
	intelligence: 'Intelligence'
};

interface TradesTabProps {
	currentTrades: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	masteryLimits: MasteryLimits;
	onTradeChange: (tradeId: string, newLevel: number) => void;
	onTradeLimitElevationChange?: (
		elevations: Record<string, { source: 'spent_points'; value: number }>
	) => void;
}

const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	pointsData,
	conversions,
	actions,
	masteryLimits,
	onTradeChange,
	onTradeLimitElevationChange
}) => {
	// Get effective cap for a trade (baseline + any elevations)
	const getEffectiveCap = (tradeId: string): number => {
		return masteryLimits.tradeEffectiveCaps?.[tradeId] ?? masteryLimits.baselineTradeCap;
	};

	// Check if trade has elevation from spent points
	const hasSpentPointsElevation = (tradeId: string): boolean => {
		return masteryLimits.tradeLimitElevations?.[tradeId]?.source === 'spent_points';
	};

	// Check if trade can have limit elevated (not already elevated, and can afford)
	const canElevateLimitWithPoints = (tradeId: string): boolean => {
		if (hasSpentPointsElevation(tradeId)) return false;
		const pointsRemaining = pointsData.availableTradePoints - pointsData.tradePointsUsed;
		return pointsRemaining >= 1;
	};

	// Calculate point cost for a mastery level change
	const calculatePointCost = (tradeId: string, targetLevel: number): number => {
		const currentLevel = currentTrades[tradeId] || 0;
		const baselineCap = masteryLimits.baselineTradeCap;
		const hasElevation = hasSpentPointsElevation(tradeId);

		// If going to level 0, refund all points including any elevation
		if (targetLevel === 0) {
			let refund = currentLevel;
			if (hasElevation) {
				refund += masteryLimits.tradeLimitElevations[tradeId].value;
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

	const canSelectMastery = (tradeId: string, targetLevel: number): boolean => {
		const effectiveCap = getEffectiveCap(tradeId);

		// Can always select 0 (untrained)
		if (targetLevel === 0) return true;

		// Check if target exceeds effective cap
		if (targetLevel > effectiveCap) {
			// Can only exceed baseline by 1 tier via spent points
			if (targetLevel > masteryLimits.baselineTradeCap + 1) {
				return false;
			}
			// Must be able to afford elevation + level
			if (!canElevateLimitWithPoints(tradeId)) {
				return false;
			}
		}

		const pointCost = calculatePointCost(tradeId, targetLevel);
		const pointsRemaining = pointsData.availableTradePoints - pointsData.tradePointsUsed;

		return pointsRemaining >= pointCost;
	};

	// Handle trade change with automatic elevation
	const handleTradeChange = (tradeId: string, targetLevel: number) => {
		const baselineCap = masteryLimits.baselineTradeCap;
		const hasElevation = hasSpentPointsElevation(tradeId);

		// If increasing above baseline and no elevation, add one
		if (targetLevel > baselineCap && !hasElevation && onTradeLimitElevationChange) {
			const newElevations = {
				...(masteryLimits.tradeLimitElevations || {}),
				[tradeId]: { source: 'spent_points' as const, value: 1 }
			};
			onTradeLimitElevationChange(newElevations);
		}

		// If decreasing to baseline or below and has elevation, remove it
		if (targetLevel <= baselineCap && hasElevation && onTradeLimitElevationChange) {
			const newElevations = { ...(masteryLimits.tradeLimitElevations || {}) };
			delete newElevations[tradeId];
			onTradeLimitElevationChange(newElevations);
		}

		onTradeChange(tradeId, targetLevel);
	};

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	const tradePointsRemaining = pointsData.availableTradePoints - pointsData.tradePointsUsed;
	const canConvertTradeToSkill = tradePointsRemaining >= 2;
	const canConvertTradeToLanguage = tradePointsRemaining >= 1;

	return (
		<div className="mx-auto">
			{/* Mastery Limits Info */}
			<div className="bg-muted/30 border-border mb-4 rounded-md border p-3 text-sm">
				<strong>Mastery Limits:</strong> Baseline cap: {masteryLimits.baselineTradeCap} (
				{MASTERY_TIERS[masteryLimits.baselineTradeCap]?.name})
				<div className="text-muted-foreground mt-1">
					You can exceed the baseline cap by spending 1 extra trade point to elevate a trade's
					limit. Each trade can only have 1 limit elevation (from points OR features).
				</div>
				{masteryLimits.tradeFeatureElevationsAvailable > 0 && (
					<div className="text-primary mt-1">
						Feature mastery grants available: {masteryLimits.tradeFeatureElevationsAvailable}
					</div>
				)}
			</div>

			{/* Points Remaining */}
			<div className="text-destructive mb-6 text-center text-lg font-bold">
				Trade Points: {tradePointsRemaining} / {pointsData.availableTradePoints} remaining
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
						onClick={actions.convertTradeToSkill}
						disabled={!canConvertTradeToSkill}
						className="border-white/50 bg-transparent"
					>
						Convert 2 Trade → 1 Skill Point
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={actions.convertTradeToLanguage}
						disabled={!canConvertTradeToLanguage}
						className="border-white/50 bg-transparent"
					>
						Convert 1 Trade → 2 Language Points
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
				{allTradesAndKnowledge.map((trade) => {
					const currentLevel = currentTrades[trade.id] || 0;
					const effectiveCap = getEffectiveCap(trade.id);
					const hasElevation = hasSpentPointsElevation(trade.id);
					const masteryInfo = getMasteryInfo(currentLevel, effectiveCap);
					const associations = trade.attributeAssociations.length
						? trade.attributeAssociations
						: [trade.primaryAttribute];
					const attributeList = associations
						.map((attribute) => ATTRIBUTE_LABELS[attribute])
						.join('/');

					return (
						<div
							key={trade.id}
							data-testid={`trade-item-${trade.id}`}
							className={cn(
								'hover:border-primary rounded-lg border bg-transparent p-4 transition-colors',
								hasElevation ? 'border-yellow-500/50' : 'border-white/50'
							)}
						>
							<div className="mb-2 flex items-center justify-between">
								<h4 className="text-primary text-lg font-semibold tracking-wide uppercase">
									{trade.name}
								</h4>
								<span className="text-muted-foreground text-xs">
									{masteryInfo.name} (+{masteryInfo.bonus}) • {attributeList}
								</span>
							</div>
							{hasElevation && (
								<div className="mb-2 text-xs text-yellow-500">
									⬆ Limit elevated (cap: {effectiveCap})
								</div>
							)}
							<p className="text-muted-foreground mb-2 text-sm">{trade.description}</p>
							{(trade as any).tools && (
								<p className="text-primary mb-2 text-sm italic">Tools: {(trade as any).tools}</p>
							)}
							<div className="flex flex-wrap gap-2">
								{[0, 1, 2, 3, 4, 5].map((level) => {
									const masteryDisplay = getMasteryInfo(level, 5);
									const canSelect = canSelectMastery(trade.id, level);
									const isActive = currentLevel === level;
									const isDisabled = !canSelect && !isActive;
									const exceedsBaseline = level > masteryLimits.baselineTradeCap;
									const needsElevation = exceedsBaseline && !hasElevation;
									const pointCost = calculatePointCost(trade.id, level);

									return (
										<button
											key={level}
											title={`${masteryDisplay.name} (+${masteryDisplay.bonus})${needsElevation ? ' - requires limit elevation (+1 point)' : ''}${pointCost > 0 ? ` - costs ${pointCost} points` : ''}`}
											onClick={() => {
												if (canSelect || isActive) {
													handleTradeChange(trade.id, level);
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

export default TradesTab;
