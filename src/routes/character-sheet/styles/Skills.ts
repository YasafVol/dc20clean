import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledSkillsSection = styled.div<MobileStyledProps>`
	border: 2px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'var(--mobile-bg-primary)' : '#24283B')};
	flex: 1;
`;

export const StyledSkillItem = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 0.5rem;
	align-items: center;
	margin-bottom: 0.3rem;
	font-size: 0.8rem;
`;

export const StyledProficiencyDots = styled.div<MobileStyledProps>`
	display: flex;
	gap: 2px;
`;

export const StyledDot = styled.div<{ $filled: boolean; $isMobile?: boolean }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 1px solid ${(props) => (props.$isMobile ? 'var(--mobile-border)' : '#414868')};
	background: ${(props) => {
		if (props.$filled) {
			return '#7DCFFF'; /* Tokyo Night blue for all breakpoints */
		} else {
			return props.$isMobile ? 'var(--mobile-bg-secondary)' : '#1A1B26';
		}
	}};
`;
