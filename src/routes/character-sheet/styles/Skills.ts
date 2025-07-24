import styled from 'styled-components';

export const StyledSkillsSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
	flex: 1;
`;

export const StyledSkillItem = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 0.5rem;
	align-items: center;
	margin-bottom: 0.3rem;
	font-size: 0.8rem;
`;

export const StyledProficiencyDots = styled.div`
	display: flex;
	gap: 2px;
`;

export const StyledDot = styled.div<{ filled: boolean }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 1px solid #8b4513;
	background: ${(props) => (props.filled ? '#8b4513' : 'white')};
`;
