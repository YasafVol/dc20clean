import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { SpellSchool, SpellSource, type SpellTag } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';

// All available spell tags for filtering
const ALL_SPELL_TAGS: SpellTag[] = [
	'Bludgeoning',
	'Piercing',
	'Slashing',
	'Fire',
	'Cold',
	'Lightning',
	'Thunder',
	'Sonic',
	'Acid',
	'Poison',
	'Psychic',
	'Radiant',
	'Necrotic',
	'Force',
	'True',
	'Burning',
	'Charmed',
	'Frightened',
	'Blinded',
	'Deafened',
	'Paralyzed',
	'Restrained',
	'Stunned',
	'Exhaustion',
	'Concentration',
	'Ritual',
	'Chaos',
	'Healing',
	'Teleportation',
	'Summoning',
	'Illusion',
	'Detection'
];

// Cost filter options
type CostFilter = 'all' | 'cantrip' | '1mp' | '2mp' | '3mp+';

// Sustained filter options
type SustainedFilter = 'all' | 'yes' | 'no';

// Simple deep equality helper for arrays to replace JSON.stringify comparison
function arraysEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((val, index) => {
		if (Array.isArray(val) && Array.isArray(b[index])) {
			return arraysEqual(val as any[], b[index] as any[]);
		}
		return val === b[index];
	});
}

const SpellsAndManeuvers: React.FC = () => {
	console.log('🚀 SpellsAndManeuvers component is rendering!');
	const { state, dispatch, calculationResult } = useCharacter();
	const [activeTab, setActiveTab] = useState<'spells' | 'maneuvers'>('spells');
	const [selectedSpells, setSelectedSpells] = useState<string[]>([]);
	const [selectedManeuvers, setSelectedManeuvers] = useState<string[]>([]);
	const isInitialLoad = useRef(true);
	const hasInitialized = useRef(false);

	// Load existing selections from state - only run once on mount
	useEffect(() => {
		if (hasInitialized.current) {
			return;
		}

		console.log('🔄 SpellsAndManeuvers: Loading selections from state:', {
			selectedSpells: state.selectedSpells,
			selectedManeuvers: state.selectedManeuvers
		});

		if (state.selectedSpells && Array.isArray(state.selectedSpells)) {
			console.log('📚 Setting selected spells:', state.selectedSpells);
			setSelectedSpells(state.selectedSpells);
		}

		if (state.selectedManeuvers && Array.isArray(state.selectedManeuvers)) {
			console.log('⚔️ Setting selected maneuvers:', state.selectedManeuvers);
			setSelectedManeuvers(state.selectedManeuvers);
		}

		hasInitialized.current = true;
	}, []); // Empty dependency array - only run once

	// Mark initial load as complete after first render
	useEffect(() => {
		isInitialLoad.current = false;
	}, []);
	// Spell filters
	const [sourceFilter, setSourceFilter] = useState<SpellSource | 'all'>('all');
	const [schoolFilter, setSchoolFilter] = useState<SpellSchool | 'all'>('all');
	const [tagFilter, setTagFilter] = useState<SpellTag | 'all'>('all');
	const [costFilter, setCostFilter] = useState<CostFilter>('all');
	const [sustainedFilter, setSustainedFilter] = useState<SustainedFilter>('all');
	const [maneuverFilter, setManeuverFilter] = useState<ManeuverType | 'all'>('all');

	// Get class data
	const classData = classesData.find((c) => c.name.toLowerCase() === state.classId?.toLowerCase());
	console.log('🔍 Class data lookup:', {
		stateClassId: state.classId,
		availableClasses: classesData.map((c) => c.name),
		foundClassData: !!classData,
		classDataName: classData?.name
	});
	const classFeatures = state.classId ? findClassByName(state.classId) : null;

	// Calculate available spells and maneuvers based on class and level
	const availableSpells = React.useMemo(() => {
		console.log('🔍 Starting availableSpells calculation...');
		if (!state.classId || !classFeatures) {
			return [];
		}

		// Map classes to their spell sources
		// TODO: Move this to a central configuration or class definition
		const CLASS_SPELL_SOURCES: Record<string, SpellSource[]> = {
			wizard: [SpellSource.Arcane],
			sorcerer: [SpellSource.Arcane],
			bard: [SpellSource.Arcane],
			warlock: [SpellSource.Arcane],
			spellblade: [SpellSource.Arcane],
			cleric: [SpellSource.Divine],
			druid: [SpellSource.Primal],
			// Add others as they are implemented
			paladin: [SpellSource.Divine],
			ranger: [SpellSource.Primal],
			hunter: [SpellSource.Primal] // Assuming Hunter is Ranger-like
		};

		const characterSpellSources = CLASS_SPELL_SOURCES[state.classId.toLowerCase()] || [];

		// Use feature choices directly to determine available spell schools
		const featureChoices: { [key: string]: any } = state.selectedFeatureChoices || {};
		let availableSchools: SpellSchool[] = [];

		// Get available spell schools based on class features
		if (classFeatures.spellcastingPath?.spellList) {
			const spellList = classFeatures.spellcastingPath.spellList;

			if (spellList.type === 'all_schools' && spellList.schoolCount) {
				const choiceId = `${classFeatures.className.toLowerCase()}_spell_schools`;
				const choice = featureChoices[choiceId];
				if (choice) {
					const selectedSchools = Array.isArray(choice) ? choice : [choice];
					availableSchools.push(...selectedSchools);
				}
			} else if (spellList.type === 'schools') {
				if (spellList.specificSchools) {
					availableSchools.push(...spellList.specificSchools);
				}

				if (spellList.schoolCount && spellList.schoolCount > 0) {
					const choiceId = `${classFeatures.className.toLowerCase()}_additional_spell_schools`;
					const choice = featureChoices[choiceId];
					if (choice) {
						// Handle additional schools (expect arrays directly)
						const additionalSchools =
							spellList.schoolCount > 1 && Array.isArray(choice) ? choice : [choice];
						availableSchools.push(...additionalSchools);
					}
				}
			} else if (spellList.type === 'any') {
				availableSchools.push(SpellSchool.Astromancy); // Placeholder or default
			}
		}

		// If no schools determined, use defaults
		if (availableSchools.length === 0) {
			// Default to all schools if none are specified
			availableSchools = Object.values(SpellSchool);
		}

		// Filter spells by source and schools
		const filteredSpells = allSpells.filter((spell) => {
			// Filter by Source: Check if the spell's sources overlap with the character's allowed sources
			// If the character has no spell sources (e.g. Barbarian), they get no spells unless specific features grant them (not handled here yet)
			const hasMatchingSource = spell.sources.some((source) =>
				characterSpellSources.includes(source)
			);

			// Filter by School: Check if the spell's school is in the allowed schools
			const isInAvailableSchool =
				availableSchools.length > 0 && availableSchools.includes(spell.school);

			return hasMatchingSource && isInAvailableSchool;
		});

		return filteredSpells;
	}, [state.classId, state.selectedFeatureChoices, classFeatures]);

	const availableManeuvers = React.useMemo(() => {
		console.log('🔍 availableManeuvers calculation:', {
			classData: !!classData,
			allManeuversCount: allManeuvers.length
		});
		if (!classData) return [];

		// All characters can learn maneuvers, but some classes get more
		return allManeuvers;
	}, [classData]);

	// Get spell/maneuver counts from levelBudgets (uses .progression.ts data)
	const spellCounts = React.useMemo(() => {
		const budgets = calculationResult?.levelBudgets;
		if (!budgets) return { cantrips: 0, spells: 0 };

		return {
			cantrips: budgets.totalCantripsKnown || 0,
			spells: budgets.totalSpellsKnown || 0
		};
	}, [calculationResult]);

	const maneuverCount = React.useMemo(() => {
		const budgets = calculationResult?.levelBudgets;
		if (!budgets) return 0;

		const count = budgets.totalManeuversKnown || 0;
		console.log('🔍 maneuverCount from levelBudgets:', count);
		return count;
	}, [calculationResult]);

	// Get unique tags from available spells for the filter dropdown
	const availableTags = useMemo(() => {
		const tags = new Set<SpellTag>();
		availableSpells.forEach((spell) => {
			spell.tags?.forEach((tag) => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, [availableSpells]);

	// Filter spells based on active filters
	const filteredSpells = React.useMemo(() => {
		let spells = availableSpells;

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
	}, [availableSpells, sourceFilter, schoolFilter, tagFilter, costFilter, sustainedFilter]);

	const filteredManeuvers = React.useMemo(() => {
		console.log('🔍 filteredManeuvers calculation:', {
			availableManeuvers: availableManeuvers.length,
			maneuverFilter
		});
		let maneuvers = availableManeuvers;
		if (maneuverFilter !== 'all') {
			maneuvers = maneuvers.filter((maneuver) => maneuver.type === maneuverFilter);
		}
		console.log('🔍 filteredManeuvers result:', maneuvers.length);
		return maneuvers;
	}, [availableManeuvers, maneuverFilter]);

	// Handle spell selection
	const handleSpellToggle = (spellName: string) => {
		setSelectedSpells((prev) => {
			if (prev.includes(spellName)) {
				return prev.filter((name) => name !== spellName);
			} else {
				// Check limits
				const spell = availableSpells.find((s) => s.name === spellName);
				if (!spell) return prev;

				if (spell.isCantrip) {
					const currentCantrips = prev.filter(
						(name) => availableSpells.find((s) => s.name === name)?.isCantrip
					).length;
					if (currentCantrips >= spellCounts.cantrips) return prev;
				} else {
					const currentSpells = prev.filter(
						(name) => !availableSpells.find((s) => s.name === name)?.isCantrip
					).length;
					if (currentSpells >= spellCounts.spells) return prev;
				}
				return [...prev, spellName];
			}
		});
	};

	// Handle maneuver selection
	const handleManeuverToggle = (maneuverName: string) => {
		setSelectedManeuvers((prev) => {
			if (prev.includes(maneuverName)) {
				return prev.filter((name) => name !== maneuverName);
			} else {
				// Check limits
				if (prev.length >= maneuverCount) return prev;
				return [...prev, maneuverName];
			}
		});
	};

	// Save selections to character state
	useEffect(() => {
		console.log('🔄 Save useEffect triggered:', {
			isInitialLoad: isInitialLoad.current,
			selectedSpells,
			selectedManeuvers,
			stateSelectedSpells: state.selectedSpells,
			stateSelectedManeuvers: state.selectedManeuvers
		});

		// Skip on initial load to prevent infinite loops
		if (isInitialLoad.current) {
			console.log('🔄 Skipping save on initial load');
			return;
		}

		// Skip if we haven't initialized yet
		if (!hasInitialized.current) {
			console.log('🔄 Skipping save - not initialized yet');
			return;
		}

		// Only dispatch if we have actual changes to avoid infinite loops
		// Check if the current selections are different from what's in state
		const currentStateSpells = state.selectedSpells || [];
		const currentStateManeuvers = state.selectedManeuvers || [];

		const spellsChanged = !arraysEqual(selectedSpells, currentStateSpells);
		const maneuversChanged = !arraysEqual(selectedManeuvers, currentStateManeuvers);

		console.log('🔄 Change detection:', {
			spellsChanged,
			maneuversChanged,
			currentStateSpells,
			currentStateManeuvers,
			selectedSpells,
			selectedManeuvers
		});

		if (spellsChanged || maneuversChanged) {
			console.log('🔄 SpellsAndManeuvers: Dispatching update:', {
				spells: selectedSpells,
				maneuvers: selectedManeuvers,
				spellsChanged,
				maneuversChanged
			});
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: selectedSpells,
				maneuvers: selectedManeuvers
			});
		} else {
			console.log('🔄 No changes detected, skipping dispatch');
		}
	}, [selectedSpells, selectedManeuvers, dispatch, state.selectedSpells, state.selectedManeuvers]);

	// Auto-switch tabs if no content is available
	useEffect(() => {
		if (availableSpells.length === 0 && activeTab === 'spells') {
			// If no spells, switch to maneuvers if available, otherwise stay on spells
			setActiveTab(maneuverCount > 0 ? 'maneuvers' : 'spells');
		}
		if (maneuverCount === 0 && activeTab === 'maneuvers') {
			// If no maneuvers, switch to spells if available, otherwise stay on maneuvers
			setActiveTab(availableSpells.length > 0 ? 'spells' : 'maneuvers');
		}
	}, [availableSpells.length, maneuverCount, activeTab]);

	// Calculate points remaining for display
	const cantripsRemaining = spellCounts.cantrips - selectedSpells.filter((name) => availableSpells.find((s) => s.name === name)?.isCantrip).length;
	const spellsRemaining = spellCounts.spells - selectedSpells.filter((name) => !availableSpells.find((s) => s.name === name)?.isCantrip).length;
	const maneuversRemaining = maneuverCount - selectedManeuvers.length;

	if (!state.classId) {
		return (
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="space-y-4 text-center">
					<h2 className="font-cinzel text-primary text-3xl font-bold">Spells & Maneuvers</h2>
					<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
						Please select a class first to see available spells and maneuvers.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<div className="space-y-4 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Spells & Maneuvers</h2>
				<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
					Choose your character's known spells and combat maneuvers. You have{' '}
					<span className="text-primary font-bold">{spellCounts.cantrips}</span> cantrips and{' '}
					<span className="text-primary font-bold">{spellCounts.spells}</span> spells to learn
					{maneuverCount > 0 && (
						<>
							, plus <span className="text-primary font-bold">{maneuverCount}</span> maneuvers
						</>
					)}
					.
				</p>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={(v) => setActiveTab(v as 'spells' | 'maneuvers')}
				className="w-full"
			>
				<TabsList className="border-border mx-auto mb-8 grid w-full max-w-2xl grid-cols-2 border bg-black/40">
					<TabsTrigger
						value="spells"
						disabled={availableSpells.length === 0}
						className={cn(
							'font-cinzel py-3 text-base transition-colors',
							cantripsRemaining + spellsRemaining < 0 && 'text-destructive'
						)}
					>
						Spells ({cantripsRemaining + spellsRemaining} left)
					</TabsTrigger>
					<TabsTrigger
						value="maneuvers"
						disabled={maneuverCount === 0}
						className={cn(
							'font-cinzel py-3 text-base transition-colors',
							maneuversRemaining < 0 && 'text-destructive'
						)}
					>
						Maneuvers ({maneuversRemaining} left)
					</TabsTrigger>
				</TabsList>

				<TabsContent value="spells" className="focus-visible:outline-none">
					{availableSpells.length > 0 && (
						<div className="space-y-6">
							{/* Filter Section */}
							<Card className="border-border bg-card/50">
								<CardContent className="pt-6">
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
									{(sourceFilter !== 'all' || schoolFilter !== 'all' || tagFilter !== 'all' || costFilter !== 'all' || sustainedFilter !== 'all') && (
										<div className="mt-4 flex flex-wrap items-center gap-2">
											<span className="text-sm text-muted-foreground">Active filters:</span>
											{sourceFilter !== 'all' && (
												<Badge variant="secondary" className="gap-1">
													{sourceFilter}
													<button onClick={() => setSourceFilter('all')} className="ml-1 hover:text-destructive">×</button>
												</Badge>
											)}
											{schoolFilter !== 'all' && (
												<Badge variant="secondary" className="gap-1">
													{schoolFilter}
													<button onClick={() => setSchoolFilter('all')} className="ml-1 hover:text-destructive">×</button>
												</Badge>
											)}
											{tagFilter !== 'all' && (
												<Badge variant="secondary" className="gap-1">
													{tagFilter}
													<button onClick={() => setTagFilter('all')} className="ml-1 hover:text-destructive">×</button>
												</Badge>
											)}
											{costFilter !== 'all' && (
												<Badge variant="secondary" className="gap-1">
													{costFilter === 'cantrip' ? 'Cantrips' : costFilter.toUpperCase()}
													<button onClick={() => setCostFilter('all')} className="ml-1 hover:text-destructive">×</button>
												</Badge>
											)}
											{sustainedFilter !== 'all' && (
												<Badge variant="secondary" className="gap-1 bg-amber-500/20 text-amber-400">
													{sustainedFilter === 'yes' ? 'Sustained' : 'Not Sustained'}
													<button onClick={() => setSustainedFilter('all')} className="ml-1 hover:text-destructive">×</button>
												</Badge>
											)}
											<Button
												variant="ghost"
												size="sm"
												onClick={() => {
													setSourceFilter('all');
													setSchoolFilter('all');
													setTagFilter('all');
													setCostFilter('all');
													setSustainedFilter('all');
												}}
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
								Showing {filteredSpells.length} of {availableSpells.length} available spells
								{' • '}
								<span className="text-primary font-medium">
									{cantripsRemaining} cantrips
								</span>
								{' and '}
								<span className="text-primary font-medium">
									{spellsRemaining} spells
								</span>
								{' remaining'}
							</div>

							{filteredSpells.length === 0 ? (
								<div className="text-muted-foreground py-16 text-center">
									<h3 className="mb-4 text-2xl text-purple-400">No Spells Available</h3>
									<p className="text-base leading-relaxed">
										No spells are available for your class and level with the current filter.
									</p>
								</div>
							) : (
								<>
									{/* Cantrips Section */}
									{(() => {
										const cantrips = filteredSpells.filter((spell) => spell.isCantrip);
										const selectedCantrips = selectedSpells.filter(
											(name) => availableSpells.find((s) => s.name === name)?.isCantrip
										);
										const currentCantrips = selectedCantrips.length;
										const maxCantrips = spellCounts.cantrips;

										return cantrips.length > 0 ? (
											<div className="mb-8">
												<h3 className="text-primary border-primary mb-4 border-b pb-2 text-xl font-bold">
													Cantrips ({currentCantrips}/{maxCantrips})
												</h3>
												<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
													{cantrips.map((spell) => {
														const isSelected = selectedSpells.includes(spell.name);
														const canSelect = currentCantrips < maxCantrips || isSelected;

														return (
															<Card
																key={spell.name}
																className={cn(
																	'border-2 transition-all hover:-translate-y-1 hover:shadow-lg',
																	isSelected
																		? 'border-primary bg-primary/10'
																		: 'hover:border-primary/50 border-border bg-card/40'
																)}
															>
																<CardHeader className="pb-2">
																	<div className="flex items-start justify-between gap-2">
																		<CardTitle className="text-primary text-lg font-bold">
																			{spell.name}
																		</CardTitle>
																		<Badge variant="outline" className="shrink-0 text-xs">
																			{spell.school}
																		</Badge>
																	</div>
																	<div className="flex flex-wrap gap-1.5">
																		<Badge variant="secondary" className="text-xs">
																			{spell.cost.ap} AP
																		</Badge>
																		<Badge variant="outline" className="text-xs">
																			{spell.range}
																		</Badge>
																		{spell.sustained && (
																			<Badge className="bg-amber-500/20 text-amber-400 text-xs">
																				Sustained
																			</Badge>
																		)}
																		{spell.sources.map((source) => (
																			<Badge key={source} variant="outline" className="text-xs opacity-70">
																				{source}
																			</Badge>
																		))}
																	</div>
																	{spell.tags && spell.tags.length > 0 && (
																		<div className="flex flex-wrap gap-1 pt-1">
																			{spell.tags.slice(0, 3).map((tag) => (
																				<Badge key={tag} variant="secondary" className="text-xs opacity-80">
																					{tag}
																				</Badge>
																			))}
																			{spell.tags.length > 3 && (
																				<span className="text-xs text-muted-foreground">+{spell.tags.length - 3}</span>
																			)}
																		</div>
																	)}
																</CardHeader>
																<CardContent className="pt-0">
																	<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
																		{spell.effects[0]?.description || 'No description available.'}
																	</p>
																</CardContent>
																<CardFooter className="justify-end pt-0">
																	<Button
																		variant={isSelected ? 'destructive' : 'default'}
																		size="sm"
																		onClick={() => handleSpellToggle(spell.name)}
																		disabled={!canSelect}
																	>
																		{isSelected ? 'Remove' : 'Add'}
																	</Button>
																</CardFooter>
															</Card>
														);
													})}
												</div>
											</div>
										) : null;
									})()}

									{/* Regular Spells Section */}
									{(() => {
										const regularSpells = filteredSpells.filter((spell) => !spell.isCantrip);
										const selectedRegularSpells = selectedSpells.filter(
											(name) => !availableSpells.find((s) => s.name === name)?.isCantrip
										);
										const currentSpells = selectedRegularSpells.length;
										const maxSpells = spellCounts.spells;

										return regularSpells.length > 0 ? (
											<div>
												<h3 className="text-primary border-primary mb-4 border-b pb-2 text-xl font-bold">
													Spells ({currentSpells}/{maxSpells})
												</h3>
												<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
													{regularSpells.map((spell) => {
														const isSelected = selectedSpells.includes(spell.name);
														const canSelect = currentSpells < maxSpells || isSelected;

														return (
															<Card
																key={spell.name}
																className={cn(
																	'border-2 transition-all hover:-translate-y-1 hover:shadow-lg',
																	isSelected
																		? 'border-primary bg-primary/10'
																		: 'hover:border-primary/50 border-border bg-card/40'
																)}
															>
																<CardHeader className="pb-2">
																	<div className="flex items-start justify-between gap-2">
																		<CardTitle className="text-primary text-lg font-bold">
																			{spell.name}
																		</CardTitle>
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
																			<Badge className="bg-amber-500/20 text-amber-400 text-xs">
																				Sustained
																			</Badge>
																		)}
																		{spell.sources.map((source) => (
																			<Badge key={source} variant="outline" className="text-xs opacity-70">
																				{source}
																			</Badge>
																		))}
																	</div>
																	{spell.tags && spell.tags.length > 0 && (
																		<div className="flex flex-wrap gap-1 pt-1">
																			{spell.tags.slice(0, 3).map((tag) => (
																				<Badge key={tag} variant="secondary" className="text-xs opacity-80">
																					{tag}
																				</Badge>
																			))}
																			{spell.tags.length > 3 && (
																				<span className="text-xs text-muted-foreground">+{spell.tags.length - 3}</span>
																			)}
																		</div>
																	)}
																</CardHeader>
																<CardContent className="pt-0">
																	<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
																		{spell.effects[0]?.description || 'No description available.'}
																	</p>
																</CardContent>
																<CardFooter className="justify-end pt-0">
																	<Button
																		variant={isSelected ? 'destructive' : 'default'}
																		size="sm"
																		onClick={() => handleSpellToggle(spell.name)}
																		disabled={!canSelect}
																	>
																		{isSelected ? 'Remove' : 'Add'}
																	</Button>
																</CardFooter>
															</Card>
														);
													})}
												</div>
											</div>
										) : null;
									})()}
								</>
							)}
						</div>
					)}
				</TabsContent>

				<TabsContent value="maneuvers" className="focus-visible:outline-none">
					{maneuverCount > 0 && (
						<div className="space-y-6">
							{/* Filter Section */}
							<Card className="border-border bg-card/50">
								<CardContent className="pt-6">
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground">Type</label>
										<select
											value={maneuverFilter}
											onChange={(e) => setManeuverFilter(e.target.value as ManeuverType | 'all')}
											className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										>
											<option value="all">All Types</option>
											{Object.values(ManeuverType).map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
									</div>
								</CardContent>
							</Card>

							{/* Results Summary */}
							<div className="text-center text-sm text-muted-foreground">
								Showing {filteredManeuvers.length} of {availableManeuvers.length} available maneuvers
								{' • '}
								<span className="text-primary font-medium">
									{maneuversRemaining} remaining
								</span>
							</div>

							{filteredManeuvers.length === 0 ? (
								<div className="text-muted-foreground py-16 text-center">
									<h3 className="mb-4 text-2xl text-purple-400">No Maneuvers Available</h3>
									<p className="text-base leading-relaxed">
										No maneuvers are available with the current filter.
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{filteredManeuvers.map((maneuver) => {
										const isSelected = selectedManeuvers.includes(maneuver.name);
										const canSelect = selectedManeuvers.length < maneuverCount || isSelected;

										return (
											<Card
												key={maneuver.name}
												className={cn(
													'border-2 transition-all hover:-translate-y-1 hover:shadow-xl',
													isSelected
														? 'border-primary bg-primary/10'
														: 'hover:border-primary/50 border-purple-500/30 bg-card/40'
												)}
											>
												<CardHeader className="pb-2">
													<div className="flex items-start justify-between gap-2">
														<CardTitle className="text-primary text-xl font-bold">
															{maneuver.name}
														</CardTitle>
														<Badge
															variant="outline"
															className="border-purple-500/50 text-purple-400"
														>
															{maneuver.type}
														</Badge>
													</div>
													<div className="flex gap-2">
														<Badge
															variant="secondary"
															className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
														>
															{maneuver.cost.ap} AP
														</Badge>
													</div>
												</CardHeader>
												<CardContent>
													<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
														{maneuver.description}
														{maneuver.requirement && (
															<>
																<br />
																<strong>Requirement:</strong> {maneuver.requirement}
															</>
														)}
														{maneuver.trigger && (
															<>
																<br />
																<strong>Trigger:</strong> {maneuver.trigger}
															</>
														)}
													</p>
												</CardContent>
												<CardFooter className="justify-end pt-0">
													<Button
														variant={isSelected ? 'destructive' : 'default'}
														size="sm"
														onClick={() => handleManeuverToggle(maneuver.name)}
														disabled={!canSelect}
													>
														{isSelected ? 'Remove' : 'Add'}
													</Button>
												</CardFooter>
											</Card>
										);
									})}
								</div>
							)}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SpellsAndManeuvers;
