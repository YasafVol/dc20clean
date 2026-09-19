import styled from 'styled-components';
import { StyledFeaturePopupContent, StyledFeaturePopupHeader } from './FeaturePopup';
import { media, theme } from './theme';

export const SpellCastContent = styled(StyledFeaturePopupContent)`
	display: flex;
	width: min(840px, calc(100vw - ${theme.spacing[8]}));
	max-width: 840px;
	max-height: min(88vh, 820px);
	padding: 0;
	overflow: hidden;
	flex-direction: column;

	${media.mobile} {
		width: calc(100vw - ${theme.spacing[4]});
		max-height: calc(100vh - ${theme.spacing[4]});
		margin: ${theme.spacing[2]};
	}
`;

export const SpellCastHeader = styled(StyledFeaturePopupHeader)`
	margin: 0;
	padding: ${theme.spacing[5]} ${theme.spacing[12]} ${theme.spacing[4]} ${theme.spacing[6]};

	${media.mobile} {
		padding: ${theme.spacing[4]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const SpellCastBody = styled.div`
	display: flex;
	min-height: 0;
	padding: ${theme.spacing[5]} ${theme.spacing[6]};
	flex: 1;
	flex-direction: column;
	gap: ${theme.spacing[5]};
	overflow-y: auto;

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

export const SpellCastSummary = styled.div`
	display: flex;
	padding-bottom: ${theme.spacing[4]};
	border-bottom: 1px solid ${theme.colors.border.default};
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[4]};

	${media.mobile} {
		align-items: flex-start;
		flex-direction: column;
		gap: ${theme.spacing[2]};
	}
`;

export const SpellCastMetadata = styled.div`
	display: flex;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	flex-direction: column;
	gap: ${theme.spacing[1]};
`;

export const SpellCastBaseCost = styled.strong`
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.lg};
`;

export const SpellCastSectionTitle = styled.h3`
	margin: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
`;

export const SpellCastEnhancements = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

export const SpellCastEnhancement = styled.article<{ $selected: boolean; $disabled: boolean }>`
	display: grid;
	padding: ${theme.spacing[4]};
	border: 1px solid
		${({ $selected, $disabled }) =>
			$disabled
				? theme.colors.border.default
				: $selected
					? theme.colors.accent.primary
					: theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${({ $selected }) =>
		$selected ? theme.colors.crystal.primaryAlpha10 : theme.colors.bg.primary};
	opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
	grid-template-columns: minmax(0, 1fr) auto;
	gap: ${theme.spacing[3]};

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const SpellCastEnhancementCopy = styled.div`
	display: flex;
	min-width: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
	flex-direction: column;
	gap: ${theme.spacing[1]};

	strong {
		color: ${theme.colors.text.primary};
		font-size: ${theme.typography.fontSize.base};
	}
`;

export const SpellCastCost = styled.span`
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const SpellCastRequirement = styled.span`
	color: ${theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize.xs};
`;

export const SpellCastControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.spacing[2]};
	flex-wrap: wrap;

	${media.mobile} {
		justify-content: flex-start;
	}
`;

export const SpellCastToggleButton = styled.button<{ $selected: boolean }>`
	min-height: 36px;
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border: 1px solid
		${({ $selected }) => ($selected ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	background: ${({ $selected }) =>
		$selected ? theme.colors.accent.primary : theme.colors.bg.elevated};
	color: ${({ $selected }) =>
		$selected ? theme.colors.text.inverse : theme.colors.text.secondary};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const SpellCastStepper = styled.div`
	display: inline-grid;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;
	grid-template-columns: 36px 42px 36px;
`;

export const SpellCastStepButton = styled.button`
	min-height: 36px;
	border: 0;
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	cursor: pointer;

	&:disabled {
		color: ${theme.colors.text.muted};
		cursor: not-allowed;
	}
`;

export const SpellCastStepValue = styled.span`
	display: grid;
	background: ${theme.colors.bg.secondary};
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	place-items: center;
`;

export const SpellCastCostSelect = styled.select`
	min-height: 36px;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
`;

export const SpellCastEmpty = styled.p`
	margin: 0;
	padding: ${theme.spacing[4]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	text-align: center;
`;

export const SpellCastLimit = styled.section`
	display: grid;
	align-items: center;
	grid-template-columns: auto minmax(120px, 1fr) auto;
	gap: ${theme.spacing[3]};
`;

export const SpellCastLimitLabel = styled.strong`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const SpellCastLimitTrack = styled.div`
	height: 10px;
	border-radius: ${theme.borderRadius.full};
	background: ${theme.colors.bg.primary};
	overflow: hidden;
`;

export const SpellCastLimitFill = styled.div<{ $percentage: number; $invalid: boolean }>`
	width: ${({ $percentage }) => Math.min(100, Math.max(0, $percentage))}%;
	height: 100%;
	border-radius: inherit;
	background: ${({ $invalid }) =>
		$invalid ? theme.colors.accent.danger : theme.colors.resource.mana};
	transition: width ${theme.transitions.base};
`;

export const SpellCastLimitValue = styled.span<{ $invalid: boolean }>`
	color: ${({ $invalid }) => ($invalid ? theme.colors.accent.danger : theme.colors.resource.mana)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	white-space: nowrap;
`;

export const SpellCastError = styled.p`
	margin: -${theme.spacing[2]} 0 0;
	color: ${theme.colors.accent.danger};
	font-size: ${theme.typography.fontSize.sm};
`;

export const SpellCastFooter = styled.footer`
	display: flex;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	border-top: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.elevated};
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[4]};

	${media.mobile} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		align-items: stretch;
		flex-direction: column;
	}
`;

export const SpellCastManaSummary = styled.div`
	display: flex;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	align-items: baseline;
	gap: ${theme.spacing[2]};

	strong {
		color: ${theme.colors.resource.mana};
		font-size: ${theme.typography.fontSize.lg};
	}
`;

export const SpellCastActions = styled.div`
	display: flex;
	margin-left: auto;
	gap: ${theme.spacing[2]};

	${media.mobile} {
		margin-left: 0;
	}
`;

const SpellCastActionButton = styled.button`
	min-height: 40px;
	padding: ${theme.spacing[2]} ${theme.spacing[5]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
`;

export const SpellCastCancelButton = styled(SpellCastActionButton)`
	border: 1px solid ${theme.colors.border.default};
	background: transparent;
	color: ${theme.colors.text.secondary};
`;

export const SpellCastConfirmButton = styled(SpellCastActionButton)`
	border: 1px solid ${theme.colors.accent.primary};
	background: ${theme.colors.accent.primary};
	color: ${theme.colors.text.inverse};

	&:disabled {
		border-color: ${theme.colors.border.default};
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.muted};
		cursor: not-allowed;
	}
`;
