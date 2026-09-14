import React from 'react';
import type { AttackData } from '../../../types';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation, type AttackPresentation } from '../attackPresentation';
import { isNaturalWeaponAttack } from '../naturalWeaponAttack';
import {
	StyledFeaturePopupClose,
	StyledFeaturePopupOverlay,
	StyledFeaturePopupTitle
} from '../styles/FeaturePopup';
import {
	StyledAttackPopupContent,
	StyledAttackPopupHeader,
	StyledAttackPopupSubtitle
} from '../styles/AttackPopup.styles';
import WeaponAttackDetails from './WeaponAttackDetails';

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

	const { attack, weapon } = selectedAttack;
	const presentation = selectedAttack.presentation ?? getAttackPresentation({ attack, weapon });
	const isDerivedNaturalWeapon = isNaturalWeaponAttack(attack);
	const title = weapon?.name || attack.name || 'Unknown Weapon';

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledAttackPopupContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="attack-popup-title"
				onClick={(event) => event.stopPropagation()}
			>
				<StyledAttackPopupHeader>
					<div>
						<StyledFeaturePopupTitle id="attack-popup-title">{title}</StyledFeaturePopupTitle>
						<StyledAttackPopupSubtitle>
							{weapon
								? 'Weapon details and attack rules'
								: isDerivedNaturalWeapon
									? 'Derived Attack'
									: 'Custom Attack'}
						</StyledAttackPopupSubtitle>
					</div>
					<StyledFeaturePopupClose
						type="button"
						aria-label="Close attack details"
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</StyledAttackPopupHeader>

				<WeaponAttackDetails attack={attack} weapon={weapon} presentation={presentation} />
			</StyledAttackPopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default AttackPopup;
