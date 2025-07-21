import React from 'react';
import type { FeatureData } from '../types';
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
} from '../routes/character-sheet/styles/Features.styles';

interface FeaturesProps {
  features: FeatureData[];
  onFeatureClick: (feature: FeatureData) => void;
}

const Features: React.FC<FeaturesProps> = ({ features, onFeatureClick }) => {
  // Organize features by source
  const ancestryFeatures = features.filter(f => f.source === 'ancestry');
  const classFeatures = features.filter(f => f.source === 'class');
  const choiceFeatures = features.filter(f => f.source === 'choice');

  return (
    <StyledFeaturesContainer>
      <StyledFeaturesTitle>FEATURES</StyledFeaturesTitle>
      
      <StyledFeaturesContent>
        {/* Ancestry Traits */}
        {ancestryFeatures.length > 0 && (
          <StyledFeatureCategory>
            <StyledFeatureCategoryTitle>Ancestry Traits</StyledFeatureCategoryTitle>
            <StyledFeatureGrid>
              {ancestryFeatures.map(feature => (
                <StyledFeatureItem key={feature.id}>
                  <StyledFeatureName>{feature.name}</StyledFeatureName>
                  <StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
                    Info
                  </StyledFeatureReadMore>
                </StyledFeatureItem>
              ))}
            </StyledFeatureGrid>
          </StyledFeatureCategory>
        )}
        
        {/* Class Features */}
        {classFeatures.length > 0 && (
          <StyledFeatureCategory>
            <StyledFeatureCategoryTitle>Class Features</StyledFeatureCategoryTitle>
            <StyledFeatureGrid>
              {classFeatures.map(feature => (
                <StyledFeatureItem key={feature.id}>
                  <StyledFeatureName>{feature.name}</StyledFeatureName>
                  <StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
                    Info
                  </StyledFeatureReadMore>
                </StyledFeatureItem>
              ))}
            </StyledFeatureGrid>
          </StyledFeatureCategory>
        )}
        
        {/* Feature Choices */}
        {choiceFeatures.length > 0 && (
          <StyledFeatureCategory>
            <StyledFeatureCategoryTitle>Selected Features</StyledFeatureCategoryTitle>
            <StyledFeatureGrid>
              {choiceFeatures.map(feature => (
                <StyledFeatureItem key={feature.id}>
                  <StyledFeatureName>{feature.name}</StyledFeatureName>
                  <StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
                    Info
                  </StyledFeatureReadMore>
                </StyledFeatureItem>
              ))}
            </StyledFeatureGrid>
          </StyledFeatureCategory>
        )}
        
        {/* No features message */}
        {features.length === 0 && (
          <StyledNoFeaturesMessage>
            No features available
          </StyledNoFeaturesMessage>
        )}
      </StyledFeaturesContent>
    </StyledFeaturesContainer>
  );
};

export default Features;
