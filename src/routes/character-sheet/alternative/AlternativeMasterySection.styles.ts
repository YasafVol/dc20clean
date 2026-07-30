import styled from 'styled-components';
import { media, theme } from '../styles/theme';

export const MasterySection = styled.section`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	align-items: stretch;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[6]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};

	${media.tabletDown} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	${media.mobile} {
		grid-template-columns: 1fr;
		padding: ${theme.spacing[4]};
	}
`;

export const MasterySidebar = styled.div`
	display: grid;
	grid-template-rows: 1fr auto;
	gap: ${theme.spacing[3]};
	min-width: 0;

	${media.tabletDown} {
		grid-column: 1 / -1;
		grid-template-rows: auto auto;
	}
`;

export const MasteryCard = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 0;
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid transparent;
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
`;

export const CombatMasteryCard = styled(MasteryCard)`
	align-items: center;
	justify-content: center;
	padding-block: ${theme.spacing[3]};
	border-top: 3px solid color-mix(in srgb, ${theme.colors.accent.secondary} 70%, white 30%);
`;

export const PrimeCard = styled(MasteryCard)`
	--mastery-dot-color: ${theme.colors.accent.secondary};

	border-top: 3px solid ${theme.colors.accent.secondary};
`;

export const CardLabel = styled.div`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const CardValue = styled.div`
	margin-top: ${theme.spacing[1]};
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	text-align: center;
	font-variant-numeric: tabular-nums;
`;

export const AttributeCard = styled(MasteryCard)<{ $color: string }>`
	--mastery-dot-color: ${({ $color }) => $color};

	min-height: 300px;
	border-top: 3px solid ${({ $color }) => $color};
`;

export const AttributeHeader = styled.div`
	display: grid;
	justify-items: center;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[4]};
`;

export const AttributeName = styled.div<{ $color: string }>`
	color: ${({ $color }) => $color};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: capitalize;
`;

export const AttributeNumbers = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: center;
	gap: ${theme.spacing[2]};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	font-variant-numeric: tabular-nums;
`;

export const SaveButton = styled.button`
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	background: transparent;
	border: 0;
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.secondary};
	font: inherit;
	font-size: ${theme.typography.fontSize.sm};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.accent.primary};
	}
`;

export const MasteryRows = styled.div`
	display: grid;
	gap: ${theme.spacing[1]};
`;

export const MasteryRow = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
	width: 100%;
	min-height: 34px;
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font: inherit;
	text-align: left;
	cursor: pointer;
	transition:
		background-color ${theme.transitions.fast},
		border-color ${theme.transitions.fast};

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
	}
`;

export const MasteryName = styled.span`
	min-width: 0;
	overflow: hidden;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const MasteryResult = styled.span`
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	gap: ${theme.spacing[2]};
`;

export const MasteryBonus = styled.span`
	min-width: 2.5ch;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	text-align: right;
	font-variant-numeric: tabular-nums;
`;

export const TradeRows = styled.div`
	display: grid;
	gap: ${theme.spacing[1]};
	margin-top: ${theme.spacing[2]};
	padding-top: ${theme.spacing[2]};
	border-top: 1px solid ${theme.colors.border.default};
`;
