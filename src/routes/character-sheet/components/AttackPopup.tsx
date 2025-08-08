import React from 'react';
import type { AttackData } from '../../../types';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
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
	StyledFeaturePopupDescription
} from '../styles/FeaturePopup';

interface AttackPopupProps {
	selectedAttack: {
		attack: AttackData;
		weapon: Weapon | null;
	} | null;
	onClose: () => void;
}

const AttackPopup: React.FC<AttackPopupProps> = ({ selectedAttack, onClose }) => {
	if (!selectedAttack) return null;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>
						{selectedAttack.weapon?.name || selectedAttack.attack.name || 'Unknown Weapon'}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
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
							<strong>Damage Type:</strong>{' '}
							{parseDamage(selectedAttack.weapon.damage).typeDisplay}
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
							<br />• <strong>Hit:</strong> {selectedAttack.weapon.damage} + ability modifier
							<br />• <strong>Heavy Hit (+5):</strong> {selectedAttack.weapon.damage} + 1 +
							ability modifier
							<br />• <strong>Brutal Hit (+10):</strong> {selectedAttack.weapon.damage} + 2 +
							ability modifier
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
									<strong>Features:</strong>{' '}
									{getWeaponFeatures(selectedAttack.weapon).join(', ')}
								</>
							)}
						</>
					) : (
						<>
							<strong>Custom Attack</strong>
							<br />
							<strong>Attack Bonus:</strong> +{selectedAttack.attack.attackBonus}
							<br />
							<strong>Damage:</strong> {selectedAttack.attack.damage}
							<br />
							<strong>Damage Type:</strong> {selectedAttack.attack.damageType}
							<br />
							{selectedAttack.attack.critRange && (
								<>
									<strong>Crit Range:</strong> {selectedAttack.attack.critRange}
									<br />
								</>
							)}
							{selectedAttack.attack.critDamage && (
								<>
									<strong>Crit Damage:</strong> {selectedAttack.attack.critDamage}
									<br />
								</>
							)}
							{selectedAttack.attack.brutalDamage && (
								<>
									<strong>Brutal Damage:</strong> {selectedAttack.attack.brutalDamage}
									<br />
								</>
							)}
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
