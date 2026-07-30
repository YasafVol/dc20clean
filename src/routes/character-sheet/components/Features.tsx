import React from 'react';
import { useTranslation } from 'react-i18next';
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
	StyledNoFeaturesMessage,
	StyledFeaturesContent
} from '../styles/Features.styles';

interface FeaturesProps {
	onFeatureClick: (feature: FeatureData) => void;
	isMobile?: boolean;
	showTitle?: boolean;
}

const Features: React.FC<FeaturesProps> = ({ onFeatureClick, isMobile, showTitle = true }) => {
	const { t } = useTranslation();
	const { state } = useCharacterSheet();
	const features = useCharacterFeatures(); // Use our enhanced hook!

	if (!state.character) {
		return <div>{t('characterSheet.featuresLoading')}</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	// Organize features by source
	const ancestryFeatures = features.filter((f) => f.source === 'ancestry');
	const classFeatures = features.filter((f) => f.source === 'class');
	const subclassFeatures = features.filter((f) => f.source === 'subclass');
	const talentFeatures = features.filter((f) => f.source === 'talent');
	const pathFeatures = features.filter((f) => f.source === 'path');
	const choiceFeatures = features.filter((f) => f.source === 'choice');

	return (
		<StyledFeaturesContainer $isMobile={effectiveIsMobile}>
			{showTitle && (
				<StyledFeaturesTitle $isMobile={effectiveIsMobile}>
					{t('characterSheet.featuresTitle')}
				</StyledFeaturesTitle>
			)}

			<StyledFeaturesContent $isMobile={effectiveIsMobile}>
				{/* Ancestry Traits */}
				{ancestryFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresAncestryTraits')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{ancestryFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Class Features */}
				{classFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresClassFeatures')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{classFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Subclass Features */}
				{subclassFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresSubclassFeatures')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{subclassFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Path Progression */}
				{pathFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresPathProgression')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{pathFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Talents */}
				{talentFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresTalents')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{talentFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Feature Choices */}
				{choiceFeatures.length > 0 && (
					<StyledFeatureCategory $isMobile={effectiveIsMobile}>
						<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>
							{t('characterSheet.featuresSelectedFeatures')}
						</StyledFeatureCategoryTitle>
						<StyledFeatureGrid $isMobile={effectiveIsMobile}>
							{choiceFeatures.map((feature) => (
								<StyledFeatureItem
									$isMobile={effectiveIsMobile}
									key={feature.id}
									type="button"
									onClick={() => onFeatureClick(feature)}
								>
									<StyledFeatureName $isMobile={effectiveIsMobile}>
										{feature.name}
									</StyledFeatureName>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* No features message */}
				{features.length === 0 && (
					<StyledNoFeaturesMessage $isMobile={effectiveIsMobile}>
						{t('characterSheet.featuresNoFeatures')}
					</StyledNoFeaturesMessage>
				)}
			</StyledFeaturesContent>
		</StyledFeaturesContainer>
	);
};

export default Features;
