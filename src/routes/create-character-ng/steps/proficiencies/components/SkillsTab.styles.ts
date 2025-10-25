import styled from 'styled-components';

export const StyledSkillsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	gap: 16px;
`;

export const StyledSkillItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	background: rgba(0, 0, 0, 0.2);
	border: 2px solid var(--iron);
	border-radius: 6px;
	transition: all 0.2s;

	&:hover {
		border-color: var(--gold);
		background: rgba(0, 0, 0, 0.3);
	}
`;

export const StyledSkillInfo = styled.div`
	flex: 1;
`;

export const StyledSkillName = styled.div`
	font-size: 16px;
	font-weight: 600;
	color: var(--white);
	margin-bottom: 4px;
`;

export const StyledMasteryControls = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const StyledMasteryDots = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px;
`;

export const StyledMasteryDot = styled.button<{ $filled: boolean; $available: boolean }>`
	/* Match design-system RadioButton visual: smaller control and accent color */
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--iron);
	background: ${(props) => (props.$filled ? 'var(--russet)' : 'transparent')};
	cursor: ${(props) => (props.$available ? 'pointer' : 'not-allowed')};
	opacity: ${(props) => (props.$available ? 1 : 0.5)};
	transition: all 0.12s;

	&:hover {
		transform: ${(props) => (props.$available ? 'scale(1.05)' : 'none')};
		border-color: ${(props) => (props.$available ? 'var(--russet)' : 'var(--iron)')};
	}

	&:focus {
		box-shadow: 0 0 0 3px rgba(183, 64, 64, 0.12);
		outline: none;
	}
`;

export const StyledMasteryLabel = styled.div`
	font-size: 13px;
	color: var(--lightGray);
	min-width: 100px;
	text-align: right;
`;

export const StyledInfoBox = styled.div`
	padding: 12px 16px;
	background: rgba(99, 102, 241, 0.1);
	border: 1px solid rgba(99, 102, 241, 0.3);
	border-radius: 6px;
	margin-bottom: 16px;
	font-size: 14px;
	color: var(--lightGray);
	line-height: 1.5;
`;

export const StyledSkillHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: 15px;
	font-weight: 600;
	color: var(--white);
`;

export const StyledSkillTitle = styled.div`
	font-size: 16px;
	font-weight: 600;
	color: var(--white);
	margin-bottom: 2px;
`;

export const StyledSkillAttribute = styled.div`
	font-size: 13px;
	color: var(--lightGray);
	text-transform: capitalize;
`;

export const StyledSkillDescription = styled.div`
	font-size: 14px;
	color: var(--lightGray);
	line-height: 1.5;
	padding: 8px 0;
`;

export const StyledSkillRow = styled.div`
	display: flex;
	align-items: stretch;
	gap: 8px;
	margin-bottom: 8px;
	min-height: 60px;
`;

export const StyledCollapsibleWrapper = styled.div`
	flex: 1;
`;
