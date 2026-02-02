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
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

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
		<div className="min-h-screen bg-[url('/src/assets/BlackBG.jpg')] bg-cover bg-center">
			{/* Header */}
			<div className="p-8">
				<div className="mb-8 flex gap-4">
					<Button variant="secondary" onClick={() => navigate('/menu')} className="font-bold">
						← Back to Menu
					</Button>
				</div>
				<h1 className="font-cinzel text-primary mb-2 text-center text-3xl font-bold tracking-wide drop-shadow-lg">
					Spellbook
				</h1>
				<p className="text-muted-foreground text-center">
					Browse all {ALL_SPELLS.length} spells available in DC20
				</p>
			</div>

			<div className="mx-auto max-w-7xl space-y-6 px-4 pb-8">
				{/* Filters Card */}
				<Card className="border-purple-500 bg-gradient-to-br from-indigo-950 to-indigo-900 shadow-lg shadow-purple-500/30">
					<CardContent className="space-y-4">
						{/* Search */}
						<div className="space-y-2">
							<div className="h-6" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search by spell name or description..."
								className="border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/40 w-full rounded-lg border bg-black/40 px-4 py-3 text-base focus:ring-2 focus:outline-none"
							/>
						</div>

						{/* Filter Chips */}
						<div className="space-y-6">
							{/* Class Filter */}
							<div className="space-y-3 rounded-lg border border-cyan-400/20 bg-black/30 p-4">
								<label className="text-base font-semibold text-cyan-200">Class</label>
								<div className="flex w-full flex-wrap gap-3">
									{Object.values(SpellcasterClass).map((className) => {
										const isSelected = classFilter.includes(className);
										return (
											<button
												key={className}
												type="button"
												onClick={() => toggleSelection(className, classFilter, setClassFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-4 py-2 text-sm font-semibold transition',
													isSelected
														? 'border-cyan-400 bg-gradient-to-r from-cyan-500/30 to-sky-500/30 text-cyan-100 shadow-lg shadow-cyan-500/20'
														: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-cyan-400/60'
												)}
											>
												{className}
											</button>
										);
									})}
								</div>
							</div>

							{/* Source Filter */}
							<div className="border-primary/20 space-y-3 rounded-lg border bg-black/30 p-4">
								<label className="text-primary text-base font-semibold">Source</label>
								<div className="flex w-full flex-wrap gap-3">
									{Object.values(SpellSource).map((source) => {
										const isSelected = sourceFilter.includes(source);
										return (
											<button
												key={source}
												type="button"
												onClick={() => toggleSelection(source, sourceFilter, setSourceFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-4 py-2 text-sm font-semibold tracking-wide uppercase transition',
													isSelected
														? 'border-primary text-primary shadow-primary/20 bg-gradient-to-r from-indigo-500/30 to-sky-500/30 shadow-lg'
														: 'text-muted-foreground hover:border-primary/60 hover:text-foreground border-white/10 bg-black/40'
												)}
											>
												{source}
											</button>
										);
									})}
								</div>
							</div>

							{/* School Filter */}
							<div className="space-y-3 rounded-lg border border-purple-400/20 bg-black/30 p-4">
								<label className="text-base font-semibold text-purple-200">School</label>
								<div className="flex w-full flex-wrap gap-3">
									{Object.values(SpellSchool).map((school) => {
										const isSelected = schoolFilter.includes(school);
										return (
											<button
												key={school}
												type="button"
												onClick={() => toggleSelection(school, schoolFilter, setSchoolFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-4 py-2 text-sm font-semibold transition',
													isSelected
														? 'border-purple-400 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 text-purple-100 shadow-lg shadow-purple-500/20'
														: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-purple-400/60'
												)}
											>
												{school}
											</button>
										);
									})}
								</div>
							</div>

							{/* Tag Filter */}
							<div className="space-y-3 rounded-lg border border-emerald-400/20 bg-black/30 p-4">
								<label className="text-base font-semibold text-emerald-200">Tag</label>
								<div className="flex w-full flex-wrap gap-2">
									{displayedTags.map((tag) => {
										const isSelected = tagFilter.includes(tag);
										return (
											<button
												key={tag}
												type="button"
												onClick={() => toggleSelection(tag, tagFilter, setTagFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition',
													isSelected
														? 'border-emerald-400 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-100 shadow-lg shadow-emerald-500/20'
														: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-emerald-400/60'
												)}
											>
												{tag}
											</button>
										);
									})}
								</div>
							</div>

							{/* Cost Filter */}
							<div className="space-y-3 rounded-lg border border-amber-400/20 bg-black/30 p-4">
								<label className="text-base font-semibold text-amber-200">Cost</label>
								<div className="flex w-full flex-wrap items-center gap-3">
									<span className="text-sm font-semibold tracking-wide text-amber-100/80 uppercase">
										AP
									</span>
									{availableApCosts.map((cost) => {
										const isSelected = apCostFilter.includes(cost);
										return (
											<button
												key={`ap-${cost}`}
												type="button"
												onClick={() => toggleNumberSelection(cost, apCostFilter, setApCostFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-4 py-2 text-sm font-semibold transition',
													isSelected
														? 'border-amber-400 bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-100 shadow-lg shadow-amber-500/20'
														: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-amber-400/60'
												)}
											>
												{cost}
											</button>
										);
									})}
									<span className="ml-2 text-sm font-semibold tracking-wide text-amber-100/80 uppercase">
										MP
									</span>
									{availableMpCosts.costs.map((cost) => {
										const isSelected = mpCostFilter.includes(cost);
										return (
											<button
												key={`mp-${cost}`}
												type="button"
												onClick={() => toggleSelection(cost, mpCostFilter, setMpCostFilter)}
												aria-pressed={isSelected}
												className={cn(
													'rounded-full border px-4 py-2 text-sm font-semibold transition',
													isSelected
														? 'border-amber-400 bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-100 shadow-lg shadow-amber-500/20'
														: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-amber-400/60'
												)}
											>
												{cost}
											</button>
										);
									})}
									{availableMpCosts.hasNone && (
										<button
											key="mp-none"
											type="button"
											onClick={() => toggleSelection('none', mpCostFilter, setMpCostFilter)}
											aria-pressed={mpCostFilter.includes('none')}
											className={cn(
												'rounded-full border px-4 py-2 text-sm font-semibold transition',
												mpCostFilter.includes('none')
													? 'border-amber-400 bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-100 shadow-lg shadow-amber-500/20'
													: 'text-muted-foreground hover:text-foreground border-white/10 bg-black/40 hover:border-amber-400/60'
											)}
										>
											No MP
										</button>
									)}
								</div>
							</div>

							{/* Sustained Filter */}
							<div className="flex w-full items-center gap-3 rounded-lg border border-amber-400/20 bg-black/30 px-4 py-4">
								<input
									type="checkbox"
									id="sustained-only"
									checked={sustainedOnly}
									onChange={(e) => setSustainedOnly(e.target.checked)}
									className="h-5 w-5 rounded border-amber-400/60 bg-black/50 text-amber-300 focus:ring-amber-400/40"
								/>
								<label
									htmlFor="sustained-only"
									className="cursor-pointer text-base font-semibold text-amber-100"
								>
									Sustained only
								</label>
							</div>
						</div>

						{/* Active Filters Summary */}
						{hasActiveFilters && (
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<span className="text-muted-foreground text-base font-semibold">
									Active filters:
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
										{cost === 'none' ? 'No MP' : `${cost} MP`}
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
										Sustained
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
									Clear all
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Results Summary */}
				<div className="text-muted-foreground text-center text-sm">
					Showing {filteredSpells.length} of {ALL_SPELLS.length} spells
					{schoolFilter.length === 0 && ` • ${Object.keys(spellsBySchool).length} schools`}
				</div>

				{/* Spells Display */}
				{filteredSpells.length === 0 ? (
					<div className="py-16 text-center">
						<h3 className="text-muted-foreground mb-4 text-2xl">No Spells Found</h3>
						<p className="text-muted-foreground">Try adjusting your filters to see more spells.</p>
						<Button variant="outline" onClick={clearFilters} className="mt-4">
							Clear Filters
						</Button>
					</div>
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
											({spells.length} spells)
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
			</div>
		</div>
	);
};

// Spell Card Component
interface SpellCardProps {
	spell: Spell;
	isExpanded: boolean;
	onToggle: () => void;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell, isExpanded, onToggle }) => {
	return (
		<Card
			className={cn(
				'cursor-pointer border-purple-500 bg-gradient-to-br from-indigo-950 to-indigo-900 shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-xl',
				isExpanded && 'border-primary ring-primary/50 ring-1'
			)}
			onClick={onToggle}
		>
			<CardHeader className="pb-2">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-primary text-lg font-bold">{spell.name}</CardTitle>
					<Badge variant="outline" className="shrink-0 text-xs">
						{spell.school}
					</Badge>
				</div>
				<div className="flex flex-wrap gap-1.5">
					<Badge variant="secondary" className="text-xs">
						{spell.cost.ap} AP{spell.cost.mp ? ` + ${spell.cost.mp} MP` : ''}
					</Badge>
					<Badge variant="outline" className="text-xs">
						{spell.range}
					</Badge>
					{spell.sustained && (
						<Badge className="bg-amber-500/20 text-xs text-amber-400">Sustained</Badge>
					)}
					{spell.sources.map((source) => (
						<Badge key={source} variant="outline" className="text-xs opacity-70">
							{source}
						</Badge>
					))}
				</div>
				{spell.tags && spell.tags.length > 0 && (
					<div className="flex flex-wrap gap-1 pt-1">
						{spell.tags.slice(0, isExpanded ? undefined : 3).map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs opacity-80">
								{tag}
							</Badge>
						))}
						{!isExpanded && spell.tags.length > 3 && (
							<span className="text-muted-foreground text-xs">+{spell.tags.length - 3}</span>
						)}
					</div>
				)}
			</CardHeader>
			<CardContent className="pt-0">
				<p
					className={cn(
						'text-muted-foreground text-sm leading-relaxed',
						!isExpanded && 'line-clamp-3'
					)}
				>
					{spell.effects[0]?.description || 'No description available.'}
				</p>

				{isExpanded && (
					<div className="mt-4 space-y-4">
						{/* Duration */}
						<div className="text-sm">
							<span className="text-foreground font-medium">Duration:</span>{' '}
							<span className="text-muted-foreground">{spell.duration}</span>
						</div>

						{/* Additional effects */}
						{spell.effects.length > 1 && (
							<div className="space-y-2">
								{spell.effects.slice(1).map((effect, index) => (
									<div key={index} className="bg-muted/30 rounded-md p-3">
										<h4 className="text-foreground text-sm font-medium">{effect.title}</h4>
										<p className="text-muted-foreground mt-1 text-sm">{effect.description}</p>
									</div>
								))}
							</div>
						)}

						{/* Enhancements */}
						{spell.enhancements.length > 0 && (
							<div className="space-y-2">
								<h4 className="text-foreground text-sm font-medium">Enhancements</h4>
								<div className="space-y-2">
									{spell.enhancements.map((enhancement, index) => (
										<div
											key={index}
											className="border-primary/20 bg-primary/5 rounded-md border p-3"
										>
											<div className="flex items-center gap-2">
												<Badge variant="outline" className="text-xs">
													{enhancement.cost} {enhancement.type}
												</Badge>
												<span className="text-foreground text-sm font-medium">
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
											<p className="text-muted-foreground mt-1 text-sm">
												{enhancement.description}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Spell Passive */}
						{spell.spellPassive && (
							<div className="rounded-md bg-green-500/10 p-3">
								<h4 className="text-sm font-medium text-green-400">Spell Passive</h4>
								<p className="text-muted-foreground mt-1 text-sm">{spell.spellPassive}</p>
							</div>
						)}
					</div>
				)}

				{/* Expand/Collapse indicator */}
				<div className="text-muted-foreground mt-2 text-center text-xs">
					{isExpanded ? 'Click to collapse' : 'Click to expand'}
				</div>
			</CardContent>
		</Card>
	);
};

export default Spellbook;
