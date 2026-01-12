import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { SpellSchool, SpellSource } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';

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
	const [spellFilter, setSpellFilter] = useState<SpellSchool | 'all'>('all');
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

	// Filter spells and maneuvers based on active filters
	const filteredSpells = React.useMemo(() => {
		let spells = availableSpells;
		if (spellFilter !== 'all') {
			spells = spells.filter((spell) => spell.school === spellFilter);
		}
		return spells;
	}, [availableSpells, spellFilter]);

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

	if (!state.classId) {
		return (
			<div className="min-h-screen p-8">
				<h1 className="font-cinzel text-primary mb-8 text-center text-3xl font-bold tracking-wide drop-shadow-lg">
					Spells & Maneuvers
				</h1>
				<div className="text-muted-foreground py-16 text-center">
					<h3 className="mb-4 text-2xl text-purple-400">No Class Selected</h3>
					<p className="text-base leading-relaxed">
						Please select a class first to see available spells and maneuvers.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-8">
			<h1 className="font-cinzel text-primary mb-8 text-center text-3xl font-bold tracking-wide drop-shadow-lg">
				Spells & Maneuvers
			</h1>

			<Tabs
				value={activeTab}
				onValueChange={(v) => setActiveTab(v as 'spells' | 'maneuvers')}
				className="w-full"
			>
				<TabsList className="border-border mx-auto mb-8 grid w-full max-w-md grid-cols-2 border bg-black/40">
					<TabsTrigger
						value="spells"
						disabled={availableSpells.length === 0}
						className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-cinzel text-base"
					>
						Spells ({selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells})
					</TabsTrigger>
					<TabsTrigger
						value="maneuvers"
						disabled={maneuverCount === 0}
						className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-cinzel text-base"
					>
						Maneuvers ({selectedManeuvers.length}/{maneuverCount})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="spells" className="space-y-8">
					{availableSpells.length > 0 && (
						<section>
							<h2 className="text-primary mb-4 text-center text-2xl">
								Spells for {state.classId} (Level {state.level})
							</h2>

							{/* Selected Count */}
							<div className="bg-primary/10 border-primary/30 text-primary mx-auto mb-4 max-w-md rounded-lg border p-2 text-center font-bold">
								Total Selected: {selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells}
							</div>

							{/* Filter Buttons */}
							<div className="mb-6 flex flex-wrap justify-center gap-2">
								<Button
									variant={spellFilter === 'all' ? 'default' : 'outline'}
									size="sm"
									onClick={() => setSpellFilter('all')}
									className={cn(
										'transition-all',
										spellFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-transparent'
									)}
								>
									All Schools
								</Button>
								{Object.values(SpellSchool).map((school) => (
									<Button
										key={school}
										variant={spellFilter === school ? 'default' : 'outline'}
										size="sm"
										onClick={() => setSpellFilter(school)}
										className={cn(
											'transition-all',
											spellFilter === school ? 'bg-primary text-primary-foreground' : 'bg-transparent'
										)}
									>
										{school}
									</Button>
								))}
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
												<h3 className="text-primary mb-4 text-xl font-bold">
													Cantrips ({currentCantrips}/{maxCantrips})
												</h3>
												<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
													{cantrips.map((spell) => {
														const isSelected = selectedSpells.includes(spell.name);
														const canSelect = currentCantrips < maxCantrips || isSelected;

														return (
															<Card
																key={spell.name}
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
																			{spell.name}
																		</CardTitle>
																		<Badge
																			variant="outline"
																			className="border-purple-500/50 text-purple-400"
																		>
																			{spell.school}
																		</Badge>
																	</div>
																	<div className="flex gap-2">
																		<Badge
																			variant="secondary"
																			className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
																		>
																			{spell.cost.ap} AP
																			{spell.cost.mp && ` + ${spell.cost.mp} MP`}
																		</Badge>
																	</div>
																</CardHeader>
																<CardContent>
																	<p className="text-muted-foreground text-sm leading-relaxed">
																		{spell.effects[0]?.description ||
																			'No description available.'}
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
												<h3 className="mb-4 text-xl font-bold text-purple-500">
													Spells ({currentSpells}/{maxSpells})
												</h3>
												<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
													{regularSpells.map((spell) => {
														const isSelected = selectedSpells.includes(spell.name);
														const canSelect = currentSpells < maxSpells || isSelected;

														return (
															<Card
																key={spell.name}
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
																			{spell.name}
																		</CardTitle>
																		<Badge
																			variant="outline"
																			className="border-purple-500/50 text-purple-400"
																		>
																			{spell.school}
																		</Badge>
																	</div>
																	<div className="flex gap-2">
																		<Badge
																			variant="secondary"
																			className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
																		>
																			{spell.cost.ap} AP
																			{spell.cost.mp && ` + ${spell.cost.mp} MP`}
																		</Badge>
																	</div>
																</CardHeader>
																<CardContent>
																	<p className="text-muted-foreground text-sm leading-relaxed">
																		{spell.effects[0]?.description ||
																			'No description available.'}
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
						</section>
					)}
				</TabsContent>

				<TabsContent value="maneuvers" className="space-y-8">
					{maneuverCount > 0 && (
						<section>
							<h2 className="text-primary mb-4 text-center text-2xl">
								Maneuvers for {state.classId} (Level {state.level})
							</h2>

							{/* Selected Count */}
							<div className="bg-primary/10 border-primary/30 text-primary mx-auto mb-4 max-w-md rounded-lg border p-2 text-center font-bold">
								Selected: {selectedManeuvers.length}/{maneuverCount}
							</div>

							{/* Filter Buttons */}
							<div className="mb-6 flex flex-wrap justify-center gap-2">
								<Button
									variant={maneuverFilter === 'all' ? 'default' : 'outline'}
									size="sm"
									onClick={() => setManeuverFilter('all')}
									className={cn(
										'transition-all',
										maneuverFilter === 'all'
											? 'bg-primary text-primary-foreground'
											: 'bg-transparent'
									)}
								>
									All Types
								</Button>
								{Object.values(ManeuverType).map((type) => (
									<Button
										key={type}
										variant={maneuverFilter === type ? 'default' : 'outline'}
										size="sm"
										onClick={() => setManeuverFilter(type)}
										className={cn(
											'transition-all',
											maneuverFilter === type
												? 'bg-primary text-primary-foreground'
												: 'bg-transparent'
										)}
									>
										{type}
									</Button>
								))}
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
						</section>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SpellsAndManeuvers;
