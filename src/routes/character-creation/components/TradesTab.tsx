import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
import { MASTERY_TIERS, type MasteryTierDefinition } from '../../../lib/rulesdata/progression/levelCaps';
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
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencySelector,
	StyledProficiencyButton,
	StyledPointsRemaining
} from '../styles/Background.styles';

// Combine trades and knowledge for selection
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

	// Enhanced validation including mastery limits
	const canSelectMastery = (tradeId: string, targetLevel: number): boolean => {
		// Check mastery limit
		if (targetLevel > masteryLimits.maxTradeMastery) return false;

		// Check Adept (level 2+) limits using new mastery cap system
		if (targetLevel >= 2) {
			const currentLevel = currentTrades[tradeId] || 0;
			const currentlyAdept = currentLevel >= 2;

			// If this trade isn't currently Adept and we're at the limit, can't select
			if (!currentlyAdept && masteryLimits.currentAdeptCount >= masteryLimits.maxAdeptCount) {
				return false;
			}
		}

		// Check point availability
		const pointCost = targetLevel - (currentTrades[tradeId] || 0);
		return canIncreaseProficiency(
			pointCost,
			pointsData.tradePointsUsed,
			pointsData.availableTradePoints
		);
	};

	// Helper function for consistent button styling
	const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
		padding: '0.5rem 1rem',
		backgroundColor: enabled ? (variant === 'primary' ? '#3b82f6' : '#ef4444') : '#6b7280',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: '500',
		cursor: enabled ? 'pointer' : 'not-allowed',
		transition: 'all 0.2s ease',
		opacity: enabled ? 1 : 0.6,
		':hover': enabled
			? {
					backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
					transform: 'translateY(-1px)',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
				}
			: {}
	});

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			{/* Adept Limit Warning */}
			{masteryLimits.currentAdeptCount > masteryLimits.maxAdeptCount && (
				<div
					style={{
						background: '#fee2e2',
						border: '1px solid #fecaca',
						color: '#991b1b',
						padding: '0.75rem',
						borderRadius: '0.5rem',
						marginBottom: '1rem'
					}}
				>
					⚠️ You have exceeded your Adept limit. Currently: {masteryLimits.currentAdeptCount}/
					{masteryLimits.maxAdeptCount} Adept selections.
				</div>
			)}

			{/* Mastery Limits Info */}
			<div
				style={{
					background: '#f3f4f6',
					border: '1px solid #d1d5db',
					padding: '0.5rem',
					borderRadius: '0.375rem',
					marginBottom: '1rem',
					fontSize: '0.875rem'
				}}
			>
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxTradeMastery} (
				{MASTERY_TIERS[masteryLimits.maxTradeMastery]?.name})
				{masteryLimits.maxTradeMastery >= 2 && masteryLimits.maxAdeptCount < 999 && (
					<div style={{ marginTop: '0.25rem', color: '#6366f1' }}>
						Adept slots: {masteryLimits.currentAdeptCount} / {masteryLimits.maxAdeptCount} used
					</div>
				)}
			</div>

			<StyledPointsRemaining>
				Trade Points: {pointsData.availableTradePoints - pointsData.tradePointsUsed} /{' '}
				{pointsData.availableTradePoints} remaining
				{hasConversions && (
					<div
						style={{
							fontSize: '0.9rem',
							color: '#6366f1',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: '#6366f11a',
							borderRadius: '4px',
							border: '1px solid #6366f133'
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
					<button
						onClick={actions.convertTradeToSkill}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 2}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 2 Trade → 1 Skill Point
					</button>
					<button
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Trade → 2 Language Points
					</button>
					<button
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						style={getButtonStyle(hasConversions, 'danger')}
						onMouseEnter={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#dc2626';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#ef4444';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Reset Conversions
					</button>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
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
						<StyledSelectionItem key={trade.id} data-testid={`trade-item-${trade.id}`}>
							<StyledSelectionHeader>
								<StyledSelectionName>{trade.name}</StyledSelectionName>
								<div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
								{masteryInfo.name} (+{masteryInfo.bonus}) • {attributeList}
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
