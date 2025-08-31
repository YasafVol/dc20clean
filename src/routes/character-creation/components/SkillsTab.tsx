import React from 'react';
import { skillsData } from '../../../lib/rulesdata/skills';
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
		const canAfford = pointsUsed + pointCost <= availablePoints;
		console.log(`canIncreaseProficiency: cost=${pointCost}, used=${pointsUsed}, available=${availablePoints}, canAfford=${canAfford}`);
		return canAfford;
	};

	// Enhanced validation including mastery limits
	const canSelectMastery = (skillId: string, targetLevel: number): boolean => {
		// Check mastery limit
		if (targetLevel > masteryLimits.maxSkillMastery) {
			console.log(`Skill ${skillId} level ${targetLevel} exceeds mastery limit ${masteryLimits.maxSkillMastery}`);
			return false;
		}
		
		// Check Level 1 special rule for Adept (level 2) - only count skills, not trades
		if (targetLevel === 2) {
			const currentlyAdept = currentSkills[skillId] === 2;
			const skillAdeptCount = Object.values(currentSkills).filter(level => level === 2).length;
			if (!currentlyAdept && skillAdeptCount >= 1) {
				console.log(`Cannot select Adept level 2 for ${skillId} - already have ${skillAdeptCount} Adept skills`);
				return false; // Already have one Adept skill
			}
		}
		
		// Check point availability
		const pointCost = targetLevel - (currentSkills[skillId] || 0);
		const canAfford = canIncreaseProficiency(pointCost, pointsData.skillPointsUsed, pointsData.availableSkillPoints);
		
		if (!canAfford) {
			console.log(`Cannot afford level ${targetLevel} for ${skillId}: cost=${pointCost}, used=${pointsData.skillPointsUsed}, available=${pointsData.availableSkillPoints}`);
		}
		
		return canAfford;
	};

	// Helper function for consistent button styling
	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			{/* Level 1 Validation Warning */}
			{(() => {
				const skillAdeptCount = Object.values(currentSkills).filter(level => level === 2).length;
				const isInvalid = skillAdeptCount > 1;
				
				return isInvalid ? (
					<div style={{
						background: 'transparent',
						border: '1px solid #fecaca',
						color: '#991b1b',
						padding: '0.75rem',
						borderRadius: '0.5rem',
						marginBottom: '1rem'
					}}>
						⚠️ Level 1 characters can only have ONE Adept (level 2) skill.
						Currently: {skillAdeptCount} Adept skill selections.
					</div>
				) : null;
			})()}
			
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
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxSkillMastery} 
				({MASTERY_TABLE[masteryLimits.maxSkillMastery]?.name})
			</div>

			<StyledPointsRemaining>
				Skill Points: {pointsData.availableSkillPoints - pointsData.skillPointsUsed} /{' '}
				{pointsData.availableSkillPoints} remaining
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
						onClick={actions.convertSkillToTrade}
						disabled={pointsData.availableSkillPoints - pointsData.skillPointsUsed < 1}
						$enabled={pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1}
					>
						Convert 1 Skill → 2 Trade Points
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
