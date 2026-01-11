import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
import { MASTERY_TIERS } from '../../../lib/rulesdata/progression/levelCaps';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';

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
}

const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	pointsData,
	conversions,
	actions,
	masteryLimits,
	onTradeChange
}) => {
	const canIncreaseProficiency = (
		pointCost: number,
		pointsUsed: number,
		availablePoints: number
	) => {
		return pointsUsed + pointCost <= availablePoints;
	};

	const canSelectMastery = (tradeId: string, targetLevel: number): boolean => {
		if (targetLevel > masteryLimits.maxTradeMastery) return false;

		if (targetLevel >= 2) {
			const currentLevel = currentTrades[tradeId] || 0;
			const currentlyAdept = currentLevel >= 2;

			if (!currentlyAdept && masteryLimits.currentAdeptCount >= masteryLimits.maxAdeptCount) {
				return false;
			}
		}

		const pointCost = targetLevel - (currentTrades[tradeId] || 0);
		return canIncreaseProficiency(
			pointCost,
			pointsData.tradePointsUsed,
			pointsData.availableTradePoints
		);
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
			{/* Adept Limit Warning */}
			{masteryLimits.currentAdeptCount > masteryLimits.maxAdeptCount && (
				<div className="bg-destructive/10 border-destructive text-destructive mb-4 rounded-lg border p-3">
					⚠️ You have exceeded your Adept limit. Currently: {masteryLimits.currentAdeptCount}/
					{masteryLimits.maxAdeptCount} Adept selections.
				</div>
			)}

			{/* Mastery Limits Info */}
			<div className="bg-muted/30 border-border mb-4 rounded-md border p-3 text-sm">
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxTradeMastery} (
				{MASTERY_TIERS[masteryLimits.maxTradeMastery]?.name})
				{masteryLimits.maxTradeMastery >= 2 && masteryLimits.maxAdeptCount < 999 && (
					<div className="text-primary mt-1">
						Adept slots: {masteryLimits.currentAdeptCount} / {masteryLimits.maxAdeptCount} used
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
					const masteryInfo = getMasteryInfo(currentLevel, masteryLimits.maxTradeMastery);
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
							className="hover:border-primary rounded-lg border border-white/50 bg-transparent p-4 transition-colors"
						>
							<div className="mb-2 flex items-center justify-between">
								<h4 className="text-primary text-lg font-semibold tracking-wide uppercase">
									{trade.name}
								</h4>
								<span className="text-muted-foreground text-xs">
									{masteryInfo.name} (+{masteryInfo.bonus}) • {attributeList}
								</span>
							</div>
							<p className="text-muted-foreground mb-2 text-sm">{trade.description}</p>
							{(trade as any).tools && (
								<p className="text-primary mb-2 text-sm italic">Tools: {(trade as any).tools}</p>
							)}
							<div className="flex flex-wrap gap-2">
								{[0, 1, 2, 3, 4, 5].map((level) => {
									const masteryDisplay = getMasteryInfo(level, masteryLimits.maxTradeMastery);
									const canSelect = canSelectMastery(trade.id, level);
									const isActive = currentLevel === level;
									const isDisabled = !canSelect && !isActive;

									return (
										<button
											key={level}
											title={`${masteryDisplay.name} (+${masteryDisplay.bonus})`}
											onClick={() => {
												if (canSelect || isActive) {
													onTradeChange(trade.id, level);
												}
											}}
											className={cn(
												'rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
												isActive
													? 'border-primary bg-primary text-primary-foreground'
													: 'text-foreground border-white/50 bg-transparent',
												isDisabled && 'cursor-not-allowed opacity-50',
												!isDisabled && !isActive && 'hover:border-primary'
											)}
										>
											{level}
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
