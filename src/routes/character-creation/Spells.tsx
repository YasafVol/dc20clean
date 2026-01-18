import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { SpellSchool, SpellSource, type SpellTag } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Wand2, Info, Search, Lock, Unlock } from 'lucide-react';
import { debug } from '../../lib/utils/debug';

// Cost filter options
type CostFilter = 'all' | 'cantrip' | '1mp' | '2mp' | '3mp+';

// Sustained filter options
type SustainedFilter = 'all' | 'yes' | 'no';

const Spells: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [selectedSpells, setSelectedSpells] = useState<Record<string, string>>({});
	const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
	const isInitialLoad = useRef(true);
	const hasInitialized = useRef(false);

	// Load existing selections from state - only run once on mount
	useEffect(() => {
		if (hasInitialized.current) {
			return;
		}

		debug.spells('Spells: Loading selections from state:', {
			selectedSpells: state.selectedSpells
		});

		if (state.selectedSpells && typeof state.selectedSpells === 'object') {
			setSelectedSpells(state.selectedSpells);
		}

		hasInitialized.current = true;
	}, []);

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

	// Calculate available spells based on class and level
	const classData = classesData.find((c) => c.id === state.classId);

	const spellSlots = calculationResult?.spellsKnownSlots || [];
	const globalMagicProfile = calculationResult?.globalMagicProfile;

	// Log step render
	useEffect(() => {
		debug.spells('Spell step rendered', {
			slotCount: spellSlots.length,
			selectedCount: Object.keys(selectedSpells).length
		});
	}, [spellSlots.length, selectedSpells]);

	// Calculate available spells for the character based on Global Profile
	const availableSpells = useMemo(() => {
		if (!classData || !globalMagicProfile) return [];

		return allSpells.filter((spell) => {
			const hasMatchingSource = spell.sources.some((source) =>
				globalMagicProfile.sources.includes(source)
			);
			const isInAvailableSchool =
				globalMagicProfile.schools.length === 0 || globalMagicProfile.schools.includes(spell.school);
			const hasMatchingTag =
				globalMagicProfile.tags.length === 0 ||
				spell.tags?.some((tag) => globalMagicProfile.tags.includes(tag));

			return hasMatchingSource && isInAvailableSchool && hasMatchingTag;
		});
	}, [classData, globalMagicProfile]);

	const spellCounts = useMemo(() => {
		return {
			cantrips: spellSlots.filter((s) => s.type === 'cantrip').length,
			spells: spellSlots.filter((s) => s.type === 'spell').length
		};
	}, [spellSlots]);

	// Get unique tags from available spells for the filter dropdown
	const availableTags = useMemo(() => {
		const tags = new Set<SpellTag>();
		availableSpells.forEach((spell) => {
			spell.tags?.forEach((tag) => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, [availableSpells]);

	// Filter spells based on active filters
	const filteredSpells = useMemo(() => {
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
			const activeSlot = spellSlots.find((s) => s.id === activeSlotId);
			if (activeSlot) {
				spells = spells.filter((spell) => {
					// 1. Check type (spell/cantrip)
					if (activeSlot.type === 'cantrip' && !spell.isCantrip) return false;
					if (activeSlot.type === 'spell' && spell.isCantrip) return false;

					// 2. Check Specific Restrictions
					if (activeSlot.specificRestrictions) {
						const sr = activeSlot.specificRestrictions;
						if (sr.exactSpellId && spell.id !== sr.exactSpellId) return false;
						if (sr.sources && sr.sources.length > 0 && !spell.sources.some((s) => sr.sources!.includes(s)))
							return false;
						if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school)) return false;
						if (sr.tags && sr.tags.length > 0 && !spell.tags?.some((t) => sr.tags!.includes(t)))
							return false;
					}

					// 3. Check Global Profile (if the slot is global)
					if (activeSlot.isGlobal && globalMagicProfile) {
						const hasMatchingSource = spell.sources.some((source) =>
							globalMagicProfile.sources.includes(source)
						);
						const isInAvailableSchool =
							globalMagicProfile.schools.length === 0 ||
							globalMagicProfile.schools.includes(spell.school);
						const hasMatchingTag =
							globalMagicProfile.tags.length === 0 ||
							spell.tags?.some((tag) => globalMagicProfile.tags.includes(tag));

						return hasMatchingSource && isInAvailableSchool && hasMatchingTag;
					}

					return true;
				});
			}
		}

		return spells;
	}, [
		availableSpells,
		sourceFilter,
		schoolFilter,
		tagFilter,
		costFilter,
		sustainedFilter,
		activeSlotId,
		spellSlots,
		globalMagicProfile
	]);

	// Handle spell selection with Smart Allocation (M3.20)
	const handleSpellToggle = (spellId: string) => {
		const spell = allSpells.find((s) => s.id === spellId);
		if (!spell) return;

		setSelectedSpells((prev) => {
			const newSelected = { ...prev };

			// 1. If spell is already selected, remove it
			const existingSlotId = Object.keys(newSelected).find((slotId) => newSelected[slotId] === spellId);
			if (existingSlotId) {
				delete newSelected[existingSlotId];
				debug.spells('Spell deselected', { spellId, slotId: existingSlotId });
				return newSelected;
			}

			// 2. If it's a specific slot click, target that slot
			if (activeSlotId) {
				const slot = spellSlots.find((s) => s.id === activeSlotId);
				if (slot) {
					// Check if spell fits active slot
					const fitsType = (slot.type === 'cantrip') === spell.isCantrip;
					if (fitsType) {
						newSelected[activeSlotId] = spellId;
						debug.spells('Spell selected', { spellId, slotId: activeSlotId, slotType: slot.type });
						setActiveSlotId(null); // Close active slot after selection
						return newSelected;
					}
				}
			}

			// 3. Smart Allocation: Find the best empty slot
			// Sort slots by "Restrictiveness" (Restrictive slots first)
			const emptySlots = spellSlots
				.filter((s) => !newSelected[s.id])
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
					if (sr.sources && sr.sources.length > 0 && !spell.sources.some((s) => sr.sources!.includes(s)))
						fitsRestrictions = false;
					if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school))
						fitsRestrictions = false;
					if (sr.tags && sr.tags.length > 0 && !spell.tags?.some((t) => sr.tags!.includes(t)))
						fitsRestrictions = false;
				}

				if (fitsRestrictions) {
					newSelected[slot.id] = spellId;
					debug.spells('Spell auto-allocated', { spellId, slotId: slot.id, slotType: slot.type });
					return newSelected;
				}
			}

			return prev; // No valid slot found
		});
	};

	// Save selections to character state
	useEffect(() => {
		// Skip on initial load to prevent infinite loops
		if (isInitialLoad.current) {
			return;
		}

		// Skip if we haven't initialized yet
		if (!hasInitialized.current) {
			return;
		}

		const currentStateSpells = state.selectedSpells || {};

		// For Record comparison, we can use a simple JSON stringify
		const spellsChanged = JSON.stringify(selectedSpells) !== JSON.stringify(currentStateSpells);

		if (spellsChanged) {
			debug.spells('Spells: Dispatching update:', {
				spells: selectedSpells
			});
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: selectedSpells,
				maneuvers: state.selectedManeuvers || [] // Preserve existing maneuvers
			});
		}
	}, [selectedSpells, dispatch, state.selectedSpells, state.selectedManeuvers]);

	// Calculate points remaining for display
	const selectedSpellIds = Object.values(selectedSpells);
	const selectedCantripsCount = selectedSpellIds.filter(
		(id) => allSpells.find((s) => s.id === id)?.isCantrip
	).length;
	const selectedSpellsCount = selectedSpellIds.filter(
		(id) => !allSpells.find((s) => s.id === id)?.isCantrip
	).length;
	const cantripsRemaining = spellCounts.cantrips - selectedCantripsCount;
	const spellsRemaining = spellCounts.spells - selectedSpellsCount;

	if (!state.classId) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
				<div className="bg-primary/10 rounded-full p-4">
					<Wand2 className="text-primary h-12 w-12" />
				</div>
				<h2 className="font-cinzel text-2xl font-bold">Select a Class First</h2>
				<p className="text-muted-foreground max-w-md">
					Spells are determined by your class. Please choose a class in the first stage to continue.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">
			{/* Stage Header */}
			<div className="relative overflow-hidden rounded-2xl border border-border bg-black/40 p-8 py-12 shadow-2xl">
				<div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div className="max-w-2xl space-y-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/20 p-2">
								<Wand2 className="text-primary h-6 w-6" />
							</div>
							<Badge
								variant="outline"
								className="border-primary/30 text-primary px-3 py-1 uppercase tracking-widest"
							>
								Spells
							</Badge>
						</div>
						<h1 className="font-cinzel text-4xl font-black tracking-tight text-white md:text-5xl">
							LEARN <span className="text-primary">SPELLS</span>
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Master the arcane arts. Choose the spells that will define your character's magical
							abilities.
						</p>
					</div>

					{/* Selection Summary Card */}
					<Card className="min-w-[280px] border-primary/20 bg-black/60 backdrop-blur-sm">
						<CardContent className="space-y-4 p-6">
							<h3 className="font-cinzel flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary/80">
								<Info className="h-4 w-4" /> Selection Summary
							</h3>

							<div className="space-y-3">
								{spellCounts.cantrips > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Cantrips</span>
										<Badge
											variant={cantripsRemaining < 0 ? 'destructive' : 'outline'}
											className="font-mono"
										>
											{selectedCantripsCount} / {spellCounts.cantrips}
										</Badge>
									</div>
								)}
								{spellCounts.spells > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Spells</span>
										<Badge
											variant={spellsRemaining < 0 ? 'destructive' : 'outline'}
											className="font-mono"
										>
											{selectedSpellsCount} / {spellCounts.spells}
										</Badge>
									</div>
								)}
							</div>

							{cantripsRemaining > 0 || spellsRemaining > 0 ? (
								<p className="border-t border-white/5 pt-2 text-center text-[10px] italic text-muted-foreground">
									You have choices remaining
								</p>
							) : (
								<p className="border-t border-primary/10 pt-2 text-center text-[10px] italic text-primary/60">
									All choices complete
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Background Decoration */}
				<div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
				<div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px]" />
			</div>

			{availableSpells.length > 0 && (
				<div className="space-y-6">
					{/* Filter Section */}
					<Card className="border-border bg-card/50">
						<CardContent className="pt-6">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
								{/* Source Filter */}
								<div className="space-y-2">
									<label className="text-muted-foreground text-sm font-medium">Source</label>
									<select
										value={sourceFilter}
										onChange={(e) => setSourceFilter(e.target.value as SpellSource | 'all')}
										className="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
									<label className="text-muted-foreground text-sm font-medium">School</label>
									<select
										value={schoolFilter}
										onChange={(e) => setSchoolFilter(e.target.value as SpellSchool | 'all')}
										className="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
									<label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
										Tag
									</label>
									<select
										value={tagFilter}
										onChange={(e) => setTagFilter(e.target.value as SpellTag | 'all')}
										className="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
									<label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
										Type/Cost
									</label>
									<select
										value={costFilter}
										onChange={(e) => setCostFilter(e.target.value as CostFilter)}
										className="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
									<label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
										Duration
									</label>
									<select
										value={sustainedFilter}
										onChange={(e) => setSustainedFilter(e.target.value as SustainedFilter)}
										className="border-border bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
					<div className="text-muted-foreground flex items-center justify-between px-1 text-sm">
						<span>
							Showing {filteredSpells.length} of {availableSpells.length} available spells
						</span>
						<div className="flex gap-4">
							<span className={cn(cantripsRemaining < 0 && 'text-destructive font-bold')}>
								{cantripsRemaining} cantrip slots
							</span>
							<span className={cn(spellsRemaining < 0 && 'text-destructive font-bold')}>
								{spellsRemaining} spell slots
							</span>
						</div>
					</div>

					{/* --- Spell Pockets Section (M3.20) --- */}
					<div className="space-y-4">
						<h3 className="font-cinzel flex items-center gap-2 text-lg font-bold">
							<Search className="text-primary h-5 w-5" /> Spell Pockets
						</h3>
						<ScrollArea className="border-border w-full whitespace-nowrap rounded-xl border bg-black/20 p-4">
							<div className="flex gap-4 pb-2">
								{spellSlots.map((slot) => {
									const assignedSpellId = selectedSpells[slot.id];
									const assignedSpell = assignedSpellId
										? allSpells.find((s) => s.id === assignedSpellId)
										: null;
									const isActive = activeSlotId === slot.id;

									return (
										<Card
											key={slot.id}
											className={cn(
												'min-w-[220px] shrink-0 cursor-pointer border-2 shadow-sm transition-all',
												isActive
													? 'border-primary bg-primary/10 ring-2 ring-primary/20'
													: 'border-border bg-card/60 hover:border-primary/40',
												assignedSpell ? 'border-primary/40' : 'border-dashed opacity-80'
											)}
											onClick={() => setActiveSlotId(isActive ? null : slot.id)}
										>
											<CardHeader className="p-3 pb-1">
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground line-clamp-1 text-[10px] font-bold uppercase tracking-wider">
														{slot.sourceName}
													</span>
													{slot.isGlobal ? (
														<Unlock className="text-muted-foreground/30 h-3 w-3" />
													) : (
														<Lock className="text-primary/40 h-3 w-3" />
													)}
												</div>
												<CardTitle className="truncate text-sm font-bold">
													{assignedSpell
														? assignedSpell.name
														: `Empty ${slot.type === 'cantrip' ? 'Cantrip' : 'Spell'}`}
												</CardTitle>
											</CardHeader>
											<CardContent className="p-3 pt-1">
												<div className="flex items-center justify-between gap-1.5">
													<div className="flex gap-1">
														<Badge
															variant="secondary"
															className="h-4 bg-primary/5 px-1.5 py-0 text-[10px] uppercase tracking-tighter"
														>
															{slot.type === 'cantrip' ? 'Cantrip' : 'Spell'}
														</Badge>
														{!slot.isGlobal && (
															<Badge
																variant="outline"
																className="h-4 border-primary/20 px-1.5 py-0 text-[10px] text-primary/80"
															>
																Specialized
															</Badge>
														)}
													</div>
													{assignedSpell && (
														<span className="text-muted-foreground text-[10px] italic">Filled</span>
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
						<div className="border-border text-muted-foreground rounded-2xl border-2 border-dashed bg-black/10 py-24 text-center">
							<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
								<Search className="text-primary/40 h-8 w-8" />
							</div>
							<h3 className="font-cinzel mb-3 text-2xl text-white">No Matching Spells</h3>
							<p className="text-muted-foreground mx-auto max-w-sm text-base leading-relaxed">
								{activeSlotId
									? 'This pocket has specific restrictions that no spells in our library currently meet.'
									: 'None of your available spells match the active filters.'}
							</p>
							{activeSlotId && (
								<Button
									variant="outline"
									size="sm"
									className="font-cinzel mt-6"
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
											'group relative overflow-hidden border-2 transition-all hover:-translate-y-1 hover:shadow-xl',
											isSelected
												? 'border-primary bg-primary/10'
												: 'border-border bg-card/40 hover:border-primary/50'
										)}
									>
										{isSelected && (
											<div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
												KNOWN
											</div>
										)}
										<CardHeader className="pb-3">
											<div className="flex items-start justify-between gap-2">
												<CardTitle className="text-primary text-xl font-bold tracking-tight">
													{spell.name}
												</CardTitle>
												<Badge
													variant="outline"
													className="shrink-0 border-primary/20 text-[10px] uppercase tracking-widest text-primary/70"
												>
													{spell.school}
												</Badge>
											</div>
											<div className="mt-1 flex flex-wrap gap-1.5">
												<Badge variant="secondary" className="bg-primary/5 font-mono text-[10px]">
													{spell.cost.ap} AP{spell.cost.mp ? ` + ${spell.cost.mp} MP` : ''}
												</Badge>
												<Badge variant="outline" className="text-[10px]">
													{spell.range}
												</Badge>
												{spell.sustained && (
													<Badge className="border-amber-500/20 bg-amber-500/10 text-[10px] uppercase tracking-tighter text-amber-500">
														Sustained
													</Badge>
												)}
											</div>
										</CardHeader>
										<CardContent className="pb-6">
											<p className="text-muted-foreground line-clamp-3 h-[60px] text-sm leading-relaxed">
												{spell.effects[0]?.description || 'No description available.'}
											</p>
										</CardContent>
										<CardFooter className="justify-between border-t border-white/5 bg-black/20 p-4 pt-0">
											<div className="flex flex-wrap gap-2">
												{spell.sources.map((source) => (
													<span
														key={source}
														className="text-muted-foreground/60 text-[9px] font-bold uppercase tracking-widest"
													>
														{source}
													</span>
												))}
											</div>
											<Button
												variant={isSelected ? 'destructive' : 'default'}
												size="sm"
												className={cn(
													'h-8 px-4 font-bold transition-all',
													!isSelected && 'bg-primary hover:bg-primary/90'
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
		</div>
	);
};

export default Spells;
