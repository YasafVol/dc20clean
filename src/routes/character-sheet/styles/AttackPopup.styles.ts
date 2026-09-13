import styled from 'styled-components';
import { StyledFeaturePopupContent, StyledFeaturePopupHeader } from './FeaturePopup';
import { media, theme } from './theme';

export const StyledAttackPopupContent = styled(StyledFeaturePopupContent)`
	width: min(720px, calc(100vw - ${theme.spacing[8]}));
	max-width: 720px;
	padding: 0;
	overflow: hidden;

	${media.mobile} {
		width: calc(100vw - ${theme.spacing[4]});
		max-height: calc(100vh - ${theme.spacing[8]});
		margin: ${theme.spacing[4]};
		padding: 0;
	}
`;

export const StyledAttackPopupHeader = styled(StyledFeaturePopupHeader)`
	margin: 0;
	padding: ${theme.spacing[6]} ${theme.spacing[12]} ${theme.spacing[4]} ${theme.spacing[6]};

	${media.mobile} {
		margin: 0;
		padding: ${theme.spacing[5]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const StyledAttackPopupBody = styled.div`
	max-height: calc(80vh - 90px);
	overflow-y: auto;
	padding: 0 ${theme.spacing[6]} ${theme.spacing[6]};
	color: ${theme.colors.text.primary};

	${media.mobile} {
		max-height: calc(100vh - 120px);
		padding: 0 ${theme.spacing[4]} ${theme.spacing[4]};
	}
`;

export const StyledAttackPopupSubtitle = styled.p`
	margin: ${theme.spacing[1]} 0 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const StyledWeaponFacts = styled.dl`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: ${theme.spacing[4]};
	margin: 0;
	padding: ${theme.spacing[5]} 0;

	${media.mobile} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: ${theme.spacing[3]};
	}
`;

export const StyledWeaponFact = styled.div`
	min-width: 0;
`;

export const StyledFactLabel = styled.dt`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const StyledFactValue = styled.dd`
	margin: ${theme.spacing[1]} 0 0;
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: capitalize;
`;

export const StyledDamageSection = styled.section`
	padding-bottom: ${theme.spacing[5]};
`;

export const StyledSectionLabel = styled.h3`
	margin: 0 0 ${theme.spacing[2]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const StyledDamageTable = styled.table`
	width: 100%;
	border: 1px solid ${theme.colors.border.default};
	border-collapse: separate;
	border-spacing: 0;
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;
	background: ${theme.colors.bg.primary};
	table-layout: fixed;

	th,
	td {
		padding: ${theme.spacing[3]};
		text-align: center;
		border-right: 1px solid ${theme.colors.border.default};
	}

	th:last-child,
	td:last-child {
		border-right: 0;
	}

	th {
		border-bottom: 1px solid ${theme.colors.border.default};
		color: ${theme.colors.text.secondary};
		font-size: ${theme.typography.fontSize.xs};
		font-weight: ${theme.typography.fontWeight.semibold};
	}

	td {
		color: ${theme.colors.text.primary};
		font-size: ${theme.typography.fontSize.lg};
		font-weight: ${theme.typography.fontWeight.semibold};
		font-variant-numeric: tabular-nums;
	}

	${media.mobile} {
		th,
		td {
			padding: ${theme.spacing[2]} ${theme.spacing[1]};
		}

		th {
			font-size: 0.6875rem;
		}
	}
`;

export const StyledDisclosure = styled.details`
	border-top: 1px solid ${theme.colors.border.default};
`;

export const StyledDisclosureSummary = styled.summary`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 8.5rem 1.25rem;
	align-items: center;
	gap: ${theme.spacing[3]};
	min-height: 48px;
	padding: ${theme.spacing[3]} 0;
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	list-style: none;

	&::-webkit-details-marker {
		display: none;
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}

	${media.mobile} {
		grid-template-columns: minmax(0, 1fr) 7.5rem 1.25rem;
		gap: ${theme.spacing[2]};
	}
`;

export const StyledDisclosureChip = styled.span`
	justify-self: start;
	width: 7.5rem;
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.full};
	background: rgba(0, 178, 142, 0.32);
	color: #78f0d1;
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.tight};
	text-align: center;
	white-space: nowrap;
`;

export const StyledDisclosureChevron = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: ${theme.colors.accent.primary};
	transition: transform ${theme.transitions.fast};

	${StyledDisclosure}[open] > ${StyledDisclosureSummary} & {
		transform: rotate(180deg);
	}
`;

export const StyledDisclosureBody = styled.div`
	padding: 0 0 ${theme.spacing[4]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};

	p {
		margin: ${theme.spacing[2]} 0;
	}
`;

export const StyledFeatureChips = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]};
	margin: ${theme.spacing[2]} 0 ${theme.spacing[3]};
`;

export const StyledFeatureChip = styled.span`
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.full};
	background: ${theme.colors.bg.secondary};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xs};
`;

export const StyledRule = styled.p`
	padding-left: ${theme.spacing[3]};
	border-left: 3px solid ${theme.colors.accent.primary};

	strong {
		color: ${theme.colors.text.primary};
	}
`;

export const StyledRuleSource = styled.p`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	font-style: italic;
`;

export const StyledNestedDisclosure = styled(StyledDisclosure)`
	margin-top: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};

	${StyledDisclosureSummary} {
		grid-template-columns: minmax(0, 1fr) 1.25rem;
	}
`;

export const StyledPresentationNote = styled.p`
	margin: 0 0 ${theme.spacing[4]};
	color: ${theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize.sm};
`;
