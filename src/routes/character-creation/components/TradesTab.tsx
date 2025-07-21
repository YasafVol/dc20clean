import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
import { knowledgeData } from '../../../lib/rulesdata/knowledge';
import type {
	BackgroundPointsData,
	PointConversions,
	ConversionActions
} from './BackgroundPointsManager';
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
const allTradesAndKnowledge = [...tradesData, ...knowledgeData];

interface TradesTabProps {
	currentTrades: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	onTradeChange: (tradeId: string, newLevel: number) => void;
}

const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	pointsData,
	conversions,
	actions,
	onTradeChange
}) => {
	const canIncreaseProficiency = (
		pointCost: number,
		pointsUsed: number,
		availablePoints: number
	) => {
		return pointsUsed + pointCost <= availablePoints;
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
					return (
						<StyledSelectionItem key={trade.id}>
							<StyledSelectionHeader>
								<StyledSelectionName>{trade.name}</StyledSelectionName>
								<div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
									{trade.attributeAssociation}
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
								{[0, 1, 2, 3, 4, 5].map((level) => (
									<StyledProficiencyButton
										key={level}
										$active={currentLevel === level}
										$disabled={
											level > currentLevel &&
											!canIncreaseProficiency(
												level - currentLevel,
												pointsData.tradePointsUsed,
												pointsData.availableTradePoints
											)
										}
										onClick={() => {
											if (
												level <= currentLevel ||
												canIncreaseProficiency(
													level - currentLevel,
													pointsData.tradePointsUsed,
													pointsData.availableTradePoints
												)
											) {
												onTradeChange(trade.id, level);
											}
										}}
									>
										{level}
									</StyledProficiencyButton>
								))}
							</StyledProficiencySelector>
						</StyledSelectionItem>
					);
				})}
			</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default TradesTab;
