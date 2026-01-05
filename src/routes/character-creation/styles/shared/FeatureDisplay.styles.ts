/**
 * @file FeatureDisplay.styles.ts
 * @description Shared styled components for displaying class features, benefits, and choices
 * Used across ClassFeatures, LevelingChoices, and SubclassSelector components
 */

import styled from 'styled-components';

// Feature Card Container
export const FeatureCard = styled.div`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(212, 175, 55, 0.3);
	border-radius: 6px;
	padding: 1rem;
	margin-bottom: 0.75rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

// Feature Title/Name
export const FeatureTitle = styled.h5`
	font-family: 'Cinzel', serif;
	font-size: 1rem;
	color: #d4af37;
	margin: 0 0 0.5rem 0;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

// Feature Description
export const FeatureDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
	margin: 0 0 0.75rem 0;
	line-height: 1.4;

	&:last-child {
		margin-bottom: 0;
	}
`;

// Benefits Container
export const BenefitsList = styled.div`
	margin-top: 0.75rem;
	padding-top: 0.75rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

// Individual Benefit Item
export const BenefitItem = styled.div`
	padding: 0.5rem 0.75rem;
	margin-bottom: 0.5rem;
	background: rgba(139, 69, 19, 0.1);
	border-left: 2px solid rgba(212, 175, 55, 0.4);
	border-radius: 3px;

	&:last-child {
		margin-bottom: 0;
	}
`;

// Benefit Name/Title
export const BenefitName = styled.h6`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.85rem;
	color: #d4af37;
	font-weight: 600;
	margin: 0 0 0.25rem 0;
`;

// Benefit Description
export const BenefitDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.8rem;
	color: rgba(255, 255, 255, 0.7);
	margin: 0;
	line-height: 1.3;
`;

// Feature Level Badge
export const FeatureLevel = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.6);
	margin-bottom: 0.5rem;
`;
