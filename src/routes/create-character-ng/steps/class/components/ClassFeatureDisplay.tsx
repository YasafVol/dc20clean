import React from 'react';
import {
	StyledFeatureContainer,
	StyledFeatureSection,
	StyledFeatureTitle,
	StyledFeatureText,
	StyledBenefitsList,
	StyledBenefitItem,
	StyledBenefitName,
	StyledBenefitDescription
} from './ClassFeatureDisplay.styles';
import type { ClassFeature } from '../../../../../lib/rulesdata/loaders/class-features.loader';

interface ClassFeatureDisplayProps {
	features: ClassFeature[];
}

const ClassFeatureDisplay: React.FC<ClassFeatureDisplayProps> = ({ features }) => {
	return (
		<StyledFeatureContainer>
			{features.map((feature) => (
				<StyledFeatureSection key={feature.featureName}>
					<StyledFeatureTitle>{feature.featureName}</StyledFeatureTitle>
					<StyledFeatureText>{feature.description}</StyledFeatureText>

					{/* Display benefits if available */}
					{feature.benefits && feature.benefits.length > 0 && (
						<StyledBenefitsList>
							{feature.benefits.map((benefit, index) => (
								<StyledBenefitItem key={index}>
									<StyledBenefitName>{benefit.name}</StyledBenefitName>
									<StyledBenefitDescription>{benefit.description}</StyledBenefitDescription>
								</StyledBenefitItem>
							))}
						</StyledBenefitsList>
					)}
				</StyledFeatureSection>
			))}
		</StyledFeatureContainer>
	);
};

export default ClassFeatureDisplay;
