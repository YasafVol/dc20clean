import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import EquipmentBuildSheet, {
	type EquipmentBuildSheetStep
} from '../../../components/equipment/EquipmentBuildSheet';
import {
	calculateCustomWeaponPoints,
	calculateRulebookPropertyPoints,
	getCustomWeaponMaxPoints
} from '../../../lib/rulesdata/equipment/customWeapon';
import {
	WEAPON_TYPES,
	getPropertiesForWeaponType,
	getStylesForWeaponType
} from '../../../lib/rulesdata/equipment/options/weaponOptions';
import { PHYSICAL_DAMAGE_TYPES } from '../../../lib/rulesdata/equipment/schemas/baseEquipment';
import type { PhysicalDamageType } from '../../../lib/rulesdata/equipment/schemas/baseEquipment';
import type {
	WeaponStyle,
	WeaponType
} from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import { validateWeapon } from '../../../lib/rulesdata/equipment/validation/equipmentValidator';
import {
	Composer,
	ComposerAutomatic,
	ComposerAutomaticLabel,
	ComposerBadge,
	ComposerChoice,
	ComposerChoiceDescription,
	ComposerChoiceGrid,
	ComposerChoiceMeta,
	ComposerChoiceTitle,
	ComposerDamageChoiceGrid,
	ComposerError,
	ComposerInlineAction,
	ComposerInput,
	ComposerLabel,
	ComposerPoints,
	ComposerPropertyList,
	ComposerReviewGrid,
	ComposerReviewItem,
	ComposerSection,
	ComposerText
} from '../styles/CharacterCustomWeaponComposer.styles';

export type CustomWeaponComposerStep = 1 | 2 | 3 | 4 | 5;

export interface CharacterCustomWeaponDraft {
	step: CustomWeaponComposerStep;
	name: string;
	weaponType: WeaponType | null;
	style: WeaponStyle | null;
	secondaryStyle: WeaponStyle | null;
	damageType: PhysicalDamageType | null;
	secondaryDamageType: PhysicalDamageType | null;
	properties: string[];
}

export function createCharacterCustomWeaponDraft(): CharacterCustomWeaponDraft {
	return {
		step: 1,
		name: '',
		weaponType: null,
		style: null,
		secondaryStyle: null,
		damageType: null,
		secondaryDamageType: null,
		properties: []
	};
}

interface CharacterCustomWeaponComposerProps {
	draft: CharacterCustomWeaponDraft;
	onChange: (draft: CharacterCustomWeaponDraft) => void;
}

export default function CharacterCustomWeaponComposer({
	draft,
	onChange
}: CharacterCustomWeaponComposerProps) {
	const { t } = useTranslation();
	const typeDefinition = WEAPON_TYPES.find((type) => type.id === draft.weaponType);
	const styles = draft.weaponType ? getStylesForWeaponType(draft.weaponType) : [];
	const properties = draft.weaponType ? getPropertiesForWeaponType(draft.weaponType) : [];
	const selectableProperties = properties.filter(
		(property) => draft.weaponType !== 'ranged' || !['ammo', 'two-handed'].includes(property.id)
	);
	const maxPoints = draft.weaponType ? getCustomWeaponMaxPoints(draft.weaponType) : 2;
	const internalPoints = calculateCustomWeaponPoints(draft.properties);
	const rulebookPoints = draft.weaponType
		? calculateRulebookPropertyPoints(draft.weaponType, draft.properties)
		: 0;
	const selectedStyle = styles.find((style) => style.id === draft.style);
	const selectedSecondaryStyle = styles.find((style) => style.id === draft.secondaryStyle);
	const selectedPropertyNames = properties
		.filter((property) => draft.properties.includes(property.id))
		.map((property) => property.name);
	const validation = useMemo(() => {
		if (!draft.weaponType || !draft.style || !draft.damageType) return null;
		return validateWeapon({
			weaponType: draft.weaponType,
			style: draft.style,
			secondaryStyle: draft.secondaryStyle ?? undefined,
			damageType: draft.damageType,
			properties: draft.properties,
			maxPoints
		});
	}, [
		draft.damageType,
		draft.properties,
		draft.secondaryStyle,
		draft.style,
		draft.weaponType,
		maxPoints
	]);
	const typeComplete = Boolean(draft.weaponType);
	const styleComplete = Boolean(draft.style);
	const damageComplete = Boolean(draft.damageType);
	const propertiesComplete = Boolean(validation?.isValid);
	const reviewComplete = propertiesComplete && Boolean(draft.name.trim());

	const update = (changes: Partial<CharacterCustomWeaponDraft>) =>
		onChange({ ...draft, ...changes });

	const selectType = (weaponType: WeaponType) => {
		const definition = WEAPON_TYPES.find((type) => type.id === weaponType);
		update({
			weaponType,
			style: null,
			secondaryStyle: null,
			damageType: null,
			secondaryDamageType: null,
			properties: [...(definition?.inherentProperties ?? [])]
		});
	};

	const selectStyle = (style: WeaponStyle) => {
		const definition = styles.find((candidate) => candidate.id === style);
		update({ style, damageType: definition?.defaultDamageType ?? null });
	};

	const toggleProperty = (propertyId: string) => {
		if (draft.weaponType === 'ranged' && propertyId === 'ammo') return;
		const selected = draft.properties.includes(propertyId);
		let nextProperties = selected
			? draft.properties.filter((current) => current !== propertyId)
			: [...draft.properties, propertyId];
		if (selected && ['toss', 'thrown'].includes(propertyId)) {
			const stillThrowable = nextProperties.some((id) => ['toss', 'thrown'].includes(id));
			if (!stillThrowable) nextProperties = nextProperties.filter((id) => id !== 'returning');
		}
		if (selected && propertyId === 'two-handed') {
			nextProperties = nextProperties.filter((id) => !['heavy', 'heavy-ranged'].includes(id));
		}
		update({
			properties: nextProperties,
			...(propertyId === 'multi-faceted' && selected
				? { secondaryStyle: null, secondaryDamageType: null }
				: {})
		});
	};

	const typeContent = (
		<>
			<ComposerChoiceGrid>
				{WEAPON_TYPES.map((type) => (
					<ComposerChoice
						key={type.id}
						type="button"
						$selected={draft.weaponType === type.id}
						aria-pressed={draft.weaponType === type.id}
						data-option-id={type.id}
						onClick={() => selectType(type.id)}
					>
						<ComposerChoiceTitle>{type.name}</ComposerChoiceTitle>
						<ComposerChoiceMeta>{type.description}</ComposerChoiceMeta>
					</ComposerChoice>
				))}
			</ComposerChoiceGrid>
		</>
	);

	const styleContent = (
		<>
			<ComposerChoiceGrid>
				{styles.map((style) => (
					<ComposerChoice
						key={style.id}
						type="button"
						$selected={draft.style === style.id}
						aria-pressed={draft.style === style.id}
						data-option-id={style.id}
						onClick={() => selectStyle(style.id)}
					>
						<ComposerChoiceTitle>{style.name}</ComposerChoiceTitle>
						<ComposerChoiceMeta>
							{style.enhancement.name} · {style.defaultDamageType}
						</ComposerChoiceMeta>
						<ComposerChoiceDescription>{style.enhancement.effect}</ComposerChoiceDescription>
					</ComposerChoice>
				))}
			</ComposerChoiceGrid>
		</>
	);

	const damageContent = (
		<ComposerDamageChoiceGrid>
			{PHYSICAL_DAMAGE_TYPES.map((damageType) => (
				<ComposerChoice
					key={damageType}
					type="button"
					$selected={draft.damageType === damageType}
					aria-pressed={draft.damageType === damageType}
					data-option-id={damageType}
					onClick={() => update({ damageType })}
				>
					<ComposerChoiceTitle>{damageType}</ComposerChoiceTitle>
				</ComposerChoice>
			))}
		</ComposerDamageChoiceGrid>
	);

	const propertyContent = (
		<>
			<ComposerPoints
				$invalid={internalPoints > maxPoints}
				data-budget-id="weapon-properties"
				data-budget-remaining={Math.max(0, 2 - rulebookPoints)}
			>
				{t('characterSheet.customWeaponPropertyPoints', {
					used: rulebookPoints,
					max: 2
				})}
			</ComposerPoints>
			{draft.weaponType === 'ranged' ? (
				<ComposerAutomatic>
					<ComposerAutomaticLabel>
						{t('characterSheet.customWeaponAutomaticProperties')}
					</ComposerAutomaticLabel>
					<ComposerBadge>Ammo</ComposerBadge>
					{draft.properties.includes('two-handed') ? (
						<ComposerBadge>Two-Handed</ComposerBadge>
					) : (
						<ComposerBadge>{t('characterSheet.customWeaponOneHanded')}</ComposerBadge>
					)}
					<ComposerInlineAction type="button" onClick={() => toggleProperty('two-handed')}>
						{draft.properties.includes('two-handed')
							? t('characterSheet.customWeaponRemoveTwoHanded')
							: t('characterSheet.customWeaponRestoreTwoHanded')}
					</ComposerInlineAction>
				</ComposerAutomatic>
			) : null}
			<ComposerPropertyList>
				{selectableProperties.map((property) => {
					const selected = draft.properties.includes(property.id);
					const requirementsMet =
						(!property.requires ||
							property.requires.every((required) => draft.properties.includes(required))) &&
						(!property.requiresOneOf ||
							property.requiresOneOf.some((required) => draft.properties.includes(required)));
					const excluded = property.excludes?.some((propertyId) =>
						draft.properties.includes(propertyId)
					);
					const wouldExceed = !selected && internalPoints + property.cost > maxPoints;
					return (
						<ComposerChoice
							key={property.id}
							type="button"
							$selected={selected}
							aria-pressed={selected}
							aria-disabled={wouldExceed || (!selected && (!requirementsMet || Boolean(excluded)))}
							disabled={wouldExceed || (!selected && (!requirementsMet || Boolean(excluded)))}
							data-option-id={property.id}
							onClick={() => toggleProperty(property.id)}
						>
							<ComposerChoiceTitle>
								{property.name} ({property.cost > 0 ? `+${property.cost}` : property.cost})
							</ComposerChoiceTitle>
							<ComposerChoiceDescription>{property.description}</ComposerChoiceDescription>
						</ComposerChoice>
					);
				})}
			</ComposerPropertyList>

			{draft.properties.includes('multi-faceted') ? (
				<ComposerSection>
					<ComposerLabel>{t('characterSheet.customWeaponSecondaryStyle')}</ComposerLabel>
					<ComposerChoiceGrid>
						{styles
							.filter((style) => style.id !== draft.style)
							.map((style) => (
								<ComposerChoice
									key={style.id}
									type="button"
									$selected={draft.secondaryStyle === style.id}
									aria-pressed={draft.secondaryStyle === style.id}
									data-option-id={`secondary-${style.id}`}
									onClick={() =>
										update({
											secondaryStyle: style.id,
											secondaryDamageType: style.defaultDamageType
										})
									}
								>
									<ComposerChoiceTitle>{style.name}</ComposerChoiceTitle>
									<ComposerChoiceMeta>{style.enhancement.name}</ComposerChoiceMeta>
								</ComposerChoice>
							))}
					</ComposerChoiceGrid>
					{draft.secondaryStyle ? (
						<ComposerSection>
							<ComposerLabel>{t('characterSheet.customWeaponSecondaryDamageType')}</ComposerLabel>
							<ComposerChoiceGrid>
								{PHYSICAL_DAMAGE_TYPES.map((damageType) => (
									<ComposerChoice
										key={damageType}
										type="button"
										$selected={draft.secondaryDamageType === damageType}
										aria-pressed={draft.secondaryDamageType === damageType}
										onClick={() => update({ secondaryDamageType: damageType })}
									>
										<ComposerChoiceTitle>{damageType}</ComposerChoiceTitle>
									</ComposerChoice>
								))}
							</ComposerChoiceGrid>
						</ComposerSection>
					) : null}
				</ComposerSection>
			) : null}

			{validation?.errors.map((error) => (
				<ComposerError key={`${error.propertyId ?? 'weapon'}-${error.message}`} role="alert">
					{error.message}
				</ComposerError>
			))}
		</>
	);

	const reviewContent = (
		<>
			<ComposerLabel htmlFor="custom-weapon-name">
				{t('characterSheet.customWeaponName')}
			</ComposerLabel>
			<ComposerInput
				id="custom-weapon-name"
				value={draft.name}
				aria-invalid={!draft.name.trim()}
				placeholder={t('characterSheet.customWeaponNamePlaceholder')}
				onChange={(event) => update({ name: event.target.value })}
			/>
			<ComposerText>{t('characterSheet.customWeaponScopeHelp')}</ComposerText>
			<ComposerReviewGrid>
				<ComposerReviewItem>
					<dt>{t('characterSheet.customWeaponReviewType')}</dt>
					<dd>{typeDefinition?.name ?? '—'}</dd>
				</ComposerReviewItem>
				<ComposerReviewItem>
					<dt>{t('characterSheet.customWeaponReviewStyle')}</dt>
					<dd>
						{selectedStyle?.name ?? '—'}
						{selectedSecondaryStyle ? ` / ${selectedSecondaryStyle.name}` : ''}
					</dd>
				</ComposerReviewItem>
				<ComposerReviewItem>
					<dt>{t('characterSheet.customWeaponReviewDamage')}</dt>
					<dd>
						1 {draft.damageType ?? '—'}
						{draft.secondaryDamageType ? ` / ${draft.secondaryDamageType}` : ''}
					</dd>
				</ComposerReviewItem>
				<ComposerReviewItem>
					<dt>{t('characterSheet.customWeaponReviewProperties')}</dt>
					<dd>{selectedPropertyNames.join(' · ') || t('characterSheet.customWeaponNone')}</dd>
				</ComposerReviewItem>
			</ComposerReviewGrid>
		</>
	);

	const steps: EquipmentBuildSheetStep[] = [
		{
			id: 'type',
			title: t('characterSheet.customWeaponStepType'),
			summary: typeDefinition?.name ?? t('characterSheet.customWeaponNotStarted'),
			guidance: t('characterSheet.customWeaponTypeHelp'),
			complete: typeComplete,
			content: typeContent
		},
		{
			id: 'style',
			stepLabel: '2',
			title: t('characterSheet.customWeaponStepStyle'),
			summary: selectedStyle?.name ?? t('characterSheet.customWeaponNotStarted'),
			guidance: t('characterSheet.customWeaponStyleHelp'),
			complete: styleComplete,
			disabled: !typeComplete,
			content: styleContent
		},
		{
			id: 'damage',
			stepLabel: '2.5',
			title: t('characterSheet.customWeaponStepDamage'),
			summary: draft.damageType ?? t('characterSheet.customWeaponNotStarted'),
			guidance: t('characterSheet.customWeaponDamageHelp'),
			complete: damageComplete,
			disabled: !styleComplete,
			content: damageContent
		},
		{
			id: 'properties',
			stepLabel: '3',
			title: t('characterSheet.customWeaponStepProperties'),
			summary: selectedPropertyNames.join(' · ') || t('characterSheet.customWeaponNone'),
			guidance: t('characterSheet.customWeaponPropertiesHelp'),
			complete: propertiesComplete,
			disabled: !damageComplete,
			content: propertyContent
		},
		{
			id: 'review',
			stepLabel: '4',
			title: t('characterSheet.customWeaponStepReview'),
			summary: draft.name.trim() || t('characterSheet.customWeaponNameAndCreate'),
			guidance: t('characterSheet.customWeaponReviewHelp'),
			complete: reviewComplete,
			disabled: !propertiesComplete,
			content: reviewContent
		}
	];
	const activeStepId = steps[draft.step - 1]?.id ?? 'type';

	return (
		<Composer data-testid="custom-weapon-composer">
			<EquipmentBuildSheet
				ariaLabel={t('characterSheet.customWeaponProgress')}
				flowId="custom-weapon-build-sheet"
				activeStepId={activeStepId}
				steps={steps}
				onStepChange={(stepId) => {
					const nextStep = steps.findIndex((step) => step.id === stepId) + 1;
					if (nextStep > 0) update({ step: nextStep as CustomWeaponComposerStep });
				}}
			/>
		</Composer>
	);
}
