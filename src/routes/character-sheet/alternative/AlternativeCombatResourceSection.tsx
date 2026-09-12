import { useTranslation } from 'react-i18next';
import type { Resistance } from '../../../lib/services/calculatorModules/abilityCollection';
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
	DefensePanel,
	DefenseThreshold,
	DefenseThresholdLabel,
	DefenseThresholds,
	DefenseThresholdValue,
	DefenseTitle,
	MetricLabel,
	MetricValue,
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
	precisionDefense: number;
	areaDefense: number;
	physicalDamageReduction: number;
	resistances: Array<Pick<Resistance, 'type' | 'value'>>;
	onRoll: (label: string, bonus: number, actionType: RollActionType) => void;
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
	color
}: {
	label: string;
	abbreviation: string;
	value: number;
	color: string;
}) {
	return (
		<DefenseCard $color={color} aria-label={`${label} ${value}`}>
			<DefenseTitle $color={color}>
				{label}
				<DefenseAbbreviation $color={color}>{abbreviation}</DefenseAbbreviation>
			</DefenseTitle>
			<DefenseThresholds>
				<DefenseThreshold $tone="hit">
					<DefenseThresholdLabel $tone="hit">Hit</DefenseThresholdLabel>
					<DefenseThresholdValue $tone="hit">{value}</DefenseThresholdValue>
				</DefenseThreshold>
				<DefenseThreshold $tone="heavy">
					<DefenseThresholdLabel $tone="heavy">Heavy hit</DefenseThresholdLabel>
					<DefenseThresholdValue $tone="heavy">{value + 5}</DefenseThresholdValue>
				</DefenseThreshold>
				<DefenseThreshold $tone="brutal">
					<DefenseThresholdLabel $tone="brutal">Brutal hit</DefenseThresholdLabel>
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
	precisionDefense,
	areaDefense,
	physicalDamageReduction,
	resistances,
	onRoll
}: AlternativeCombatResourceSectionProps) {
	const { t } = useTranslation();
	const damageReduction = getDamageReductionState(physicalDamageReduction, resistances);

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
							<MetricLabel>Move</MetricLabel>
							<MetricValue>{moveSpeed}</MetricValue>
						</TacticalMetric>
						<TacticalMetric>
							<MetricLabel>Jump</MetricLabel>
							<MetricValue>{jumpDistance}</MetricValue>
						</TacticalMetric>
					</TacticalGrid>
				</ActionPanel>

				<DefensePanel role="group" aria-label="Defense thresholds">
					<DefenseCards>
						<DefenseDisplay
							label="Precision Defense"
							abbreviation="PD"
							value={precisionDefense}
							color={theme.colors.accent.secondary}
						/>
						<DefenseDisplay
							label="Area Defense"
							abbreviation="AD"
							value={areaDefense}
							color={theme.colors.accent.secondary}
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
