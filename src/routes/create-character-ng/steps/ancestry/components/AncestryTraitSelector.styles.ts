import styled from 'styled-components';

export const StyledTraitList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 16px;
`;

export const StyledTraitItem = styled.div<{ $disabled?: boolean }>`
	opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
	transition: opacity 0.2s ease;
`;
