import React from 'react';
import type { AttackData, CharacterSheetData } from '../types';
import {
	WeaponData,
	weaponsData,
	getHeavyHitDamage,
	getBrutalHitDamage,
	getWeaponAttackBonus
} from '../lib/rulesdata/weapons';
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
} from '../routes/character-sheet/styles/Attacks';

export interface AttacksProps {
	attacks: AttackData[];
	setAttacks: React.Dispatch<React.SetStateAction<AttackData[]>>;
	characterData: CharacterSheetData;
}

const Attacks: React.FC<AttacksProps> = ({ attacks, setAttacks, characterData }) => {
	const addWeaponSlot = () => {
		const newAttack: AttackData = {
			id: `attack_${Date.now()}`,
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: 'slashing',
			critRange: '20',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		};
		setAttacks((prev) => [...prev, newAttack]);
	};

	const removeWeaponSlot = (attackIndex: number) => {
		setAttacks((prev) => prev.filter((_, index) => index !== attackIndex));
	};

	const handleWeaponSelect = (attackIndex: number, weaponId: string) => {
		const weapon = weaponsData.find((w) => w.id === weaponId);
		if (!weapon) return;

		const newAttackData = calculateAttackData(weapon);

		setAttacks((prev) =>
			prev.map((attack, index) =>
				index === attackIndex ? { ...newAttackData, id: attack.id } : attack
			)
		);
	};

	const calculateAttackData = (weapon: WeaponData): AttackData => {
		if (!characterData) {
			return {
				id: '',
				weaponId: weapon.id,
				name: weapon.name,
				attackBonus: 0,
				damage: '',
				damageType: weapon.damageType,
				critRange: '',
				critDamage: '',
				brutalDamage: '',
				heavyHitEffect: ''
			};
		}

		const mightMod = Math.floor((characterData.finalMight - 10) / 2);
		const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);

		const attackBonus = getWeaponAttackBonus(
			weapon,
			characterData.finalCombatMastery,
			mightMod,
			agilityMod
		);
		const damageString = weapon.versatileDamage
			? `${weapon.damage}(${weapon.versatileDamage})`
			: weapon.damage.toString();
		const critRange = '20'; // Default crit range
		const critDamage = '';
		const brutalDamage = '';
		const heavyHitEffect = weapon.properties.includes('Impact') ? 'Prone/Push' : '';

		return {
			id: '',
			weaponId: weapon.id,
			name: weapon.name,
			attackBonus,
			damage: damageString,
			damageType: weapon.damageType,
			critRange,
			critDamage,
			brutalDamage,
			heavyHitEffect
		};
	};

	const getDamageCalculationTooltip = (weapon: WeaponData): string => {
		if (!characterData) return '';

		const mightMod = Math.floor((characterData.finalMight - 10) / 2);
		const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
		const baseDamage = weapon.versatileDamage || weapon.damage;
		const hasImpact = weapon.properties.includes('Impact');

		let tooltip = `DC20 Damage Calculation:\n\n`;
		tooltip += `Base Damage: ${baseDamage}${weapon.versatileDamage ? ` (${weapon.damage} one-handed, ${weapon.versatileDamage} two-handed)` : ''}\n`;

		const attributeName = weapon.type === 'ranged' ? 'Agility' : 'Might';
		const attributeValue = weapon.type === 'ranged' ? agilityMod : mightMod;

		if (attributeValue > 0) {
			tooltip += `+ ${attributeName} Modifier: +${attributeValue}\n`;
		}

		tooltip += `\nHit Results:\n`;
		tooltip += `• Hit: ${baseDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${baseDamage + attributeValue}` : ''} damage\n`;

		// Heavy Hit calculation with Impact
		const heavyDamage = getHeavyHitDamage(weapon);
		tooltip += `• Heavy Hit (+5 over Defense): ${heavyDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${heavyDamage + attributeValue}` : ''} damage`;
		if (hasImpact) {
			tooltip += ` (base ${baseDamage} + 1 heavy + 1 impact)`;
		} else {
			tooltip += ` (base ${baseDamage} + 1 heavy)`;
		}
		tooltip += `\n`;

		if (hasImpact) {
			tooltip += `  └─ Impact: Target must make Might Save or be knocked Prone and pushed 5 feet\n`;
		}

		// Brutal Hit calculation with Impact
		const brutalDamage = getBrutalHitDamage(weapon);
		tooltip += `• Brutal Hit (+10 over Defense): ${brutalDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${brutalDamage + attributeValue}` : ''} damage`;
		if (hasImpact) {
			tooltip += ` (base ${baseDamage} + 2 brutal + 1 impact)`;
		} else {
			tooltip += ` (base ${baseDamage} + 2 brutal)`;
		}
		tooltip += `\n`;

		if (weapon.properties.length > 0) {
			tooltip += `\nWeapon Properties: ${weapon.properties.join(', ')}`;
		}

		if (weapon.specialNotes) {
			tooltip += `\nSpecial: ${weapon.specialNotes}`;
		}

		return tooltip;
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
						<StyledInfoIcon title="Damage calculation info">i</StyledInfoIcon>
					</StyledHeaderColumn>
				</StyledAttacksHeaderRow>

				{attacks.length === 0 ? (
					<StyledEmptyState>
						No weapons added. Click "Add Weapon" to add your first weapon.
					</StyledEmptyState>
				) : (
					attacks.map((attack, index) => {
						const weapon = attack.weaponId
							? weaponsData.find((w) => w.id === attack.weaponId)
							: null;

						return (
							<StyledAttackRow key={attack.id}>
								{/* Remove Button */}
								<StyledRemoveButton onClick={() => removeWeaponSlot(index)} title="Remove weapon">
									×
								</StyledRemoveButton>

								{/* Weapon Selection */}
								<StyledWeaponSelect
									value={attack.weaponId}
									onChange={(e) => handleWeaponSelect(index, e.target.value)}
								>
									<option value="">Select Weapon...</option>
									{weaponsData.map((weapon) => (
										<option key={weapon.id} value={weapon.id}>
											{weapon.name} ({weapon.weightCategory})
										</option>
									))}
								</StyledWeaponSelect>

								{/* Base Damage */}
								<StyledDamageCell
									title={
										weapon
											? `Base weapon damage: ${weapon.damage}${weapon.versatileDamage ? ` (${weapon.versatileDamage} when two-handed)` : ''}`
											: ''
									}
								>
									{weapon
										? weapon.versatileDamage
											? `${weapon.damage}(${weapon.versatileDamage})`
											: weapon.damage
										: '-'}
								</StyledDamageCell>

								{/* Heavy Damage */}
								<StyledDamageCell
									color="#d2691e"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy + 1 impact) + Target must make Might Save or be knocked Prone and pushed 5 feet`
												: `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy)`
											: ''
									}
								>
									{weapon ? (
										<>
											{getHeavyHitDamage(weapon)}
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
												? `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal + 1 impact)`
												: `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal)`
											: ''
									}
								>
									{weapon ? getBrutalHitDamage(weapon) : '-'}
								</StyledDamageCell>

								{/* Damage Type */}
								<StyledDamageTypeCell title={weapon ? `${weapon.damageType} damage` : ''}>
									{weapon
										? weapon.damageType === 'slashing'
											? 'S'
											: weapon.damageType === 'piercing'
												? 'P'
												: weapon.damageType === 'bludgeoning'
													? 'B'
													: 'X'
										: '-'}
								</StyledDamageTypeCell>

								{/* Damage Calculation Info */}
								<div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
									{weapon ? (
										<StyledInfoIcon title={getDamageCalculationTooltip(weapon)}>i</StyledInfoIcon>
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
