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
	StyledFeatureReadMore,
	StyledNoFeaturesMessage,
	StyledFeaturesContent
} from '../styles/Features.styles';

interface FeaturesProps {
	onFeatureClick: (feature: FeatureData) => void;
	isMobile?: boolean;
}

type FeatureClassification = 'passive' | 'active' | 'flavor';

function classifyFeature(feature: FeatureData): FeatureClassification {
	const text = `${feature.name} ${feature.description} ${feature.sourceDetail ?? ''}`.toLowerCase();

	// Explicit flavor markers in the data should always win.
	if (text.includes('flavor feature') || text.includes('(flavor)')) {
		return 'flavor';
	}

	// Active abilities usually have explicit costs, usage cadence, or action language.
	const activePatterns = [
		/\b\d+\s*(ap|sp|mp)\b/i,
		/\bonce per (round|turn|combat|rest)\b/i,
		/\b(can spend|spend)\b/i,
		/\b(you can use|use this ability)\b/i,
		/\b(make a|force.*save)\b/i
	];
	if (activePatterns.some((pattern) => pattern.test(text))) {
		return 'active';
	}

	return 'passive';
}

const Features: React.FC<FeaturesProps> = ({ onFeatureClick, isMobile }) => {
	const { t } = useTranslation();
	const { state } = useCharacterSheet();
	const features = useCharacterFeatures(); // Use our enhanced hook!

	if (!state.character) {
		return <div>{t('characterSheet.featuresLoading')}</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	const passiveFeatures = features.filter((feature) => classifyFeature(feature) === 'passive');
	const activeFeatures = features.filter((feature) => classifyFeature(feature) === 'active');
	const flavorFeatures = features.filter((feature) => classifyFeature(feature) === 'flavor');

	const renderFeatureGroup = (title: string, groupedFeatures: FeatureData[]) => {
		if (groupedFeatures.length === 0) return null;
		return (
			<StyledFeatureCategory $isMobile={effectiveIsMobile}>
				<StyledFeatureCategoryTitle $isMobile={effectiveIsMobile}>{title}</StyledFeatureCategoryTitle>
				<StyledFeatureGrid $isMobile={effectiveIsMobile}>
					{groupedFeatures.map((feature) => (
						<StyledFeatureItem $isMobile={effectiveIsMobile} key={feature.id}>
							<StyledFeatureName $isMobile={effectiveIsMobile}>{feature.name}</StyledFeatureName>
							<StyledFeatureReadMore
								$isMobile={effectiveIsMobile}
								onClick={() => onFeatureClick(feature)}
							>
								i
							</StyledFeatureReadMore>
						</StyledFeatureItem>
					))}
				</StyledFeatureGrid>
			</StyledFeatureCategory>
		);
	};

	return (
		<StyledFeaturesContainer $isMobile={effectiveIsMobile}>
			<StyledFeaturesTitle $isMobile={effectiveIsMobile}>{t('characterSheet.featuresTitle')}</StyledFeaturesTitle>

			<StyledFeaturesContent $isMobile={effectiveIsMobile}>
				{renderFeatureGroup('Passive Abilities', passiveFeatures)}
				{renderFeatureGroup('Active Abilities', activeFeatures)}
				{renderFeatureGroup('Flavor Features', flavorFeatures)}

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
