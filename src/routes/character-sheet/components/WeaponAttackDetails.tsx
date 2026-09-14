import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { AttackData } from '../../../types';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation, type AttackPresentation } from '../attackPresentation';
import { getVersatileDamage, getWeaponRange, parseDamage } from '../../../lib/utils/weaponUtils';
import { getWeaponRulePresentation } from '../weaponRulePresentation';
import {
	StyledAttackPopupBody,
	StyledDamageSection,
	StyledDamageTable,
	StyledDisclosure,
	StyledDisclosureBody,
	StyledDisclosureChevron,
	StyledDisclosureChip,
	StyledDisclosureSummary,
	StyledFactLabel,
	StyledFactValue,
	StyledFeatureChip,
	StyledFeatureChips,
	StyledNestedDisclosure,
	StyledPresentationNote,
	StyledRule,
	StyledRuleSource,
	StyledSectionLabel,
	StyledWeaponFact,
	StyledWeaponFacts
} from '../styles/AttackPopup.styles';

const formatDamageAmount = (damage: string): string => damage.match(/\d+/g)?.join(' / ') ?? '-';

export interface WeaponAttackDetailsProps {
	attack: AttackData;
	weapon: Weapon | null;
	presentation?: AttackPresentation;
	headingIdPrefix?: string;
	contained?: boolean;
}

const DamageTable: React.FC<{
	presentation: AttackPresentation;
	headingIdPrefix: string;
}> = ({ presentation, headingIdPrefix }) => (
	<StyledDamageSection aria-labelledby={`${headingIdPrefix}-damage-title`}>
		<StyledSectionLabel id={`${headingIdPrefix}-damage-title`}>
			Damage calculations
		</StyledSectionLabel>
		<StyledDamageTable>
			<thead>
				<tr>
					<th scope="col">Hit</th>
					<th scope="col">Heavy Hit (+5)</th>
					<th scope="col">Brutal Hit (+10)</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{formatDamageAmount(presentation.baseDamage)}</td>
					<td>{formatDamageAmount(presentation.heavyDamage)}</td>
					<td>{formatDamageAmount(presentation.brutalDamage)}</td>
				</tr>
			</tbody>
		</StyledDamageTable>
	</StyledDamageSection>
);

const WeaponAttackDetails: React.FC<WeaponAttackDetailsProps> = ({
	attack,
	weapon,
	presentation: suppliedPresentation,
	headingIdPrefix = 'attack',
	contained = false
}) => {
	const presentation = suppliedPresentation ?? getAttackPresentation({ attack, weapon });
	const weaponRules = weapon ? getWeaponRulePresentation(weapon) : null;
	const range = weapon ? getWeaponRange(weapon) : null;
	const versatileDamage = weapon ? getVersatileDamage(weapon) : null;

	return (
		<StyledAttackPopupBody $contained={contained}>
			<StyledWeaponFacts>
				{weapon && (
					<>
						<StyledWeaponFact>
							<StyledFactLabel>Weapon type</StyledFactLabel>
							<StyledFactValue>{weapon.type}</StyledFactValue>
						</StyledWeaponFact>
						<StyledWeaponFact>
							<StyledFactLabel>Hands</StyledFactLabel>
							<StyledFactValue>{weapon.handedness}</StyledFactValue>
						</StyledWeaponFact>
						<StyledWeaponFact>
							<StyledFactLabel>Base damage</StyledFactLabel>
							<StyledFactValue>{formatDamageAmount(weapon.damage)}</StyledFactValue>
						</StyledWeaponFact>
					</>
				)}
				<StyledWeaponFact>
					<StyledFactLabel>Damage type</StyledFactLabel>
					<StyledFactValue data-testid="attack-damage-type">
						{weapon ? parseDamage(weapon.damage).typeDisplay : presentation.damageType}
					</StyledFactValue>
				</StyledWeaponFact>
				{range && (
					<StyledWeaponFact>
						<StyledFactLabel>Range</StyledFactLabel>
						<StyledFactValue>
							{range.short}/{range.long}
						</StyledFactValue>
					</StyledWeaponFact>
				)}
				{versatileDamage && (
					<StyledWeaponFact>
						<StyledFactLabel>Two-handed hit</StyledFactLabel>
						<StyledFactValue>{formatDamageAmount(versatileDamage.twoHanded)}</StyledFactValue>
					</StyledWeaponFact>
				)}
			</StyledWeaponFacts>

			<DamageTable presentation={presentation} headingIdPrefix={headingIdPrefix} />
			{presentation.note && <StyledPresentationNote>{presentation.note}</StyledPresentationNote>}

			{weaponRules && weaponRules.properties.length > 0 && (
				<StyledDisclosure open>
					<StyledDisclosureSummary data-testid="attack-properties-summary">
						<span>Properties &amp; features</span>
						<StyledDisclosureChip data-testid="attack-properties-chip">
							{weaponRules.properties.length}{' '}
							{weaponRules.properties.length === 1 ? 'property' : 'properties'}
						</StyledDisclosureChip>
						<StyledDisclosureChevron>
							<ChevronDown size={16} />
						</StyledDisclosureChevron>
					</StyledDisclosureSummary>
					<StyledDisclosureBody>
						{weaponRules.features.length > 0 && (
							<>
								<StyledSectionLabel>Features</StyledSectionLabel>
								<StyledFeatureChips>
									{weaponRules.features.map((feature) => (
										<StyledFeatureChip key={feature}>{feature}</StyledFeatureChip>
									))}
								</StyledFeatureChips>
							</>
						)}
						{weaponRules.properties.map((property) => (
							<StyledRule key={property.label}>
								<strong>{property.label}.</strong>{' '}
								{property.definition?.description ??
									'No current rules description is available for this legacy property.'}
							</StyledRule>
						))}
						<StyledRuleSource>Rules: weapon property definitions</StyledRuleSource>
					</StyledDisclosureBody>
				</StyledDisclosure>
			)}

			{weaponRules?.styles.map((style) => {
				const condition = style.condition?.definition;
				const conditionName = condition?.name.replace(/ X$/, '');
				return (
					<StyledDisclosure key={style.definition.id} open>
						<StyledDisclosureSummary data-testid="attack-style-summary">
							<span>
								{style.definition.name} style · {style.definition.enhancement.name} enhancement
							</span>
							<StyledDisclosureChip data-testid="attack-style-chip">
								{style.definition.enhancement.costToUse}
							</StyledDisclosureChip>
							<StyledDisclosureChevron>
								<ChevronDown size={16} />
							</StyledDisclosureChevron>
						</StyledDisclosureSummary>
						<StyledDisclosureBody>
							<p>{weaponRules.weaponEnhancementRule}</p>
							<StyledRule>
								<strong>{style.definition.enhancement.name}.</strong>{' '}
								{style.definition.enhancement.description} {style.definition.enhancement.effect}
							</StyledRule>

							{condition && (
								<StyledNestedDisclosure>
									<StyledDisclosureSummary>
										<span>
											{conditionName} condition{style.recoveryAction ? ' & recovery' : ''}
										</span>
										<StyledDisclosureChevron>
											<ChevronDown size={16} />
										</StyledDisclosureChevron>
									</StyledDisclosureSummary>
									<StyledDisclosureBody>
										<p>
											<strong>{condition.name}.</strong> {condition.description}
										</p>
										{style.recoveryAction && (
											<StyledRule>
												<strong>{style.recoveryAction.name} (Action).</strong> Spend{' '}
												{style.recoveryAction.cost}. {style.recoveryAction.description} Success:{' '}
												{style.recoveryAction.success}{' '}
												{style.recoveryAction.successEachFive &&
													`Success (each 5): ${style.recoveryAction.successEachFive}`}
											</StyledRule>
										)}
										<StyledRuleSource>
											Rules: condition catalog
											{style.recoveryAction ? ' and Medicine action' : ''}
										</StyledRuleSource>
									</StyledDisclosureBody>
								</StyledNestedDisclosure>
							)}
							<StyledRuleSource>Rules: {style.definition.name} weapon style</StyledRuleSource>
						</StyledDisclosureBody>
					</StyledDisclosure>
				);
			})}
		</StyledAttackPopupBody>
	);
};

export default WeaponAttackDetails;
