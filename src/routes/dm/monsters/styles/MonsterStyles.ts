/**
 * Monster Designer Styled Components
 */

import styled from 'styled-components';
import { theme } from '../../../character-sheet/styles/theme';

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const PageContainer = styled.div`
	--dm-page: ${theme.colors.bg.primary};
	--dm-surface: ${theme.colors.bg.secondary};
	--dm-raised: ${theme.colors.bg.elevated};
	--dm-field: ${theme.colors.bg.primary};
	--dm-border: ${theme.colors.border.default};
	--dm-accent: ${theme.colors.accent.primary};
	--dm-accent-soft: ${theme.colors.crystal.primaryAlpha10};
	--dm-accent-mid: ${theme.colors.crystal.primaryAlpha20};
	--dm-accent-strong: ${theme.colors.crystal.primaryAlpha30};
	--dm-text: ${theme.colors.text.primary};
	--dm-subtext: ${theme.colors.text.secondary};
	--dm-muted: ${theme.colors.text.muted};
	--dm-gold: ${theme.colors.accent.warning};
	min-height: 100vh;
	background: var(--dm-page);
	color: var(--dm-text);
	font-family: ${theme.typography.fontFamily.primary};
`;

export const Header = styled.div`
	padding: 1.5rem 2rem;
	border-bottom: 1px solid var(--dm-border);
	background: var(--dm-surface);
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
	color: var(--dm-gold);
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	margin: 0;
`;

export const Subtitle = styled.p`
	color: var(--dm-subtext);
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
	color: var(--dm-subtext);
`;

export const EmptyStateTitle = styled.h2`
	font-family: 'Cinzel', serif;
	color: var(--dm-gold);
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
`;

export const EmptyStateText = styled.p`
	color: var(--dm-muted);
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
						? 'var(--dm-accent-soft)'
						: 'var(--dm-surface)'}
			0%,
		var(--dm-surface) 100%
	);
	border: 1px solid
		${(props) =>
			props.$tier === 'legendary'
				? '#eab308'
				: props.$tier === 'apex'
					? 'var(--dm-accent)'
					: 'var(--dm-accent-strong)'};
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		border-color: ${(props) =>
			props.$tier === 'legendary'
				? '#facc15'
				: props.$tier === 'apex'
					? 'var(--dm-accent)'
					: 'var(--dm-accent)'};
		box-shadow: 0 8px 24px -4px var(--dm-accent-strong);
	}
`;

export const CardHeader = styled.div`
	padding: 1rem;
	border-bottom: 1px solid var(--dm-accent-mid);
`;

export const CardTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 0.5rem;
`;

export const CardName = styled.h3`
	font-family: 'Cinzel', serif;
	color: var(--dm-gold);
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
				? 'var(--dm-accent-mid)'
				: 'rgba(74, 222, 128, 0.2)'};
	color: ${(props) =>
		props.$tier === 'legendary'
			? '#facc15'
			: props.$tier === 'apex'
				? 'var(--dm-accent)'
				: '#4ade80'};
	border: 1px solid
		${(props) =>
			props.$tier === 'legendary'
				? 'rgba(234, 179, 8, 0.4)'
				: props.$tier === 'apex'
					? 'var(--dm-accent-strong)'
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
	color: var(--dm-subtext);
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
	color: var(--dm-muted);
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StatValue = styled.div`
	font-size: 1.125rem;
	font-weight: 600;
	color: var(--dm-text);
`;

export const CardFooter = styled.div`
	padding: 0.75rem 1rem;
	border-top: 1px solid var(--dm-accent-mid);
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
	background: var(--dm-surface);
	border: 1px solid var(--dm-border);
	border-radius: 12px;
	overflow: hidden;
`;

export const SectionHeader = styled.div`
	padding: 0.75rem 1rem;
	background: var(--dm-raised);
	border-bottom: 1px solid var(--dm-border);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SectionTitle = styled.h2`
	font-family: 'Cinzel', serif;
	color: var(--dm-gold);
	font-size: 1rem;
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
	color: var(--dm-subtext);
	font-weight: 500;
`;

// ============================================================================
// STAT PREVIEW
// ============================================================================

export const PreviewCard = styled.div`
	background: linear-gradient(135deg, var(--dm-surface) 0%, var(--dm-raised) 100%);
	border: 1px solid var(--dm-accent-strong);
	border-radius: 12px;
	overflow: hidden;
`;

export const PreviewHeader = styled.div`
	padding: 1rem;
	background: var(--dm-accent-soft);
	border-bottom: 1px solid var(--dm-accent-strong);
	text-align: center;
`;

export const PreviewName = styled.h2`
	font-family: 'Cinzel', serif;
	color: var(--dm-gold);
	font-size: 1.25rem;
	font-weight: bold;
	margin: 0 0 0.25rem;
`;

export const PreviewSubtitle = styled.p`
	color: var(--dm-subtext);
	font-size: 0.75rem;
	margin: 0;
`;

export const PreviewResetRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 0.5rem;
`;

export const PreviewResetButton = styled.button`
	border: 1px solid var(--dm-accent-strong);
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.18);
	color: var(--dm-subtext);
	cursor: pointer;
	font-size: 0.6875rem;
	line-height: 1;
	padding: 0.35rem 0.5rem;
	transition:
		background 0.2s ease,
		border-color 0.2s ease,
		color 0.2s ease;

	&:hover {
		background: var(--dm-accent-soft);
		border-color: var(--dm-accent);
		color: var(--dm-text);
	}
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
	position: relative;
	min-height: 5.75rem;
	background: ${(props) => (props.$highlight ? 'rgba(74, 222, 128, 0.1)' : 'rgba(0, 0, 0, 0.3)')};
	border: 1px solid
		${(props) => (props.$highlight ? 'rgba(74, 222, 128, 0.3)' : 'var(--dm-accent-mid)')};
	border-radius: 8px;
	padding: 0.75rem 2rem;
	text-align: center;
`;

export const PreviewStatAdjustButton = styled.button<{ $side: 'left' | 'right' }>`
	position: absolute;
	top: 50%;
	${(props) => props.$side}: 0.35rem;
	transform: translateY(-50%);
	width: 1.25rem;
	height: 1.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--dm-accent-strong);
	border-radius: 9999px;
	background: rgba(0, 0, 0, 0.28);
	color: var(--dm-subtext);
	cursor: pointer;
	font-size: 0.875rem;
	font-weight: 700;
	line-height: 1;
	transition:
		background 0.2s ease,
		border-color 0.2s ease,
		color 0.2s ease;

	&:hover {
		background: var(--dm-accent-mid);
		border-color: var(--dm-accent);
		color: var(--dm-text);
	}
`;

export const PreviewStatLabel = styled.div`
	font-size: 0.625rem;
	color: var(--dm-muted);
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: 0.25rem;
`;

export const PreviewStatValue = styled.div<{ $highlight?: boolean }>`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${(props) => (props.$highlight ? '#4ade80' : 'var(--dm-text)')};
`;

export const PreviewDivider = styled.hr`
	border: none;
	border-top: 1px solid var(--dm-accent-mid);
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
	color: var(--dm-subtext);
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const EncounterCostValue = styled.div`
	font-size: 1.75rem;
	font-weight: 700;
	color: var(--dm-gold);
`;

// ============================================================================
// ROLE SELECTOR
// ============================================================================

export const RoleGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.75rem;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const RoleCard = styled.button<{ $selected?: boolean }>`
	background: ${(props) =>
		props.$selected
			? 'linear-gradient(135deg, var(--dm-accent-strong) 0%, var(--dm-accent-mid) 100%)'
			: 'rgba(0, 0, 0, 0.3)'};
	border: 1px solid ${(props) => (props.$selected ? 'var(--dm-accent)' : 'var(--dm-accent-mid)')};
	border-radius: 8px;
	padding: 0.75rem;
	cursor: pointer;
	transition: all 0.2s ease;
	text-align: left;

	&:hover {
		background: ${(props) =>
			props.$selected
				? 'linear-gradient(135deg, var(--dm-accent-strong) 0%, var(--dm-accent-strong) 100%)'
				: 'var(--dm-accent-soft)'};
		border-color: ${(props) => (props.$selected ? 'var(--dm-accent)' : 'var(--dm-accent-strong)')};
	}
`;

export const RoleName = styled.div<{ $selected?: boolean }>`
	font-weight: 600;
	color: ${(props) => (props.$selected ? 'var(--dm-gold)' : 'var(--dm-text)')};
	font-size: 0.875rem;
	margin-bottom: 0.25rem;
`;

export const RoleModifiers = styled.div`
	font-size: 0.8125rem;
	color: var(--dm-subtext);
	margin-top: 0.25rem;
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
	color: var(--dm-subtext);
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
	background: ${(props) => (props.$selected ? 'var(--dm-accent-soft)' : 'var(--dm-raised)')};
	border: 1px solid ${(props) => (props.$selected ? 'var(--dm-accent)' : 'var(--dm-border)')};
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: var(--dm-accent-soft);
	}
`;

export const FeatureInfo = styled.div`
	flex: 1;
`;

export const FeatureName = styled.div<{ $selected?: boolean }>`
	font-weight: 500;
	color: ${(props) => (props.$selected ? 'var(--dm-accent)' : 'var(--dm-text)')};
	font-size: 0.875rem;
`;

export const FeatureDescription = styled.div`
	font-size: 0.75rem;
	color: var(--dm-muted);
	margin-top: 0.125rem;
`;

export const FeatureCost = styled.div<{ $selected?: boolean }>`
	font-weight: 600;
	color: ${(props) => (props.$selected ? 'var(--dm-accent)' : 'var(--dm-gold)')};
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
	border: 1px solid var(--dm-accent-mid);
	border-radius: 8px;
	overflow: hidden;
`;

export const ActionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background: var(--dm-accent-soft);
	border-bottom: 1px solid var(--dm-accent-mid);
`;

export const ActionName = styled.div`
	font-weight: 600;
	color: var(--dm-text);
	font-size: 0.875rem;
`;

export const ActionApCost = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.75rem;
	color: var(--dm-gold);
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
	color: var(--dm-subtext);

	span {
		color: var(--dm-text);
		font-weight: 500;
	}
`;

export const ActionDescription = styled.div`
	font-size: 0.75rem;
	color: var(--dm-muted);
`;

export const ActionFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	border-top: 1px solid var(--dm-accent-soft);
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
