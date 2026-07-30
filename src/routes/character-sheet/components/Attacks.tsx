import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { AttackData } from '../../../types';
import { weapons, type Weapon } from '../../../lib/rulesdata/inventoryItems';
import {
	useCharacterAttacks,
	useCharacterInventory,
	useCharacterCalculatedData,
	useCharacterSheet
} from '../hooks/CharacterSheetProvider';
import { getAttackPresentation } from '../attackPresentation';
import { logger } from '../../../lib/utils/logger';
import DeleteButton from './shared/DeleteButton';
import RowEditControls from './shared/RowEditControls';
import {
	parseDamage,
	getDamageType,
	calculateDamage,
	getVersatileDamage,
	createEmptyAttackData
} from '../../../lib/utils/weaponUtils';
import { getNaturalWeaponAttack, isNaturalWeaponAttack } from '../naturalWeaponAttack';
import { getAncestryAttackTraits } from '../ancestryAttackTraits';
import {
	StyledAttacksSection,
	StyledAttacksHeader,
	StyledAttacksTitle,
	StyledAddWeaponButton,
	StyledAttacksContainer,
	StyledAttacksHeaderRow,
	StyledHeaderColumn,
	StyledEmptyState,
	StyledAttackRow,
	StyledWeaponSelect,
	StyledWeaponName,
	StyledAttackIdentity,
	StyledAttackProperties,
	StyledAttackProperty,
	StyledAttackTraitNotes,
	StyledDamageCell,
	StyledInfoIcon,
	StyledDamageTypeCell
} from '../styles/Attacks';
import { theme } from '../styles/theme';

const FilterToggleRow = styled.label`
	display: inline-flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	cursor: pointer;
	user-select: none;
	margin-left: ${theme.spacing[3]};

	input {
		cursor: pointer;
		accent-color: ${theme.colors.accent.primary};
	}
`;

const InlineEmptyHint = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.muted};
	font-style: italic;
	padding: ${theme.spacing[2]} 0;
`;

export interface AttacksProps {
	onAttackClick: (attack: AttackData, weapon: Weapon | null) => void;
	isMobile?: boolean;
	showTitle?: boolean;
	explicitEditMode?: boolean;
}

const Attacks: React.FC<AttacksProps> = ({
	onAttackClick,
	isMobile,
	showTitle = true,
	explicitEditMode = false
}) => {
	const { t } = useTranslation();
	const { addAttack, removeAttack, updateAttack, state } = useCharacterSheet();
	const attacks = useCharacterAttacks();
	const inventory = useCharacterInventory();
	const calculation = useCharacterCalculatedData();
	const [showAllWeapons, setShowAllWeapons] = useState(false);
	const [editingAttackIds, setEditingAttackIds] = useState<Set<string>>(new Set());

	// Build the list of weapons currently in the character's inventory by matching
	// inventory item names against the global weapons catalog. This becomes the
	// default dropdown source so players only see what they actually own.
	const inventoryWeapons = useMemo(() => {
		const inventoryWeaponNames = new Set(
			(inventory?.items || [])
				.filter((item) => item.itemType === 'Weapon' && item.itemName)
				.map((item) => item.itemName)
		);
		return weapons.filter((w) => inventoryWeaponNames.has(w.name));
	}, [inventory?.items]);

	if (!state.character) {
		return <div>{t('characterSheet.attacksLoading')}</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	const characterData = state.character;
	const naturalWeaponAttack = getNaturalWeaponAttack(characterData.selectedTraitIds);
	const displayedAttacks = naturalWeaponAttack ? [naturalWeaponAttack, ...attacks] : attacks;
	const visibleWeapons = showAllWeapons ? weapons : inventoryWeapons;
	const showNoInventoryWeaponsHint = !showAllWeapons && inventoryWeapons.length === 0;
	const addWeaponSlot = () => {
		const newAttack: AttackData = {
			id: `attack_${Date.now()}`,
			weaponName: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: 'slashing',
			critRange: '20',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		};
		addAttack(newAttack);
		if (explicitEditMode) {
			setEditingAttackIds((current) => new Set(current).add(newAttack.id));
		}
	};

	const removeWeaponSlot = (attackIndex: number) => {
		const attackToRemove = attacks[attackIndex];
		if (attackToRemove) {
			removeAttack(attackToRemove.id);
			setEditingAttackIds((current) => {
				const next = new Set(current);
				next.delete(attackToRemove.id);
				return next;
			});
		}
	};

	const toggleAttackEditing = (attackId: string) => {
		setEditingAttackIds((current) => {
			const next = new Set(current);
			if (next.has(attackId)) next.delete(attackId);
			else next.add(attackId);
			return next;
		});
	};

	const handleWeaponSelect = (attackIndex: number, weaponName: string) => {
		logger.debug('ui', 'Selecting weapon', { weaponName });
		const attackToUpdate = attacks[attackIndex];
		if (!attackToUpdate) return;

		// Selecting the default "Select Weapon..." option clears the row back to
		// an empty attack rather than silently doing nothing.
		if (!weaponName) {
			const cleared: AttackData = {
				...createEmptyAttackData(''),
				id: attackToUpdate.id
			};
			updateAttack(attackToUpdate.id, cleared);
			return;
		}

		const weapon = weapons.find((w) => w.name === weaponName);
		if (!weapon) {
			logger.error('ui', 'Weapon not found', { weaponName });
			return;
		}
		logger.debug('ui', 'Found weapon', { weaponName: weapon.name });

		const newAttackData = calculateAttackData(weapon);
		const updatedAttack = { ...newAttackData, id: attackToUpdate.id };
		updateAttack(attackToUpdate.id, updatedAttack);
	};

	const calculateAttackData = (weapon: Weapon): AttackData => {
		if (!weapon || !characterData) {
			return createEmptyAttackData(weapon?.name);
		}

		const damageType = getDamageType(weapon.damage);
		const versatileInfo = getVersatileDamage(weapon);
		const damageString = versatileInfo
			? `${versatileInfo.oneHanded} (${versatileInfo.twoHanded} two-handed)`
			: weapon.damage;

		const critRange = '20'; // Default crit range
		const critDamage = calculateDamage(weapon, 'normal');
		const brutalDamage = calculateDamage(weapon, 'brutal');
		const heavyHitEffect = weapon.properties.includes('Impact') ? '+1 damage on Heavy Hit' : '';

		return {
			id: '',
			weaponName: weapon.name,
			name: weapon.name,
			attackBonus: 0,
			damage: damageString,
			damageType,
			critRange,
			critDamage,
			brutalDamage,
			heavyHitEffect
		};
	};

	return (
		<StyledAttacksSection $isMobile={effectiveIsMobile}>
			<StyledAttacksHeader $isMobile={effectiveIsMobile}>
				{showTitle && (
					<StyledAttacksTitle $isMobile={effectiveIsMobile}>
						{t('characterSheet.attacksTitle')}
					</StyledAttacksTitle>
				)}
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FilterToggleRow>
						<input
							type="checkbox"
							checked={showAllWeapons}
							onChange={(e) => setShowAllWeapons(e.target.checked)}
						/>
						{t('characterSheet.attacksShowAllWeapons')}
					</FilterToggleRow>
					<StyledAddWeaponButton
						$isMobile={effectiveIsMobile}
						onClick={addWeaponSlot}
						data-testid="add-weapon"
					>
						+ {t('characterSheet.attacksAddWeapon')}
					</StyledAddWeaponButton>
				</div>
			</StyledAttacksHeader>
			{showNoInventoryWeaponsHint && attacks.length > 0 && (
				<InlineEmptyHint>{t('characterSheet.attacksNoInventoryWeapons')}</InlineEmptyHint>
			)}

			<StyledAttacksContainer $isMobile={effectiveIsMobile}>
				<StyledAttacksHeaderRow $isMobile={effectiveIsMobile} $explicitEditMode={explicitEditMode}>
					{!explicitEditMode && <span aria-hidden="true" />}
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.attacksColumnWeapon')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile} $align="center">
						{t('characterSheet.attacksColumnBaseDmg')
							.split(' ')
							.map((word, i) => (
								<React.Fragment key={i}>
									{word}
									{i === 0 && <br />}
								</React.Fragment>
							))}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile} $align="center">
						{t('characterSheet.attacksColumnHeavyDmg')
							.split(' ')
							.map((word, i) => (
								<React.Fragment key={i}>
									{word}
									{i === 0 && <br />}
								</React.Fragment>
							))}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile} $align="center">
						{t('characterSheet.attacksColumnBrutalDmg')
							.split(' ')
							.map((word, i) => (
								<React.Fragment key={i}>
									{word}
									{i === 0 && <br />}
								</React.Fragment>
							))}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile} $align="center">
						{t('characterSheet.attacksColumnType')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile} $align="center">
						<StyledInfoIcon $isMobile={effectiveIsMobile}>i</StyledInfoIcon>
					</StyledHeaderColumn>
					{explicitEditMode && <span aria-hidden="true" />}
				</StyledAttacksHeaderRow>

				{displayedAttacks.length === 0 ? (
					<StyledEmptyState $isMobile={effectiveIsMobile}>
						{t('characterSheet.attacksNoWeapons')}
					</StyledEmptyState>
				) : (
					displayedAttacks.map((attack, index) => {
						const isDerivedNaturalWeapon = isNaturalWeaponAttack(attack);
						const persistedAttackIndex = attacks.findIndex(
							(persistedAttack) => persistedAttack.id === attack.id
						);
						const weapon = attack.weaponName
							? weapons.find((w) => w.name === attack.weaponName)
							: null;
						const activeConditions = Object.entries(
							characterData.characterState?.ui?.activeConditions ?? {}
						)
							.filter(([, enabled]) => Boolean(enabled))
							.map(([condition]) => condition);
						const basePresentation = getAttackPresentation({
							attack,
							weapon,
							conditionalModifiers: calculation?.conditionalModifiers,
							activeConditions
						});
						const traitPresentation = getAncestryAttackTraits({
							selectedTraitIds: characterData.selectedTraitIds,
							isNaturalWeapon: isDerivedNaturalWeapon,
							isMartialMelee: basePresentation.isMartialMelee,
							isSupportedAttack: basePresentation.isSupportedAttack
						});
						const presentation = getAttackPresentation({
							attack,
							weapon,
							conditionalModifiers: calculation?.conditionalModifiers,
							activeConditions,
							brutalDamageBonus: traitPresentation.brutalDamageBonus
						});
						const isEditing =
							!isDerivedNaturalWeapon && (!explicitEditMode || editingAttackIds.has(attack.id));

						return (
							<StyledAttackRow
								$isMobile={effectiveIsMobile}
								$explicitEditMode={explicitEditMode}
								key={attack.id}
								data-testid={isDerivedNaturalWeapon ? 'natural-weapon-attack-row' : undefined}
							>
								{!explicitEditMode &&
									(isDerivedNaturalWeapon ? (
										<span aria-hidden="true" />
									) : (
										<DeleteButton
											onClick={() => removeWeaponSlot(persistedAttackIndex)}
											title={t('characterSheet.attacksRemoveWeapon')}
											$isMobile={effectiveIsMobile}
										/>
									))}

								{/* Weapon Selection */}
								{isEditing ? (
									<StyledWeaponSelect
										$isMobile={effectiveIsMobile}
										value={attack.weaponName}
										onChange={(e: any) => handleWeaponSelect(persistedAttackIndex, e.target.value)}
										data-testid="weapon-name"
									>
										<option value="">{t('characterSheet.attacksSelectWeapon')}</option>
										{visibleWeapons.map((weapon) => (
											<option key={weapon.name} value={weapon.name}>
												{weapon.name} ({weapon.handedness})
											</option>
										))}
										{attack.weaponName &&
											!visibleWeapons.some((w) => w.name === attack.weaponName) && (
												<option key={attack.weaponName} value={attack.weaponName}>
													{attack.weaponName} {t('characterSheet.attacksNotInInventory')}
												</option>
											)}
									</StyledWeaponSelect>
								) : (
									<StyledAttackIdentity>
										<StyledWeaponName
											data-testid={isDerivedNaturalWeapon ? 'natural-weapon-attack' : undefined}
										>
											{isDerivedNaturalWeapon
												? attack.name
												: attack.weaponName || t('characterSheet.attacksSelectWeapon')}
										</StyledWeaponName>
										{traitPresentation.properties.length > 0 && (
											<StyledAttackProperties aria-label="Attack properties">
												{traitPresentation.properties.map((property) => (
													<StyledAttackProperty key={property}>{property}</StyledAttackProperty>
												))}
											</StyledAttackProperties>
										)}
										{traitPresentation.notes.length > 0 && (
											<StyledAttackTraitNotes aria-label="Attack trait notes">
												{traitPresentation.notes.map((note) => (
													<span key={`${note.source}-${note.text}`}>
														<strong>{note.source}:</strong> {note.text}
													</span>
												))}
											</StyledAttackTraitNotes>
										)}
									</StyledAttackIdentity>
								)}

								{/* Base Damage */}
								<StyledDamageCell
									$isMobile={effectiveIsMobile}
									title={
										weapon
											? `Base weapon damage: ${weapon.damage}${getVersatileDamage(weapon) ? ` (${getVersatileDamage(weapon)?.twoHanded} when two-handed)` : ''}`
											: ''
									}
									data-testid="weapon-damage"
								>
									{presentation.isSupportedAttack ? presentation.baseDamage : '-'}
								</StyledDamageCell>

								{/* Heavy Damage */}
								<StyledDamageCell
									$isMobile={effectiveIsMobile}
									color="#d2691e"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Heavy Hit: ${calculateDamage(weapon, 'heavy')} damage (base ${weapon.damage} + 1 heavy + 1 impact) + Target must make Might Save or be knocked Prone and pushed 5 feet`
												: `Heavy Hit: ${calculateDamage(weapon, 'heavy')} damage (base ${weapon.damage} + 1 heavy)`
											: ''
									}
								>
									{presentation.isSupportedAttack ? (
										<>
											{presentation.heavyDamage}
											{weapon?.properties.includes('Impact') && (
												<div style={{ fontSize: '0.6rem' }}>+Prone/Push</div>
											)}
										</>
									) : (
										'-'
									)}
								</StyledDamageCell>

								{/* Brutal Damage */}
								<StyledDamageCell
									$isMobile={effectiveIsMobile}
									color="#dc143c"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Brutal Hit: ${calculateDamage(weapon, 'brutal')} damage (base ${weapon.damage} + 2 brutal + 1 impact)`
												: `Brutal Hit: ${calculateDamage(weapon, 'brutal')} damage (base ${weapon.damage} + 2 brutal)`
											: ''
									}
								>
									{presentation.isSupportedAttack ? presentation.brutalDamage : '-'}
								</StyledDamageCell>

								{/* Damage Type */}
								<StyledDamageTypeCell
									$isMobile={effectiveIsMobile}
									title={weapon ? `${getDamageType(weapon.damage)} damage` : ''}
								>
									{presentation.isSupportedAttack ? presentation.damageType : '-'}
								</StyledDamageTypeCell>

								{/* Damage Calculation Info */}
								<div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
									{presentation.isSupportedAttack ? (
										<StyledInfoIcon
											$isMobile={effectiveIsMobile}
											onClick={() => onAttackClick(attack, weapon)}
											data-testid="info-btn"
											aria-label={`attack-info-${index + 1}`}
										>
											i
										</StyledInfoIcon>
									) : (
										'-'
									)}
								</div>

								{explicitEditMode &&
									(isDerivedNaturalWeapon ? (
										<span aria-hidden="true" />
									) : (
										<RowEditControls
											isEditing={isEditing}
											onToggle={() => toggleAttackEditing(attack.id)}
											onDelete={() => removeWeaponSlot(persistedAttackIndex)}
											itemLabel="weapon"
											isMobile={effectiveIsMobile}
										/>
									))}
							</StyledAttackRow>
						);
					})
				)}
			</StyledAttacksContainer>
		</StyledAttacksSection>
	);
};

export default Attacks;
