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
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledSection = styled.div`
	margin-top: 1rem;
`;

export const StyledSectionTitle = styled.h3`
	margin: 0 0 1rem 0;
	color: #ef4444;
	font-size: 1.5rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
`;

export const StyledCard = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	margin-bottom: 1rem;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

export const StyledCardTitle = styled.h4`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	padding: 0.5rem;
	border-radius: 5px;
	transition: all 0.2s ease;

	&:hover {
		color: #fbbf24;
		background: rgba(139, 92, 246, 0.1);
	}
`;

export const StyledRadio = styled.input`
	margin-top: 0.25rem;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	accent-color: #ef4444;
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
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledBenefitsList = styled.div`
	margin-top: 1rem;
	padding-left: 0.5rem;
`;

export const StyledBenefit = styled.div`
	margin-bottom: 0.75rem;
	padding: 0.5rem;
	border-left: 3px solid #ef4444;
	background: rgba(139, 92, 246, 0.1);
	border-radius: 0 5px 5px 0;
`;

export const StyledBenefitName = styled.h5`
	margin: 0 0 0.25rem 0;
	color: #fbbf24;
	font-size: 1rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledBenefitDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
