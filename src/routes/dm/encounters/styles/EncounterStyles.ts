/**
 * Encounter Planner Styled Components
 * Uses CSS variables for colors, theme tokens for spacing/typography
 */

import styled from 'styled-components';
import { theme } from '../../../character-sheet/styles/theme';

// Reuse page layout from monsters
export {
	PageContainer,
	Header,
	HeaderContent,
	HeaderLeft,
	HeaderRight,
	Title,
	Subtitle,
	MainContent,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText,
	Section,
	SectionHeader,
	SectionTitle,
	SectionContent,
	FormRow,
	FormGroup,
	FormLabel,
	ValidationList,
	ValidationItem,
	ValidationIcon
} from '../../monsters/styles/MonsterStyles';

// Export design system buttons
export { Button, IconButton } from '../../../../components/common/Button';

// ============================================================================
// ENCOUNTER LIST
// ============================================================================

export const EncounterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: ${theme.spacing[5]};
`;

export const EncounterCardContainer = styled.div<{ $difficulty?: string }>`
	background: var(--bg-secondary);
	border: 1px solid
		${(props) =>
			props.$difficulty === 'deadly'
				? 'var(--accent-danger)'
				: props.$difficulty === 'hard'
					? 'var(--accent-warning)'
					: 'var(--crystal-primary-30)'};
	border-radius: ${theme.borderRadius.lg};
	overflow: hidden;
	transition: all ${theme.transitions.fast};

	&:hover {
		transform: translateY(-2px);
		border-color: ${(props) =>
			props.$difficulty === 'deadly'
				? 'var(--accent-danger)'
				: props.$difficulty === 'hard'
					? 'var(--accent-warning)'
					: 'var(--crystal-primary)'};
		box-shadow: ${theme.shadows.lg};
	}
`;

export const CardHeader = styled.div`
	padding: ${theme.spacing[4]};
	border-bottom: 1px solid var(--crystal-primary-30);
`;

export const CardName = styled.h3`
	font-family: ${theme.typography.fontFamily.secondary};
	color: var(--text-primary);
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.semibold};
	margin: 0 0 ${theme.spacing[1]};
`;

export const CardMeta = styled.div`
	display: flex;
	gap: ${theme.spacing[3]};
	flex-wrap: wrap;
`;

export const MetaBadge = styled.span<{ $color?: string }>`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.full};
	background: ${(props) =>
		props.$color === 'red'
			? 'rgba(247, 118, 142, 0.2)'
			: props.$color === 'yellow'
				? 'rgba(224, 175, 104, 0.2)'
				: props.$color === 'green'
					? 'rgba(158, 206, 106, 0.2)'
					: 'var(--crystal-primary-20)'};
	color: ${(props) =>
		props.$color === 'red'
			? 'var(--accent-danger)'
			: props.$color === 'yellow'
				? 'var(--accent-warning)'
				: props.$color === 'green'
					? 'var(--accent-success)'
					: 'var(--crystal-primary)'};
	border: 1px solid
		${(props) =>
			props.$color === 'red'
				? 'rgba(247, 118, 142, 0.4)'
				: props.$color === 'yellow'
					? 'rgba(224, 175, 104, 0.4)'
					: props.$color === 'green'
						? 'rgba(158, 206, 106, 0.4)'
						: 'var(--crystal-primary-40)'};
`;

export const CardBody = styled.div`
	padding: ${theme.spacing[4]};
`;

export const CardFooter = styled.div`
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border-top: 1px solid var(--crystal-primary-30);
	display: flex;
	justify-content: flex-end;
	gap: ${theme.spacing[2]};
`;

// ============================================================================
// BUDGET METER
// ============================================================================

export const BudgetContainer = styled.div`
	background: var(--bg-tertiary);
	border: 1px solid var(--crystal-primary-30);
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
`;

export const BudgetHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[3]};
`;

export const BudgetLabel = styled.span`
	color: var(--text-secondary);
	font-size: ${theme.typography.fontSize.sm};
`;

export const BudgetValue = styled.span<{ $status?: string }>`
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.xl};
	color: ${(props) =>
		props.$status === 'over'
			? 'var(--accent-danger)'
			: props.$status === 'slightly_over'
				? 'var(--accent-warning)'
				: props.$status === 'under'
					? 'var(--crystal-secondary)'
					: 'var(--accent-success)'};
`;

export const BudgetBarContainer = styled.div`
	height: 12px;
	background: var(--bg-primary);
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;
	position: relative;
`;

export const BudgetBar = styled.div<{ $percentage: number; $status?: string }>`
	height: 100%;
	width: ${(props) => Math.min(100, props.$percentage)}%;
	background: ${(props) =>
		props.$status === 'over'
			? 'var(--accent-danger)'
			: props.$status === 'slightly_over'
				? 'var(--accent-warning)'
				: props.$status === 'under'
					? 'var(--crystal-secondary)'
					: 'var(--accent-success)'};
	border-radius: ${theme.borderRadius.md};
	transition:
		width ${theme.transitions.base},
		background ${theme.transitions.base};
`;

export const BudgetThresholdMarker = styled.div<{ $position: number }>`
	position: absolute;
	left: ${(props) => props.$position}%;
	top: 0;
	bottom: 0;
	width: 2px;
	background: var(--white-30);
`;

export const BudgetStatusText = styled.div<{ $status?: string }>`
	margin-top: ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.xs};
	text-align: center;
	color: ${(props) =>
		props.$status === 'over'
			? 'var(--accent-danger)'
			: props.$status === 'slightly_over'
				? 'var(--accent-warning)'
				: props.$status === 'under'
					? 'var(--crystal-secondary)'
					: 'var(--accent-success)'};
`;

// ============================================================================
// DIFFICULTY SELECTOR
// ============================================================================

export const DifficultyGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: ${theme.spacing[2]};

	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const DifficultyButton = styled.button<{ $selected?: boolean; $difficulty?: string }>`
	padding: ${theme.spacing[3]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	text-align: center;
	border: 1px solid
		${(props) =>
			props.$selected
				? props.$difficulty === 'deadly'
					? 'var(--accent-danger)'
					: props.$difficulty === 'hard'
						? 'var(--accent-warning)'
						: props.$difficulty === 'trivial' || props.$difficulty === 'easy'
							? 'var(--accent-success)'
							: 'var(--crystal-primary)'
				: 'var(--crystal-primary-30)'};
	background: ${(props) =>
		props.$selected
			? props.$difficulty === 'deadly'
				? 'rgba(247, 118, 142, 0.2)'
				: props.$difficulty === 'hard'
					? 'rgba(224, 175, 104, 0.2)'
					: props.$difficulty === 'trivial' || props.$difficulty === 'easy'
						? 'rgba(158, 206, 106, 0.2)'
						: 'var(--crystal-primary-20)'
			: 'var(--bg-tertiary)'};

	&:hover {
		background: ${(props) =>
			props.$difficulty === 'deadly'
				? 'rgba(247, 118, 142, 0.2)'
				: props.$difficulty === 'hard'
					? 'rgba(224, 175, 104, 0.2)'
					: 'var(--crystal-primary-20)'};
	}
`;

export const DifficultyName = styled.div<{ $selected?: boolean }>`
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.xs};
	text-transform: uppercase;
	color: ${(props) => (props.$selected ? 'var(--text-primary)' : 'var(--text-secondary)')};
	margin-bottom: ${theme.spacing[1]};
`;

export const DifficultyBudget = styled.div`
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	color: var(--text-primary);
`;

// ============================================================================
// MONSTER SLOTS
// ============================================================================

export const MonsterSlotList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

export const MonsterSlotCard = styled.div<{ $isEmpty?: boolean }>`
	background: ${(props) => (props.$isEmpty ? 'var(--bg-primary)' : 'var(--bg-secondary)')};
	border: 1px ${(props) => (props.$isEmpty ? 'dashed' : 'solid')}
		var(--crystal-primary-30);
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[4]};
	display: flex;
	align-items: center;
	gap: ${theme.spacing[4]};
`;

export const SlotMonsterInfo = styled.div`
	flex: 1;
`;

export const SlotMonsterName = styled.div`
	font-weight: ${theme.typography.fontWeight.semibold};
	color: var(--text-primary);
	margin-bottom: ${theme.spacing[1]};
`;

export const SlotMonsterMeta = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: var(--text-muted);
`;

export const SlotQuantityControl = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
`;

export const QuantityButton = styled.button`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-tertiary);
	border: 1px solid var(--crystal-primary-30);
	border-radius: ${theme.borderRadius.sm};
	color: var(--text-primary);
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover:not(:disabled) {
		background: var(--crystal-primary-20);
		border-color: var(--crystal-primary);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

export const QuantityValue = styled.span`
	min-width: 32px;
	text-align: center;
	font-weight: ${theme.typography.fontWeight.semibold};
	color: var(--text-primary);
`;

export const SlotCost = styled.div`
	font-weight: ${theme.typography.fontWeight.semibold};
	color: var(--accent-warning);
	min-width: 48px;
	text-align: right;
`;

export const SlotActions = styled.div`
	display: flex;
	gap: ${theme.spacing[2]};
`;

export const EmptySlotContent = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[4]};
`;

// ============================================================================
// PARTY CONFIG
// ============================================================================

export const PartyConfigGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr auto;
	gap: ${theme.spacing[4]};
	align-items: end;

	@media (max-width: 640px) {
		grid-template-columns: 1fr 1fr;
	}
`;

export const PartyStatDisplay = styled.div`
	background: var(--bg-tertiary);
	border: 1px solid var(--crystal-primary-30);
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	text-align: center;
`;

export const PartyStatLabel = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: var(--text-muted);
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const PartyStatValue = styled.div`
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: var(--accent-warning);
`;

// ============================================================================
// PLANNER LAYOUT
// ============================================================================

export const PlannerContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 340px;
	gap: ${theme.spacing[6]};

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`;

export const PlannerMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const PlannerSidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[4]};
	position: sticky;
	top: ${theme.spacing[6]};
	height: fit-content;
`;
