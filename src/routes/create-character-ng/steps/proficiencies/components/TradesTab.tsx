import React from 'react';
import { CollapsibleSection } from '../../../../../design-system/CollapsibleSection/CollapsibleSection';
import { tradesData } from '../../../../../lib/rulesdata/trades';
import {
	getMasteryLevelName,
	getMasteryBonus,
	type MasteryLevel
} from '../../../../../lib/rulesdata/proficiencies';
import {
	StyledMasteryDots,
	StyledMasteryDot,
	StyledInfoBox,
	StyledSkillTitle,
	StyledSkillAttribute,
	StyledSkillDescription,
	StyledSkillRow,
	StyledCollapsibleWrapper
} from './SkillsTab.styles';

interface MasteryLimits {
	maxSkillMastery: number;
	maxTradeMastery: number;
	maxAdeptCount: number;
	currentAdeptCount: number;
	canSelectAdept: boolean;
}

interface TradesTabProps {
	currentTrades: Record<string, number>;
	masteryLimits: MasteryLimits;
	availablePoints: number;
	spentPoints: number;
	onTradeChange: (tradeId: string, newLevel: number) => void;
}

export const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	masteryLimits,
	availablePoints,
	spentPoints,
	onTradeChange
}) => {
	const remainingPoints = availablePoints - spentPoints;

	const canSelectLevel = (tradeId: string, targetLevel: number): boolean => {
		const currentLevel = currentTrades[tradeId] || 0;

		// Can't go above max for this level
		if (targetLevel > masteryLimits.maxTradeMastery) {
			return false;
		}

		// Check Adept+ restriction (level 2+)
		if (targetLevel >= 2 && currentLevel < 2) {
			// Trying to reach Adept+ for first time
			if (!masteryLimits.canSelectAdept) {
				return false;
			}
		}

		// Check if we have enough points
		const costDifference = targetLevel - currentLevel;
		if (costDifference > 0 && remainingPoints < costDifference) {
			return false;
		}

		return true;
	};

	const handleDotClick = (tradeId: string, targetLevel: number) => {
		const currentLevel = currentTrades[tradeId] || 0;

		if (targetLevel === currentLevel) {
			// Clicking same level - decrease to previous
			onTradeChange(tradeId, Math.max(0, currentLevel - 1));
		} else if (canSelectLevel(tradeId, targetLevel)) {
			// Increase to target level
			onTradeChange(tradeId, targetLevel);
		}
	};

	const getMasteryLabel = (level: number): string => {
		if (level === 0) return 'Untrained';
		const name = getMasteryLevelName(level as MasteryLevel);
		const bonus = getMasteryBonus(level as MasteryLevel);
		return `${name} (+${bonus})`;
	};

	const showAdeptWarning = masteryLimits.maxTradeMastery >= 2 && masteryLimits.maxAdeptCount < 999;

	return (
		<div>
			{showAdeptWarning && (
				<StyledInfoBox>
					<strong>Adept Limit:</strong> You can have up to {masteryLimits.maxAdeptCount}{' '}
					skills/trades at Adept level or higher. Currently using: {masteryLimits.currentAdeptCount}{' '}
					/ {masteryLimits.maxAdeptCount}
				</StyledInfoBox>
			)}

			<StyledInfoBox>
				<strong>Trade Points:</strong> {spentPoints} / {availablePoints} spent ({remainingPoints}{' '}
				remaining)
			</StyledInfoBox>

			{tradesData.map((trade) => {
				const currentLevel = currentTrades[trade.id] || 0;

				// Build the mastery dots component (OUTSIDE CollapsibleSection)
				const masteryDots = (
					<StyledMasteryDots>
						{[1, 2, 3, 4, 5].map((level) => {
							const available = canSelectLevel(trade.id, level);
							const filled = currentLevel >= level;

							return (
								<StyledMasteryDot
									key={level}
									$filled={filled}
									$available={available || filled}
									onClick={() => handleDotClick(trade.id, level)}
									disabled={!available && !filled}
									title={getMasteryLabel(level)}
								/>
							);
						})}
					</StyledMasteryDots>
				);

				// Build title with trade name and attribute
				const title = (
					<div>
						<StyledSkillTitle>{trade.name}</StyledSkillTitle>
						<StyledSkillAttribute>{trade.attributeAssociation}</StyledSkillAttribute>
					</div>
				);

				return (
					<StyledSkillRow key={trade.id}>
						<StyledCollapsibleWrapper>
							<CollapsibleSection title={title} defaultExpanded={false}>
								{/* Content shows when expanded - description/details */}
								<StyledSkillDescription>
									{trade.description || `No description available for ${trade.name}`}
								</StyledSkillDescription>
							</CollapsibleSection>
						</StyledCollapsibleWrapper>
						{masteryDots}
					</StyledSkillRow>
				);
			})}
		</div>
	);
};
