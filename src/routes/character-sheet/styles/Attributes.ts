import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledAttributeSection = styled.div<MobileStyledProps>`
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : 'var(--bg-tertiary)')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : 'var(--bg-secondary)')};
`;

export const StyledAttributeItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	gap: 0.5rem;
	margin-bottom: 1rem;
	align-items: center;
`;

export const StyledAttributeBox = styled.div`
	width: 50px;
	height: 50px;
	border: 2px solid var(--bg-tertiary);
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: var(--bg-primary);
	position: relative;
`;

export const StyledAttributeAbbr = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: var(--crystal-primary);
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: var(--text-primary);
`;

export const StyledAttributeDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledAttributeName = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
	color: var(--crystal-primary);
`;

export const StyledSaveBonus = styled.div`
	font-size: 0.8rem;
	color: var(--text-secondary);
`;

// New components for refactored layout
export const AttributeSection = styled.div<MobileStyledProps>`
	margin-bottom: 1rem;
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : 'var(--bg-tertiary)')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : 'var(--bg-secondary)')};
`;

export const AttributeHeader = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const AttributeBox = styled.div<MobileStyledProps>`
	width: 60px;
	height: 60px;
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : 'var(--bg-tertiary)')};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-secondary)' : 'var(--bg-primary)')};
	margin-right: 1rem;
`;

export const AttributeAbbreviation = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--crystal-primary)')};
`;

export const AttributeValue = styled.div<MobileStyledProps>`
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--text-primary)')};
`;

export const AttributeInfo = styled.div<MobileStyledProps>`
	flex: 1;
`;

export const AttributeName = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--crystal-primary)')};
	margin-bottom: 0.2rem;
`;

export const AttributeSave = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--text-secondary)')};
	cursor: pointer;
	transition: all 0.2s ease;
	padding: 0.25rem;
	border-radius: 4px;

	&:hover {
		color: var(--crystal-primary);
		background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-tertiary)' : 'var(--bg-secondary)')};
	}
`;

export const SkillRow = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : 'var(--bg-tertiary)')};
	border-radius: 4px;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-tertiary)' : 'var(--bg-primary)')};
	margin-bottom: 0.3rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-secondary)' : 'var(--bg-secondary)')};
		border-color: var(--crystal-primary);
		transform: translateX(2px);
	}

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SkillName = styled.span<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--text-primary)')};
	font-weight: 500;
`;

export const SkillBonusContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

interface SkillBonusProps extends MobileStyledProps {
	$isPositive: boolean;
}

export const SkillBonus = styled.span<SkillBonusProps>`
	font-size: 0.875rem;
	font-weight: 600;
	color: ${(props) => {
		if (props.$isPositive) {
			return props.$isMobile ? 'var(--attr-positive)' : 'var(--attr-positive-dark)';
		} else {
			return props.$isMobile ? 'var(--attr-negative)' : 'var(--attr-negative-dark)';
		}
	}};
	min-width: 2rem;
	text-align: center;
`;

export const PrimeSection = styled.div<MobileStyledProps>`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : 'var(--bg-tertiary)')};
	border-radius: 8px;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-secondary)' : 'var(--bg-secondary)')};
	margin-bottom: 0.5rem;
`;

export const PrimeLabel = styled.div<MobileStyledProps>`
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--crystal-primary)')};
	font-weight: bold;
	font-size: 1rem;
`;

export const PrimeValue = styled.div<MobileStyledProps>`
	text-transform: capitalize;
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? 'var(--mobile-accent)' : 'var(--text-primary)')};
`;
