import React from 'react';
import { useTranslation } from 'react-i18next';
import type { FeatureData } from '../../../types';
import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSourceInfo
} from '../styles/FeaturePopup';
import RichDescription from './RichDescription';

interface FeaturePopupProps {
	feature: FeatureData | null;
	onClose: () => void;
}

const FeaturePopup: React.FC<FeaturePopupProps> = ({ feature, onClose }) => {
	const { t } = useTranslation();
	if (!feature) return null;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>{feature.name}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose data-testid="feat-popup-close" onClick={onClose}>
						×
					</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					<RichDescription text={feature.description} />
				</StyledFeaturePopupDescription>
				{feature.sourceDetail && (
					<StyledFeaturePopupSourceInfo>
					{t('characterSheet.featureSource')} {feature.sourceDetail}
					</StyledFeaturePopupSourceInfo>
				)}
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default FeaturePopup;
