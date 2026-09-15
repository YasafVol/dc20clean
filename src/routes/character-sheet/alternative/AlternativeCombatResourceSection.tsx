import { useTranslation } from 'react-i18next';
import type { Resistance } from '../../../lib/services/calculatorModules/abilityCollection';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import Tooltip from '../components/Tooltip';
import { theme } from '../styles/theme';
import type { RollActionType } from './AlternativeMasterySection';
import {
	ActionCopy,
	ActionEyebrow,
	ActionLabel,
	ActionPanel,
	ActionValue,
	AttackButton,
	CombatResourceSection,
	DefenseAbbreviation,
	DefenseCard,
	DefenseCards,
	DefenseFormulaContent,
	DefenseFormulaExpression,
	DefenseFormulaRow,
	DefenseFormulaRows,
	DefensePanel,
	DefenseThreshold,
	DefenseThresholdLabel,
	DefenseThresholdModifier,
	DefenseThresholds,
	DefenseThresholdValue,
	DefenseTitle,
	MetricLabel,
	MetricValue,
	MovementGrid,
	MovementLabel,
	MovementMetric,
	MovementStrip,
	MovementTitle,
	MovementValue,
	ReductionBadge,
	ReductionCard,
	ReductionIndicators,
	ReductionSquare,
	ReductionTitle,
	TacticalButton,
	TacticalGrid,
	TacticalMetric
} from './AlternativeCombatResourceSection.styles';
import AlternativeSectionDisclosure from './AlternativeSectionDisclosure';

interface AlternativeCombatResourceSectionProps {
	attackBonus: number;
	saveDC: number;
	initiative: number;
	moveSpeed: number;
	jumpDistance: number;
	movements?: AlternativeMovement[];
	precisionDefense: number;
	areaDefense: number;
	combatMastery: number;
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
	precisionDefenseBreakdown?: EnhancedStatBreakdown;
	areaDefenseBreakdown?: EnhancedStatBreakdown;
	physicalDamageReduction: number;
	resistances: Array<Pick<Resistance, 'type' | 'value'>>;
	onRoll: (label: string, bonus: number, actionType: RollActionType) => void;
}

interface AlternativeMovement {
	type: string;
	speed: string;
	source?: { name?: string };
	isDefault?: boolean;
}

interface MovementDisplayMode {
	type: string;
	label: string;
	speed: string;
	source?: string;
	isDefault?: boolean;
}

const MOVEMENT_ORDER = ['climb', 'swim', 'fly', 'burrow', 'glide'] as const;

export function getMovementDisplayModes(
	moveSpeed: number,
	movements: AlternativeMovement[] = []
): MovementDisplayMode[] {
	const movementByType = new Map<string, AlternativeMovement>();

	for (const movement of movements) {
		const type = movement.type.toLowerCase();
		if (!movementByType.has(type)) movementByType.set(type, movement);
	}

	return [
		{ type: 'walk', label: 'Walk', speed: String(moveSpeed) },
		...MOVEMENT_ORDER.flatMap((type) => {
			const movement = movementByType.get(type);
			if (!movement) return [];
			return [
				{
					type,
					label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
					speed: movement.speed,
					source: movement.source?.name,
					isDefault: movement.isDefault
				}
			];
		})
	];
}

interface DamageReductionState {
	pdr: boolean;
	edr: boolean;
	mdr: boolean;
}

const DAMAGE_REDUCTION_TOOLTIPS = {
	pdr: 'Physical Damage Reduction: Bludgeoning, Piercing, and Slashing.',
	edr: 'Elemental Damage Reduction: Cold, Corrosion, Fire, Lightning, and Poison.',
	mdr: 'Mystical Damage Reduction: Radiant, Psychic, and Umbral.'
} as const;

function formatSigned(value: number): string {
	return `${value >= 0 ? '+' : ''}${value}`;
}

interface DefenseFormulaTerm {
	label: string;
	value: number;
}

function DefenseFormulaTooltip({
	label,
	abbreviation,
	value,
	terms,
	breakdown
}: {
	label: string;
	abbreviation: string;
	value: number;
	terms: DefenseFormulaTerm[];
	breakdown?: EnhancedStatBreakdown;
}) {
	const activeEffects = breakdown?.effects.filter((effect) => effect.isActive) ?? [];
	const calculatedTotal =
		breakdown?.total ?? 8 + terms.reduce((total, term) => total + term.value, 0);
	const hasOverride = calculatedTotal !== value;

	return (
		<DefenseFormulaContent>
			<strong>{label}</strong>
			<DefenseFormulaExpression>
				{abbreviation} = 8 + {terms.map((term) => term.label).join(' + ')} + Bonuses
			</DefenseFormulaExpression>
			<DefenseFormulaRows>
				<DefenseFormulaRow>
					<span>Base</span>
					<strong>8</strong>
				</DefenseFormulaRow>
				{terms.map((term) => (
					<DefenseFormulaRow key={term.label}>
						<span>{term.label}</span>
						<strong>{formatSigned(term.value)}</strong>
					</DefenseFormulaRow>
				))}
				{activeEffects.length === 0 ? (
					<DefenseFormulaRow>
						<span>Bonuses</span>
						<strong>+0</strong>
					</DefenseFormulaRow>
				) : (
					activeEffects.map((effect, index) => (
						<DefenseFormulaRow key={`${effect.source.id}-${index}`}>
							<span>{effect.source.name}</span>
							<strong>{formatSigned(effect.value)}</strong>
						</DefenseFormulaRow>
					))
				)}
				{hasOverride && (
					<>
						<DefenseFormulaRow>
							<span>Calculated</span>
							<strong>{calculatedTotal}</strong>
						</DefenseFormulaRow>
						<DefenseFormulaRow>
							<span>Displayed override</span>
							<strong>{value}</strong>
						</DefenseFormulaRow>
					</>
				)}
				<DefenseFormulaRow $total>
					<span>Total</span>
					<strong>{value}</strong>
				</DefenseFormulaRow>
			</DefenseFormulaRows>
		</DefenseFormulaContent>
	);
}

export function getDamageReductionState(
	physicalDamageReduction: number,
	resistances: Array<Pick<Resistance, 'type' | 'value'>>
): DamageReductionState {
	const hasCategoryReduction = (...categories: string[]) =>
		resistances.some(
			(resistance) =>
				categories.includes(resistance.type.toLowerCase()) &&
				String(resistance.value).toLowerCase() === 'true'
		);

	return {
		pdr: physicalDamageReduction > 0 || hasCategoryReduction('physical'),
		edr: hasCategoryReduction('elemental'),
		mdr: hasCategoryReduction('mystical', 'mental')
	};
}

function ReductionIndicator({
	label,
	active,
	tooltip
}: {
	label: string;
	active: boolean;
	tooltip: string;
}) {
	return (
		<Tooltip content={tooltip} position="top" maxWidth="320px">
			<ReductionBadge aria-label={`${label} ${active ? 'active' : 'inactive'}`}>
				{label}
				<ReductionSquare $active={active} aria-hidden="true" />
			</ReductionBadge>
		</Tooltip>
	);
}

function DefenseDisplay({
	label,
	abbreviation,
	value,
	color,
	terms,
	breakdown
}: {
	label: string;
	abbreviation: string;
	value: number;
	color: string;
	terms: DefenseFormulaTerm[];
	breakdown?: EnhancedStatBreakdown;
}) {
	return (
		<DefenseCard $color={color} aria-label={`${label} ${value}`}>
			<DefenseTitle $color={color}>
				{label}
				<Tooltip
					content={
						<DefenseFormulaTooltip
							label={label}
							abbreviation={abbreviation}
							value={value}
							terms={terms}
							breakdown={breakdown}
						/>
					}
					position="top"
					maxWidth="360px"
				>
					<DefenseAbbreviation $color={color} aria-label={`${abbreviation} formula`}>
						{abbreviation}
					</DefenseAbbreviation>
				</Tooltip>
			</DefenseTitle>
			<DefenseThresholds>
				<DefenseThreshold $tone="hit">
					<DefenseThresholdLabel $tone="hit">
						Hit
						<DefenseThresholdModifier>Base</DefenseThresholdModifier>
					</DefenseThresholdLabel>
					<DefenseThresholdValue $tone="hit">{value}</DefenseThresholdValue>
				</DefenseThreshold>
				<DefenseThreshold $tone="heavy">
					<DefenseThresholdLabel $tone="heavy">
						Heavy
						<DefenseThresholdModifier>+5</DefenseThresholdModifier>
					</DefenseThresholdLabel>
					<DefenseThresholdValue $tone="heavy">{value + 5}</DefenseThresholdValue>
				</DefenseThreshold>
				<DefenseThreshold $tone="brutal">
					<DefenseThresholdLabel $tone="brutal">
						Brutal
						<DefenseThresholdModifier>+10</DefenseThresholdModifier>
					</DefenseThresholdLabel>
					<DefenseThresholdValue $tone="brutal">{value + 10}</DefenseThresholdValue>
				</DefenseThreshold>
			</DefenseThresholds>
		</DefenseCard>
	);
}

export default function AlternativeCombatResourceSection({
	attackBonus,
	saveDC,
	initiative,
	moveSpeed,
	jumpDistance,
	movements = [],
	precisionDefense,
	areaDefense,
	combatMastery,
	might,
	agility,
	charisma,
	intelligence,
	precisionDefenseBreakdown,
	areaDefenseBreakdown,
	physicalDamageReduction,
	resistances,
	onRoll
}: AlternativeCombatResourceSectionProps) {
	const { t } = useTranslation();
	const damageReduction = getDamageReductionState(physicalDamageReduction, resistances);
	const movementModes = getMovementDisplayModes(moveSpeed, movements);

	return (
		<CombatResourceSection aria-label="Alternative combat">
			<AlternativeSectionDisclosure
				id="alternative-combat"
				title={t('characterSheet.sectionCombat')}
			>
				<ActionPanel>
					<AttackButton
						type="button"
						aria-label={`Roll Attack ${formatSigned(attackBonus)}`}
						onClick={() => onRoll('Attack', attackBonus, 'attack')}
					>
						<ActionCopy>
							<ActionEyebrow>Primary roll</ActionEyebrow>
							<ActionLabel>Attack</ActionLabel>
						</ActionCopy>
						<ActionValue>{formatSigned(attackBonus)}</ActionValue>
					</AttackButton>
					<TacticalGrid>
						<TacticalMetric>
							<MetricLabel>Save DC</MetricLabel>
							<MetricValue>{saveDC}</MetricValue>
						</TacticalMetric>
						<TacticalButton
							type="button"
							aria-label={`Roll Initiative ${formatSigned(initiative)}`}
							onClick={() => onRoll('Initiative', initiative, 'physical-check')}
						>
							<MetricLabel>Initiative</MetricLabel>
							<MetricValue $actionable>{formatSigned(initiative)}</MetricValue>
						</TacticalButton>
						<TacticalMetric>
							<MetricLabel>Jump</MetricLabel>
							<MetricValue>{jumpDistance}</MetricValue>
						</TacticalMetric>
					</TacticalGrid>
					<MovementStrip role="group" aria-label="Movement speeds">
						<MovementTitle>Movement</MovementTitle>
						<MovementGrid>
							{movementModes.map((movement) => (
								<MovementMetric
									key={movement.type}
									title={movement.source ? `Source: ${movement.source}` : undefined}
									$isDefault={movement.isDefault}
								>
									<MovementLabel>{movement.label}</MovementLabel>
									<MovementValue>{movement.speed}</MovementValue>
								</MovementMetric>
							))}
						</MovementGrid>
					</MovementStrip>
				</ActionPanel>

				<DefensePanel role="group" aria-label="Defense thresholds">
					<DefenseCards>
						<DefenseDisplay
							label="Precision Defense"
							abbreviation="PD"
							value={precisionDefense}
							color={theme.colors.accent.secondary}
							terms={[
								{ label: 'Combat Mastery', value: combatMastery },
								{ label: 'Agility', value: agility },
								{ label: 'Intelligence', value: intelligence }
							]}
							breakdown={precisionDefenseBreakdown}
						/>
						<DefenseDisplay
							label="Area Defense"
							abbreviation="AD"
							value={areaDefense}
							color={theme.colors.accent.secondary}
							terms={[
								{ label: 'Combat Mastery', value: combatMastery },
								{ label: 'Might', value: might },
								{ label: 'Charisma', value: charisma }
							]}
							breakdown={areaDefenseBreakdown}
						/>
					</DefenseCards>

					<ReductionCard>
						<ReductionTitle>Damage Reduction</ReductionTitle>
						<ReductionIndicators aria-label="Damage reduction">
							<ReductionIndicator
								label="PDR"
								active={damageReduction.pdr}
								tooltip={DAMAGE_REDUCTION_TOOLTIPS.pdr}
							/>
							<ReductionIndicator
								label="EDR"
								active={damageReduction.edr}
								tooltip={DAMAGE_REDUCTION_TOOLTIPS.edr}
							/>
							<ReductionIndicator
								label="MDR"
								active={damageReduction.mdr}
								tooltip={DAMAGE_REDUCTION_TOOLTIPS.mdr}
							/>
						</ReductionIndicators>
					</ReductionCard>
				</DefensePanel>
			</AlternativeSectionDisclosure>
		</CombatResourceSection>
	);
}
