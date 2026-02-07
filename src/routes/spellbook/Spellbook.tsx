import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_SPELLS } from '../../lib/rulesdata/spells-data';
import type { ClassDefinition } from '../../lib/rulesdata/schemas/character.schema';
import {
	SpellSchool,
	SpellSource,
	SpellcasterClass,
	type SpellTag,
	type Spell
} from '../../lib/rulesdata/schemas/spell.schema';
import { bardClass } from '../../lib/rulesdata/classes-data/features/bard_features';
import { clericClass } from '../../lib/rulesdata/classes-data/features/cleric_features';
import { druidClass } from '../../lib/rulesdata/classes-data/features/druid_features';
import { sorcererClass } from '../../lib/rulesdata/classes-data/features/sorcerer_features';
import { warlockClass } from '../../lib/rulesdata/classes-data/features/warlock_features';
import { wizardClass } from '../../lib/rulesdata/classes-data/features/wizard_features';
import { spellbladeClass } from '../../lib/rulesdata/classes-data/features/spellblade_features';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useTranslation } from 'react-i18next';
import * as S from './Spellbook.styles';

type MpCostFilter = number | 'none';

const CLASS_DEFINITIONS: Record<SpellcasterClass, ClassDefinition> = {
	[SpellcasterClass.Bard]: bardClass,
	[SpellcasterClass.Cleric]: clericClass,
	[SpellcasterClass.Druid]: druidClass,
	[SpellcasterClass.Sorcerer]: sorcererClass,
	[SpellcasterClass.Warlock]: warlockClass,
	[SpellcasterClass.Wizard]: wizardClass,
	[SpellcasterClass.Spellblade]: spellbladeClass
};

const Spellbook: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	// Filters
	const [classFilter, setClassFilter] = useState<SpellcasterClass[]>([]);
	const [sourceFilter, setSourceFilter] = useState<SpellSource[]>([]);
	const [schoolFilter, setSchoolFilter] = useState<SpellSchool[]>([]);
	const [tagFilter, setTagFilter] = useState<SpellTag[]>([]);
	const [apCostFilter, setApCostFilter] = useState<number[]>([]);
	const [mpCostFilter, setMpCostFilter] = useState<MpCostFilter[]>([]);
	const [sustainedOnly, setSustainedOnly] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	// Expanded spell cards
	const [expandedSpells, setExpandedSpells] = useState<Set<string>>(new Set());

	// Get unique tags from all spells
	const availableTags = useMemo(() => {
		const tags = new Set<SpellTag>();
		ALL_SPELLS.forEach((spell) => {
			spell.tags?.forEach((tag) => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, []);

	const availableApCosts = useMemo(() => {
		return Array.from(new Set(ALL_SPELLS.map((spell) => spell.cost.ap))).sort((a, b) => a - b);
	}, []);

	const availableMpCosts = useMemo(() => {
		const costs = new Set<number>();
		let hasNone = false;
		ALL_SPELLS.forEach((spell) => {
			if (spell.cost.mp === undefined) {
				hasNone = true;
			} else {
				costs.add(spell.cost.mp);
			}
		});
		return {
			costs: Array.from(costs).sort((a, b) => a - b),
			hasNone
		};
	}, []);

	const classFilterRules = useMemo(() => {
		const rulesByClass = new Map<
			SpellcasterClass,
			{ sources?: SpellSource[]; schools?: SpellSchool[]; tags?: SpellTag[] }
		>();

		const spellSources = new Set(Object.values(SpellSource));
		const spellSchools = new Set(Object.values(SpellSchool));

		const parseSpellList = (spellList: any) => {
			const sources = new Set<SpellSource>();
			const schools = new Set<SpellSchool>();
			const tags = new Set<SpellTag>();

			if (Array.isArray(spellList)) {
				spellList.forEach((source) => {
					if (spellSources.has(source)) {
						sources.add(source as SpellSource);
					}
				});
				return { sources, schools, tags };
			}

			if (!spellList || typeof spellList !== 'object') {
				return { sources, schools, tags };
			}

			if (spellList.type === 'arcane') {
				sources.add(SpellSource.Arcane);
			} else if (spellList.type === 'divine') {
				sources.add(SpellSource.Divine);
			} else if (spellList.type === 'primal') {
				sources.add(SpellSource.Primal);
			} else if (spellList.type === 'schools') {
				const specifiedSchools = spellList.specificSchools ?? [];
				specifiedSchools.forEach((school: string) => {
					if (spellSchools.has(school)) {
						schools.add(school as SpellSchool);
					}
				});
				const specifiedTags = [...(spellList.spellTags ?? []), ...(spellList.tags ?? [])];
				specifiedTags.forEach((tag: string) => tags.add(tag as SpellTag));
			} else if (spellList.type === 'all_schools') {
				Object.values(SpellSchool).forEach((school) => schools.add(school));
				Object.values(SpellSource).forEach((source) => sources.add(source));
				return { sources, schools, tags };
			}

			return { sources, schools, tags };
		};

		Object.values(SpellcasterClass).forEach((className) => {
			const classDefinition = CLASS_DEFINITIONS[className];
			const spellList =
				classDefinition.spellcasterPath?.spellList ??
				classDefinition.hybridPath?.spellcastingAspect?.spellList;
			const parsed = parseSpellList(spellList);
			rulesByClass.set(className, {
				sources: parsed.sources.size ? Array.from(parsed.sources) : undefined,
				schools: parsed.schools.size ? Array.from(parsed.schools) : undefined,
				tags: parsed.tags.size ? Array.from(parsed.tags) : undefined
			});
		});

		return rulesByClass;
	}, []);

	const classBasedTags = useMemo(() => {
		const tags = new Set<SpellTag>();
		classFilter.forEach((className) => {
			const rules = classFilterRules.get(className);
			rules?.tags?.forEach((tag) => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, [classFilter, classFilterRules]);

	const displayedTags = useMemo(() => {
		const tags = new Set<SpellTag>(availableTags);
		classBasedTags.forEach((tag) => tags.add(tag));
		return Array.from(tags).sort();
	}, [availableTags, classBasedTags]);

	const toggleSelection = <T extends string | number>(
		value: T,
		selected: T[],
		setSelected: React.Dispatch<React.SetStateAction<T[]>>
	) => {
		setSelected((prev) =>
			prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
		);
	};

	useEffect(() => {
		if (classFilter.length === 0) {
			return;
		}

		const sources = new Set<SpellSource>();
		const schools = new Set<SpellSchool>();
		const tags = new Set<SpellTag>();

		classFilter.forEach((className) => {
			const rules = classFilterRules.get(className);
			rules?.sources?.forEach((source) => sources.add(source));
			rules?.schools?.forEach((school) => schools.add(school));
			rules?.tags?.forEach((tag) => tags.add(tag));
		});

		setSourceFilter((prev) => Array.from(new Set([...prev, ...sources])));
		setSchoolFilter((prev) => Array.from(new Set([...prev, ...schools])));
		setTagFilter((prev) => Array.from(new Set([...prev, ...tags])));
	}, [classFilter, classFilterRules]);

	const toggleNumberSelection = (
		value: number,
		selected: number[],
		setSelected: React.Dispatch<React.SetStateAction<number[]>>
	) => {
		setSelected((prev) =>
			prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
		);
	};

	// Filter spells
	const filteredSpells = useMemo(() => {
		let spells = ALL_SPELLS;

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			spells = spells.filter(
				(spell) =>
					spell.name.toLowerCase().includes(query) ||
					spell.effects.some((effect) => effect.description.toLowerCase().includes(query))
			);
		}

		// Filter by source
		if (sourceFilter.length > 0) {
			spells = spells.filter((spell) =>
				sourceFilter.some((source) => spell.sources.includes(source))
			);
		}

		// Filter by school
		if (schoolFilter.length > 0) {
			spells = spells.filter((spell) => schoolFilter.includes(spell.school));
		}

		// Filter by tag
		if (tagFilter.length > 0) {
			spells = spells.filter((spell) => spell.tags?.some((tag) => tagFilter.includes(tag)));
		}

		// Filter by AP cost
		if (apCostFilter.length > 0) {
			spells = spells.filter((spell) => apCostFilter.includes(spell.cost.ap));
		}

		// Filter by MP cost
		if (mpCostFilter.length > 0) {
			spells = spells.filter((spell) => {
				const mpCost = spell.cost.mp;
				return mpCostFilter.some((filter) =>
					filter === 'none' ? mpCost === undefined : mpCost === filter
				);
			});
		}

		// Filter by sustained
		if (sustainedOnly) {
			spells = spells.filter((spell) => spell.sustained);
		}

		return spells;
	}, [
		searchQuery,
		sourceFilter,
		schoolFilter,
		tagFilter,
		apCostFilter,
		mpCostFilter,
		sustainedOnly
	]);

	// Group spells by school for display
	const spellsBySchool = useMemo(() => {
		const grouped: Record<string, Spell[]> = {};
		filteredSpells.forEach((spell) => {
			if (!grouped[spell.school]) {
				grouped[spell.school] = [];
			}
			grouped[spell.school].push(spell);
		});
		return grouped;
	}, [filteredSpells]);

	const toggleExpanded = (spellId: string) => {
		setExpandedSpells((prev) => {
			const next = new Set(prev);
			if (next.has(spellId)) {
				next.delete(spellId);
			} else {
				next.add(spellId);
			}
			return next;
		});
	};

	const clearFilters = () => {
		setClassFilter([]);
		setSourceFilter([]);
		setSchoolFilter([]);
		setTagFilter([]);
		setApCostFilter([]);
		setMpCostFilter([]);
		setSustainedOnly(false);
		setSearchQuery('');
	};

	const hasActiveFilters =
		classFilter.length > 0 ||
		sourceFilter.length > 0 ||
		schoolFilter.length > 0 ||
		tagFilter.length > 0 ||
		apCostFilter.length > 0 ||
		mpCostFilter.length > 0 ||
		sustainedOnly ||
		searchQuery.trim() !== '';

	return (
		<S.PageContainer>
			{/* Header */}
			<S.Header>
				<S.Title>{t('spellbook.title')}</S.Title>
				<S.Subtitle>
					{t('spellbook.subtitle')} ({ALL_SPELLS.length} {t('spellbook.spells')})
				</S.Subtitle>
			</S.Header>

			<S.MainContent>
				{/* Filters Card */}
				<S.FiltersCard>
					{/* Search */}
					<S.SearchContainer>
						<div style={{ height: '1.5rem' }} />
						<S.SearchInput
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={t('spellbook.searchPlaceholder')}
						/>
					</S.SearchContainer>

					{/* Filter Chips */}
					<S.FiltersContainer>
							{/* Class Filter */}
							<S.FilterSection $borderColor="primary">
								<S.FilterLabel $color="primary">{t('spellbook.class')}</S.FilterLabel>
								<S.FilterChips>
									{Object.values(SpellcasterClass).map((className) => {
										const isSelected = classFilter.includes(className);
										return (
											<S.FilterChip
												key={className}
												type="button"
												onClick={() => toggleSelection(className, classFilter, setClassFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="primary"
											>
												{className}
											</S.FilterChip>
										);
									})}
								</S.FilterChips>
							</S.FilterSection>

							{/* Source Filter */}
							<S.FilterSection $borderColor="info">
								<S.FilterLabel $color="info">{t('spellbook.source')}</S.FilterLabel>
								<S.FilterChips>
									{Object.values(SpellSource).map((source) => {
										const isSelected = sourceFilter.includes(source);
										return (
											<S.FilterChip
												key={source}
												type="button"
												onClick={() => toggleSelection(source, sourceFilter, setSourceFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="info"
												style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
											>
												{source}
											</S.FilterChip>
										);
									})}
								</S.FilterChips>
							</S.FilterSection>

							{/* School Filter */}
							<S.FilterSection $borderColor="secondary">
								<S.FilterLabel $color="secondary">{t('spellbook.school')}</S.FilterLabel>
								<S.FilterChips>
									{Object.values(SpellSchool).map((school) => {
										const isSelected = schoolFilter.includes(school);
										return (
											<S.FilterChip
												key={school}
												type="button"
												onClick={() => toggleSelection(school, schoolFilter, setSchoolFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="secondary"
											>
												{school}
											</S.FilterChip>
										);
									})}
								</S.FilterChips>
							</S.FilterSection>

							{/* Tag Filter */}
							<S.FilterSection $borderColor="success">
								<S.FilterLabel $color="success">{t('spellbook.tag')}</S.FilterLabel>
								<S.FilterChips style={{ gap: '0.5rem' }}>
									{displayedTags.map((tag) => {
										const isSelected = tagFilter.includes(tag);
										return (
											<S.FilterChip
												key={tag}
												type="button"
												onClick={() => toggleSelection(tag, tagFilter, setTagFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="success"
												style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
											>
												{tag}
											</S.FilterChip>
										);
									})}
								</S.FilterChips>
							</S.FilterSection>

							{/* Cost Filter */}
							<S.FilterSection $borderColor="warning">
								<S.FilterLabel $color="warning">{t('spellbook.cost')}</S.FilterLabel>
								<S.FilterChips style={{ alignItems: 'center' }}>
									<span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>
										{t('spellbook.apLabel')}
									</span>
									{availableApCosts.map((cost) => {
										const isSelected = apCostFilter.includes(cost);
										return (
											<S.FilterChip
												key={`ap-${cost}`}
												type="button"
												onClick={() => toggleNumberSelection(cost, apCostFilter, setApCostFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="warning"
											>
												{cost}
											</S.FilterChip>
										);
									})}
									<span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>
										MP
									</span>
									{availableMpCosts.costs.map((cost) => {
										const isSelected = mpCostFilter.includes(cost);
										return (
											<S.FilterChip
												key={`mp-${cost}`}
												type="button"
												onClick={() => toggleSelection(cost, mpCostFilter, setMpCostFilter)}
												aria-pressed={isSelected}
												$selected={isSelected}
												$color="warning"
											>
												{cost}
											</S.FilterChip>
										);
									})}
									{availableMpCosts.hasNone && (
										<S.FilterChip
											key="mp-none"
											type="button"
											onClick={() => toggleSelection('none', mpCostFilter, setMpCostFilter)}
											aria-pressed={mpCostFilter.includes('none')}
											$selected={mpCostFilter.includes('none')}
											$color="warning"
										>
											{t('spellbook.noMp')}
										</S.FilterChip>
									)}
								</S.FilterChips>
							</S.FilterSection>

							{/* Sustained Filter */}
							<S.FilterSection $borderColor="warning" style={{ flexDirection: 'row', alignItems: 'center', padding: '1rem' }}>
								<input
									type="checkbox"
									id="sustained-only"
									checked={sustainedOnly}
									onChange={(e) => setSustainedOnly(e.target.checked)}
									style={{ height: '1.25rem', width: '1.25rem', cursor: 'pointer' }}
								/>
								<S.FilterLabel
									htmlFor="sustained-only"
									$color="warning"
									style={{ cursor: 'pointer', margin: 0 }}
								>
									{t('spellbook.sustainedOnly')}
								</S.FilterLabel>
							</S.FilterSection>
					</S.FiltersContainer>

						{/* Active Filters Summary */}
						{hasActiveFilters && (
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<span className="text-muted-foreground text-base font-semibold">
									{t('spellbook.activeFilters')}
								</span>
								{searchQuery.trim() && (
									<Badge variant="secondary" className="gap-1 text-sm">
										"{searchQuery}"
										<button
											onClick={() => setSearchQuery('')}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								)}
								{classFilter.map((className) => (
									<Badge key={`class-${className}`} variant="secondary" className="gap-1 text-sm">
										{className}
										<button
											onClick={() =>
												setClassFilter((prev) => prev.filter((item) => item !== className))
											}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{sourceFilter.map((source) => (
									<Badge key={'source-' + source} variant="secondary" className="gap-1 text-sm">
										{source}
										<button
											onClick={() =>
												setSourceFilter((prev) => prev.filter((item) => item !== source))
											}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{schoolFilter.map((school) => (
									<Badge key={'school-' + school} variant="secondary" className="gap-1 text-sm">
										{school}
										<button
											onClick={() =>
												setSchoolFilter((prev) => prev.filter((item) => item !== school))
											}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{tagFilter.map((tag) => (
									<Badge key={'tag-' + tag} variant="secondary" className="gap-1 text-sm">
										{tag}
										<button
											onClick={() => setTagFilter((prev) => prev.filter((item) => item !== tag))}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{apCostFilter.map((cost) => (
									<Badge key={`ap-${cost}`} variant="secondary" className="gap-1 text-sm">
										{cost} AP
										<button
											onClick={() =>
												setApCostFilter((prev) => prev.filter((item) => item !== cost))
											}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{mpCostFilter.map((cost) => (
									<Badge key={`mp-${cost}`} variant="secondary" className="gap-1 text-sm">
										{cost === 'none' ? t('spellbook.noMp') : `${cost} ${t('spellbook.mpLabel')}`}
										<button
											onClick={() =>
												setMpCostFilter((prev) => prev.filter((item) => item !== cost))
											}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								))}
								{sustainedOnly && (
									<Badge
										variant="secondary"
										className="gap-1 bg-amber-500/20 text-sm text-amber-400"
									>
										{t('spellbook.sustained')}
										<button
											onClick={() => setSustainedOnly(false)}
											className="hover:text-destructive ml-1"
										>
											x
										</button>
									</Badge>
								)}
								<Button
									variant="ghost"
									size="sm"
									onClick={clearFilters}
									className="text-muted-foreground hover:text-foreground text-xs"
								>
									{t('spellbook.clearAll')}
								</Button>
							</div>
						)}
				</S.FiltersCard>

				{/* Results Summary */}
				<S.Subtitle style={{ textAlign: 'center', fontSize: '0.875rem' }}>
					{t('spellbook.showing')} {filteredSpells.length} {t('spellbook.of')} {ALL_SPELLS.length} {t('spellbook.spells')}
					{schoolFilter.length === 0 && ` • ${Object.keys(spellsBySchool).length} ${t('spellbook.schools')}`}
				</S.Subtitle>

				{/* Spells Display */}
				{filteredSpells.length === 0 ? (
					<S.EmptyState>
						<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('spellbook.noSpellsFound')}</h3>
						<p>{t('spellbook.adjustFilters')}</p>
						<S.ClearButton onClick={clearFilters}>
							{t('spellbook.clearFilters')}
						</S.ClearButton>
					</S.EmptyState>
				) : schoolFilter.length === 1 ? (
					// Single school view - show all spells in a grid
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{filteredSpells.map((spell) => (
							<SpellCard
								key={spell.id}
								spell={spell}
								isExpanded={expandedSpells.has(spell.id)}
								onToggle={() => toggleExpanded(spell.id)}
							/>
						))}
					</div>
				) : (
					// All schools view - group by school
					<div className="space-y-8">
						{Object.entries(spellsBySchool)
							.sort(([a], [b]) => a.localeCompare(b))
							.map(([school, spells]) => (
								<div key={school}>
									<h2 className="font-cinzel text-primary border-primary/30 mb-4 border-b pb-2 text-2xl font-bold">
										{school}
										<span className="text-muted-foreground ml-2 text-base font-normal">
										({spells.length} {t('spellbook.spells')})
										</span>
									</h2>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
										{spells.map((spell) => (
											<SpellCard
												key={spell.id}
												spell={spell}
												isExpanded={expandedSpells.has(spell.id)}
												onToggle={() => toggleExpanded(spell.id)}
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

// Spell Card Component
interface SpellCardProps {
	spell: Spell;
	isExpanded: boolean;
	onToggle: () => void;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell, isExpanded, onToggle }) => {
	const { t } = useTranslation();
	return (
		<S.SpellCardContainer $expanded={isExpanded} onClick={onToggle}>
			<S.SpellHeader>
				<S.SpellName>{spell.name}</S.SpellName>
				<S.SpellBadgesContainer>
					<Badge variant="outline" className="shrink-0 text-xs">
						{spell.school}
					</Badge>
				</S.SpellBadgesContainer>
			</S.SpellHeader>
			<S.SpellMeta>
				<S.SpellBadge $variant="cost">
					{spell.cost.ap} {t('spellbook.apLabel')}{spell.cost.mp ? ` + ${spell.cost.mp} ${t('spellbook.mpLabel')}` : ''}
				</S.SpellBadge>
				<S.SpellBadge>
					{spell.range}
				</S.SpellBadge>
				{spell.sustained && (
					<S.SpellBadge $variant="sustained">{t('spellbook.sustained')}</S.SpellBadge>
				)}
				{spell.sources.map((source) => (
					<S.SpellBadge key={source} style={{ opacity: 0.7 }}>
						{source}
					</S.SpellBadge>
				))}
			</S.SpellMeta>
			{spell.tags && spell.tags.length > 0 && (
				<S.SpellTags>
					{spell.tags.slice(0, isExpanded ? undefined : 3).map((tag) => (
						<S.SpellTag key={tag}>
							{tag}
						</S.SpellTag>
					))}
					{!isExpanded && spell.tags.length > 3 && (
						<span style={{ fontSize: '0.75rem', opacity: 0.6 }}>+{spell.tags.length - 3}</span>
					)}
				</S.SpellTags>
			)}

			<S.SpellShortDescription style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}>
				{spell.effects[0]?.description || t('spellbook.noDescription')}
			</S.SpellShortDescription>

			{isExpanded && (
				<S.SpellExpandedContent>
					{/* Duration */}
					<S.SpellSection>
						<S.SpellSectionContent>
							<span style={{ fontWeight: 500 }}>{t('spellbook.duration')}</span>{' '}
							<span>{spell.duration}</span>
						</S.SpellSectionContent>
					</S.SpellSection>

					{/* Additional effects */}
					{spell.effects.length > 1 && (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
							{spell.effects.slice(1).map((effect, index) => (
								<S.SpellSection key={index} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '0.375rem' }}>
									<S.SpellSectionTitle style={{ fontSize: '0.875rem' }}>{effect.title}</S.SpellSectionTitle>
									<S.SpellSectionContent>{effect.description}</S.SpellSectionContent>
								</S.SpellSection>
							))}
						</div>
					)}

					{/* Enhancements */}
					{spell.enhancements.length > 0 && (
						<S.SpellSection>
							<S.SpellSectionTitle>Enhancements</S.SpellSectionTitle>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
								{spell.enhancements.map((enhancement, index) => (
									<div
										key={index}
										style={{ border: '1px solid rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '0.375rem', padding: '0.75rem' }}
									>
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
											<Badge variant="outline" className="text-xs">
												{enhancement.cost} {enhancement.type}
											</Badge>
											<span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
												{enhancement.name}
											</span>
											{enhancement.repeatable && (
												<Badge className="bg-blue-500/20 text-xs text-blue-400">Repeatable</Badge>
											)}
											{enhancement.variable && (
												<Badge className="bg-purple-500/20 text-xs text-purple-400">
													Variable
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
					)}

					{/* Spell Passive */}
					{spell.spellPassive && (
						<S.SpellSection style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '0.375rem' }}>
							<S.SpellSectionTitle style={{ color: '#4ade80' }}>Spell Passive</S.SpellSectionTitle>
							<S.SpellSectionContent>{spell.spellPassive}</S.SpellSectionContent>
						</S.SpellSection>
					)}
				</S.SpellExpandedContent>
			)}

			{/* Expand/Collapse indicator */}
			<div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
				{isExpanded ? 'Click to collapse' : 'Click to expand'}
			</div>
		</S.SpellCardContainer>
	);
};

export default Spellbook;
