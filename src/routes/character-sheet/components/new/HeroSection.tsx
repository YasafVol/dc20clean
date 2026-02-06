import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { StatCard } from './StatCard';
import DeathExhaustion from '../DeathExhaustion';
import type { EnhancedStatBreakdown } from '../../../../lib/types/effectSystem';
import { createEnhancedTooltip } from '../EnhancedStatTooltips';
import Tooltip from '../Tooltip';
import { ConditionBadge } from '../ConditionBadge';
import { getConditionBadgesForAttribute } from '../../../../lib/services/conditionEffectsAnalyzer';

interface HeroSectionProps {
	// Resource values
	currentHP: number;
	maxHP: number;
	tempHP?: number;
	currentMana: number;
	maxMana: number;
	currentStamina: number;
	maxStamina: number;
	currentRest: number;
	maxRest: number;
	currentGrit: number;
	maxGrit: number;

	// Defenses
	precisionAD: number;
	precisionADHeavyThreshold?: number;
	precisionADBrutalThreshold?: number;
	precisionDR: number;
	areaAD: number;

	// Combat stats
	attackBonus: number;
	saveDC: number;
	initiative: number;

	// Active conditions
	activeConditions?: string[];

	// Callbacks
	onHPChange?: (value: number) => void;
	onTempHPChange?: (value: number) => void;
	onManaChange?: (value: number) => void;
	onStaminaChange?: (value: number) => void;
	onRestChange?: (value: number) => void;
	onGritChange?: (value: number) => void;
	onSkillClick?: (skillName: string, bonus: number) => void;

	// Tooltip handlers
	onHPMouseEnter?: (e: React.MouseEvent) => void;
	onHPMouseLeave?: () => void;
	onManaMouseEnter?: (e: React.MouseEvent) => void;
	onManaMouseLeave?: () => void;
	onStaminaMouseEnter?: (e: React.MouseEvent) => void;
	onStaminaMouseLeave?: () => void;
	onRestMouseEnter?: (e: React.MouseEvent) => void;
	onRestMouseLeave?: () => void;
	onGritMouseEnter?: (e: React.MouseEvent) => void;
	onGritMouseLeave?: () => void;
	onAttackMouseEnter?: (e: React.MouseEvent) => void;
	onAttackMouseLeave?: () => void;
	onPrecisionADMouseEnter?: (e: React.MouseEvent) => void;
	onPrecisionADMouseLeave?: () => void;
	onAreaADMouseEnter?: (e: React.MouseEvent) => void;
	onAreaADMouseLeave?: () => void;
	onPrecisionDRMouseEnter?: (e: React.MouseEvent) => void;
	onPrecisionDRMouseLeave?: () => void;
	showRageToggle?: boolean;
	isRaging?: boolean;
	onRageToggle?: (isRaging: boolean) => void;

	className?: string;
}

const Container = styled(motion.section)`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${theme.spacing[6]};
	margin-bottom: ${theme.spacing[6]};

	@media (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const BoxCard = styled(motion.div)`
	background: ${theme.colors.bg.elevated};
	border-radius: ${theme.borderRadius.xl};
	padding: ${theme.spacing[6]};
	box-shadow: ${theme.shadows.xl};
	border: 1px solid ${theme.colors.border.default};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[4]};
`;

const BoxTitle = styled.h3`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin: 0 0 ${theme.spacing[2]} 0;
	padding-bottom: ${theme.spacing[2]};
	border-bottom: 2px solid ${theme.colors.border.default};
`;

const ResourcesGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

const DefensesGrid = styled.div<{ $withMarginTop?: boolean }>`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${theme.spacing[3]};
	${(props) => props.$withMarginTop && `margin-top: ${theme.spacing[3]};`}

	@media (max-width: 1400px) {
		grid-template-columns: 1fr;
	}
`;

const DefenseItem = styled(motion.div)<{ $clickable?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	text-align: center;
	border: 2px solid transparent;
	transition: all ${theme.transitions.base};
	${(props) => props.$clickable && 'cursor: pointer;'}

	&:hover {
		border-color: ${theme.colors.accent.warning};
		box-shadow: ${theme.shadows.md};
		transform: translateY(-2px);
	}
`;

const DefenseLabel = styled.div`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: ${theme.spacing[2]};
`;

const DefenseValue = styled.div<{ $isPrimary?: boolean }>`
	color: ${(props) =>
		props.$isPrimary ? theme.colors.accent.primary : theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
`;

const BadgesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
	margin-top: ${theme.spacing[2]};
	justify-content: center;
`;

const RageControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.secondary};
`;

const RageLabel = styled.span`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${theme.colors.text.primary};
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

const RageToggleButton = styled.button<{ $active: boolean }>`
	border: 1px solid ${(props) =>
		props.$active ? theme.colors.accent.danger : theme.colors.border.default};
	background: ${(props) => (props.$active ? theme.colors.accent.danger : theme.colors.bg.tertiary)};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	border-radius: ${theme.borderRadius.sm};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	cursor: pointer;
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

const RageNote = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.accent.warning};
	font-weight: ${theme.typography.fontWeight.medium};
`;

const DefenseSubtext = styled.div`
	margin-top: ${theme.spacing[1]};
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
`;

export const HeroSection: React.FC<HeroSectionProps> = ({
	currentHP,
	maxHP,
	tempHP,
	currentMana,
	maxMana,
	currentStamina,
	maxStamina,
	currentRest,
	maxRest,
	currentGrit,
	maxGrit,
	precisionAD,
	precisionADHeavyThreshold,
	precisionADBrutalThreshold,
	precisionDR,
	areaAD,
	attackBonus,
	saveDC,
	initiative,
	activeConditions = [],
	onHPChange,
	onTempHPChange,
	onManaChange,
	onStaminaChange,
	onRestChange,
	onGritChange,
	onSkillClick,
	onHPMouseEnter,
	onHPMouseLeave,
	onManaMouseEnter,
	onManaMouseLeave,
	onStaminaMouseEnter,
	onStaminaMouseLeave,
	onRestMouseEnter,
	onRestMouseLeave,
	onGritMouseEnter,
	onGritMouseLeave,
	onAttackMouseEnter,
	onAttackMouseLeave,
	onPrecisionADMouseEnter,
	onPrecisionADMouseLeave,
	onAreaADMouseEnter,
	onAreaADMouseLeave,
	onPrecisionDRMouseEnter,
	onPrecisionDRMouseLeave,
	showRageToggle = false,
	isRaging = false,
	onRageToggle,
	className
}) => {
	// Calculate condition badges
	const attackBadges = getConditionBadgesForAttribute(activeConditions, 'attack');

	return (
		<Container
			className={className}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Box 1: HP + Health Status */}
			<BoxCard
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
			>
				<BoxTitle>Health</BoxTitle>
				<StatCard
					label="Hit Points"
					current={currentHP}
					max={maxHP}
					temp={tempHP}
					color="health"
					size="large"
					showProgressBar
					editable
					onChange={onHPChange}
					onTempChange={onTempHPChange}
					onMouseEnter={onHPMouseEnter}
					onMouseLeave={onHPMouseLeave}
				/>
				{showRageToggle && (
					<>
						<RageControls>
							<RageLabel>Rage</RageLabel>
							<RageToggleButton $active={isRaging} onClick={() => onRageToggle?.(!isRaging)}>
								{isRaging ? 'Active' : 'Inactive'}
							</RageToggleButton>
						</RageControls>
						{isRaging && (
							<RageNote>Rage: Resistance (Half) to Elemental and Physical damage.</RageNote>
						)}
					</>
				)}
				<DeathExhaustion isMobile={false} />
			</BoxCard>

			{/* Box 2: Mana + Stamina */}
			<BoxCard
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<BoxTitle>Resources</BoxTitle>
				<ResourcesGroup>
					<StatCard
						label="Mana Points"
						current={currentMana}
						max={maxMana}
						color="mana"
						size="medium"
						showProgressBar
						editable
						onChange={onManaChange}
						onMouseEnter={onManaMouseEnter}
						onMouseLeave={onManaMouseLeave}
					/>
					<StatCard
						label="Stamina Points"
						current={currentStamina}
						max={maxStamina}
						color="stamina"
						size="medium"
						showProgressBar
						editable
						onChange={onStaminaChange}
						onMouseEnter={onStaminaMouseEnter}
						onMouseLeave={onStaminaMouseLeave}
					/>
				</ResourcesGroup>
			</BoxCard>

			{/* Box 3: Recovery (Rest + Grit) */}
			<BoxCard
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<BoxTitle>Recovery</BoxTitle>
				<ResourcesGroup>
					<StatCard
						label="Rest Points"
						current={currentRest}
						max={maxRest}
						color="grit"
						size="medium"
						showProgressBar
						editable
						onChange={onRestChange}
						onMouseEnter={onRestMouseEnter}
						onMouseLeave={onRestMouseLeave}
					/>
					<StatCard
						label="Grit Points"
						current={currentGrit}
						max={maxGrit}
						color="grit"
						size="medium"
						showProgressBar
						editable
						onChange={onGritChange}
						onMouseEnter={onGritMouseEnter}
						onMouseLeave={onGritMouseLeave}
					/>
				</ResourcesGroup>
			</BoxCard>

			{/* Box 4: Combat Stats (Defenses + Combat Info) */}
			<BoxCard
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.4 }}
			>
				<BoxTitle>Combat Stats</BoxTitle>
				<ResourcesGroup>
					<DefensesGrid>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onPrecisionADMouseEnter}
							onMouseLeave={onPrecisionADMouseLeave}
						>
							<DefenseLabel>Precision AD</DefenseLabel>
							<DefenseValue>{precisionAD}</DefenseValue>
							<DefenseSubtext>
								Heavy {precisionADHeavyThreshold ?? precisionAD + 5} | Brutal {precisionADBrutalThreshold ?? precisionAD + 10}
							</DefenseSubtext>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onPrecisionDRMouseEnter}
							onMouseLeave={onPrecisionDRMouseLeave}
						>
							<DefenseLabel>Precision DR</DefenseLabel>
							<DefenseValue>{precisionDR}</DefenseValue>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onAreaADMouseEnter}
							onMouseLeave={onAreaADMouseLeave}
						>
							<DefenseLabel>Area AD</DefenseLabel>
							<DefenseValue>{areaAD}</DefenseValue>
						</DefenseItem>
					</DefensesGrid>
					<DefensesGrid $withMarginTop>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							$clickable
							onClick={() => onSkillClick?.('Attack', attackBonus)}
							onMouseEnter={onAttackMouseEnter}
							onMouseLeave={onAttackMouseLeave}
						>
							<DefenseLabel>Attack/Spell</DefenseLabel>
							<DefenseValue $isPrimary>+{attackBonus}</DefenseValue>
							{attackBadges.length > 0 && (
								<BadgesContainer>
									{attackBadges.map((badge, idx) => (
										<ConditionBadge
											key={idx}
											type={badge.type}
											value={badge.value}
											tooltip={badge.tooltip}
										/>
									))}
								</BadgesContainer>
							)}
						</DefenseItem>
						<DefenseItem whileHover={{ scale: 1.05 }}>
							<DefenseLabel>Save DC</DefenseLabel>
							<DefenseValue $isPrimary>{saveDC}</DefenseValue>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							$clickable
							onClick={() => onSkillClick?.('Initiative', initiative)}
						>
							<DefenseLabel>Initiative</DefenseLabel>
							<DefenseValue $isPrimary>+{initiative}</DefenseValue>
						</DefenseItem>
					</DefensesGrid>
				</ResourcesGroup>
			</BoxCard>
		</Container>
	);
};


