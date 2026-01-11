import React from 'react';
import { skillsData } from '../../../lib/rulesdata/skills';
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
		return pointsUsed + pointCost <= availablePoints;
	};

	const canSelectMastery = (skillId: string, targetLevel: number): boolean => {
		if (targetLevel > masteryLimits.maxSkillMastery) {
			return false;
		}

		if (targetLevel >= 2) {
			const currentLevel = currentSkills[skillId] || 0;
			const currentlyAdept = currentLevel >= 2;

			if (!currentlyAdept && masteryLimits.currentAdeptCount >= masteryLimits.maxAdeptCount) {
				return false;
			}
		}

		const pointCost = targetLevel - (currentSkills[skillId] || 0);
		const canAfford = canIncreaseProficiency(
			pointCost,
			pointsData.skillPointsUsed,
			pointsData.availableSkillPoints
		);

		return canAfford;
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
				<strong>Mastery Limits:</strong> Max level {masteryLimits.maxSkillMastery} (
				{MASTERY_TIERS[masteryLimits.maxSkillMastery]?.name})
				{masteryLimits.maxSkillMastery >= 2 && masteryLimits.maxAdeptCount < 999 && (
					<div className="text-primary mt-1">
						Adept slots: {masteryLimits.currentAdeptCount} / {masteryLimits.maxAdeptCount} used
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
					const masteryInfo = getMasteryInfo(currentLevel, masteryLimits.maxSkillMastery);

					return (
						<div
							key={skill.id}
							data-testid={`skill-item-${skill.id}`}
							className="hover:border-primary rounded-lg border border-white/50 bg-transparent p-4 transition-colors"
						>
							<div className="mb-2 flex items-center justify-between">
								<h4 className="text-primary text-lg font-semibold tracking-wide uppercase">
									{skill.name}
								</h4>
								<span className="text-muted-foreground text-xs">
									{masteryInfo.name} (+{masteryInfo.bonus}) • {skill.attributeAssociation}
								</span>
							</div>
							<p className="text-muted-foreground mb-3 text-sm">{skill.description}</p>
							<div className="flex flex-wrap gap-2">
								{[0, 1, 2, 3, 4, 5].map((level) => {
									const masteryDisplay = getMasteryInfo(level, masteryLimits.maxSkillMastery);
									const canSelect = canSelectMastery(skill.id, level);
									const isActive = currentLevel === level;
									const isDisabled = !canSelect && !isActive;

									return (
										<button
											key={level}
											title={`${masteryDisplay.name} (+${masteryDisplay.bonus})`}
											onClick={() => {
												if (canSelect || isActive) {
													onSkillChange(skill.id, level);
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

export default SkillsTab;
