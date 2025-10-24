import React from 'react';
import { CollapsibleSection } from '../../../../../design-system/CollapsibleSection/CollapsibleSection';
import { skillsData } from '../../../../../lib/rulesdata/skills';
import {
	getMasteryLevelName,
	getMasteryBonus,
	type MasteryLevel
} from '../../../../../lib/rulesdata/proficiencies';
import {
	StyledMasteryDots,
	StyledMasteryDot,
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

interface SkillsTabProps {
	currentSkills: Record<string, number>;
	masteryLimits: MasteryLimits;
	availablePoints: number;
	spentPoints: number;
	onSkillChange: (skillId: string, newLevel: number) => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
	currentSkills,
	masteryLimits,
	availablePoints,
	spentPoints,
	onSkillChange
}) => {
	const remainingPoints = availablePoints - spentPoints;

	const canSelectLevel = (skillId: string, targetLevel: number): boolean => {
		const currentLevel = currentSkills[skillId] || 0;

		// Can't go above max for this level
		if (targetLevel > masteryLimits.maxSkillMastery) {
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

	const handleDotClick = (skillId: string, targetLevel: number) => {
		const currentLevel = currentSkills[skillId] || 0;

		if (targetLevel === currentLevel) {
			// Clicking same level - decrease to previous
			onSkillChange(skillId, Math.max(0, currentLevel - 1));
		} else if (canSelectLevel(skillId, targetLevel)) {
			// Increase to target level
			onSkillChange(skillId, targetLevel);
		}
	};

	const getMasteryLabel = (level: number): string => {
		if (level === 0) return 'Untrained';
		const name = getMasteryLevelName(level as MasteryLevel);
		const bonus = getMasteryBonus(level as MasteryLevel);
		return `${name} (+${bonus})`;
	};

	return (
		<div>
			{skillsData.map((skill) => {
				const currentLevel = currentSkills[skill.id] || 0;

				// Build the mastery dots component (OUTSIDE CollapsibleSection)
				const masteryDots = (
					<StyledMasteryDots>
						{[1, 2, 3, 4, 5].map((level) => {
							const available = canSelectLevel(skill.id, level);
							const filled = currentLevel >= level;

							return (
								<StyledMasteryDot
									key={level}
									$filled={filled}
									$available={available || filled}
									onClick={() => handleDotClick(skill.id, level)}
									disabled={!available && !filled}
									title={getMasteryLabel(level)}
								/>
							);
						})}
					</StyledMasteryDots>
				);

				// Build title with skill name and attribute
				const title = (
					<div>
						<StyledSkillTitle>{skill.name}</StyledSkillTitle>
						<StyledSkillAttribute>{skill.attributeAssociation}</StyledSkillAttribute>
					</div>
				);

				return (
					<StyledSkillRow key={skill.id}>
						<StyledCollapsibleWrapper>
							<CollapsibleSection title={title} defaultExpanded={false}>
								{/* Content shows when expanded - description/details */}
								<StyledSkillDescription>
									{skill.description || `No description available for ${skill.name}`}
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
