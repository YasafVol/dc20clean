import styled from 'styled-components';

export const StyledFeatureContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding: 1rem 0;
`;

export const StyledFeatureSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledFeatureTitle = styled.h4`
	color: var(--russet);
	font-weight: 600;
	font-size: 16px;
	margin: 0;
`;

export const StyledFeatureText = styled.p`
	color: var(--iron);
	line-height: 1.6;
	margin: 0;
	font-size: 14px;
`;

export const StyledBenefitsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0.75rem 0 0 0;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const StyledBenefitItem = styled.li`
	padding-left: 1rem;
	border-left: 2px solid var(--cornflower);
`;

export const StyledBenefitName = styled.div`
	color: var(--russet);
	font-weight: 600;
	font-size: 14px;
	margin-bottom: 0.25rem;
`;

export const StyledBenefitDescription = styled.div`
	color: var(--iron);
	font-size: 13px;
	line-height: 1.5;
`;
