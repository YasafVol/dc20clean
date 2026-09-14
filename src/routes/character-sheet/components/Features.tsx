import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
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
	expandedCategories?: Partial<Record<FeatureCategoryId, boolean>>;
	onCategoryExpandedChange?: (category: FeatureCategoryId, expanded: boolean) => void;
}

export type FeatureCategoryId = FeatureData['source'];

const Features: React.FC<FeaturesProps> = ({
	onFeatureClick,
	isMobile,
	showTitle = true,
	expandedCategories,
	onCategoryExpandedChange
}) => {
	const { t } = useTranslation();
	const { state } = useCharacterSheet();
	const features = useCharacterFeatures(); // Use our enhanced hook!
	const [localExpandedCategories, setLocalExpandedCategories] = useState<
		Partial<Record<FeatureCategoryId, boolean>>
	>({});

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
	const categories: Array<{
		id: FeatureCategoryId;
		label: string;
		features: FeatureData[];
	}> = [
		{
			id: 'ancestry',
			label: t('characterSheet.featuresAncestryTraits'),
			features: ancestryFeatures
		},
		{ id: 'class', label: t('characterSheet.featuresClassFeatures'), features: classFeatures },
		{
			id: 'subclass',
			label: t('characterSheet.featuresSubclassFeatures'),
			features: subclassFeatures
		},
		{ id: 'path', label: t('characterSheet.featuresPathProgression'), features: pathFeatures },
		{ id: 'talent', label: t('characterSheet.featuresTalents'), features: talentFeatures },
		{ id: 'choice', label: t('characterSheet.featuresSelectedFeatures'), features: choiceFeatures }
	];
	const isCategoryExpanded = (category: FeatureCategoryId) =>
		expandedCategories?.[category] ?? localExpandedCategories[category] ?? true;
	const toggleCategory = (category: FeatureCategoryId) => {
		const nextExpanded = !isCategoryExpanded(category);
		if (onCategoryExpandedChange) {
			onCategoryExpandedChange(category, nextExpanded);
			return;
		}
		setLocalExpandedCategories((current) => ({ ...current, [category]: nextExpanded }));
	};

	return (
		<StyledFeaturesContainer $isMobile={effectiveIsMobile}>
			{showTitle && (
				<StyledFeaturesTitle $isMobile={effectiveIsMobile}>
					{t('characterSheet.featuresTitle')}
				</StyledFeaturesTitle>
			)}

			<StyledFeaturesContent $isMobile={effectiveIsMobile}>
				{categories.map((category) => {
					if (category.features.length === 0) return null;
					const expanded = isCategoryExpanded(category.id);
					const contentId = `feature-category-${category.id}`;
					const actionLabel = t(
						expanded ? 'characterSheet.collapseSection' : 'characterSheet.expandSection',
						{ section: category.label }
					);

					return (
						<StyledFeatureCategory $isMobile={effectiveIsMobile} key={category.id}>
							<StyledFeatureCategoryTitle
								$isMobile={effectiveIsMobile}
								type="button"
								aria-label={actionLabel}
								aria-expanded={expanded}
								aria-controls={contentId}
								onClick={() => toggleCategory(category.id)}
							>
								<span>{category.label}</span>
								{expanded ? (
									<ChevronUp size={16} aria-hidden="true" />
								) : (
									<ChevronDown size={16} aria-hidden="true" />
								)}
							</StyledFeatureCategoryTitle>
							<StyledFeatureGrid $isMobile={effectiveIsMobile} id={contentId} hidden={!expanded}>
								{category.features.map((feature) => (
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
					);
				})}

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
