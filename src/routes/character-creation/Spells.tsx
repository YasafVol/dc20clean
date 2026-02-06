import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { SpellSchool, SpellSource, type SpellTag } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { theme } from '../character-sheet/styles/theme';
import { SecondaryButton } from '../../components/styled/index';
import {
	Container,
	Header,
	Title,
	Subtitle,
	ProgressSection,
	ProgressText,
	FilterSection,
	FilterGrid,
	FilterGroup,
	FilterLabel,
	SpellGrid,
	SpellCard,
	CardHeader as StyledCardHeader,
	SpellName,
	SpellBadges,
	SpellDescription,
	Badge,
	SpellCardFooter,
	SourcesList,
	SourceTag,
	SpellButton,
	KnownBadge
} from './Spells.styled';
import { Badge as ShadcnBadge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { Wand2, Search, Lock } from 'lucide-react';
import { debug } from '../../lib/utils/debug';

// Cost filter options
type CostFilter = 'all' | '1mp' | '2mp' | '3mp+';

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
	// Note: classId comparison is case-sensitive, so ensure consistent casing
	const classData = classesData.find((c) => c.id.toLowerCase() === state.classId?.toLowerCase());

	const spellSlots = calculationResult?.spellsKnownSlots || [];
	const globalMagicProfile = calculationResult?.globalMagicProfile;

	// Debug class data lookup
	useEffect(() => {
		debug.spells('Class data lookup', {
			stateClassId: state.classId,
			foundClassData: !!classData,
			classDataId: classData?.id,
			classDataName: classData?.name,
			availableClassIds: classesData.map((c) => c.id)
		});
	}, [state.classId, classData]);

	// Log step render
	useEffect(() => {
		debug.spells('Spell step rendered', {
			slotCount: spellSlots.length,
			selectedCount: Object.keys(selectedSpells).length
		});
	}, [spellSlots.length, selectedSpells]);

	// Calculate available spells for the character based on Global Profile
	const availableSpells = useMemo(() => {
		debug.spells('Calculating available spells:', {
			hasClassData: !!classData,
			classDataId: classData?.id,
			hasGlobalMagicProfile: !!globalMagicProfile,
			globalSources: globalMagicProfile?.sources,
			globalSchools: globalMagicProfile?.schools,
			globalTags: globalMagicProfile?.tags,
			totalSpellsInLibrary: allSpells.length,
			calculationResult: !!calculationResult
		});

		if (!classData || !globalMagicProfile) {
			debug.spells('No class data or global magic profile - returning empty', {
				stateClassId: state.classId,
				classData,
				globalMagicProfile
			});
			return [];
		}

		// Debug: Log first few spells to see their structure
		if (allSpells.length > 0) {
			debug.spells('Sample spell structure:', {
				spell: allSpells[0],
				sources: allSpells[0].sources,
				school: allSpells[0].school,
				tags: allSpells[0].tags
			});
		}

		const filtered = allSpells.filter((spell) => {
			// Source must always match (if sources are defined)
			const hasMatchingSource =
				globalMagicProfile.sources.length === 0 ||
				spell.sources.some((source) => globalMagicProfile.sources.includes(source));

			// School OR Tag logic: spell qualifies if it matches school OR has a qualifying tag
			const schoolsEmpty = globalMagicProfile.schools.length === 0;
			const tagsEmpty = globalMagicProfile.tags.length === 0;

			const matchesSchool = globalMagicProfile.schools.includes(spell.school);
			const matchesTag = spell.tags?.some((tag) => globalMagicProfile.tags.includes(tag)) ?? false;

			// DC20 Logic: Source AND (School OR Tag)
			// - If both schools and tags are empty, allow all spells from matching source
			// - If only schools defined, must match school
			// - If only tags defined, must match tag
			// - If both defined, can match either (OR logic - tags expand access)
			const passesSchoolOrTag =
				(schoolsEmpty && tagsEmpty) || // No restrictions
				(!schoolsEmpty && matchesSchool) || // Matches allowed school
				(!tagsEmpty && matchesTag); // Matches allowed tag (expands access)

			const passes = hasMatchingSource && passesSchoolOrTag;

			// Debug first few spells
			if (allSpells.indexOf(spell) < 3) {
				console.log(`🔮 [Spells] Filtering "${spell.name}":`, {
					spellSources: spell.sources,
					spellSchool: spell.school,
					spellTags: spell.tags,
					profileSchools: globalMagicProfile.schools,
					profileTags: globalMagicProfile.tags,
					hasMatchingSource,
					matchesSchool,
					matchesTag,
					passesSchoolOrTag,
					passes
				});
			}

			return passes;
		});

		debug.spells('Filtered spells result', { count: filtered.length, total: allSpells.length });
		return filtered;
	}, [classData, globalMagicProfile, calculationResult, state.classId]);

	const spellCount = useMemo(() => {
		return spellSlots.length;
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
				case '1mp':
					spells = spells.filter((spell) => spell.cost.mp === 1);
					break;
				case '2mp':
					spells = spells.filter((spell) => spell.cost.mp === 2);
					break;
				case '3mp+':
					spells = spells.filter((spell) => (spell.cost.mp ?? 0) >= 3);
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
					// 1. Check Specific Restrictions
					if (activeSlot.specificRestrictions) {
						const sr = activeSlot.specificRestrictions;
						if (sr.exactSpellId && spell.id !== sr.exactSpellId) return false;
						if (
							sr.sources &&
							sr.sources.length > 0 &&
							!spell.sources.some((s) => sr.sources!.includes(s))
						)
							return false;
						if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school))
							return false;
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
		console.log('🔮 [Spells] handleSpellToggle called:', { spellId });

		const spell = allSpells.find((s) => s.id === spellId);
		if (!spell) {
			console.warn('🔮 [Spells] Spell not found:', spellId);
			return;
		}

		console.log('🔮 [Spells] Spell found:', {
			name: spell.name,
			availableSlots: spellSlots.length,
			currentSelections: Object.keys(selectedSpells).length
		});

		setSelectedSpells((prev) => {
			const newSelected = { ...prev };

			// 1. If spell is already selected, remove it
			const existingSlotId = Object.keys(newSelected).find(
				(slotId) => newSelected[slotId] === spellId
			);
			if (existingSlotId) {
				delete newSelected[existingSlotId];
				debug.spells('Spell deselected', { spellId, slotId: existingSlotId });
				return newSelected;
			}

			// 2. If it's a specific slot click, target that slot
			if (activeSlotId) {
				const slot = spellSlots.find((s) => s.id === activeSlotId);
				if (slot) {
					newSelected[activeSlotId] = spellId;
					debug.spells('Spell selected', { spellId, slotId: activeSlotId });
					setActiveSlotId(null); // Close active slot after selection
					return newSelected;
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
				// Restriction check
				let fitsRestrictions = true;
				if (slot.specificRestrictions) {
					const sr = slot.specificRestrictions;
					if (sr.exactSpellId && spell.id !== sr.exactSpellId) fitsRestrictions = false;
					if (
						sr.sources &&
						sr.sources.length > 0 &&
						!spell.sources.some((s) => sr.sources!.includes(s))
					)
						fitsRestrictions = false;
					if (sr.schools && sr.schools.length > 0 && !sr.schools.includes(spell.school))
						fitsRestrictions = false;
					if (sr.tags && sr.tags.length > 0 && !spell.tags?.some((t) => sr.tags!.includes(t)))
						fitsRestrictions = false;
				}

				if (fitsRestrictions) {
					newSelected[slot.id] = spellId;
					console.log('🔮 [Spells] Spell auto-allocated:', { spellId, slotId: slot.id });
					return newSelected;
				}
			}

			console.warn('🔮 [Spells] No valid slot found for spell:', {
				spellId,
				spellName: spell.name,
				emptySlotCount: emptySlots.length
			});
			return prev; // No valid slot found
		});
	};

	// Save selections to character state
	useEffect(() => {
		console.log('🔮 [Spells] Save effect triggered:', {
			isInitialLoad: isInitialLoad.current,
			hasInitialized: hasInitialized.current,
			selectedSpellsCount: Object.keys(selectedSpells).length
		});

		// Skip on initial load to prevent infinite loops
		if (isInitialLoad.current) {
			console.log('🔮 [Spells] Skipping - initial load');
			return;
		}

		// Skip if we haven't initialized yet
		if (!hasInitialized.current) {
			console.log('🔮 [Spells] Skipping - not initialized');
			return;
		}

		const currentStateSpells = state.selectedSpells || {};

		// For Record comparison, we can use a simple JSON stringify
		const spellsChanged = JSON.stringify(selectedSpells) !== JSON.stringify(currentStateSpells);

		console.log('🔮 [Spells] Checking for changes:', {
			spellsChanged,
			selectedSpells,
			currentStateSpells
		});

		if (spellsChanged) {
			console.log('🔮 [Spells] Dispatching update:', { spells: selectedSpells });
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: selectedSpells,
				maneuvers: state.selectedManeuvers || [] // Preserve existing maneuvers
			});
		}
	}, [selectedSpells, dispatch, state.selectedSpells, state.selectedManeuvers]);

	// Calculate points remaining for display
	const selectedSpellsCount = Object.keys(selectedSpells).length;
	const spellsRemaining = spellCount - selectedSpellsCount;

	if (!state.classId) {
		return (
			<Container style={{ textAlign: 'center', padding: '3rem 1rem' }}>
				<div
					style={{
						background: 'rgba(125, 207, 255, 0.1)',
						borderRadius: '50%',
						padding: '1rem',
						display: 'inline-flex',
						marginBottom: '1rem'
					}}
				>
					<Wand2 size={48} color="#7DCFFF" />
				</div>
				<h2
					style={{
						fontFamily: 'Cinzel, serif',
						fontSize: '1.5rem',
						fontWeight: 'bold',
						marginBottom: '1rem'
					}}
				>
					Select a Class First
				</h2>
				<p style={{ color: 'rgba(169, 177, 214, 0.7)', maxWidth: '28rem', margin: '0 auto' }}>
					Spells are determined by your class. Please choose a class in the first stage to continue.
				</p>
			</Container>
		);
	}

	return (
		<Container>
			<Header>
				<Title>Learn Spells</Title>
				<Subtitle>
					Harness arcane power. Choose the spells that will shape your magical destiny.
				</Subtitle>
			</Header>

			<ProgressSection>
				<ProgressText>
					Spells: {selectedSpellsCount} / {spellCount}
					{spellsRemaining > 0 ? ` • ${spellsRemaining} remaining` : ' • All slots filled'}
				</ProgressText>
			</ProgressSection>

			{availableSpells.length === 0 ? (
				<div className="border-border text-muted-foreground rounded-2xl border-2 border-dashed bg-black/10 py-24 text-center">
					<div className="bg-primary/5 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
						<Wand2 className="text-primary/40 h-8 w-8" />
					</div>
					<h3 className="font-cinzel mb-3 text-2xl text-white">No Spells Available</h3>
					<p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed">
						Your class does not have access to any spells in the current spell library, or there may
						be a configuration issue. Please check your class selection.
					</p>
					<div className="text-muted-foreground/60 mx-auto mt-4 max-w-md space-y-1 text-left font-mono text-xs">
						<p>State ClassId: {state.classId || 'undefined'}</p>
						<p>ClassData Found: {classData ? `yes (${classData.id})` : 'no'}</p>
						<p>GlobalMagicProfile: {globalMagicProfile ? 'yes' : 'no'}</p>
						<p>Sources: {globalMagicProfile?.sources?.join(', ') || 'none'}</p>
						<p>Schools: {globalMagicProfile?.schools?.join(', ') || 'none'}</p>
						<p>Tags: {globalMagicProfile?.tags?.join(', ') || 'none'}</p>
						<p>Spell Slots: {spellSlots.length}</p>
						<p>Total Spells in Library: {allSpells.length}</p>
					</div>
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
					{/* Class Access Info */}
					{globalMagicProfile &&
						(globalMagicProfile.schools.length > 0 || globalMagicProfile.tags.length > 0) && (
							<div
								style={{
									background: 'rgba(125, 207, 255, 0.05)',
									border: '1px solid rgba(125, 207, 255, 0.2)',
									borderRadius: '0.5rem',
									padding: '0.75rem 1rem'
								}}
							>
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										alignItems: 'center',
										gap: '0.5rem',
										fontSize: '0.875rem'
									}}
								>
									<span style={{ color: 'rgba(169, 177, 214, 0.7)', fontWeight: '500' }}>
										{classData?.name || 'Your class'} can learn spells from:
									</span>
									{globalMagicProfile.schools.length > 0 && (
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
											{globalMagicProfile.schools.map((school) => (
												<span
													key={school}
													style={{
														background: 'rgba(125, 207, 255, 0.1)',
														color: '#7DCFFF',
														border: '1px solid rgba(125, 207, 255, 0.3)',
														padding: '0.125rem 0.5rem',
														borderRadius: '0.25rem',
														fontSize: '0.75rem'
													}}
												>
													{school}
												</span>
											))}
											<span style={{ color: 'rgba(169, 177, 214, 0.7)' }}>school</span>
										</div>
									)}
									{globalMagicProfile.schools.length > 0 && globalMagicProfile.tags.length > 0 && (
										<span style={{ color: 'rgba(169, 177, 214, 0.7)' }}>or with</span>
									)}
									{globalMagicProfile.tags.length > 0 && (
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
											{globalMagicProfile.tags.map((tag) => (
												<span
													key={tag}
													style={{
														background: 'rgba(224, 175, 104, 0.1)',
														color: '#E0AF68',
														border: '1px solid rgba(224, 175, 104, 0.3)',
														padding: '0.125rem 0.5rem',
														borderRadius: '0.25rem',
														fontSize: '0.75rem'
													}}
												>
													{tag}
												</span>
											))}
											<span style={{ color: 'rgba(169, 177, 214, 0.7)' }}>tags</span>
										</div>
									)}
								</div>
							</div>
						)}

					{/* Filter Section */}
					<FilterSection>
						<FilterGrid>
								{/* Source Filter */}
								<FilterGroup>
									<FilterLabel>Source</FilterLabel>
									<select
										value={sourceFilter}
										onChange={(e) => setSourceFilter(e.target.value as SpellSource | 'all')}
										style={{
											width: '100%',
											padding: '0.5rem 0.75rem',
											background: theme.colors.bg.primary,
											border: `1px solid ${theme.colors.bg.elevated}`,
											borderRadius: '0.375rem',
											color: theme.colors.text.primary,
											fontSize: '0.875rem'
										}}
									>
										<option value="all">All Sources</option>
										{Object.values(SpellSource).map((source) => (
											<option key={source} value={source}>
												{source}
											</option>
										))}
									</select>
								</FilterGroup>

								{/* School Filter */}
								<FilterGroup>
									<FilterLabel>School</FilterLabel>
									<select
										value={schoolFilter}
										onChange={(e) => setSchoolFilter(e.target.value as SpellSchool | 'all')}
										style={{
											width: '100%',
											padding: '0.5rem 0.75rem',
											background: theme.colors.bg.primary,
											border: `1px solid ${theme.colors.bg.elevated}`,
											borderRadius: '0.375rem',
											color: theme.colors.text.primary,
											fontSize: '0.875rem'
										}}
									>
										<option value="all">All Schools</option>
										{Object.values(SpellSchool).map((school) => (
											<option key={school} value={school}>
												{school}
											</option>
										))}
									</select>
								</FilterGroup>

								{/* Tag Filter */}
								<FilterGroup>
									<FilterLabel>Tag</FilterLabel>
									<select
										value={tagFilter}
										onChange={(e) => setTagFilter(e.target.value as SpellTag | 'all')}
										style={{
											width: '100%',
											padding: '0.5rem 0.75rem',
											background: theme.colors.bg.primary,
											border: `1px solid ${theme.colors.bg.elevated}`,
											borderRadius: '0.375rem',
											color: theme.colors.text.primary,
											fontSize: '0.875rem'
										}}
									>
										<option value="all">All Tags</option>
										{availableTags.map((tag) => (
											<option key={tag} value={tag}>
												{tag}
											</option>
										))}
									</select>
								</FilterGroup>

								{/* Cost Filter */}
								<FilterGroup>
									<FilterLabel>Type/Cost</FilterLabel>
									<select
										value={costFilter}
										onChange={(e) => setCostFilter(e.target.value as CostFilter)}
										style={{
											width: '100%',
											padding: '0.5rem 0.75rem',
											background: theme.colors.bg.primary,
											border: `1px solid ${theme.colors.bg.elevated}`,
											borderRadius: '0.375rem',
											color: theme.colors.text.primary,
											fontSize: '0.875rem'
										}}
									>
										<option value="all">Any Cost</option>
										<option value="1mp">1 MP Spells</option>
										<option value="2mp">2 MP Spells</option>
										<option value="3mp+">3+ MP Spells</option>
									</select>
								</FilterGroup>

								{/* Sustained Filter */}
								<FilterGroup>
									<FilterLabel>Duration</FilterLabel>
									<select
										value={sustainedFilter}
										onChange={(e) => setSustainedFilter(e.target.value as SustainedFilter)}
										style={{
											width: '100%',
											padding: '0.5rem 0.75rem',
											background: theme.colors.bg.primary,
											border: `1px solid ${theme.colors.bg.elevated}`,
											borderRadius: '0.375rem',
											color: theme.colors.text.primary,
											fontSize: '0.875rem'
										}}
									>
										<option value="all">Any Duration</option>
										<option value="yes">Sustained Only</option>
										<option value="no">Instant Only</option>
									</select>
								</FilterGroup>
							</FilterGrid>
						</FilterSection>

					{/* Results Summary */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0 0.25rem',
							fontSize: '0.875rem',
							color: 'rgba(169, 177, 214, 0.7)'
						}}
					>
						<span>
							Showing {filteredSpells.length} of {availableSpells.length} available spells
						</span>
						<span
							style={{
								color: spellsRemaining < 0 ? '#F7768E' : undefined,
								fontWeight: spellsRemaining < 0 ? 'bold' : undefined
							}}
						>
							{spellsRemaining} spells remaining to learn
						</span>
					</div>

					{/* --- Spell Slots Section (M3.20) --- */}
					<div className="space-y-4">
						<details className="group" open>
							<summary className="font-cinzel flex cursor-pointer list-none items-center gap-2 text-lg font-bold">
								<Wand2 className="text-primary h-5 w-5" />
								<span>Spells Known</span>
								<ShadcnBadge variant="outline" className="ml-2 font-mono text-xs">
									{Object.keys(selectedSpells).length} / {spellSlots.length}
								</ShadcnBadge>
								<span className="text-muted-foreground ml-auto text-sm font-normal group-open:hidden">
									Click to expand
								</span>
								<span className="text-muted-foreground ml-auto hidden text-sm font-normal group-open:inline">
									Click to collapse
								</span>
							</summary>

							<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
								{spellSlots.map((slot) => {
									const assignedSpellId = selectedSpells[slot.id];
									const assignedSpell = assignedSpellId
										? allSpells.find((s) => s.id === assignedSpellId)
										: null;
									const isActive = activeSlotId === slot.id;

									return (
										<div
											key={slot.id}
											className={cn(
												'flex cursor-pointer items-center justify-between rounded-lg border-2 px-3 py-2 transition-all',
												isActive
													? 'border-primary bg-primary/10'
													: 'border-border bg-card/60 hover:border-primary/40',
												assignedSpell ? 'border-primary/40' : 'border-dashed opacity-80'
											)}
											onClick={() => setActiveSlotId(isActive ? null : slot.id)}
										>
											<div className="flex items-center gap-2 overflow-hidden">
												{assignedSpell ? (
													<span className="truncate font-medium">{assignedSpell.name}</span>
												) : (
													<span className="text-muted-foreground italic">Empty</span>
												)}
											</div>
											<div className="flex shrink-0 items-center gap-1">
												<span className="text-muted-foreground/60 text-[10px] uppercase">
													{slot.sourceName}
												</span>
												{!slot.isGlobal && <Lock className="text-primary/40 h-3 w-3" />}
											</div>
										</div>
									);
								})}
							</div>
						</details>
					</div>

					{filteredSpells.length === 0 ? (
						<div className="border-border text-muted-foreground rounded-2xl border-2 border-dashed bg-black/10 py-24 text-center">
							<div className="bg-primary/5 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
								<Search className="text-primary/40 h-8 w-8" />
							</div>
							<h3 className="font-cinzel mb-3 text-2xl text-white">No Matching Spells</h3>
							<p className="text-muted-foreground mx-auto max-w-sm text-base leading-relaxed">
								{activeSlotId
									? 'This pocket has specific restrictions that no spells in our library currently meet.'
									: 'None of your available spells match the active filters.'}
							</p>
							{activeSlotId && (
								<SecondaryButton
									style={{
										fontFamily: 'Cinzel, serif',
										marginTop: theme.spacing[6]
									}}
									onClick={() => setActiveSlotId(null)}
								>
									Browse All Class Spells
								</SecondaryButton>
							)}
						</div>
					) : (
						<SpellGrid>
							{filteredSpells.map((spell) => {
								const isSelected = Object.values(selectedSpells).includes(spell.id);

								return (
									<SpellCard key={spell.id} $isSelected={isSelected}>
										{isSelected && <KnownBadge>KNOWN</KnownBadge>}
										
										<StyledCardHeader>
											<SpellName $isSelected={isSelected}>{spell.name}</SpellName>
											<Badge $variant="school">{spell.school}</Badge>
										</StyledCardHeader>

										<SpellBadges>
											<Badge $variant="cost">
												{spell.cost.ap} AP{spell.cost.mp ? ` + ${spell.cost.mp} MP` : ''}
											</Badge>
											<Badge $variant="range">{spell.range}</Badge>
											{spell.sustained && <Badge $variant="sustained">Sustained</Badge>}
										</SpellBadges>

										<SpellDescription>
											{spell.effects[0]?.description || 'No description available.'}
										</SpellDescription>

										<SpellCardFooter>
											<SourcesList>
												{spell.sources.map((source) => (
													<SourceTag key={source}>{source}</SourceTag>
												))}
											</SourcesList>
											<SpellButton
												$variant={isSelected ? 'forget' : 'learn'}
												onClick={() => handleSpellToggle(spell.id)}
											>
												{isSelected ? 'FORGET' : 'LEARN'}
											</SpellButton>
										</SpellCardFooter>
									</SpellCard>
								);
							})}
						</SpellGrid>
					)}
				</div>
			)}
		</Container>
	);
};

export default Spells;
