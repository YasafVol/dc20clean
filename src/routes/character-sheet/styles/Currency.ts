import styled from 'styled-components';
import { theme } from './theme';

export const CurrencyContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
`;

export const CurrencyTitle = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin-bottom: ${theme.spacing[4]};
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const CurrencyRow = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const CurrencyIconContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const CurrencyIcon = styled.div.withConfig({
	shouldForwardProp: (prop) => !['isMobile', 'color', 'borderColor'].includes(prop)
})<{ color: string; borderColor: string; isMobile?: boolean }>`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${(props) => props.color};
	border: 1px solid ${(props) => props.borderColor};
`;

export const CurrencyLabel = styled.span.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const CurrencyInput = styled.input.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	width: 60px;
	padding: ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	text-align: center;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

export const CurrencyLoadingState = styled.div`
	padding: 1rem;
	color: ${theme.colors.text.muted};
	text-align: center;
`;
