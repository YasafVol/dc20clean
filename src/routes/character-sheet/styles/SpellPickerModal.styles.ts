import styled from 'styled-components';
import { media, theme } from './theme';

export const SpellOptionHeading = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
`;

export const SustainedBadge = styled.span`
	display: inline-flex;
	padding: 2px ${theme.spacing[2]};
	border: 1px solid ${theme.colors.accent.secondary};
	border-radius: ${theme.borderRadius.full};
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	line-height: 1.2;
`;

export const SpellCard = styled.article`
	display: flex;
	min-height: 100%;
	color: ${theme.colors.text.primary};
	flex-direction: column;
	gap: ${theme.spacing[5]};
`;

export const SpellCardHeader = styled.header`
	display: flex;
	padding-bottom: ${theme.spacing[4]};
	border-bottom: 1px solid ${theme.colors.border.default};
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

export const SpellTitleRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[3]};
`;

export const SpellTitle = styled.h3`
	margin: 0;
	color: ${theme.colors.accent.secondary};
	font-family: ${theme.typography.fontFamily.heading};
	font-size: ${theme.typography.fontSize['2xl']};
	letter-spacing: 0.02em;
`;

export const SpellMetadata = styled.dl`
	display: grid;
	margin: 0;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: ${theme.spacing[3]};

	${media.mobile} {
		grid-template-columns: 1fr;
		gap: ${theme.spacing[2]};
	}
`;

export const SpellMetadataItem = styled.div`
	display: grid;
	min-width: 0;
	grid-template-columns: auto minmax(0, 1fr);
	gap: ${theme.spacing[2]};
`;

export const SpellMetadataLabel = styled.dt`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
`;

export const SpellMetadataValue = styled.dd`
	margin: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const SpellStats = styled.dl`
	display: grid;
	margin: 0;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: ${theme.spacing[2]};
`;

export const SpellStat = styled.div`
	padding: ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	text-align: center;
`;

export const SpellStatLabel = styled.dt`
	margin-bottom: ${theme.spacing[1]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
`;

export const SpellStatValue = styled.dd`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const SpellSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

export const SpellSectionTitle = styled.h4`
	margin: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	letter-spacing: 0.04em;
	text-transform: uppercase;
`;

export const SpellEffect = styled.div`
	padding-left: ${theme.spacing[3]};
	border-left: 2px solid ${theme.colors.accent.primary};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};

	strong {
		color: ${theme.colors.text.primary};
	}
`;

export const SpellPassive = styled(SpellEffect)`
	border-left-color: ${theme.colors.accent.secondary};
`;

export const EnhancementList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[3]};

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const EnhancementCard = styled.article`
	padding: ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const EnhancementHeading = styled.div`
	display: flex;
	margin-bottom: ${theme.spacing[2]};
	align-items: baseline;
	justify-content: space-between;
	gap: ${theme.spacing[2]};

	strong {
		color: ${theme.colors.text.primary};
	}
`;

export const EnhancementCost = styled.span`
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	white-space: nowrap;
`;
