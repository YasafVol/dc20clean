import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { SpellSchool, SpellSource, type SpellTag } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Wand2, Sword, Info, Search, Filter, Lock, Unlock } from 'lucide-react';

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
	const [selectedSpells, setSelectedSpells] = useState<Record<string, string>>({});
	const [selectedManeuvers, setSelectedManeuvers] = useState<string[]>([]);
	const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
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

		if (state.selectedSpells && typeof state.selectedSpells === 'object') {
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

	// Calculate available spells and maneuvers based on class and level
	const classData = classesData.find((c) => c.id === state.classId);

	const spellSlots = calculationResult?.spellsKnownSlots || [];
	const globalMagicProfile = calculationResult?.globalMagicProfile;

	// Calculate available spells for the character based on Global Profile
	const availableSpells = React.useMemo(() => {
		if (!classData || !globalMagicProfile) return [];

		return allSpells.filter((spell) => {
			const hasMatchingSource = spell.sources.some((source) =>
				globalMagicProfile.sources.includes(source)
			);
			const isInAvailableSchool =
				globalMagicProfile.schools.length === 0 || globalMagicProfile.schools.includes(spell.school);
			const hasMatchingTag = globalMagicProfile.tags.length === 0 ||
				spell.tags?.some(tag => globalMagicProfile.tags.includes(tag));

			return hasMatchingSource && isInAvailableSchool && hasMatchingTag;
		});
	}, [classData, globalMagicProfile]);

	const availableManeuvers = React.useMemo(() => {
		if (!classData) return [];
		return allManeuvers;
	}, [classData]);

	const spellCounts = React.useMemo(() => {
		return {
			cantrips: spellSlots.filter(s => s.type === 'cantrip').length,
			spells: spellSlots.filter(s => s.type === 'spell').length
		};
	}, [spellSlots]);

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

		// --- Smart Slot Filtering (M3.20) ---
		if (activeSlotId) {
			const activeSlot = spellSlots.find(s => s.id === activeSlotId);
			if (activeSlot) {
				spells = spells.filter(spell => {
					// 1. Check type (spell/cantrip)
					if (activeSlot.type === 'cantrip' && !spell.isCantrip) return false;
					if (activeSlot.type === 'spell' && spell.isCantrip) return false;

					// 2. Check Specific Restrictions
					if (activeSlot.specificRestrictions) {
						const sr = activeSlot.specificRestrictions;
						if (sr.exactSpellId && spell.id !== sr.exactSpellId) return false;
						if (sr.sources && sr.sources.length > 0 && !spell.sources.some(s => sr.sources!.includes(s))) return false;
						if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school)) return false;
						if (sr.tags && sr.tags.length > 0 && !spell.tags?.some(t => sr.tags!.includes(t))) return false;
					}

					// 3. Check Global Profile (if the slot is global)
					if (activeSlot.isGlobal && globalMagicProfile) {
						const hasMatchingSource = spell.sources.some((source) =>
							globalMagicProfile.sources.includes(source)
						);
						const isInAvailableSchool =
							globalMagicProfile.schools.length === 0 || globalMagicProfile.schools.includes(spell.school);
						const hasMatchingTag = globalMagicProfile.tags.length === 0 ||
							spell.tags?.some(tag => globalMagicProfile.tags.includes(tag));

						return hasMatchingSource && isInAvailableSchool && hasMatchingTag;
					}

					return true;
				});
			}
		}

		return spells;
	}, [availableSpells, sourceFilter, schoolFilter, tagFilter, costFilter, sustainedFilter, activeSlotId, spellSlots, globalMagicProfile]);

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

	// Handle spell selection with Smart Allocation (M3.20)
	const handleSpellToggle = (spellId: string) => {
		const spell = allSpells.find(s => s.id === spellId);
		if (!spell) return;

		setSelectedSpells((prev) => {
			const newSelected = { ...prev };

			// 1. If spell is already selected, remove it
			const existingSlotId = Object.keys(newSelected).find(slotId => newSelected[slotId] === spellId);
			if (existingSlotId) {
				delete newSelected[existingSlotId];
				return newSelected;
			}

			// 2. If it's a specific slot click, target that slot
			if (activeSlotId) {
				const slot = spellSlots.find(s => s.id === activeSlotId);
				if (slot) {
					// Check if spell fits active slot
					const fitsType = (slot.type === 'cantrip') === spell.isCantrip;
					if (fitsType) {
						// Here we could add more specific restriction checks, 
						// but the filter already does most of it.
						newSelected[activeSlotId] = spellId;
						setActiveSlotId(null); // Close active slot after selection
						return newSelected;
					}
				}
			}

			// 3. Smart Allocation: Find the best empty slot
			// Sort slots by "Restrictiveness" (Restrictive slots first)
			const emptySlots = spellSlots
				.filter(s => !newSelected[s.id])
				.sort((a, b) => {
					// More restrictions = higher priority
					const aRes = (a.specificRestrictions ? 10 : 0) + (a.isGlobal ? 0 : 5);
					const bRes = (b.specificRestrictions ? 10 : 0) + (b.isGlobal ? 0 : 5);
					return bRes - aRes;
				});

			for (const slot of emptySlots) {
				const fitsType = (slot.type === 'cantrip') === spell.isCantrip;
				if (!fitsType) continue;

				// Restriction check
				let fitsRestrictions = true;
				if (slot.specificRestrictions) {
					const sr = slot.specificRestrictions;
					if (sr.exactSpellId && spell.id !== sr.exactSpellId) fitsRestrictions = false;
					if (sr.sources && sr.sources.length > 0 && !spell.sources.some(s => sr.sources!.includes(s))) fitsRestrictions = false;
					if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school)) fitsRestrictions = false;
					if (sr.tags && sr.tags.length > 0 && !spell.tags?.some(t => sr.tags!.includes(t))) fitsRestrictions = false;
				}

				if (fitsRestrictions) {
					newSelected[slot.id] = spellId;
					return newSelected;
				}
			}

			return prev; // No valid slot found
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

		const currentStateSpells = state.selectedSpells || {};
		const currentStateManeuvers = state.selectedManeuvers || [];

		// For Record comparison, we can use a simple JSON stringify or a more robust check
		const spellsChanged = JSON.stringify(selectedSpells) !== JSON.stringify(currentStateSpells);
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
	const selectedSpellIds = Object.values(selectedSpells);
	const selectedCantripsCount = selectedSpellIds.filter((id) => allSpells.find((s) => s.id === id)?.isCantrip).length;
	const selectedSpellsCount = selectedSpellIds.filter((id) => !allSpells.find((s) => s.id === id)?.isCantrip).length;
	const cantripsRemaining = spellCounts.cantrips - selectedCantripsCount;
	const spellsRemaining = spellCounts.spells - selectedSpellsCount;
	const maneuversRemaining = maneuverCount - selectedManeuvers.length;

	if (!state.classId) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
				<div className="bg-primary/10 rounded-full p-4">
					<Wand2 className="text-primary h-12 w-12" />
				</div>
				<h2 className="font-cinzel text-2xl font-bold">Select a Class First</h2>
				<p className="text-muted-foreground max-w-md">
					Spells and maneuvers are determined by your class. Please choose a class in the first stage to continue.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">
			{/* Stage Header */}
			<div className="relative overflow-hidden rounded-2xl bg-black/40 border border-border p-8 py-12 shadow-2xl">
				<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
					<div className="space-y-4 max-w-2xl">
						<div className="flex items-center gap-3">
							<div className="bg-primary/20 rounded-lg p-2">
								<Wand2 className="text-primary h-6 w-6" />
							</div>
							<Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest px-3 py-1">
								Stage 4
							</Badge>
						</div>
						<h1 className="font-cinzel text-4xl md:text-5xl font-black tracking-tight text-white">
							SPELLS & <span className="text-primary">MANEUVERS</span>
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Master the arcane and the martial. Choose the powers that will define your character's presence on the battlefield and beyond.
						</p>
					</div>

					{/* Selection Summary Card */}
					<Card className="bg-black/60 border-primary/20 backdrop-blur-sm min-w-[280px]">
						<CardContent className="p-6 space-y-4">
							<h3 className="font-cinzel text-sm font-bold text-primary/80 uppercase tracking-wider flex items-center gap-2">
								<Info className="h-4 w-4" /> Selection Summary
							</h3>

							<div className="space-y-3">
								{spellCounts.cantrips > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Cantrips</span>
										<Badge variant={cantripsRemaining < 0 ? "destructive" : "outline"} className="font-mono">
											{selectedCantripsCount} / {spellCounts.cantrips}
										</Badge>
									</div>
								)}
								{spellCounts.spells > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Spells</span>
										<Badge variant={spellsRemaining < 0 ? "destructive" : "outline"} className="font-mono">
											{selectedSpellsCount} / {spellCounts.spells}
										</Badge>
									</div>
								)}
								{maneuverCount > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground flex items-center gap-1">
											<Sword className="h-3 w-3" /> Maneuvers
										</span>
										<Badge variant={maneuversRemaining < 0 ? "destructive" : "outline"} className="font-mono">
											{selectedManeuvers.length} / {maneuverCount}
										</Badge>
									</div>
								)}
							</div>

							{(cantripsRemaining > 0 || spellsRemaining > 0 || maneuversRemaining > 0) ? (
								<p className="text-[10px] text-muted-foreground italic text-center pt-2 border-t border-white/5">
									You have choices remaining
								</p>
							) : (
								<p className="text-[10px] text-primary/60 italic text-center pt-2 border-t border-primary/10">
									All choices complete
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Background Decoration */}
				<div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
				<div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px]" />
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
											<label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tag</label>
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
											<label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Type/Cost</label>
											<select
												value={costFilter}
												onChange={(e) => setCostFilter(e.target.value as CostFilter)}
												className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
											>
												<option value="all">Any Cost</option>
												<option value="cantrip">Cantrip (0 MP)</option>
												<option value="1mp">1 MP Spells</option>
												<option value="2mp">2 MP Spells</option>
												<option value="3mp+">3+ MP Spells</option>
											</select>
										</div>

										{/* Sustained Filter */}
										<div className="space-y-2">
											<label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</label>
											<select
												value={sustainedFilter}
												onChange={(e) => setSustainedFilter(e.target.value as SustainedFilter)}
												className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
											>
												<option value="all">Any Duration</option>
												<option value="yes">Sustained Only</option>
												<option value="no">Instant Only</option>
											</select>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Results Summary */}
							<div className="flex items-center justify-between text-sm text-muted-foreground px-1">
								<span>Showing {filteredSpells.length} of {availableSpells.length} available spells</span>
								<div className="flex gap-4">
									<span className={cn(cantripsRemaining < 0 && "text-destructive font-bold")}>
										{cantripsRemaining} cantrip slots
									</span>
									<span className={cn(spellsRemaining < 0 && "text-destructive font-bold")}>
										{spellsRemaining} spell slots
									</span>
								</div>
							</div>

							{/* --- Spell Pockets Section (M3.20) --- */}
							<div className="space-y-4">
								<h3 className="font-cinzel text-lg font-bold flex items-center gap-2">
									<Search className="h-5 w-5 text-primary" /> Spell Pockets
								</h3>
								<ScrollArea className="w-full whitespace-nowrap rounded-xl border border-border bg-black/20 p-4">
									<div className="flex gap-4 pb-2">
										{spellSlots.map((slot) => {
											const assignedSpellId = selectedSpells[slot.id];
											const assignedSpell = assignedSpellId ? allSpells.find(s => s.id === assignedSpellId) : null;
											const isActive = activeSlotId === slot.id;

											return (
												<Card
													key={slot.id}
													className={cn(
														"min-w-[220px] shrink-0 transition-all cursor-pointer border-2 shadow-sm",
														isActive ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border bg-card/60 hover:border-primary/40",
														assignedSpell ? "border-primary/40" : "border-dashed opacity-80"
													)}
													onClick={() => setActiveSlotId(isActive ? null : slot.id)}
												>
													<CardHeader className="p-3 pb-1">
														<div className="flex items-center justify-between">
															<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground line-clamp-1">
																{slot.sourceName}
															</span>
															{slot.isGlobal ? (
																<Unlock className="h-3 w-3 text-muted-foreground/30" />
															) : (
																<Lock className="h-3 w-3 text-primary/40" />
															)}
														</div>
														<CardTitle className="text-sm font-bold truncate">
															{assignedSpell ? assignedSpell.name : `Empty ${slot.type === 'cantrip' ? 'Cantrip' : 'Spell'}`}
														</CardTitle>
													</CardHeader>
													<CardContent className="p-3 pt-1">
														<div className="flex gap-1.5 items-center justify-between">
															<div className="flex gap-1">
																<Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 uppercase tracking-tighter bg-primary/5">
																	{slot.type === 'cantrip' ? 'Cantrip' : 'Spell'}
																</Badge>
																{!slot.isGlobal && (
																	<Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-primary/20 text-primary/80">
																		Specialized
																	</Badge>
																)}
															</div>
															{assignedSpell && (
																<span className="text-[10px] text-muted-foreground italic">Filled</span>
															)}
														</div>
													</CardContent>
												</Card>
											);
										})}
									</div>
								</ScrollArea>
							</div>

							{filteredSpells.length === 0 ? (
								<div className="text-muted-foreground py-24 text-center border-2 border-dashed border-border rounded-2xl bg-black/10">
									<div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
										<Search className="h-8 w-8 text-primary/40" />
									</div>
									<h3 className="mb-3 text-2xl font-cinzel text-white">No Matching Spells</h3>
									<p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
										{activeSlotId
											? "This pocket has specific restrictions that no spells in our library currently meet."
											: "None of your available spells match the active filters."
										}
									</p>
									{activeSlotId && (
										<Button
											variant="outline"
											size="sm"
											className="mt-6 font-cinzel"
											onClick={() => setActiveSlotId(null)}
										>
											Browse All Class Spells
										</Button>
									)}
								</div>
							) : (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{filteredSpells.map((spell) => {
										const isSelected = selectedSpellIds.includes(spell.id);

										return (
											<Card
												key={spell.id}
												className={cn(
													'border-2 transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group',
													isSelected
														? 'border-primary bg-primary/10'
														: 'hover:border-primary/50 border-border bg-card/40'
												)}
											>
												{isSelected && (
													<div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">
														KNOWN
													</div>
												)}
												<CardHeader className="pb-3">
													<div className="flex items-start justify-between gap-2">
														<CardTitle className="text-primary text-xl font-bold tracking-tight">
															{spell.name}
														</CardTitle>
														<Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-widest border-primary/20 text-primary/70">
															{spell.school}
														</Badge>
													</div>
													<div className="flex flex-wrap gap-1.5 mt-1">
														<Badge variant="secondary" className="text-[10px] font-mono bg-primary/5">
															{spell.cost.ap} AP{spell.cost.mp ? ` + ${spell.cost.mp} MP` : ''}
														</Badge>
														<Badge variant="outline" className="text-[10px]">
															{spell.range}
														</Badge>
														{spell.sustained && (
															<Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] uppercase tracking-tighter">
																Sustained
															</Badge>
														)}
													</div>
												</CardHeader>
												<CardContent className="pb-6">
													<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 h-[60px]">
														{spell.effects[0]?.description || 'No description available.'}
													</p>
												</CardContent>
												<CardFooter className="justify-between pt-0 border-t border-white/5 bg-black/20 p-4">
													<div className="flex flex-wrap gap-2">
														{spell.sources.map((source) => (
															<span key={source} className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">
																{source}
															</span>
														))}
													</div>
													<Button
														variant={isSelected ? 'destructive' : 'default'}
														size="sm"
														className={cn(
															"h-8 px-4 font-bold transition-all",
															!isSelected && "bg-primary hover:bg-primary/90"
														)}
														onClick={() => handleSpellToggle(spell.id)}
													>
														{isSelected ? 'FORGET' : 'LEARN'}
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

				<TabsContent value="maneuvers" className="focus-visible:outline-none outline-none">
					{maneuverCount > 0 && (
						<div className="space-y-6">
							{/* Filter Section */}
							<Card className="border-border bg-black/20 backdrop-blur-sm">
								<CardContent className="pt-6">
									<div className="space-y-2">
										<label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
											<Filter className="h-3 w-3" /> Maneuver Type
										</label>
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
								<span className={cn("font-medium", maneuversRemaining < 0 ? "text-destructive" : "text-primary")}>
									{maneuversRemaining} remaining
								</span>
							</div>

							{filteredManeuvers.length === 0 ? (
								<div className="text-muted-foreground py-24 text-center border-2 border-dashed border-border rounded-2xl bg-black/10">
									<h3 className="mb-4 text-2xl font-cinzel text-purple-400">No Maneuvers Matches</h3>
									<p className="text-base leading-relaxed max-w-sm mx-auto">
										Adjust your filters to discover different martial techniques.
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
													'border-2 transition-all hover:-translate-y-1 hover:shadow-xl group',
													isSelected
														? 'border-primary bg-primary/10'
														: 'hover:border-primary/50 border-purple-500/30 bg-card/40'
												)}
											>
												<CardHeader className="pb-3">
													<div className="flex items-start justify-between gap-2">
														<CardTitle className="text-primary text-xl font-bold tracking-tight">
															{maneuver.name}
														</CardTitle>
														<Badge
															variant="outline"
															className="border-purple-500/50 text-purple-400 text-[10px] uppercase tracking-widest"
														>
															{maneuver.type}
														</Badge>
													</div>
													<div className="flex gap-2 mt-1">
														<Badge
															variant="secondary"
															className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[10px]"
														>
															{maneuver.cost.ap} AP
														</Badge>
													</div>
												</CardHeader>
												<CardContent className="pb-6">
													<p className="text-muted-foreground text-sm leading-relaxed h-[60px] line-clamp-3">
														{maneuver.description}
													</p>
												</CardContent>
												<CardFooter className="justify-end pt-4 border-t border-white/5 bg-black/20 p-4">
													<Button
														variant={isSelected ? 'destructive' : 'default'}
														size="sm"
														className="h-8 font-bold"
														onClick={() => handleManeuverToggle(maneuver.name)}
														disabled={!canSelect}
													>
														{isSelected ? 'FORGET' : 'LEARN'}
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
