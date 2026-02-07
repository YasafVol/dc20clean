import React from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	if (!weapon) return null;

	const styleText = Array.isArray(weapon.style) ? weapon.style.join(', ') : weapon.style;
	const propertiesText = weapon.properties.length > 0 ? weapon.properties.join(', ') : t('characterSheet.weaponNone');

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>{weapon.name}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>

				<StyledFeaturePopupDescription>
				<strong>{t('characterSheet.weaponType')}</strong> {weapon.type}
				<br />
				<strong>{t('characterSheet.weaponStyle')}</strong> {styleText}
				<br />
				<strong>{t('characterSheet.weaponHandedness')}</strong> {weapon.handedness}
				<br />
				<strong>{t('characterSheet.weaponDamage')}</strong> {weapon.damage}
				<br />
				<strong>{t('characterSheet.weaponProperties')}</strong> {propertiesText}
			</StyledFeaturePopupDescription>

			<StyledFeaturePopupSourceInfo>{t('characterSheet.weaponDatabase')}</StyledFeaturePopupSourceInfo>
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default WeaponPopup;
