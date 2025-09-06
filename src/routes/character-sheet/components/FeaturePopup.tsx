import React from 'react';
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

interface FeaturePopupProps {
	feature: FeatureData | null;
	onClose: () => void;
}

const FeaturePopup: React.FC<FeaturePopupProps> = ({ feature, onClose }) => {
	if (!feature) return null;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>{feature.name}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>{feature.description}</StyledFeaturePopupDescription>
				{feature.sourceDetail && (
					<StyledFeaturePopupSourceInfo>
						Source: {feature.sourceDetail}
					</StyledFeaturePopupSourceInfo>
				)}
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default FeaturePopup;
