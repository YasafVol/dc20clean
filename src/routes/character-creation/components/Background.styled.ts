import styled from 'styled-components';

export const MasteryButton = styled.button<{
	$isActive: boolean;
	$isDisabled: boolean;
	$needsElevation?: boolean;
}>`
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	padding: 0.375rem 0.75rem;
	border-radius: 0.375rem;
	font-size: 0.875rem;
	font-weight: 600;
	transition: all 0.2s ease;
	cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};

	${(props) =>
		props.$isActive
			? `
		background: #7dcfff;
		border: 2px solid #7dcfff;
		color: #1a1b26;
		font-weight: 700;
	`
			: `
		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.5);
		color: #c0caf5;
	`}

	${(props) =>
		props.$needsElevation &&
		!props.$isActive &&
		`
		border-color: rgba(125, 207, 255, 0.5);
		color: #7dcfff;
	`}

	&:hover:not(:disabled) {
		${(props) =>
			!props.$isActive &&
			`
			border-color: #7dcfff;
			background: rgba(125, 207, 255, 0.1);
		`}
	}
`;

export const ElevationIndicator = styled.span`
	font-size: 0.75rem;
	margin-left: 0.25rem;
`;
