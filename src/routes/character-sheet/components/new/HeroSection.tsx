import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { StatCard } from './StatCard';
import DeathExhaustion from '../DeathExhaustion';
import { ConditionBadge } from '../ConditionBadge';
import CompactUtility from './CompactUtility';
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

	// Box-level override tracking
	hasHealthOverride?: boolean;
	hasResourcesOverride?: boolean;
	hasRecoveryOverride?: boolean;
	hasCombatStatsOverride?: boolean;

	// Callbacks
	onHPChange?: (value: number) => void;
	onTempHPChange?: (value: number) => void;
	onManaChange?: (value: number) => void;
	onStaminaChange?: (value: number) => void;
	onRestChange?: (value: number) => void;
	onGritChange?: (value: number) => void;
	onPrecisionADChange?: (value: number) => void;
	onAreaADChange?: (value: number) => void;
	onPrecisionDRChange?: (value: number) => void;
	onHealthReset?: () => void;
	onResourcesReset?: () => void;
	onRecoveryReset?: () => void;
	onCombatStatsReset?: () => void;
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
	grid-template-columns: repeat(3, 1fr);
	gap: ${theme.spacing[4]};
	margin-bottom: ${theme.spacing[4]};
	align-items: stretch;

	@media (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

// Wraps two BoxCards vertically inside a single grid column.
// Used to stack Resources + Recovery (middle column) and Combat Stats + Utility (right column).
const StackedColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[4]};
	height: 100%;
	min-width: 0;
`;

const BoxCard = styled(motion.div)`
	background: ${theme.colors.bg.elevated};
	border-radius: ${theme.borderRadius.xl};
	padding: ${theme.spacing[4]};
	box-shadow: ${theme.shadows.xl};
	border: 1px solid ${theme.colors.border.default};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

// Equal-share variant for the middle column so Mana/Stamina and Rest/Grit
// take up the same vertical space without sticking to their content height.
const EqualShareBoxCard = styled(BoxCard)`
	flex: 1 1 0;
`;

// Combat Stats card stays sized to its content; the Utility area below it
// expands to fill the remaining column height so the right column looks balanced.
const FlexBoxCard = styled(BoxCard)`
	flex: 1 1 auto;
`;

// Inner sub-section that lives under Combat Stats and hosts the previous Utility tab content.
// Intentionally tight: CompactUtility owns its own internal spacing.
const UtilitySection = styled.div`
	margin-top: ${theme.spacing[3]};
	padding-top: ${theme.spacing[3]};
	border-top: 1px solid ${theme.colors.border.default};
`;

const BoxTitle = styled.h3`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin: 0 0 ${theme.spacing[1]} 0;
	padding-bottom: ${theme.spacing[2]};
	border-bottom: 2px solid ${theme.colors.border.default};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ResourcesGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

// Horizontal layout for the inner pair (Mana | Stamina, Rest | Grit).
// Each StatCard takes equal width and is allowed to shrink (min-width: 0).
const ResourcesPairRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${theme.spacing[3]};
	align-items: stretch;

	& > * {
		flex: 1 1 0;
		min-width: 0;
	}

	@media (max-width: 480px) {
		flex-direction: column;
	}
`;

const DefensesGrid = styled.div<{ $withMarginTop?: boolean }>`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${theme.spacing[3]};
	${(props) => props.$withMarginTop && `margin-top: ${theme.spacing[3]};`}

	@media (max-width: 1400px) {
		grid-template-columns: 1fr;
	}
`;

const DefenseItem = styled(motion.div)<{ $clickable?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[3]} ${theme.spacing[2]};
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
	margin-bottom: ${theme.spacing[1]};
	min-height: 28px;
`;

const BoxResetButton = styled(motion.button)<{ disabled?: boolean }>`
	background: linear-gradient(145deg, #ef4444 0%, #dc2626 100%);
	color: white;
	border: none;
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
	opacity: ${(props) => (props.disabled ? 0.4 : 1)};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

	&:hover {
		background: linear-gradient(145deg, #dc2626 0%, #b91c1c 100%);
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;

const DefenseValue = styled.div<{ $isPrimary?: boolean }>`
	color: ${(props) =>
		props.$isPrimary ? theme.colors.accent.primary : theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
`;

const EditableDefenseValue = styled.input<{ disabled?: boolean }>`
	color: ${theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
	background: ${(props) => (props.disabled ? 'transparent' : theme.colors.bg.secondary)};
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${theme.colors.border.default}`)};
	border-radius: ${theme.borderRadius.sm};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	text-align: center;
	width: 80px;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
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
	hasHealthOverride = false,
	hasResourcesOverride = false,
	hasRecoveryOverride = false,
	hasCombatStatsOverride = false,
	onHPChange,
	onTempHPChange,
	onManaChange,
	onStaminaChange,
	onRestChange,
	onGritChange,
	onPrecisionADChange,
	onAreaADChange,
	onPrecisionDRChange,
	onHealthReset,
	onResourcesReset,
	onRecoveryReset,
	onCombatStatsReset,
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
	const { t } = useTranslation();
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
				<BoxTitle>
					<span>Health</span>
					{hasHealthOverride && onHealthReset && (
						<BoxResetButton
							onClick={onHealthReset}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{t('characterSheet.heroReset')}
						</BoxResetButton>
					)}
				</BoxTitle>
				<StatCard
					label={t('characterSheet.heroHitPoints')}
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

			{/* Column 2: Resources (Mana + Stamina) stacked above Recovery (Rest + Grit) */}
			<StackedColumn>
				<EqualShareBoxCard
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<BoxTitle>
						<span>{t('characterSheet.heroResources')}</span>
						{hasResourcesOverride && onResourcesReset && (
							<BoxResetButton
								onClick={onResourcesReset}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{t('characterSheet.heroReset')}
							</BoxResetButton>
						)}
					</BoxTitle>
					<ResourcesPairRow>
						<StatCard
							label={t('characterSheet.heroManaPoints')}
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
							label={t('characterSheet.heroStaminaPoints')}
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
					</ResourcesPairRow>
				</EqualShareBoxCard>

				<EqualShareBoxCard
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<BoxTitle>
						<span>{t('characterSheet.heroRecovery')}</span>
						{hasRecoveryOverride && onRecoveryReset && (
							<BoxResetButton
								onClick={onRecoveryReset}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{t('characterSheet.heroReset')}
							</BoxResetButton>
						)}
					</BoxTitle>
					<ResourcesPairRow>
						<StatCard
							label={t('characterSheet.heroRestPoints')}
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
							label={t('characterSheet.heroGritPoints')}
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
					</ResourcesPairRow>
				</EqualShareBoxCard>
			</StackedColumn>

			{/* Column 3: Combat Stats (Defenses + Combat Info) with Utility section docked below */}
			<FlexBoxCard
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.4 }}
			>
				<BoxTitle>
				<span>{t('characterSheet.heroCombatStats')}</span>
					{hasCombatStatsOverride && onCombatStatsReset && (
						<BoxResetButton
							onClick={onCombatStatsReset}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{t('characterSheet.heroReset')}
						</BoxResetButton>
					)}
				</BoxTitle>
				<ResourcesGroup>
					<DefensesGrid>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onPrecisionADMouseEnter}
							onMouseLeave={onPrecisionADMouseLeave}
						>
							<DefenseLabel>{t('characterSheet.heroPrecisionAD')}</DefenseLabel>
							<EditableDefenseValue
								value={precisionAD}
								onChange={(e) => onPrecisionADChange?.(Number(e.target.value))}
								disabled={!onPrecisionADChange}
							/>
							<DefenseSubtext>
								Heavy {precisionADHeavyThreshold ?? precisionAD + 5} | Brutal {precisionADBrutalThreshold ?? precisionAD + 10}
							</DefenseSubtext>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onPrecisionDRMouseEnter}
							onMouseLeave={onPrecisionDRMouseLeave}
						>
							<DefenseLabel>{t('characterSheet.heroPrecisionDR')}</DefenseLabel>
							<EditableDefenseValue
								value={precisionDR}
								onChange={(e) => onPrecisionDRChange?.(Number(e.target.value))}
								disabled={!onPrecisionDRChange}
							/>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							onMouseEnter={onAreaADMouseEnter}
							onMouseLeave={onAreaADMouseLeave}
						>
							<DefenseLabel>{t('characterSheet.heroAreaAD')}</DefenseLabel>
							<EditableDefenseValue
								value={areaAD}
								onChange={(e) => onAreaADChange?.(Number(e.target.value))}
								disabled={!onAreaADChange}
							/>
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
					<DefenseLabel>{t('characterSheet.heroAttackSpell')}</DefenseLabel>
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
					<DefenseLabel>{t('characterSheet.heroSaveDC')}</DefenseLabel>
							<DefenseValue $isPrimary>{saveDC}</DefenseValue>
						</DefenseItem>
						<DefenseItem
							whileHover={{ scale: 1.05 }}
							$clickable
							onClick={() => onSkillClick?.('Initiative', initiative)}
						>
					<DefenseLabel>{t('characterSheet.heroInitiative')}</DefenseLabel>
							<DefenseValue $isPrimary>+{initiative}</DefenseValue>
						</DefenseItem>
					</DefensesGrid>
				</ResourcesGroup>

				{/* Utility sub-section: formerly the Utility tab. Compact horizontal layout with
				    Move/Jump stats, currency row, and optional chips for senses/resistances/training. */}
				<UtilitySection>
					<CompactUtility />
				</UtilitySection>
			</FlexBoxCard>
		</Container>
	);
};
