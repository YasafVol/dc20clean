import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 2rem;
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	border-bottom: 2px solid #fbbf24;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledSection = styled.div`
	margin-top: 1rem;
`;

export const StyledSectionTitle = styled.h3`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	border-bottom: 2px solid #fbbf24;
	padding-bottom: 0.5rem;
`;

export const StyledCard = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 10px;
	margin-bottom: 1rem;
	background: transparent;
	transition: border-color 0.2s ease;

	&:hover {
		border-color: #fbbf24;
	}
`;

export const StyledCardTitle = styled.h4`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	line-height: 1.4;
`;

export const StyledChoiceOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledLabel = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 0.8rem;
	cursor: pointer;
	color: #e5e7eb;
	font-size: 0.95rem;
	line-height: 1.4;
	padding: 0.5rem;
	border-radius: 5px;
	transition: all 0.2s ease;

	&:hover {
		color: #fbbf24;
		background: rgba(255, 255, 255, 0.05);
	}
`;

export const StyledRadio = styled.input`
	margin-top: 0.25rem;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	accent-color: #fbbf24;
	cursor: pointer;
`;

export const StyledOptionDescription = styled.span`
	font-size: 0.9em;
	color: #9ca3af;
	margin-left: 0.5rem;
	font-style: italic;
`;

export const StyledNoSelection = styled.p`
	color: #9ca3af;
	font-style: italic;
	text-align: center;
	font-size: 1.1rem;
`;

// Import shared components and re-export with "Styled" prefix for backwards compatibility
export {
	BenefitsList as StyledBenefitsList,
	BenefitItem as StyledBenefit,
	BenefitName as StyledBenefitName,
	BenefitDescription as StyledBenefitDescription
} from './shared/FeatureDisplay.styles';
