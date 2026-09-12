import React from 'react';
import type { AttackData } from '../../../types';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation, type AttackPresentation } from '../attackPresentation';
import { isNaturalWeaponAttack } from '../naturalWeaponAttack';
import {
	getVersatileDamage,
	getWeaponRange,
	getWeaponFeatures,
	parseDamage
} from '../../../lib/utils/weaponUtils';
import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSeparatedDetail
} from '../styles/FeaturePopup';

const formatDamageAmount = (damage: string): string => damage.match(/\d+/g)?.join(' / ') ?? '-';

interface AttackPopupProps {
	selectedAttack: {
		attack: AttackData;
		weapon: Weapon | null;
		presentation?: AttackPresentation;
	} | null;
	onClose: () => void;
}

const AttackPopup: React.FC<AttackPopupProps> = ({ selectedAttack, onClose }) => {
	if (!selectedAttack) return null;
	const presentation =
		selectedAttack.presentation ??
		getAttackPresentation({ attack: selectedAttack.attack, weapon: selectedAttack.weapon });
	const isDerivedNaturalWeapon = isNaturalWeaponAttack(selectedAttack.attack);

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>
						{selectedAttack.weapon?.name || selectedAttack.attack.name || 'Unknown Weapon'}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose
						type="button"
						aria-label="Close attack details"
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					{selectedAttack.weapon ? (
						<>
							<strong>Weapon Type:</strong> {selectedAttack.weapon.type}
							<br />
							<strong>Handedness:</strong> {selectedAttack.weapon.handedness}
							<br />
							<strong>Style:</strong>{' '}
							{Array.isArray(selectedAttack.weapon.style)
								? selectedAttack.weapon.style.join('/')
								: selectedAttack.weapon.style}
							<br />
							<strong>Damage:</strong> {selectedAttack.weapon.damage}
							<br />
							{getVersatileDamage(selectedAttack.weapon) && (
								<>
									<strong>Versatile Damage:</strong>{' '}
									{getVersatileDamage(selectedAttack.weapon)?.twoHanded}
									<br />
								</>
							)}
							<strong>Damage Type:</strong> {parseDamage(selectedAttack.weapon.damage).typeDisplay}
							<br />
							{getWeaponRange(selectedAttack.weapon) && (
								<>
									<strong>Range:</strong> {getWeaponRange(selectedAttack.weapon)?.short}/
									{getWeaponRange(selectedAttack.weapon)?.long}
									<br />
								</>
							)}
							{selectedAttack.weapon.properties.includes('Ammo') && (
								<>
									<strong>Ammunition:</strong> Required
									<br />
								</>
							)}
							{selectedAttack.weapon.properties.includes('Reload') && (
								<>
									<strong>Reload:</strong> Required
									<br />
								</>
							)}
							<br />
							<strong>Damage Calculations:</strong>
							<br />• <strong>Hit:</strong> {formatDamageAmount(presentation.baseDamage)}
							<br />• <strong>Heavy Hit (+5):</strong>{' '}
							{formatDamageAmount(presentation.heavyDamage)}
							<br />• <strong>Brutal Hit (+10):</strong>{' '}
							{formatDamageAmount(presentation.brutalDamage)}
							<br />
							<br />
							{selectedAttack.weapon.properties.length > 0 && (
								<>
									<strong>Properties:</strong> {selectedAttack.weapon.properties.join(', ')}
									<br />
								</>
							)}
							{getWeaponFeatures(selectedAttack.weapon).length > 0 && (
								<>
									<strong>Features:</strong> {getWeaponFeatures(selectedAttack.weapon).join(', ')}
								</>
							)}
						</>
					) : (
						<>
							<strong>{isDerivedNaturalWeapon ? 'Derived Attack' : 'Custom Attack'}</strong>
							<br />
							{!isDerivedNaturalWeapon && selectedAttack.attack.attackBonus !== 0 && (
								<>
									<strong>Attack Bonus:</strong> +{selectedAttack.attack.attackBonus}
									<br />
								</>
							)}
							<strong>Hit:</strong> {formatDamageAmount(presentation.baseDamage)}
							<br />
							<strong>Heavy Hit:</strong> {formatDamageAmount(presentation.heavyDamage)}
							<br />
							<strong>Brutal Hit:</strong> {formatDamageAmount(presentation.brutalDamage)}
							<StyledFeaturePopupSeparatedDetail data-testid="attack-damage-type">
								<strong>Damage Type:</strong> {selectedAttack.attack.damageType}
							</StyledFeaturePopupSeparatedDetail>
							{selectedAttack.attack.heavyHitEffect && (
								<>
									<strong>Heavy Hit Effect:</strong> {selectedAttack.attack.heavyHitEffect}
								</>
							)}
						</>
					)}
				</StyledFeaturePopupDescription>
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default AttackPopup;
