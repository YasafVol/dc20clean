/**
 * Monster Designer Styled Components
 */

import styled from 'styled-components';

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const PageContainer = styled.div`
	min-height: 100vh;
	background: url('/src/assets/BlackBG.jpg') center/cover no-repeat;
`;

export const Header = styled.div`
	padding: 1.5rem 2rem;
	border-bottom: 1px solid rgba(168, 85, 247, 0.3);
	background: rgba(0, 0, 0, 0.4);
`;

export const HeaderContent = styled.div`
	max-width: 80rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
`;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

export const Title = styled.h1`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	margin: 0;
`;

export const Subtitle = styled.p`
	color: #a1a1aa;
	font-size: 0.875rem;
	margin: 0;
`;

export const MainContent = styled.div`
	max-width: 80rem;
	margin: 0 auto;
	padding: 1.5rem;
`;

// ============================================================================
// MONSTER LIST
// ============================================================================

export const MonsterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1.25rem;
`;

export const EmptyState = styled.div`
	text-align: center;
	padding: 4rem 2rem;
	color: #a1a1aa;
`;

export const EmptyStateTitle = styled.h2`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
`;

export const EmptyStateText = styled.p`
	color: #71717a;
	margin-bottom: 1.5rem;
`;

// ============================================================================
// MONSTER CARD
// ============================================================================

export const MonsterCardContainer = styled.div<{ $tier?: string }>`
	background: linear-gradient(
		135deg,
		${(props) =>
				props.$tier === 'legendary'
					? 'rgba(234, 179, 8, 0.15)'
					: props.$tier === 'apex'
						? 'rgba(168, 85, 247, 0.15)'
						: 'rgba(30, 27, 75, 0.8)'}
			0%,
		rgba(30, 27, 75, 0.9) 100%
	);
	border: 1px solid
		${(props) =>
			props.$tier === 'legendary'
				? '#eab308'
				: props.$tier === 'apex'
					? '#a855f7'
					: 'rgba(168, 85, 247, 0.4)'};
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		border-color: ${(props) =>
			props.$tier === 'legendary'
				? '#facc15'
				: props.$tier === 'apex'
					? '#c084fc'
					: '#a855f7'};
		box-shadow: 0 8px 24px -4px rgba(168, 85, 247, 0.3);
	}
`;

export const CardHeader = styled.div`
	padding: 1rem;
	border-bottom: 1px solid rgba(168, 85, 247, 0.2);
`;

export const CardTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 0.5rem;
`;

export const CardName = styled.h3`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.125rem;
	font-weight: 600;
	margin: 0;
	flex: 1;
`;

export const CardBadges = styled.div`
	display: flex;
	gap: 0.375rem;
	flex-wrap: wrap;
`;

export const TierBadge = styled.span<{ $tier?: string }>`
	font-size: 0.625rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	padding: 0.125rem 0.5rem;
	border-radius: 9999px;
	background: ${(props) =>
		props.$tier === 'legendary'
			? 'rgba(234, 179, 8, 0.2)'
			: props.$tier === 'apex'
				? 'rgba(168, 85, 247, 0.2)'
				: 'rgba(74, 222, 128, 0.2)'};
	color: ${(props) =>
		props.$tier === 'legendary' ? '#facc15' : props.$tier === 'apex' ? '#c084fc' : '#4ade80'};
	border: 1px solid
		${(props) =>
			props.$tier === 'legendary'
				? 'rgba(234, 179, 8, 0.4)'
				: props.$tier === 'apex'
					? 'rgba(168, 85, 247, 0.4)'
					: 'rgba(74, 222, 128, 0.4)'};
`;

export const LevelBadge = styled.span`
	font-size: 0.625rem;
	font-weight: 600;
	padding: 0.125rem 0.5rem;
	border-radius: 9999px;
	background: rgba(59, 130, 246, 0.2);
	color: #60a5fa;
	border: 1px solid rgba(59, 130, 246, 0.4);
`;

export const CardSubtitle = styled.p`
	color: #a1a1aa;
	font-size: 0.75rem;
	margin: 0.25rem 0 0;
`;

export const CardBody = styled.div`
	padding: 1rem;
`;

export const StatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.5rem;
`;

export const StatItem = styled.div`
	text-align: center;
	padding: 0.5rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 6px;
`;

export const StatLabel = styled.div`
	font-size: 0.625rem;
	color: #71717a;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StatValue = styled.div`
	font-size: 1.125rem;
	font-weight: 600;
	color: #e5e7eb;
`;

export const CardFooter = styled.div`
	padding: 0.75rem 1rem;
	border-top: 1px solid rgba(168, 85, 247, 0.2);
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
`;

// ============================================================================
// DESIGNER LAYOUT
// ============================================================================

export const DesignerContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 320px;
	gap: 1.5rem;

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`;

export const DesignerMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const DesignerSidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: sticky;
	top: 1.5rem;
	height: fit-content;
`;

export const Section = styled.div`
	background: rgba(30, 27, 75, 0.8);
	border: 1px solid rgba(168, 85, 247, 0.3);
	border-radius: 12px;
	overflow: hidden;
`;

export const SectionHeader = styled.div`
	padding: 0.75rem 1rem;
	background: rgba(168, 85, 247, 0.1);
	border-bottom: 1px solid rgba(168, 85, 247, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SectionTitle = styled.h2`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 0.875rem;
	font-weight: 600;
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const SectionContent = styled.div`
	padding: 1rem;
`;

export const FormRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const FormGroup = styled.div<{ $flex?: number }>`
	flex: ${(props) => props.$flex ?? 1};
	display: flex;
	flex-direction: column;
	gap: 0.375rem;
`;

export const FormLabel = styled.label`
	font-size: 0.75rem;
	color: #a1a1aa;
	font-weight: 500;
`;

// ============================================================================
// STAT PREVIEW
// ============================================================================

export const PreviewCard = styled.div`
	background: linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(49, 46, 129, 0.9) 100%);
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 12px;
	overflow: hidden;
`;

export const PreviewHeader = styled.div`
	padding: 1rem;
	background: rgba(168, 85, 247, 0.15);
	border-bottom: 1px solid rgba(168, 85, 247, 0.3);
	text-align: center;
`;

export const PreviewName = styled.h2`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.25rem;
	font-weight: bold;
	margin: 0 0 0.25rem;
`;

export const PreviewSubtitle = styled.p`
	color: #a1a1aa;
	font-size: 0.75rem;
	margin: 0;
`;

export const PreviewBody = styled.div`
	padding: 1rem;
`;

export const PreviewStatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
`;

export const PreviewStatItem = styled.div<{ $highlight?: boolean }>`
	background: ${(props) =>
		props.$highlight ? 'rgba(74, 222, 128, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
	border: 1px solid
		${(props) => (props.$highlight ? 'rgba(74, 222, 128, 0.3)' : 'rgba(168, 85, 247, 0.2)')};
	border-radius: 8px;
	padding: 0.75rem;
	text-align: center;
`;

export const PreviewStatLabel = styled.div`
	font-size: 0.625rem;
	color: #71717a;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: 0.25rem;
`;

export const PreviewStatValue = styled.div<{ $highlight?: boolean }>`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${(props) => (props.$highlight ? '#4ade80' : '#e5e7eb')};
`;

export const PreviewDivider = styled.hr`
	border: none;
	border-top: 1px solid rgba(168, 85, 247, 0.2);
	margin: 1rem 0;
`;

export const EncounterCost = styled.div`
	text-align: center;
	padding: 0.75rem;
	background: rgba(234, 179, 8, 0.1);
	border: 1px solid rgba(234, 179, 8, 0.3);
	border-radius: 8px;
`;

export const EncounterCostLabel = styled.div`
	font-size: 0.625rem;
	color: #a1a1aa;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const EncounterCostValue = styled.div`
	font-size: 1.75rem;
	font-weight: 700;
	color: #fbbf24;
`;

// ============================================================================
// ROLE SELECTOR
// ============================================================================

export const RoleGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	gap: 0.75rem;
`;

export const RoleCard = styled.button<{ $selected?: boolean }>`
	background: ${(props) =>
		props.$selected
			? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)'
			: 'rgba(0, 0, 0, 0.3)'};
	border: 1px solid
		${(props) => (props.$selected ? '#a855f7' : 'rgba(168, 85, 247, 0.2)')};
	border-radius: 8px;
	padding: 0.75rem;
	cursor: pointer;
	transition: all 0.2s ease;
	text-align: left;

	&:hover {
		background: ${(props) =>
			props.$selected
				? 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.3) 100%)'
				: 'rgba(168, 85, 247, 0.1)'};
		border-color: ${(props) => (props.$selected ? '#c084fc' : 'rgba(168, 85, 247, 0.4)')};
	}
`;

export const RoleName = styled.div<{ $selected?: boolean }>`
	font-weight: 600;
	color: ${(props) => (props.$selected ? '#fbbf24' : '#e5e7eb')};
	font-size: 0.875rem;
	margin-bottom: 0.25rem;
`;

export const RoleModifiers = styled.div`
	font-size: 0.625rem;
	color: #71717a;
`;

// ============================================================================
// FEATURE POINT BUY
// ============================================================================

export const FeatureBudget = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	margin-bottom: 1rem;
`;

export const BudgetLabel = styled.span`
	color: #a1a1aa;
	font-size: 0.875rem;
`;

export const BudgetValue = styled.span<{ $overBudget?: boolean }>`
	font-weight: 600;
	font-size: 1.125rem;
	color: ${(props) => (props.$overBudget ? '#ef4444' : '#4ade80')};
`;

export const FeatureList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const FeatureItem = styled.div<{ $selected?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background: ${(props) =>
		props.$selected ? 'rgba(74, 222, 128, 0.1)' : 'rgba(0, 0, 0, 0.2)'};
	border: 1px solid
		${(props) => (props.$selected ? 'rgba(74, 222, 128, 0.3)' : 'rgba(168, 85, 247, 0.2)')};
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${(props) =>
			props.$selected ? 'rgba(74, 222, 128, 0.15)' : 'rgba(168, 85, 247, 0.1)'};
	}
`;

export const FeatureInfo = styled.div`
	flex: 1;
`;

export const FeatureName = styled.div<{ $selected?: boolean }>`
	font-weight: 500;
	color: ${(props) => (props.$selected ? '#4ade80' : '#e5e7eb')};
	font-size: 0.875rem;
`;

export const FeatureDescription = styled.div`
	font-size: 0.75rem;
	color: #71717a;
	margin-top: 0.125rem;
`;

export const FeatureCost = styled.div<{ $selected?: boolean }>`
	font-weight: 600;
	color: ${(props) => (props.$selected ? '#4ade80' : '#fbbf24')};
	padding-left: 0.75rem;
`;

// ============================================================================
// ACTION BUILDER
// ============================================================================

export const ActionList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const ActionCard = styled.div`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(168, 85, 247, 0.2);
	border-radius: 8px;
	overflow: hidden;
`;

export const ActionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background: rgba(168, 85, 247, 0.1);
	border-bottom: 1px solid rgba(168, 85, 247, 0.2);
`;

export const ActionName = styled.div`
	font-weight: 600;
	color: #e5e7eb;
	font-size: 0.875rem;
`;

export const ActionApCost = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.75rem;
	color: #fbbf24;
	font-weight: 600;
`;

export const ActionBody = styled.div`
	padding: 0.75rem;
`;

export const ActionStats = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 0.5rem;
`;

export const ActionStat = styled.div`
	font-size: 0.75rem;
	color: #a1a1aa;

	span {
		color: #e5e7eb;
		font-weight: 500;
	}
`;

export const ActionDescription = styled.div`
	font-size: 0.75rem;
	color: #71717a;
`;

export const ActionFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	border-top: 1px solid rgba(168, 85, 247, 0.1);
`;

// ============================================================================
// VALIDATION
// ============================================================================

export const ValidationList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const ValidationItem = styled.div<{ $type: 'error' | 'warning' | 'info' }>`
	display: flex;
	align-items: flex-start;
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	border-radius: 6px;
	font-size: 0.75rem;
	background: ${(props) =>
		props.$type === 'error'
			? 'rgba(239, 68, 68, 0.1)'
			: props.$type === 'warning'
				? 'rgba(234, 179, 8, 0.1)'
				: 'rgba(59, 130, 246, 0.1)'};
	border: 1px solid
		${(props) =>
			props.$type === 'error'
				? 'rgba(239, 68, 68, 0.3)'
				: props.$type === 'warning'
					? 'rgba(234, 179, 8, 0.3)'
					: 'rgba(59, 130, 246, 0.3)'};
	color: ${(props) =>
		props.$type === 'error' ? '#fca5a5' : props.$type === 'warning' ? '#fcd34d' : '#93c5fd'};
`;

export const ValidationIcon = styled.span`
	flex-shrink: 0;
`;
