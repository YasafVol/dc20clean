import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ALL_SPELLS as allSpells } from '../../lib/rulesdata/spells-data';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { SpellSchool, type ClassName } from '../../lib/rulesdata/schemas/spell.schema';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

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
			console.log('❌ No classId or classFeatures:', {
				classId: state.classId,
				classFeatures: !!classFeatures
			});
			return [];
		}

		console.log('SpellsAndManeuvers Debug:', {
			classId: state.classId,
			classFeatures: !!classFeatures,
			selectedFeatureChoices: state.selectedFeatureChoices
		});

		// Use feature choices directly to determine available spell schools
		const featureChoices: { [key: string]: any } = state.selectedFeatureChoices || {};
		let availableSchools: SpellSchool[] = [];

		console.log('Feature choices:', featureChoices);

		// Get available spell schools based on class features
		if (classFeatures.spellcastingPath?.spellList) {
			const spellList = classFeatures.spellcastingPath.spellList;
			console.log('Spellcasting path:', classFeatures.spellcastingPath);

			if (spellList.type === 'all_schools' && spellList.schoolCount) {
				const choiceId = `${classFeatures.className.toLowerCase()}_spell_schools`;
				const choice = featureChoices[choiceId];
				console.log('Looking for choice:', choiceId, 'Found:', choice);
				if (choice) {
					const selectedSchools = Array.isArray(choice) ? choice : [choice];
					availableSchools.push(...selectedSchools);
					console.log('Selected schools from choice:', selectedSchools);
				}
			} else if (spellList.type === 'schools') {
				if (spellList.specificSchools) {
					availableSchools.push(...spellList.specificSchools);
					console.log('Added specific schools:', spellList.specificSchools);
				}

				if (spellList.schoolCount && spellList.schoolCount > 0) {
					const choiceId = `${classFeatures.className.toLowerCase()}_additional_spell_schools`;
					const choice = featureChoices[choiceId];
					console.log('Looking for additional choice:', choiceId, 'Found:', choice);
					if (choice) {
						// Handle additional schools (expect arrays directly)
						const additionalSchools =
							spellList.schoolCount > 1 && Array.isArray(choice) ? choice : [choice];
						availableSchools.push(...additionalSchools);
						console.log('Added additional schools:', additionalSchools);
					}
				}
			} else if (spellList.type === 'any') {
				availableSchools.push(SpellSchool.Astromancy);
				console.log('Added any school (Astromancy)');
			}
		}

		// If no schools determined, use defaults
		if (availableSchools.length === 0) {
			console.log('No schools determined, using defaults for class:', state.classId);
			switch (state.classId.toLowerCase()) {
				case 'wizard':
					availableSchools = [
						SpellSchool.Astromancy,
						SpellSchool.Destruction,
						SpellSchool.Illusion
					];
					break;
				case 'sorcerer':
					availableSchools = [
						SpellSchool.Astromancy,
						SpellSchool.Destruction,
						SpellSchool.Enchantment
					];
					break;
				case 'cleric':
					availableSchools = [
						SpellSchool.Restoration,
						SpellSchool.Protection,
						SpellSchool.Divination
					];
					break;
				case 'druid':
					availableSchools = [
						SpellSchool.Restoration,
						SpellSchool.Conjuration,
						SpellSchool.Transmutation
					];
					break;
				case 'barbarian':
				case 'fighter':
				case 'monk':
				case 'rogue':
				case 'ranger':
				case 'paladin':
					// Martial classes get access to some utility spells
					availableSchools = [
						SpellSchool.Protection,
						SpellSchool.Enchantment,
						SpellSchool.Transmutation
					];
					break;
				case 'hunter':
					// Hunter is a pure martial class with no spellcasting
					availableSchools = [];
					break;
				default:
					// For any other class, show all schools
					availableSchools = Object.values(SpellSchool);
			}
		}

		// Filter spells by class and schools
		const filteredSpells = allSpells.filter((spell) => {
			// More inclusive class filtering - if no specific class match, show all spells
			const isAvailableToClass =
				spell.availableClasses.length === 0 ||
				spell.availableClasses.includes(state.classId as ClassName) ||
				spell.availableClasses.some(
					(className) =>
						state.classId?.toLowerCase().includes(className.toLowerCase()) ||
						className.toLowerCase().includes(state.classId?.toLowerCase() || '')
				);

			// If no schools are available, don't show any spells
			const isInAvailableSchool =
				availableSchools.length > 0 && availableSchools.includes(spell.school);
			return isAvailableToClass && isInAvailableSchool;
		});

		// Debug logging
		console.log('SpellsAndManeuvers Debug:', {
			classId: state.classId,
			availableSchools,
			totalSpells: allSpells.length,
			filteredSpells: filteredSpells.length,
			sampleSpells: filteredSpells.slice(0, 5).map((s) => s.name)
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

			{/* Tab Container */}
			<div className="mb-8 flex justify-center gap-4">
				{/* Only show spells tab if there are spells available */}
				{availableSpells.length > 0 && (
					<button
						onClick={() => setActiveTab('spells')}
						className={cn(
							'rounded-lg border-2 px-6 py-3 font-bold transition-all hover:-translate-y-0.5',
							activeTab === 'spells'
								? 'border-primary bg-primary text-primary-foreground'
								: 'border-purple-500 bg-transparent text-purple-500 hover:bg-purple-500 hover:text-white'
						)}
					>
						Spells ({selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells})
					</button>
				)}
				{/* Only show maneuvers tab if there are maneuvers available */}
				{maneuverCount > 0 && (
					<button
						onClick={() => setActiveTab('maneuvers')}
						className={cn(
							'rounded-lg border-2 px-6 py-3 font-bold transition-all hover:-translate-y-0.5',
							activeTab === 'maneuvers'
								? 'border-primary bg-primary text-primary-foreground'
								: 'border-purple-500 bg-transparent text-purple-500 hover:bg-purple-500 hover:text-white'
						)}
					>
						Maneuvers ({selectedManeuvers.length}/{maneuverCount})
					</button>
				)}
			</div>

			{activeTab === 'spells' && availableSpells.length > 0 && (
				<section className="mb-8">
					<h2 className="text-primary mb-4 text-center text-2xl">
						Spells for {state.classId} (Level {state.level})
					</h2>

					{/* Selected Count */}
					<div className="bg-primary/10 border-primary/30 text-primary mx-auto mb-4 max-w-md rounded-lg border p-2 text-center font-bold">
						Total Selected: {selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells}
					</div>

					{/* Filter Buttons */}
					<div className="mb-6 flex flex-wrap justify-center gap-2">
						<button
							onClick={() => setSpellFilter('all')}
							className={cn(
								'rounded-md border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5',
								spellFilter === 'all'
									? 'border-primary bg-primary text-primary-foreground'
									: 'text-muted-foreground border-muted-foreground hover:bg-muted-foreground bg-transparent hover:text-white'
							)}
						>
							All Schools
						</button>
						{Object.values(SpellSchool).map((school) => (
							<button
								key={school}
								onClick={() => setSpellFilter(school)}
								className={cn(
									'rounded-md border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5',
									spellFilter === school
										? 'border-primary bg-primary text-primary-foreground'
										: 'text-muted-foreground border-muted-foreground hover:bg-muted-foreground bg-transparent hover:text-white'
								)}
							>
								{school}
							</button>
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
													<div
														key={spell.name}
														className={cn(
															'rounded-xl border-2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl',
															isSelected
																? 'border-primary opacity-100'
																: 'hover:border-primary border-purple-500 opacity-80 hover:opacity-100'
														)}
													>
														<div className="mb-4 flex flex-wrap items-start justify-between gap-2">
															<h3 className="text-primary flex-1 text-xl font-bold">
																{spell.name}
															</h3>
															<span className="rounded bg-purple-500/20 px-2 py-1 text-xs font-bold tracking-wide text-purple-400 uppercase">
																{spell.school}
															</span>
															<span className="rounded bg-red-500/20 px-2 py-1 text-sm font-bold text-red-500">
																{spell.cost.ap} AP
																{spell.cost.mp && ` + ${spell.cost.mp} MP`}
															</span>
														</div>
														<p className="text-foreground mb-4 text-sm leading-relaxed">
															{spell.effects[0]?.description || 'No description available.'}
														</p>
														<div className="flex justify-end">
															<Button
																variant={isSelected ? 'destructive' : 'default'}
																size="sm"
																onClick={() => handleSpellToggle(spell.name)}
																disabled={!canSelect}
															>
																{isSelected ? 'Remove' : 'Add'}
															</Button>
														</div>
													</div>
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
													<div
														key={spell.name}
														className={cn(
															'rounded-xl border-2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl',
															isSelected
																? 'border-primary opacity-100'
																: 'hover:border-primary border-purple-500 opacity-80 hover:opacity-100'
														)}
													>
														<div className="mb-4 flex flex-wrap items-start justify-between gap-2">
															<h3 className="text-primary flex-1 text-xl font-bold">
																{spell.name}
															</h3>
															<span className="rounded bg-purple-500/20 px-2 py-1 text-xs font-bold tracking-wide text-purple-400 uppercase">
																{spell.school}
															</span>
															<span className="rounded bg-red-500/20 px-2 py-1 text-sm font-bold text-red-500">
																{spell.cost.ap} AP
																{spell.cost.mp && ` + ${spell.cost.mp} MP`}
															</span>
														</div>
														<p className="text-foreground mb-4 text-sm leading-relaxed">
															{spell.effects[0]?.description || 'No description available.'}
														</p>
														<div className="flex justify-end">
															<Button
																variant={isSelected ? 'destructive' : 'default'}
																size="sm"
																onClick={() => handleSpellToggle(spell.name)}
																disabled={!canSelect}
															>
																{isSelected ? 'Remove' : 'Add'}
															</Button>
														</div>
													</div>
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

			{activeTab === 'maneuvers' && maneuverCount > 0 && (
				<section className="mb-8">
					<h2 className="text-primary mb-4 text-center text-2xl">
						Maneuvers for {state.classId} (Level {state.level})
					</h2>

					{/* Selected Count */}
					<div className="bg-primary/10 border-primary/30 text-primary mx-auto mb-4 max-w-md rounded-lg border p-2 text-center font-bold">
						Selected: {selectedManeuvers.length}/{maneuverCount}
					</div>

					{/* Filter Buttons */}
					<div className="mb-6 flex flex-wrap justify-center gap-2">
						<button
							onClick={() => setManeuverFilter('all')}
							className={cn(
								'rounded-md border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5',
								maneuverFilter === 'all'
									? 'border-primary bg-primary text-primary-foreground'
									: 'text-muted-foreground border-muted-foreground hover:bg-muted-foreground bg-transparent hover:text-white'
							)}
						>
							All Types
						</button>
						{Object.values(ManeuverType).map((type) => (
							<button
								key={type}
								onClick={() => setManeuverFilter(type)}
								className={cn(
									'rounded-md border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5',
									maneuverFilter === type
										? 'border-primary bg-primary text-primary-foreground'
										: 'text-muted-foreground border-muted-foreground hover:bg-muted-foreground bg-transparent hover:text-white'
								)}
							>
								{type}
							</button>
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
									<div
										key={maneuver.name}
										className={cn(
											'rounded-xl border-2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl',
											isSelected
												? 'border-primary opacity-100'
												: 'hover:border-primary border-purple-500 opacity-80 hover:opacity-100'
										)}
									>
										<div className="mb-4 flex flex-wrap items-start justify-between gap-2">
											<h3 className="text-primary flex-1 text-xl font-bold">{maneuver.name}</h3>
											<span className="rounded bg-purple-500/20 px-2 py-1 text-xs font-bold tracking-wide text-purple-400 uppercase">
												{maneuver.type}
											</span>
											<span className="rounded bg-red-500/20 px-2 py-1 text-sm font-bold text-red-500">
												{maneuver.cost.ap} AP
											</span>
										</div>
										<p className="text-foreground mb-4 text-sm leading-relaxed">
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
										<div className="flex justify-end">
											<Button
												variant={isSelected ? 'destructive' : 'default'}
												size="sm"
												onClick={() => handleManeuverToggle(maneuver.name)}
												disabled={!canSelect}
											>
												{isSelected ? 'Remove' : 'Add'}
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>
			)}
		</div>
	);
};

export default SpellsAndManeuvers;
