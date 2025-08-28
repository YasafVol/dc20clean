import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
import { knowledgeData } from '../../../lib/rulesdata/knowledge';
// Types moved from deleted BackgroundPointsManager
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
	level1Validation: { valid: boolean; adeptCount: number };
}

interface MasteryInfo {
	level: number;
	name: string;
	bonus: number;
	available: boolean;
}

const MASTERY_TABLE = [
	{ level: 0, name: 'Untrained', bonus: 0 },
	{ level: 1, name: 'Novice', bonus: 2 },
	{ level: 2, name: 'Adept', bonus: 4 },
	{ level: 3, name: 'Expert', bonus: 6 },
	{ level: 4, name: 'Master', bonus: 8 },
	{ level: 5, name: 'Grandmaster', bonus: 10 }
];

const getMasteryInfo = (level: number, maxMastery: number): MasteryInfo => {
	const masteryData = MASTERY_TABLE[level] || MASTERY_TABLE[0];
	return {
		level,
		name: masteryData.name,
		bonus: masteryData.bonus,
		available: level <= maxMastery
	};
};
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencySelector,
	StyledProficiencyButton,
	StyledPointsRemaining,
	StyledActionButton
} from '../styles/Background.styles';

// Combine trades and knowledge for selection
const allTradesAndKnowledge = [...tradesData, ...knowledgeData];

interface TradesTabProps {
	currentTrades: Record<string, number>;
	currentSkills: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	masteryLimits: MasteryLimits;
	onTradeChange: (tradeId: string, newLevel: number) => void;
}

const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	currentSkills,
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

	// Enhanced validation including mastery limits
	const canSelectMastery = (tradeId: string, targetLevel: number): boolean => {
		// Check mastery limit
		if (targetLevel > masteryLimits.maxTradeMastery) return false;
		
		// Check Level 1 special rule for Adept (level 2)
		if (targetLevel === 2) {
			const currentlyAdept = currentTrades[tradeId] === 2;
			if (!currentlyAdept && masteryLimits.level1Validation.adeptCount >= 1) {
				return false; // Already have one Adept skill/trade
			}
		}
		
		// Check point availability
		const pointCost = targetLevel - (currentTrades[tradeId] || 0);
		return canIncreaseProficiency(pointCost, pointsData.tradePointsUsed, pointsData.availableTradePoints);
	};

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			{/* Level 1 Validation Warning */}
			{!masteryLimits.level1Validation.valid && (
				<div style={{
					background: 'transparent',
					border: '1px solid #fecaca',
					color: '#991b1b',
					padding: '0.75rem',
					borderRadius: '0.5rem',
					marginBottom: '1rem'
				}}>
					⚠️ Level 1 characters can only have ONE Adept (level 2) skill or trade total.
					Currently: {masteryLimits.level1Validation.adeptCount} Adept selections.
				</div>
			)}
			
			{/* Mastery Limits Info */}
			<div style={{
				background: 'transparent',
				border: '1px solid white',
				padding: '0.5rem',
				borderRadius: '0.375rem',
				marginBottom: '1rem',
				fontSize: '0.875rem',
				color: 'white'
			}}>
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxTradeMastery} 
				({MASTERY_TABLE[masteryLimits.maxTradeMastery]?.name})
			</div>

			<StyledPointsRemaining>
				Trade Points: {pointsData.availableTradePoints - pointsData.tradePointsUsed} /{' '}
				{pointsData.availableTradePoints} remaining
				{hasConversions && (
					<div
						style={{
							fontSize: '0.9rem',
							color: 'white',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: 'transparent',
							borderRadius: '4px',
							border: '1px solid white'
						}}
					>
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
				<div
					style={{
						marginTop: '0.75rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					<StyledActionButton
						onClick={actions.convertTradeToSkill}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 2}
						$enabled={pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2}
					>
						Convert 2 Trade → 1 Skill Point
					</StyledActionButton>
					<StyledActionButton
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						$enabled={pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1}
					>
						Convert 1 Trade → 2 Language Points
					</StyledActionButton>
					<StyledActionButton
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						$enabled={hasConversions}
					>
						Reset Conversions
					</StyledActionButton>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
							{allTradesAndKnowledge.map((trade) => {
				const currentLevel = currentTrades[trade.id] || 0;
				const masteryInfo = getMasteryInfo(currentLevel, masteryLimits.maxTradeMastery);
				
				return (
					<StyledSelectionItem key={trade.id}>
						<StyledSelectionHeader>
							<StyledSelectionName>{trade.name}</StyledSelectionName>
							<div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
								{masteryInfo.name} (+{masteryInfo.bonus}) • {trade.attributeAssociation}
							</div>
						</StyledSelectionHeader>
						<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
							{trade.description}
						</div>
						{(trade as any).tools && (
							<div
								style={{
									fontSize: '0.8rem',
									color: '#fbbf24',
									marginBottom: '0.5rem',
									fontStyle: 'italic'
								}}
							>
								Tools: {(trade as any).tools}
							</div>
						)}
						<StyledProficiencySelector>
							{[0, 1, 2, 3, 4, 5].map((level) => {
								const masteryDisplay = getMasteryInfo(level, masteryLimits.maxTradeMastery);
								const canSelect = canSelectMastery(trade.id, level);
								
								return (
									<StyledProficiencyButton
										key={level}
										$active={currentLevel === level}
										$disabled={!canSelect && level !== currentLevel}
										title={`${masteryDisplay.name} (+${masteryDisplay.bonus})`}
										onClick={() => {
											if (canSelect || level === currentLevel) {
												onTradeChange(trade.id, level);
											}
										}}
									>
										{level}
									</StyledProficiencyButton>
								);
							})}
						</StyledProficiencySelector>
					</StyledSelectionItem>
				);
			})}
		</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default TradesTab;
