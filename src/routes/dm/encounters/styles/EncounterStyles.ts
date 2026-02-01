/**
 * Encounter Planner Styled Components
 */

import styled from 'styled-components';

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
	ValidationIcon,
} from '../../monsters/styles/MonsterStyles';

// ============================================================================
// ENCOUNTER LIST
// ============================================================================

export const EncounterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: 1.25rem;
`;

export const EncounterCardContainer = styled.div<{ $difficulty?: string }>`
	background: linear-gradient(
		135deg,
		${(props) =>
				props.$difficulty === 'deadly'
					? 'rgba(239, 68, 68, 0.15)'
					: props.$difficulty === 'hard'
						? 'rgba(234, 179, 8, 0.15)'
						: 'rgba(30, 27, 75, 0.8)'}
			0%,
		rgba(30, 27, 75, 0.9) 100%
	);
	border: 1px solid
		${(props) =>
			props.$difficulty === 'deadly'
				? '#ef4444'
				: props.$difficulty === 'hard'
					? '#eab308'
					: 'rgba(168, 85, 247, 0.4)'};
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		border-color: ${(props) =>
			props.$difficulty === 'deadly'
				? '#f87171'
				: props.$difficulty === 'hard'
					? '#facc15'
					: '#a855f7'};
		box-shadow: 0 8px 24px -4px rgba(168, 85, 247, 0.3);
	}
`;

export const CardHeader = styled.div`
	padding: 1rem;
	border-bottom: 1px solid rgba(168, 85, 247, 0.2);
`;

export const CardName = styled.h3`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.125rem;
	font-weight: 600;
	margin: 0 0 0.25rem;
`;

export const CardMeta = styled.div`
	display: flex;
	gap: 0.75rem;
	flex-wrap: wrap;
`;

export const MetaBadge = styled.span<{ $color?: string }>`
	font-size: 0.75rem;
	padding: 0.125rem 0.5rem;
	border-radius: 9999px;
	background: ${(props) =>
		props.$color === 'red'
			? 'rgba(239, 68, 68, 0.2)'
			: props.$color === 'yellow'
				? 'rgba(234, 179, 8, 0.2)'
				: props.$color === 'green'
					? 'rgba(74, 222, 128, 0.2)'
					: 'rgba(168, 85, 247, 0.2)'};
	color: ${(props) =>
		props.$color === 'red'
			? '#fca5a5'
			: props.$color === 'yellow'
				? '#fcd34d'
				: props.$color === 'green'
					? '#4ade80'
					: '#c084fc'};
	border: 1px solid
		${(props) =>
			props.$color === 'red'
				? 'rgba(239, 68, 68, 0.4)'
				: props.$color === 'yellow'
					? 'rgba(234, 179, 8, 0.4)'
					: props.$color === 'green'
						? 'rgba(74, 222, 128, 0.4)'
						: 'rgba(168, 85, 247, 0.4)'};
`;

export const CardBody = styled.div`
	padding: 1rem;
`;

export const CardFooter = styled.div`
	padding: 0.75rem 1rem;
	border-top: 1px solid rgba(168, 85, 247, 0.2);
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
`;

// ============================================================================
// BUDGET METER
// ============================================================================

export const BudgetContainer = styled.div`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(168, 85, 247, 0.3);
	border-radius: 12px;
	padding: 1rem;
`;

export const BudgetHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.75rem;
`;

export const BudgetLabel = styled.span`
	color: #a1a1aa;
	font-size: 0.875rem;
`;

export const BudgetValue = styled.span<{ $status?: string }>`
	font-weight: 600;
	font-size: 1.25rem;
	color: ${(props) =>
		props.$status === 'over'
			? '#ef4444'
			: props.$status === 'slightly_over'
				? '#eab308'
				: props.$status === 'under'
					? '#60a5fa'
					: '#4ade80'};
`;

export const BudgetBarContainer = styled.div`
	height: 12px;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 6px;
	overflow: hidden;
	position: relative;
`;

export const BudgetBar = styled.div<{ $percentage: number; $status?: string }>`
	height: 100%;
	width: ${(props) => Math.min(100, props.$percentage)}%;
	background: ${(props) =>
		props.$status === 'over'
			? 'linear-gradient(90deg, #ef4444, #dc2626)'
			: props.$status === 'slightly_over'
				? 'linear-gradient(90deg, #eab308, #ca8a04)'
				: props.$status === 'under'
					? 'linear-gradient(90deg, #60a5fa, #3b82f6)'
					: 'linear-gradient(90deg, #4ade80, #22c55e)'};
	border-radius: 6px;
	transition: width 0.3s ease, background 0.3s ease;
`;

export const BudgetThresholdMarker = styled.div<{ $position: number }>`
	position: absolute;
	left: ${(props) => props.$position}%;
	top: 0;
	bottom: 0;
	width: 2px;
	background: rgba(255, 255, 255, 0.3);
`;

export const BudgetStatusText = styled.div<{ $status?: string }>`
	margin-top: 0.5rem;
	font-size: 0.75rem;
	text-align: center;
	color: ${(props) =>
		props.$status === 'over'
			? '#fca5a5'
			: props.$status === 'slightly_over'
				? '#fcd34d'
				: props.$status === 'under'
					? '#93c5fd'
					: '#86efac'};
`;

// ============================================================================
// DIFFICULTY SELECTOR
// ============================================================================

export const DifficultyGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 0.5rem;

	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const DifficultyButton = styled.button<{ $selected?: boolean; $difficulty?: string }>`
	padding: 0.75rem 0.5rem;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease;
	text-align: center;
	border: 1px solid
		${(props) =>
			props.$selected
				? props.$difficulty === 'deadly'
					? '#ef4444'
					: props.$difficulty === 'hard'
						? '#eab308'
						: props.$difficulty === 'trivial' || props.$difficulty === 'easy'
							? '#4ade80'
							: '#a855f7'
				: 'rgba(168, 85, 247, 0.2)'};
	background: ${(props) =>
		props.$selected
			? props.$difficulty === 'deadly'
				? 'rgba(239, 68, 68, 0.2)'
				: props.$difficulty === 'hard'
					? 'rgba(234, 179, 8, 0.2)'
					: props.$difficulty === 'trivial' || props.$difficulty === 'easy'
						? 'rgba(74, 222, 128, 0.2)'
						: 'rgba(168, 85, 247, 0.2)'
			: 'rgba(0, 0, 0, 0.3)'};

	&:hover {
		background: ${(props) =>
			props.$difficulty === 'deadly'
				? 'rgba(239, 68, 68, 0.15)'
				: props.$difficulty === 'hard'
					? 'rgba(234, 179, 8, 0.15)'
					: 'rgba(168, 85, 247, 0.15)'};
	}
`;

export const DifficultyName = styled.div<{ $selected?: boolean }>`
	font-weight: 600;
	font-size: 0.75rem;
	text-transform: uppercase;
	color: ${(props) => (props.$selected ? '#fbbf24' : '#e5e7eb')};
	margin-bottom: 0.25rem;
`;

export const DifficultyBudget = styled.div`
	font-size: 1rem;
	font-weight: 700;
	color: #e5e7eb;
`;

// ============================================================================
// MONSTER SLOTS
// ============================================================================

export const MonsterSlotList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const MonsterSlotCard = styled.div<{ $isEmpty?: boolean }>`
	background: ${(props) =>
		props.$isEmpty ? 'rgba(0, 0, 0, 0.2)' : 'rgba(30, 27, 75, 0.6)'};
	border: 1px dashed
		${(props) =>
			props.$isEmpty ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.4)'};
	border-radius: 8px;
	padding: 1rem;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const SlotMonsterInfo = styled.div`
	flex: 1;
`;

export const SlotMonsterName = styled.div`
	font-weight: 600;
	color: #e5e7eb;
	margin-bottom: 0.25rem;
`;

export const SlotMonsterMeta = styled.div`
	font-size: 0.75rem;
	color: #71717a;
`;

export const SlotQuantityControl = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const QuantityButton = styled.button`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.4);
	border: 1px solid rgba(168, 85, 247, 0.3);
	border-radius: 4px;
	color: #e5e7eb;
	cursor: pointer;
	transition: all 0.2s;

	&:hover:not(:disabled) {
		background: rgba(168, 85, 247, 0.2);
		border-color: rgba(168, 85, 247, 0.5);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

export const QuantityValue = styled.span`
	min-width: 32px;
	text-align: center;
	font-weight: 600;
	color: #e5e7eb;
`;

export const SlotCost = styled.div`
	font-weight: 600;
	color: #fbbf24;
	min-width: 48px;
	text-align: right;
`;

export const SlotActions = styled.div`
	display: flex;
	gap: 0.5rem;
`;

export const EmptySlotContent = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

// ============================================================================
// PARTY CONFIG
// ============================================================================

export const PartyConfigGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr auto;
	gap: 1rem;
	align-items: end;

	@media (max-width: 640px) {
		grid-template-columns: 1fr 1fr;
	}
`;

export const PartyStatDisplay = styled.div`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(168, 85, 247, 0.3);
	border-radius: 8px;
	padding: 0.75rem 1rem;
	text-align: center;
`;

export const PartyStatLabel = styled.div`
	font-size: 0.625rem;
	color: #71717a;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const PartyStatValue = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	color: #fbbf24;
`;

// ============================================================================
// PLANNER LAYOUT
// ============================================================================

export const PlannerContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 340px;
	gap: 1.5rem;

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`;

export const PlannerMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const PlannerSidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: sticky;
	top: 1.5rem;
	height: fit-content;
`;
