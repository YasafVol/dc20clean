import React from 'react';
import type { AttackData, CharacterSheetData } from '../../../types';
import { weapons, type Weapon, WeaponType } from '../../../lib/rulesdata/inventoryItems';
import { useCharacterAttacks, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	parseDamage,
	getDamageType,
	isRangedWeapon,
	calculateAttackBonus,
	calculateDamage,
	getVersatileDamage,
	getWeaponFeatures,
	createEmptyAttackData
} from '../../../lib/utils/weaponUtils';
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
	StyledRemoveButton,
	StyledWeaponSelect,
	StyledDamageCell,
	StyledInfoIcon,
	StyledDamageTypeCell
} from '../styles/Attacks';

export interface AttacksProps {
	characterData: CharacterSheetData;
	onAttackClick: (attack: AttackData, weapon: Weapon | null) => void;
}

const Attacks: React.FC<AttacksProps> = ({ characterData, onAttackClick }) => {
	const { addAttack, removeAttack, dispatch } = useCharacterSheet();
	const attacks = useCharacterAttacks();
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
	};

	const removeWeaponSlot = (attackIndex: number) => {
		const attackToRemove = attacks[attackIndex];
		if (attackToRemove) {
			removeAttack(attackToRemove.id);
		}
	};

	const handleWeaponSelect = (attackIndex: number, weaponName: string) => {
		console.log('Selecting weapon:', weaponName);
		const weapon = weapons.find((w) => w.name === weaponName);
		if (!weapon) {
			console.error('Weapon not found:', weaponName);
			return;
		}
		console.log('Found weapon:', weapon);

		const newAttackData = calculateAttackData(weapon);

		const attackToUpdate = attacks[attackIndex];
		if (attackToUpdate) {
			const updatedAttack = { ...newAttackData, id: attackToUpdate.id };
			dispatch({ type: 'UPDATE_ATTACK', attackId: attackToUpdate.id, attack: updatedAttack });
		}
	};

	const calculateAttackData = (weapon: Weapon): AttackData => {
		if (!weapon || !characterData) {
			return createEmptyAttackData(weapon?.name);
		}

		const mightMod = Math.floor((characterData.finalMight - 10) / 2);
		const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);

		const attackBonus = calculateAttackBonus(
			weapon,
			characterData.finalCombatMastery,
			mightMod,
			agilityMod
		);

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
			attackBonus,
			damage: damageString,
			damageType,
			critRange,
			critDamage,
			brutalDamage,
			heavyHitEffect
		};
	};

	return (
		<StyledAttacksSection>
			<StyledAttacksHeader>
				<StyledAttacksTitle>ATTACKS</StyledAttacksTitle>
				<StyledAddWeaponButton onClick={addWeaponSlot}>+ Add Weapon</StyledAddWeaponButton>
			</StyledAttacksHeader>

			<StyledAttacksContainer>
				<StyledAttacksHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledHeaderColumn>Weapon</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Base
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Heavy
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Brutal
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">Type</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						<StyledInfoIcon>i</StyledInfoIcon>
					</StyledHeaderColumn>
				</StyledAttacksHeaderRow>

				{attacks.length === 0 ? (
					<StyledEmptyState>
						No weapons added. Click "Add Weapon" to add your first weapon.
					</StyledEmptyState>
				) : (
					attacks.map((attack, index) => {
						const weapon = attack.weaponName
							? weapons.find((w) => w.name === attack.weaponName)
							: null;

						return (
							<StyledAttackRow key={attack.id}>
								{/* Remove Button */}
								<StyledRemoveButton onClick={() => removeWeaponSlot(index)} title="Remove weapon">
									×
								</StyledRemoveButton>

								{/* Weapon Selection */}
								<StyledWeaponSelect
									value={attack.weaponName}
									onChange={(e: any) => handleWeaponSelect(index, e.target.value)}
								>
									<option value="">Select Weapon...</option>
									{weapons.map((weapon) => (
										<option key={weapon.name} value={weapon.name}>
											{weapon.name} ({weapon.handedness})
										</option>
									))}
								</StyledWeaponSelect>

								{/* Base Damage */}
								<StyledDamageCell
									title={
										weapon
											? `Base weapon damage: ${weapon.damage}${getVersatileDamage(weapon) ? ` (${getVersatileDamage(weapon)?.twoHanded} when two-handed)` : ''}`
											: ''
									}
								>
									{weapon ? attack.damage || weapon.damage : '-'}
								</StyledDamageCell>

								{/* Heavy Damage */}
								<StyledDamageCell
									color="#d2691e"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Heavy Hit: ${calculateDamage(weapon, 'heavy')} damage (base ${weapon.damage} + 1 heavy + 1 impact) + Target must make Might Save or be knocked Prone and pushed 5 feet`
												: `Heavy Hit: ${calculateDamage(weapon, 'heavy')} damage (base ${weapon.damage} + 1 heavy)`
											: ''
									}
								>
									{weapon ? (
										<>
											{calculateDamage(weapon, 'heavy')}
											{weapon.properties.includes('Impact') && (
												<div style={{ fontSize: '0.6rem' }}>+Prone/Push</div>
											)}
										</>
									) : (
										'-'
									)}
								</StyledDamageCell>

								{/* Brutal Damage */}
								<StyledDamageCell
									color="#dc143c"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Brutal Hit: ${calculateDamage(weapon, 'brutal')} damage (base ${weapon.damage} + 2 brutal + 1 impact)`
												: `Brutal Hit: ${calculateDamage(weapon, 'brutal')} damage (base ${weapon.damage} + 2 brutal)`
											: ''
									}
								>
									{weapon ? calculateDamage(weapon, 'brutal') : '-'}
								</StyledDamageCell>

								{/* Damage Type */}
								<StyledDamageTypeCell
									title={weapon ? `${getDamageType(weapon.damage)} damage` : ''}
								>
									{weapon ? parseDamage(weapon.damage).type : '-'}
								</StyledDamageTypeCell>

								{/* Damage Calculation Info */}
								<div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
									{weapon ? (
										<StyledInfoIcon onClick={() => onAttackClick(attack, weapon)}>i</StyledInfoIcon>
									) : (
										'-'
									)}
								</div>
							</StyledAttackRow>
						);
					})
				)}
			</StyledAttacksContainer>
		</StyledAttacksSection>
	);
};

export default Attacks;
