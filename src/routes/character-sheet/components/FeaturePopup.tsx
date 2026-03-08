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
					<div>{feature.description}</div>
					{feature.benefits && feature.benefits.length > 0 && (
						<ul className="mt-3 list-disc space-y-2 pl-5">
							{feature.benefits.map((benefit) => (
								<li key={benefit.name}>
									<strong>{benefit.name}:</strong> {benefit.description}
								</li>
							))}
						</ul>
					)}
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
