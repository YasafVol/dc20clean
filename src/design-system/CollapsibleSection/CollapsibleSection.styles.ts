import styled from 'styled-components';

export const SectionWrapper = styled.div<{ $selected?: boolean }>`
	border: 1px solid var(--coal);
	border-radius: 8px;
	overflow: hidden;
	background: transparent; // Made transparent as requested
	margin-bottom: 0.5rem;

	${({ $selected }) =>
		$selected &&
		`
    border-color: var(--cornflower);
    box-shadow: 0 0 0 1px var(--cornflower);
  `}
`;

export const Header = styled.button<{ $expanded: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 14px 18px;
	background: transparent;
	border: none;
	cursor: pointer;
	text-align: left;

	&:focus {
		outline: 2px solid rgba(0, 0, 0, 0.08);
	}
`;

export const Title = styled.span<{ $selected?: boolean; $expanded?: boolean }>`
	font-weight: 500; /* Urbanist Medium */
	font-size: 21px;
	/* When collapsed, use iron. When expanded, use russet */
	color: ${({ $expanded }) => ($expanded ? 'var(--russet)' : 'var(--iron)')};
`;

export const ToggleIcon = styled.span`
	margin-left: 12px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--iron);
`;

export const Content = styled.div<{ $expanded: boolean }>`
	padding: ${(props) => (props.$expanded ? '16px' : '0')};
	overflow: hidden;
	transition: all 0.2s ease-in-out;
`;

export const ActionContainer = styled.div`
	display: flex;
	align-items: center;
`;
