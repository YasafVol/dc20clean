import React from 'react';
import { skillsData } from '../../../lib/rulesdata/skills';
import type {
	BackgroundPointsData,
	PointConversions,
	ConversionActions,
	MasteryLimits,
	MasteryInfo
} from './BackgroundPointsManager';
import {
	getMasteryInfo,
	MASTERY_TABLE
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

interface SkillsTabProps {
	currentSkills: Record<string, number>;
	currentTrades: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	masteryLimits: MasteryLimits;
	onSkillChange: (skillId: string, newLevel: number) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
	currentSkills,
	currentTrades,
	pointsData,
	conversions,
	actions,
	masteryLimits,
	onSkillChange
}) => {
	const canIncreaseProficiency = (
		pointCost: number,
		pointsUsed: number,
		availablePoints: number
	) => {
		return pointsUsed + pointCost <= availablePoints;
	};

	// Enhanced validation including mastery limits
	const canSelectMastery = (skillId: string, targetLevel: number): boolean => {
		// Check mastery limit
		if (targetLevel > masteryLimits.maxSkillMastery) return false;
		
		// Check Level 1 special rule for Adept (level 2)
		if (targetLevel === 2) {
			const currentlyAdept = currentSkills[skillId] === 2;
			if (!currentlyAdept && masteryLimits.level1Validation.adeptCount >= 1) {
				return false; // Already have one Adept skill/trade
			}
		}
		
		// Check point availability
		const pointCost = targetLevel - (currentSkills[skillId] || 0);
		return canIncreaseProficiency(pointCost, pointsData.skillPointsUsed, pointsData.availableSkillPoints);
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
			{/* Level 1 Validation Warning */}
			{!masteryLimits.level1Validation.valid && (
				<div style={{
					background: '#fee2e2',
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
				background: '#f3f4f6',
				border: '1px solid #d1d5db',
				padding: '0.5rem',
				borderRadius: '0.375rem',
				marginBottom: '1rem',
				fontSize: '0.875rem'
			}}>
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxSkillMastery} 
				({MASTERY_TABLE[masteryLimits.maxSkillMastery]?.name})
			</div>

			<StyledPointsRemaining>
				Skill Points: {pointsData.availableSkillPoints - pointsData.skillPointsUsed} /{' '}
				{pointsData.availableSkillPoints} remaining
				{pointsData.baseSkillPoints !== 5 && (
					<div
						style={{
							fontSize: '0.9rem',
							color: pointsData.baseSkillPoints > 5 ? '#10b981' : '#ef4444',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: pointsData.baseSkillPoints > 5 ? '#065f461a' : '#dc26261a',
							borderRadius: '4px',
							border: `1px solid ${pointsData.baseSkillPoints > 5 ? '#10b981' : '#ef4444'}33`
						}}
					>
						Intelligence modifier: {pointsData.baseSkillPoints > 5 ? '+' : ''}
						{pointsData.baseSkillPoints - 5}
					</div>
				)}
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
						onClick={actions.convertSkillToTrade}
						disabled={pointsData.availableSkillPoints - pointsData.skillPointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Skill → 2 Trade Points
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
							{skillsData.map((skill) => {
				const currentLevel = currentSkills[skill.id] || 0;
				const masteryInfo = getMasteryInfo(currentLevel, masteryLimits.maxSkillMastery);
				
				return (
					<StyledSelectionItem key={skill.id}>
						<StyledSelectionHeader>
							<StyledSelectionName>{skill.name}</StyledSelectionName>
							<div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
								{masteryInfo.name} (+{masteryInfo.bonus}) • {skill.attributeAssociation}
							</div>
						</StyledSelectionHeader>
						<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
							{skill.description}
						</div>
						<StyledProficiencySelector>
							{[0, 1, 2, 3, 4, 5].map((level) => {
								const masteryDisplay = getMasteryInfo(level, masteryLimits.maxSkillMastery);
								const canSelect = canSelectMastery(skill.id, level);
								
								return (
									<StyledProficiencyButton
										key={level}
										$active={currentLevel === level}
										$disabled={!canSelect && level !== currentLevel}
										title={`${masteryDisplay.name} (+${masteryDisplay.bonus})`}
										onClick={() => {
											if (canSelect || level === currentLevel) {
												onSkillChange(skill.id, level);
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

export default SkillsTab;
