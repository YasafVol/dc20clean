import styled from 'styled-components';

export const StyledLanguagesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 16px;
`;

export const StyledLanguageItem = styled.div`
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

export const StyledLanguageInfo = styled.div`
	flex: 1;
`;

export const StyledLanguageName = styled.div`
	font-size: 16px;
	font-weight: 600;
	color: var(--white);
	margin-bottom: 4px;
`;

export const StyledLanguageType = styled.div`
	font-size: 13px;
	color: var(--lightGray);
	text-transform: capitalize;
`;

export const StyledFluencyControls = styled.div`
	display: flex;
	gap: 8px;
`;

export const StyledFluencyButton = styled.button<{ $active: boolean }>`
	padding: 8px 16px;
	background: ${(props) => (props.$active ? 'var(--gold)' : 'rgba(0, 0, 0, 0.3)')};
	color: ${(props) => (props.$active ? 'var(--darkBrown)' : 'var(--lightGray)')};
	border: 2px solid ${(props) => (props.$active ? 'var(--gold)' : 'var(--iron)')};
	border-radius: 4px;
	font-size: 13px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: ${(props) => (props.$active ? 'var(--gold)' : 'rgba(0, 0, 0, 0.5)')};
		border-color: var(--gold);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&:focus {
		outline: 2px solid var(--gold);
		outline-offset: 2px;
	}
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
