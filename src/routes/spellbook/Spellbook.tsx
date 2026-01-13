import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_SPELLS } from '../../lib/rulesdata/spells-data';
import { SpellSchool, SpellSource, type SpellTag, type Spell } from '../../lib/rulesdata/schemas/spell.schema';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

// Cost filter options
type CostFilter = 'all' | 'cantrip' | '1mp' | '2mp' | '3mp+';

// Sustained filter options
type SustainedFilter = 'all' | 'yes' | 'no';

const Spellbook: React.FC = () => {
	const navigate = useNavigate();

	// Filters
	const [sourceFilter, setSourceFilter] = useState<SpellSource | 'all'>('all');
	const [schoolFilter, setSchoolFilter] = useState<SpellSchool | 'all'>('all');
	const [tagFilter, setTagFilter] = useState<SpellTag | 'all'>('all');
	const [costFilter, setCostFilter] = useState<CostFilter>('all');
	const [sustainedFilter, setSustainedFilter] = useState<SustainedFilter>('all');
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
		if (sourceFilter !== 'all') {
			spells = spells.filter((spell) => spell.sources.includes(sourceFilter));
		}

		// Filter by school
		if (schoolFilter !== 'all') {
			spells = spells.filter((spell) => spell.school === schoolFilter);
		}

		// Filter by tag
		if (tagFilter !== 'all') {
			spells = spells.filter((spell) => spell.tags?.includes(tagFilter));
		}

		// Filter by cost
		if (costFilter !== 'all') {
			switch (costFilter) {
				case 'cantrip':
					spells = spells.filter((spell) => spell.isCantrip);
					break;
				case '1mp':
					spells = spells.filter((spell) => !spell.isCantrip && spell.cost.mp === 1);
					break;
				case '2mp':
					spells = spells.filter((spell) => !spell.isCantrip && spell.cost.mp === 2);
					break;
				case '3mp+':
					spells = spells.filter((spell) => !spell.isCantrip && (spell.cost.mp ?? 0) >= 3);
					break;
			}
		}

		// Filter by sustained
		if (sustainedFilter !== 'all') {
			spells = spells.filter((spell) =>
				sustainedFilter === 'yes' ? spell.sustained : !spell.sustained
			);
		}

		return spells;
	}, [searchQuery, sourceFilter, schoolFilter, tagFilter, costFilter, sustainedFilter]);

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
		setSourceFilter('all');
		setSchoolFilter('all');
		setTagFilter('all');
		setCostFilter('all');
		setSustainedFilter('all');
		setSearchQuery('');
	};

	const hasActiveFilters =
		sourceFilter !== 'all' ||
		schoolFilter !== 'all' ||
		tagFilter !== 'all' ||
		costFilter !== 'all' ||
		sustainedFilter !== 'all' ||
		searchQuery.trim() !== '';

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
			{/* Header */}
			<div className="border-b border-border/50 bg-black/30 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="font-cinzel text-primary text-4xl font-bold tracking-wide">
								Spellbook
							</h1>
							<p className="text-muted-foreground mt-2">
								Browse all {ALL_SPELLS.length} spells available in DC20
							</p>
						</div>
						<Button
							variant="outline"
							onClick={() => navigate('/menu')}
							className="border-primary/50 hover:bg-primary/10"
						>
							← Back to Menu
						</Button>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
				{/* Filters Card */}
				<Card className="border-border bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg font-medium">Filters</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Search */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Search</label>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search by spell name or description..."
								className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>

						{/* Filter Dropdowns */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
							{/* Source Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Source</label>
								<select
									value={sourceFilter}
									onChange={(e) => setSourceFilter(e.target.value as SpellSource | 'all')}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								>
									<option value="all">All Sources</option>
									{Object.values(SpellSource).map((source) => (
										<option key={source} value={source}>
											{source}
										</option>
									))}
								</select>
							</div>

							{/* School Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">School</label>
								<select
									value={schoolFilter}
									onChange={(e) => setSchoolFilter(e.target.value as SpellSchool | 'all')}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								>
									<option value="all">All Schools</option>
									{Object.values(SpellSchool).map((school) => (
										<option key={school} value={school}>
											{school}
										</option>
									))}
								</select>
							</div>

							{/* Tag Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Tag</label>
								<select
									value={tagFilter}
									onChange={(e) => setTagFilter(e.target.value as SpellTag | 'all')}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								>
									<option value="all">All Tags</option>
									{availableTags.map((tag) => (
										<option key={tag} value={tag}>
											{tag}
										</option>
									))}
								</select>
							</div>

							{/* Cost Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Cost</label>
								<select
									value={costFilter}
									onChange={(e) => setCostFilter(e.target.value as CostFilter)}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								>
									<option value="all">All Costs</option>
									<option value="cantrip">Cantrips (0 MP)</option>
									<option value="1mp">1 MP</option>
									<option value="2mp">2 MP</option>
									<option value="3mp+">3+ MP</option>
								</select>
							</div>

							{/* Sustained Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">Sustained</label>
								<select
									value={sustainedFilter}
									onChange={(e) => setSustainedFilter(e.target.value as SustainedFilter)}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								>
									<option value="all">All</option>
									<option value="yes">Sustained Only</option>
									<option value="no">Not Sustained</option>
								</select>
							</div>
						</div>

						{/* Active Filters Summary */}
						{hasActiveFilters && (
							<div className="flex flex-wrap items-center gap-2 pt-2">
								<span className="text-sm text-muted-foreground">Active filters:</span>
								{searchQuery.trim() && (
									<Badge variant="secondary" className="gap-1">
										"{searchQuery}"
										<button
											onClick={() => setSearchQuery('')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								{sourceFilter !== 'all' && (
									<Badge variant="secondary" className="gap-1">
										{sourceFilter}
										<button
											onClick={() => setSourceFilter('all')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								{schoolFilter !== 'all' && (
									<Badge variant="secondary" className="gap-1">
										{schoolFilter}
										<button
											onClick={() => setSchoolFilter('all')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								{tagFilter !== 'all' && (
									<Badge variant="secondary" className="gap-1">
										{tagFilter}
										<button
											onClick={() => setTagFilter('all')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								{costFilter !== 'all' && (
									<Badge variant="secondary" className="gap-1">
										{costFilter === 'cantrip' ? 'Cantrips' : costFilter.toUpperCase()}
										<button
											onClick={() => setCostFilter('all')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								{sustainedFilter !== 'all' && (
									<Badge variant="secondary" className="gap-1 bg-amber-500/20 text-amber-400">
										{sustainedFilter === 'yes' ? 'Sustained' : 'Not Sustained'}
										<button
											onClick={() => setSustainedFilter('all')}
											className="ml-1 hover:text-destructive"
										>
											×
										</button>
									</Badge>
								)}
								<Button
									variant="ghost"
									size="sm"
									onClick={clearFilters}
									className="text-xs text-muted-foreground hover:text-foreground"
								>
									Clear all
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Results Summary */}
				<div className="text-center text-sm text-muted-foreground">
					Showing {filteredSpells.length} of {ALL_SPELLS.length} spells
					{schoolFilter === 'all' && ` • ${Object.keys(spellsBySchool).length} schools`}
				</div>

				{/* Spells Display */}
				{filteredSpells.length === 0 ? (
					<div className="py-16 text-center">
						<h3 className="mb-4 text-2xl text-muted-foreground">No Spells Found</h3>
						<p className="text-muted-foreground">
							Try adjusting your filters to see more spells.
						</p>
						<Button variant="outline" onClick={clearFilters} className="mt-4">
							Clear Filters
						</Button>
					</div>
				) : schoolFilter !== 'all' ? (
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
									<h2 className="font-cinzel text-primary mb-4 border-b border-primary/30 pb-2 text-2xl font-bold">
										{school}
										<span className="ml-2 text-base font-normal text-muted-foreground">
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
				'border-2 transition-all hover:shadow-lg cursor-pointer',
				isExpanded ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card/40'
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
						<Badge className="bg-amber-500/20 text-amber-400 text-xs">Sustained</Badge>
					)}
					{spell.isCantrip && (
						<Badge className="bg-green-500/20 text-green-400 text-xs">Cantrip</Badge>
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
							<span className="text-xs text-muted-foreground">+{spell.tags.length - 3}</span>
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
							<span className="font-medium text-foreground">Duration:</span>{' '}
							<span className="text-muted-foreground">{spell.duration}</span>
						</div>

						{/* Additional effects */}
						{spell.effects.length > 1 && (
							<div className="space-y-2">
								{spell.effects.slice(1).map((effect, index) => (
									<div key={index} className="rounded-md bg-muted/30 p-3">
										<h4 className="text-sm font-medium text-foreground">{effect.title}</h4>
										<p className="mt-1 text-sm text-muted-foreground">{effect.description}</p>
									</div>
								))}
							</div>
						)}

						{/* Enhancements */}
						{spell.enhancements.length > 0 && (
							<div className="space-y-2">
								<h4 className="text-sm font-medium text-foreground">Enhancements</h4>
								<div className="space-y-2">
									{spell.enhancements.map((enhancement, index) => (
										<div
											key={index}
											className="rounded-md border border-primary/20 bg-primary/5 p-3"
										>
											<div className="flex items-center gap-2">
												<Badge variant="outline" className="text-xs">
													{enhancement.cost} {enhancement.type}
												</Badge>
												<span className="text-sm font-medium text-foreground">
													{enhancement.name}
												</span>
												{enhancement.repeatable && (
													<Badge className="bg-blue-500/20 text-blue-400 text-xs">
														Repeatable
													</Badge>
												)}
												{enhancement.variable && (
													<Badge className="bg-purple-500/20 text-purple-400 text-xs">
														Variable
													</Badge>
												)}
											</div>
											<p className="mt-1 text-sm text-muted-foreground">
												{enhancement.description}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Cantrip Passive */}
						{spell.cantripPassive && (
							<div className="rounded-md bg-green-500/10 p-3">
								<h4 className="text-sm font-medium text-green-400">Cantrip Passive</h4>
								<p className="mt-1 text-sm text-muted-foreground">{spell.cantripPassive}</p>
							</div>
						)}
					</div>
				)}

				{/* Expand/Collapse indicator */}
				<div className="mt-2 text-center text-xs text-muted-foreground">
					{isExpanded ? 'Click to collapse' : 'Click to expand'}
				</div>
			</CardContent>
		</Card>
	);
};

export default Spellbook;
