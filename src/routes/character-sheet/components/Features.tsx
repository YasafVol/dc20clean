import React from 'react';
import type { FeatureData } from '../../../types';
import { useCharacterSheet, useCharacterFeatures } from '../hooks/CharacterSheetProvider';
import {
	StyledFeaturesContainer,
	StyledFeaturesTitle,
	StyledFeatureCategory,
	StyledFeatureCategoryTitle,
	StyledFeatureGrid,
	StyledFeatureItem,
	StyledFeatureName,
	StyledFeatureReadMore,
	StyledNoFeaturesMessage,
	StyledFeaturesContent
} from '../styles/Features.styles';

interface FeaturesProps {
	onFeatureClick: (feature: FeatureData) => void;
	isMobile?: boolean;
}

const Features: React.FC<FeaturesProps> = ({ onFeatureClick, isMobile }) => {
	const { state } = useCharacterSheet();
	const features = useCharacterFeatures(); // Use our enhanced hook!

	if (!state.character) {
		return <div>Loading features...</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	// Organize features by source
	const ancestryFeatures = features.filter((f) => f.source === 'ancestry');
	const classFeatures = features.filter((f) => f.source === 'class');
	const choiceFeatures = features.filter((f) => f.source === 'choice');

	return (
		<StyledFeaturesContainer $isMobile={effectiveIsMobile}>
			<StyledFeaturesTitle $isMobile={effectiveIsMobile}>FEATURES</StyledFeaturesTitle>

			<StyledFeaturesContent $isMobile={effectiveIsMobile}>
				{/* Ancestry Traits */}
				{ancestryFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>Ancestry Traits</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{ancestryFeatures.map((feature) => (
								<StyledFeatureItem $isMobile={effectiveIsMobile} key={feature.id}>
									<StyledFeatureName $isMobile={effectiveIsMobile}>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore $isMobile={effectiveIsMobile} onClick={() => onFeatureClick(feature)}>
										i
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Class Features */}
				{classFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>Class Features</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{classFeatures.map((feature) => (
								<StyledFeatureItem $isMobile={effectiveIsMobile} key={feature.id}>
									<StyledFeatureName $isMobile={effectiveIsMobile}>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore $isMobile={effectiveIsMobile} onClick={() => onFeatureClick(feature)}>
										i
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Feature Choices */}
				{choiceFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>Selected Features</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{choiceFeatures.map((feature) => (
								<StyledFeatureItem $isMobile={effectiveIsMobile} key={feature.id}>
									<StyledFeatureName $isMobile={effectiveIsMobile}>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore $isMobile={effectiveIsMobile} onClick={() => onFeatureClick(feature)}>
										i
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* No features message */}
				{features.length === 0 && (
					<StyledNoFeaturesMessage $isMobile={effectiveIsMobile}>No features available</StyledNoFeaturesMessage>
				)}
			</StyledFeaturesContent>
		</StyledFeaturesContainer>
	);
};

export default Features;
