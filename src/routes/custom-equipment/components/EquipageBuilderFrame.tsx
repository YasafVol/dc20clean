import type { ReactNode } from 'react';
import styled from 'styled-components';
import EquipmentBuildSheet, {
	type EquipmentBuildSheetStep
} from '../../../components/equipment/EquipmentBuildSheet';
import { media, theme } from '../../character-sheet/styles/theme';
import { SectionTitle } from '../styles/CustomEquipment.styles';

export type EquipageStep = Omit<EquipmentBuildSheetStep, 'content'>;

interface SummaryRow {
	label: string;
	value: ReactNode;
}

interface EquipageBuilderFrameProps {
	category: string;
	title: string;
	activeStepId: string;
	steps: EquipageStep[];
	onStepChange: (stepId: string) => void;
	summaryIcon: ReactNode;
	summaryTitle: string;
	summarySubtitle?: string;
	summaryRows: SummaryRow[];
	summaryDetails?: ReactNode;
	children: ReactNode;
}

const Heading = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: ${theme.spacing[4]};
	margin-bottom: ${theme.spacing[4]};

	h2 {
		margin: 0;
		color: ${theme.colors.text.primary};
		font-size: ${theme.typography.fontSize.xl};
	}

	span {
		color: ${theme.colors.text.secondary};
		font-size: ${theme.typography.fontSize.sm};
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.75fr);
	align-items: start;
	gap: ${theme.spacing[4]};

	${media.tabletDown} {
		grid-template-columns: minmax(0, 1fr);
	}
`;

const SheetColumn = styled.div<{ $review: boolean }>`
	min-width: 0;

	${media.tabletDown} {
		order: ${(props) => (props.$review ? 2 : 1)};
	}

	${SectionTitle} {
		display: none;
	}

	button,
	input,
	textarea {
		max-width: 100%;
	}
`;

const SummaryPanel = styled.aside<{ $review: boolean }>`
	position: sticky;
	top: ${theme.spacing[4]};
	min-width: 0;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	background: ${theme.colors.bg.secondary};
	overflow: hidden;

	${media.tabletDown} {
		position: static;
		order: ${(props) => (props.$review ? 1 : 2)};
	}
`;

const SummaryHeader = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[4]};
	border-bottom: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.accent.warningAlpha10};
	color: ${theme.colors.accent.warning};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.08em;

	svg {
		width: 20px;
		height: 20px;
	}
`;

const SummaryContent = styled.div`
	padding: ${theme.spacing[4]};

	h3 {
		margin: 0 0 ${theme.spacing[1]};
		color: ${theme.colors.text.primary};
		font-size: ${theme.typography.fontSize.xl};
		overflow-wrap: anywhere;
	}

	p {
		margin: 0 0 ${theme.spacing[3]};
		color: ${theme.colors.text.secondary};
		font-size: ${theme.typography.fontSize.sm};
	}
`;

const SummaryDetail = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[2]} 0;
	border-top: 1px solid ${theme.colors.border.default};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};

	b {
		color: ${theme.colors.text.primary};
		font-weight: ${theme.typography.fontWeight.semibold};
		text-align: right;
		overflow-wrap: anywhere;
	}
`;

const SummaryExtra = styled.div`
	margin-top: ${theme.spacing[4]};
	padding-top: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};
`;

export default function EquipageBuilderFrame({
	category,
	title,
	activeStepId,
	steps,
	onStepChange,
	summaryIcon,
	summaryTitle,
	summarySubtitle,
	summaryRows,
	summaryDetails,
	children
}: EquipageBuilderFrameProps) {
	const isReview = activeStepId === steps[steps.length - 1]?.id;

	return (
		<>
			<Heading>
				<h2>{title}</h2>
				<span>{steps.length} steps</span>
			</Heading>
			<Grid>
				<SheetColumn $review={isReview}>
					<EquipmentBuildSheet
						ariaLabel={`${category} build steps`}
						flowId={`equipage-${category}`}
						activeStepId={activeStepId}
						steps={steps.map((step) => ({
							...step,
							content: step.id === activeStepId ? children : null
						}))}
						onStepChange={onStepChange}
					/>
				</SheetColumn>
				<SummaryPanel $review={isReview} aria-label={`${category} build summary`}>
					<SummaryHeader>
						<span aria-hidden="true">{summaryIcon}</span>
						<span>Build Summary</span>
					</SummaryHeader>
					<SummaryContent>
						<h3>{summaryTitle}</h3>
						{summarySubtitle && <p>{summarySubtitle}</p>}
						{summaryRows.map((row) => (
							<SummaryDetail key={row.label}>
								<span>{row.label}</span>
								<b>{row.value}</b>
							</SummaryDetail>
						))}
						{summaryDetails && <SummaryExtra>{summaryDetails}</SummaryExtra>}
					</SummaryContent>
				</SummaryPanel>
			</Grid>
		</>
	);
}
