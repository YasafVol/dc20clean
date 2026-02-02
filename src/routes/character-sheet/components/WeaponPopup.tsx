import React from 'react';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSourceInfo
} from '../styles/FeaturePopup';

interface WeaponPopupProps {
	weapon: Weapon | null;
	onClose: () => void;
}

const WeaponPopup: React.FC<WeaponPopupProps> = ({ weapon, onClose }) => {
	if (!weapon) return null;

	const styleText = Array.isArray(weapon.style) ? weapon.style.join(', ') : weapon.style;
	const propertiesText = weapon.properties.length > 0 ? weapon.properties.join(', ') : 'None';

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>{weapon.name}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>

				<StyledFeaturePopupDescription>
					<strong>Type:</strong> {weapon.type}
					<br />
					<strong>Style:</strong> {styleText}
					<br />
					<strong>Handedness:</strong> {weapon.handedness}
					<br />
					<strong>Damage:</strong> {weapon.damage}
					<br />
					<strong>Properties:</strong> {propertiesText}
				</StyledFeaturePopupDescription>

				<StyledFeaturePopupSourceInfo>Weapon Database</StyledFeaturePopupSourceInfo>
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default WeaponPopup;
