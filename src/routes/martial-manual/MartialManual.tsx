import React, { useMemo, useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { allManeuvers, ManeuverType, type Maneuver } from '../../lib/rulesdata/martials/maneuvers';
import {
	formatManeuverCost,
	formatManeuverEnhancementCost
} from '../../lib/rulesdata/martials/maneuverFormatting';
import { useTranslation } from 'react-i18next';
import * as S from '../spellbook/Spellbook.styles';

const MartialManual: React.FC = () => {
	const { t } = useTranslation();
	const [typeFilter, setTypeFilter] = useState<ManeuverType[]>([]);
	const [apCostFilter, setApCostFilter] = useState<number[]>([]);
	const [spCostFilter, setSpCostFilter] = useState<number[]>([]);
	const [reactionOnly, setReactionOnly] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedManeuvers, setExpandedManeuvers] = useState<Set<string>>(new Set());

	const availableApCosts = useMemo(() => {
		return Array.from(new Set(allManeuvers.map((maneuver) => maneuver.cost.ap))).sort(
			(a, b) => a - b
		);
	}, []);

	const availableSpCosts = useMemo(() => {
		return Array.from(
			new Set(
				allManeuvers
					.map((maneuver) => maneuver.cost.sp)
					.filter((cost): cost is number => typeof cost === 'number' && cost > 0)
			)
		).sort((a, b) => a - b);
	}, []);

	const toggleSelection = <T extends string | number>(
		value: T,
		selected: T[],
		setSelected: React.Dispatch<React.SetStateAction<T[]>>
	) => {
		setSelected((prev) =>
			prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
		);
	};

	const filteredManeuvers = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		return allManeuvers.filter((maneuver) => {
			const matchesSearch =
				!query ||
				maneuver.name.toLowerCase().includes(query) ||
				maneuver.description.toLowerCase().includes(query) ||
				maneuver.enhancements.some(
					(enhancement) =>
						enhancement.name.toLowerCase().includes(query) ||
						enhancement.description.toLowerCase().includes(query)
				);

			return (
				matchesSearch &&
				(typeFilter.length === 0 || typeFilter.includes(maneuver.type)) &&
				(apCostFilter.length === 0 || apCostFilter.includes(maneuver.cost.ap)) &&
				(spCostFilter.length === 0 || spCostFilter.includes(maneuver.cost.sp ?? 0)) &&
				(!reactionOnly || maneuver.isReaction)
			);
		});
	}, [apCostFilter, reactionOnly, searchQuery, spCostFilter, typeFilter]);

	const maneuversByType = useMemo(() => {
		const grouped: Record<string, Maneuver[]> = {};
		filteredManeuvers.forEach((maneuver) => {
			if (!grouped[maneuver.type]) grouped[maneuver.type] = [];
			grouped[maneuver.type].push(maneuver);
		});
		return grouped;
	}, [filteredManeuvers]);

	const hasActiveFilters =
		typeFilter.length > 0 ||
		apCostFilter.length > 0 ||
		spCostFilter.length > 0 ||
		reactionOnly ||
		searchQuery.trim() !== '';

	const clearFilters = () => {
		setTypeFilter([]);
		setApCostFilter([]);
		setSpCostFilter([]);
		setReactionOnly(false);
		setSearchQuery('');
	};

	const toggleExpanded = (maneuverId: string) => {
		setExpandedManeuvers((prev) => {
			const next = new Set(prev);
			if (next.has(maneuverId)) {
				next.delete(maneuverId);
			} else {
				next.add(maneuverId);
			}
			return next;
		});
	};

	return (
		<S.PageContainer>
			<S.Header>
				<S.Title>{t('martialManual.title')}</S.Title>
				<S.Subtitle>
					{t('martialManual.subtitle')} ({allManeuvers.length} {t('martialManual.maneuvers')})
				</S.Subtitle>
			</S.Header>

			<S.MainContent>
				<S.FiltersCard>
					<S.SearchContainer>
						<div style={{ height: '1.5rem' }} />
						<S.SearchInput
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={t('martialManual.searchPlaceholder')}
						/>
					</S.SearchContainer>

					<S.FiltersContainer>
						<S.FilterSection $borderColor="primary">
							<S.FilterLabel $color="primary">{t('martialManual.type')}</S.FilterLabel>
							<S.FilterChips>
								{Object.values(ManeuverType).map((type) => {
									const isSelected = typeFilter.includes(type);
									return (
										<S.FilterChip
											key={type}
											type="button"
											onClick={() => toggleSelection(type, typeFilter, setTypeFilter)}
											aria-pressed={isSelected}
											$selected={isSelected}
											$color="primary"
										>
											{type}
										</S.FilterChip>
									);
								})}
							</S.FilterChips>
						</S.FilterSection>

						<S.FilterSection $borderColor="warning">
							<S.FilterLabel $color="warning">{t('martialManual.cost')}</S.FilterLabel>
							<S.FilterChips style={{ alignItems: 'center' }}>
								<span style={{ fontSize: '0.875rem', fontWeight: 600 }}>AP</span>
								{availableApCosts.map((cost) => (
									<S.FilterChip
										key={`ap-${cost}`}
										type="button"
										onClick={() => toggleSelection(cost, apCostFilter, setApCostFilter)}
										aria-pressed={apCostFilter.includes(cost)}
										$selected={apCostFilter.includes(cost)}
										$color="warning"
									>
										{cost}
									</S.FilterChip>
								))}
								<span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
									SP
								</span>
								{availableSpCosts.map((cost) => (
									<S.FilterChip
										key={`sp-${cost}`}
										type="button"
										onClick={() => toggleSelection(cost, spCostFilter, setSpCostFilter)}
										aria-pressed={spCostFilter.includes(cost)}
										$selected={spCostFilter.includes(cost)}
										$color="warning"
									>
										{cost}
									</S.FilterChip>
								))}
							</S.FilterChips>
						</S.FilterSection>

						<S.FilterSection
							$borderColor="warning"
							style={{ flexDirection: 'row', alignItems: 'center', padding: '1rem' }}
						>
							<input
								type="checkbox"
								id="reaction-only"
								checked={reactionOnly}
								onChange={(e) => setReactionOnly(e.target.checked)}
								style={{ height: '1.25rem', width: '1.25rem', cursor: 'pointer' }}
							/>
							<S.FilterLabel
								htmlFor="reaction-only"
								$color="warning"
								style={{ cursor: 'pointer', margin: 0 }}
							>
								{t('martialManual.reactionOnly')}
							</S.FilterLabel>
						</S.FilterSection>
					</S.FiltersContainer>

					{hasActiveFilters && (
						<div className="flex flex-wrap items-center gap-3 pt-2">
							<span className="text-muted-foreground text-base font-semibold">
								{t('martialManual.activeFilters')}
							</span>
							{searchQuery.trim() && <Badge variant="secondary">"{searchQuery}"</Badge>}
							<Button
								variant="ghost"
								size="sm"
								onClick={clearFilters}
								className="text-muted-foreground hover:text-foreground text-xs"
							>
								{t('martialManual.clearAll')}
							</Button>
						</div>
					)}
				</S.FiltersCard>

				<S.Subtitle style={{ textAlign: 'center', fontSize: '0.875rem' }}>
					{t('martialManual.showing')} {filteredManeuvers.length} {t('martialManual.of')}{' '}
					{allManeuvers.length} {t('martialManual.maneuvers')}
				</S.Subtitle>

				{filteredManeuvers.length === 0 ? (
					<S.EmptyState>
						<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
							{t('martialManual.noManeuversFound')}
						</h3>
						<p>{t('martialManual.adjustFilters')}</p>
						<S.ClearButton onClick={clearFilters}>{t('martialManual.clearFilters')}</S.ClearButton>
					</S.EmptyState>
				) : (
					<div className="space-y-8">
						{Object.entries(maneuversByType).map(([type, maneuvers]) => (
							<div key={type}>
								<h2 className="font-cinzel text-primary border-primary/30 mb-4 border-b pb-2 text-2xl font-bold">
									{type}
									<span className="text-muted-foreground ml-2 text-base font-normal">
										({maneuvers.length} {t('martialManual.maneuvers')})
									</span>
								</h2>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{maneuvers.map((maneuver) => (
										<ManeuverCard
											key={maneuver.id}
											maneuver={maneuver}
											isExpanded={expandedManeuvers.has(maneuver.id)}
											onToggle={() => toggleExpanded(maneuver.id)}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</S.MainContent>
		</S.PageContainer>
	);
};

interface ManeuverCardProps {
	maneuver: Maneuver;
	isExpanded: boolean;
	onToggle: () => void;
}

const ManeuverCard: React.FC<ManeuverCardProps> = ({ maneuver, isExpanded, onToggle }) => {
	const { t } = useTranslation();

	return (
		<S.SpellCardContainer $expanded={isExpanded} onClick={onToggle}>
			<S.SpellHeader>
				<S.SpellName>{maneuver.name}</S.SpellName>
				<S.SpellBadgesContainer>
					<Badge variant="outline" className="shrink-0 text-xs">
						{maneuver.type}
					</Badge>
				</S.SpellBadgesContainer>
			</S.SpellHeader>
			<S.SpellMeta>
				<S.SpellBadge $variant="cost">{formatManeuverCost(maneuver.cost)}</S.SpellBadge>
				<S.SpellBadge>{maneuver.range}</S.SpellBadge>
				{maneuver.isReaction && (
					<S.SpellBadge $variant="sustained">{t('martialManual.reaction')}</S.SpellBadge>
				)}
			</S.SpellMeta>
			<S.SpellShortDescription
				style={
					!isExpanded
						? {
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden'
							}
						: {}
				}
			>
				{maneuver.description}
			</S.SpellShortDescription>

			{isExpanded && (
				<S.SpellExpandedContent>
					{maneuver.trigger && (
						<S.SpellSection>
							<S.SpellSectionTitle>{t('martialManual.trigger')}</S.SpellSectionTitle>
							<S.SpellSectionContent>{maneuver.trigger}</S.SpellSectionContent>
						</S.SpellSection>
					)}

					<S.SpellSection>
						<S.SpellSectionTitle>{t('martialManual.enhancements')}</S.SpellSectionTitle>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
							{maneuver.enhancements.map((enhancement) => (
								<div
									key={enhancement.name}
									style={{
										border: '1px solid rgba(99, 102, 241, 0.2)',
										background: 'rgba(99, 102, 241, 0.05)',
										borderRadius: '0.375rem',
										padding: '0.75rem'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<Badge variant="outline" className="text-xs">
											{formatManeuverEnhancementCost(enhancement)}
										</Badge>
										<span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
											{enhancement.name}
										</span>
										{enhancement.repeatable && (
											<Badge className="bg-blue-500/20 text-xs text-blue-400">
												{t('martialManual.repeatable')}
											</Badge>
										)}
									</div>
									<S.SpellSectionContent style={{ marginTop: '0.25rem' }}>
										{enhancement.description}
									</S.SpellSectionContent>
								</div>
							))}
						</div>
					</S.SpellSection>
				</S.SpellExpandedContent>
			)}

			<div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
				{isExpanded ? t('martialManual.clickToCollapse') : t('martialManual.clickToExpand')}
			</div>
		</S.SpellCardContainer>
	);
};

export default MartialManual;
