import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { allSpells } from '../../lib/rulesdata/spells-data/spells';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/maneuvers';
import { SpellSchool, type ClassName } from '../../lib/rulesdata/spells-data/types/spell.types';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import {
	StyledContainer,
	StyledTitle,
	StyledSection,
	StyledSectionTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledCardTitle,
	StyledCardDescription,
	StyledCardCost,
	StyledCardType,
	StyledCardActions,
	StyledButton,
	StyledTabContainer,
	StyledTabButton,
	StyledEmptyState,
	StyledEmptyTitle,
	StyledEmptyText,
	StyledSelectedCount,
	StyledFilterContainer,
	StyledFilterButton
} from './styles/SpellsAndManeuvers.styles';

const SpellsAndManeuvers: React.FC = () => {
	console.log('🚀 SpellsAndManeuvers component is rendering!');
	const { state, dispatch } = useCharacter();
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
		
		try {
			if (state.selectedSpells) {
				const spells = JSON.parse(state.selectedSpells);
				if (Array.isArray(spells)) {
					console.log('📚 Setting selected spells:', spells);
					setSelectedSpells(spells);
				}
			}
		} catch (e) {
			console.warn('Failed to parse selected spells:', e);
		}

		try {
			if (state.selectedManeuvers) {
				const maneuvers = JSON.parse(state.selectedManeuvers);
				if (Array.isArray(maneuvers)) {
					console.log('⚔️ Setting selected maneuvers:', maneuvers);
					setSelectedManeuvers(maneuvers);
				}
			}
		} catch (e) {
			console.warn('Failed to parse selected maneuvers:', e);
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
	const classData = classesData.find(c => c.name.toLowerCase() === state.classId?.toLowerCase());
	console.log('🔍 Class data lookup:', { 
		stateClassId: state.classId, 
		availableClasses: classesData.map(c => c.name),
		foundClassData: !!classData,
		classDataName: classData?.name
	});
	const classFeatures = state.classId ? findClassByName(state.classId) : null;

	// Calculate available spells and maneuvers based on class and level
	const availableSpells = React.useMemo(() => {
		console.log('🔍 Starting availableSpells calculation...');
		if (!state.classId || !classFeatures) {
			console.log('❌ No classId or classFeatures:', { classId: state.classId, classFeatures: !!classFeatures });
			return [];
		}

		console.log('SpellsAndManeuvers Debug:', {
			classId: state.classId,
			classFeatures: !!classFeatures,
			selectedFeatureChoices: state.selectedFeatureChoices
		});

		// Parse feature choices to determine available spell schools
		const featureChoices: { [key: string]: string } = JSON.parse(state.selectedFeatureChoices || '{}');
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
					try {
						const selectedSchools = JSON.parse(choice);
						availableSchools.push(...selectedSchools);
						console.log('Selected schools from choice:', selectedSchools);
					} catch (e) {
						console.warn('Failed to parse spell school choices:', choice);
					}
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
						try {
							const additionalSchools = spellList.schoolCount > 1 ? JSON.parse(choice) : [choice];
							availableSchools.push(...additionalSchools);
							console.log('Added additional schools:', additionalSchools);
						} catch (e) {
							console.warn('Failed to parse additional spell school choices:', choice);
						}
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
					availableSchools = [SpellSchool.Astromancy, SpellSchool.Destruction, SpellSchool.Illusion];
					break;
				case 'sorcerer':
					availableSchools = [SpellSchool.Astromancy, SpellSchool.Destruction, SpellSchool.Enchantment];
					break;
				case 'cleric':
					availableSchools = [SpellSchool.Restoration, SpellSchool.Protection, SpellSchool.Divination];
					break;
				case 'druid':
					availableSchools = [SpellSchool.Restoration, SpellSchool.Conjuration, SpellSchool.Transmutation];
					break;
				case 'barbarian':
				case 'fighter':
				case 'monk':
				case 'rogue':
				case 'ranger':
				case 'paladin':
					// Martial classes get access to some utility spells
					availableSchools = [SpellSchool.Protection, SpellSchool.Enchantment, SpellSchool.Transmutation];
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
		const filteredSpells = allSpells.filter(spell => {
			// More inclusive class filtering - if no specific class match, show all spells
			const isAvailableToClass = spell.availableClasses.length === 0 || 
				spell.availableClasses.includes(state.classId as ClassName) ||
				spell.availableClasses.some(className => 
					state.classId?.toLowerCase().includes(className.toLowerCase()) ||
					className.toLowerCase().includes(state.classId?.toLowerCase() || '')
				);
			
			// If no schools are available, don't show any spells
			const isInAvailableSchool = availableSchools.length > 0 && availableSchools.includes(spell.school);
			return isAvailableToClass && isInAvailableSchool;
		});

		// Debug logging
		console.log('SpellsAndManeuvers Debug:', {
			classId: state.classId,
			availableSchools,
			totalSpells: allSpells.length,
			filteredSpells: filteredSpells.length,
			sampleSpells: filteredSpells.slice(0, 5).map(s => s.name)
		});

		return filteredSpells;
	}, [state.classId, state.selectedFeatureChoices, classFeatures]);

	const availableManeuvers = React.useMemo(() => {
		console.log('🔍 availableManeuvers calculation:', { classData: !!classData, allManeuversCount: allManeuvers.length });
		if (!classData) return [];

		// All characters can learn maneuvers, but some classes get more
		return allManeuvers;
	}, [classData]);

	// Get spell/maneuver counts for current level
	const spellCounts = React.useMemo(() => {
		if (!classData || !state.level) return { cantrips: 0, spells: 0 };

		const levelData = classData.levelProgression?.find(l => l.level === state.level);
		return {
			cantrips: levelData?.cantripsKnown || 0,
			spells: levelData?.spellsKnown || 0
		};
	}, [classData, state.level]);

	const maneuverCount = React.useMemo(() => {
		console.log('🔍 maneuverCount calculation:', { 
			classData: !!classData, 
			level: state.level, 
			levelProgression: classData?.levelProgression?.length 
		});
		if (!classData || !state.level) return 0;

		const levelData = classData.levelProgression?.find(l => l.level === state.level);
		console.log('🔍 Level data found:', levelData);
		const count = levelData?.maneuversKnown || 0;
		console.log('🔍 maneuverCount result:', count);
		return count;
	}, [classData, state.level]);

	// Filter spells and maneuvers based on active filters
	const filteredSpells = React.useMemo(() => {
		let spells = availableSpells;
		if (spellFilter !== 'all') {
			spells = spells.filter(spell => spell.school === spellFilter);
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
			maneuvers = maneuvers.filter(maneuver => maneuver.type === maneuverFilter);
		}
		console.log('🔍 filteredManeuvers result:', maneuvers.length);
		return maneuvers;
	}, [availableManeuvers, maneuverFilter]);

	// Handle spell selection
	const handleSpellToggle = (spellName: string) => {
		setSelectedSpells(prev => {
			if (prev.includes(spellName)) {
				return prev.filter(name => name !== spellName);
			} else {
				// Check limits
				const spell = availableSpells.find(s => s.name === spellName);
				if (!spell) return prev;

				if (spell.isCantrip) {
					const currentCantrips = prev.filter(name => 
						availableSpells.find(s => s.name === name)?.isCantrip
					).length;
					if (currentCantrips >= spellCounts.cantrips) return prev;
				} else {
					const currentSpells = prev.filter(name => 
						!availableSpells.find(s => s.name === name)?.isCantrip
					).length;
					if (currentSpells >= spellCounts.spells) return prev;
				}
				return [...prev, spellName];
			}
		});
	};

	// Handle maneuver selection
	const handleManeuverToggle = (maneuverName: string) => {
		setSelectedManeuvers(prev => {
			if (prev.includes(maneuverName)) {
				return prev.filter(name => name !== maneuverName);
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
		const currentStateSpells = state.selectedSpells ? JSON.parse(state.selectedSpells) : [];
		const currentStateManeuvers = state.selectedManeuvers ? JSON.parse(state.selectedManeuvers) : [];
		
		const spellsChanged = JSON.stringify(selectedSpells) !== JSON.stringify(currentStateSpells);
		const maneuversChanged = JSON.stringify(selectedManeuvers) !== JSON.stringify(currentStateManeuvers);
		
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
			<StyledContainer>
				<StyledTitle>Spells & Maneuvers</StyledTitle>
				<StyledEmptyState>
					<StyledEmptyTitle>No Class Selected</StyledEmptyTitle>
					<StyledEmptyText>
						Please select a class first to see available spells and maneuvers.
					</StyledEmptyText>
				</StyledEmptyState>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<StyledTitle>Spells & Maneuvers</StyledTitle>

			<StyledTabContainer>
				{/* Only show spells tab if there are spells available */}
				{availableSpells.length > 0 && (
					<StyledTabButton
						$active={activeTab === 'spells'}
						onClick={() => setActiveTab('spells')}
					>
						Spells ({selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells})
					</StyledTabButton>
				)}
				{/* Only show maneuvers tab if there are maneuvers available */}
				{maneuverCount > 0 && (
					<StyledTabButton
						$active={activeTab === 'maneuvers'}
						onClick={() => setActiveTab('maneuvers')}
					>
						Maneuvers ({selectedManeuvers.length}/{maneuverCount})
					</StyledTabButton>
				)}
			</StyledTabContainer>

			{activeTab === 'spells' && availableSpells.length > 0 && (
				<StyledSection>
					<StyledSectionTitle>
						Spells for {state.classId} (Level {state.level})
					</StyledSectionTitle>
					
					<StyledSelectedCount>
						Total Selected: {selectedSpells.length}/{spellCounts.cantrips + spellCounts.spells}
					</StyledSelectedCount>

					<StyledFilterContainer>
						<StyledFilterButton
							$active={spellFilter === 'all'}
							onClick={() => setSpellFilter('all')}
						>
							All Schools
						</StyledFilterButton>
						{Object.values(SpellSchool).map(school => (
							<StyledFilterButton
								key={school}
								$active={spellFilter === school}
								onClick={() => setSpellFilter(school)}
							>
								{school}
							</StyledFilterButton>
						))}
					</StyledFilterContainer>

					{filteredSpells.length === 0 ? (
						<StyledEmptyState>
							<StyledEmptyTitle>No Spells Available</StyledEmptyTitle>
							<StyledEmptyText>
								No spells are available for your class and level with the current filter.
							</StyledEmptyText>
						</StyledEmptyState>
					) : (
						<>
							{/* Cantrips Section */}
							{(() => {
								const cantrips = filteredSpells.filter(spell => spell.isCantrip);
								const selectedCantrips = selectedSpells.filter(name => 
									availableSpells.find(s => s.name === name)?.isCantrip
								);
								const currentCantrips = selectedCantrips.length;
								const maxCantrips = spellCounts.cantrips;

								return cantrips.length > 0 ? (
									<div style={{ marginBottom: '2rem' }}>
										<h3 style={{ 
											color: '#fbbf24', 
											marginBottom: '1rem',
											fontSize: '1.2rem',
											fontWeight: 'bold'
										}}>
											Cantrips ({currentCantrips}/{maxCantrips})
										</h3>
										<StyledGrid>
											{cantrips.map(spell => {
												const isSelected = selectedSpells.includes(spell.name);
												const canSelect = currentCantrips < maxCantrips || isSelected;

												return (
													<StyledCard key={spell.name} $selected={isSelected}>
														<StyledCardHeader>
															<StyledCardTitle>{spell.name}</StyledCardTitle>
															<StyledCardType>{spell.school}</StyledCardType>
															<StyledCardCost>
																{spell.cost.ap} AP
																{spell.cost.mp && ` + ${spell.cost.mp} MP`}
															</StyledCardCost>
														</StyledCardHeader>
														<StyledCardDescription>
															{spell.effects[0]?.description || 'No description available.'}
														</StyledCardDescription>
														<StyledCardActions>
															<StyledButton
																$variant={isSelected ? 'danger' : 'primary'}
																onClick={() => handleSpellToggle(spell.name)}
																disabled={!canSelect}
															>
																{isSelected ? 'Remove' : 'Add'}
															</StyledButton>
														</StyledCardActions>
													</StyledCard>
												);
											})}
										</StyledGrid>
									</div>
								) : null;
							})()}

							{/* Regular Spells Section */}
							{(() => {
								const regularSpells = filteredSpells.filter(spell => !spell.isCantrip);
								const selectedRegularSpells = selectedSpells.filter(name => 
									!availableSpells.find(s => s.name === name)?.isCantrip
								);
								const currentSpells = selectedRegularSpells.length;
								const maxSpells = spellCounts.spells;

								return regularSpells.length > 0 ? (
									<div>
										<h3 style={{ 
											color: '#8b5cf6', 
											marginBottom: '1rem',
											fontSize: '1.2rem',
											fontWeight: 'bold'
										}}>
											Spells ({currentSpells}/{maxSpells})
										</h3>
										<StyledGrid>
											{regularSpells.map(spell => {
												const isSelected = selectedSpells.includes(spell.name);
												const canSelect = currentSpells < maxSpells || isSelected;

												return (
													<StyledCard key={spell.name} $selected={isSelected}>
														<StyledCardHeader>
															<StyledCardTitle>{spell.name}</StyledCardTitle>
															<StyledCardType>{spell.school}</StyledCardType>
															<StyledCardCost>
																{spell.cost.ap} AP
																{spell.cost.mp && ` + ${spell.cost.mp} MP`}
															</StyledCardCost>
														</StyledCardHeader>
														<StyledCardDescription>
															{spell.effects[0]?.description || 'No description available.'}
														</StyledCardDescription>
														<StyledCardActions>
															<StyledButton
																$variant={isSelected ? 'danger' : 'primary'}
																onClick={() => handleSpellToggle(spell.name)}
																disabled={!canSelect}
															>
																{isSelected ? 'Remove' : 'Add'}
															</StyledButton>
														</StyledCardActions>
													</StyledCard>
												);
											})}
										</StyledGrid>
									</div>
								) : null;
							})()}
						</>
					)}
				</StyledSection>
			)}

			{activeTab === 'maneuvers' && maneuverCount > 0 && (
				<StyledSection>
					<StyledSectionTitle>
						Maneuvers for {state.classId} (Level {state.level})
					</StyledSectionTitle>
					
					<StyledSelectedCount>
						Selected: {selectedManeuvers.length}/{maneuverCount}
					</StyledSelectedCount>

					<StyledFilterContainer>
						<StyledFilterButton
							$active={maneuverFilter === 'all'}
							onClick={() => setManeuverFilter('all')}
						>
							All Types
						</StyledFilterButton>
						{Object.values(ManeuverType).map(type => (
							<StyledFilterButton
								key={type}
								$active={maneuverFilter === type}
								onClick={() => setManeuverFilter(type)}
							>
								{type}
							</StyledFilterButton>
						))}
					</StyledFilterContainer>

					{filteredManeuvers.length === 0 ? (
						<StyledEmptyState>
							<StyledEmptyTitle>No Maneuvers Available</StyledEmptyTitle>
							<StyledEmptyText>
								No maneuvers are available with the current filter.
							</StyledEmptyText>
						</StyledEmptyState>
					) : (
						<StyledGrid>
							{filteredManeuvers.map(maneuver => {
								const isSelected = selectedManeuvers.includes(maneuver.name);
								const canSelect = selectedManeuvers.length < maneuverCount || isSelected;

								return (
									<StyledCard key={maneuver.name} $selected={isSelected}>
										<StyledCardHeader>
											<StyledCardTitle>{maneuver.name}</StyledCardTitle>
											<StyledCardType>{maneuver.type}</StyledCardType>
											<StyledCardCost>{maneuver.cost.ap} AP</StyledCardCost>
										</StyledCardHeader>
										<StyledCardDescription>
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
										</StyledCardDescription>
										<StyledCardActions>
											<StyledButton
												$variant={isSelected ? 'danger' : 'primary'}
												onClick={() => handleManeuverToggle(maneuver.name)}
												disabled={!canSelect}
											>
												{isSelected ? 'Remove' : 'Add'}
											</StyledButton>
										</StyledCardActions>
									</StyledCard>
								);
							})}
						</StyledGrid>
					)}
				</StyledSection>
			)}
		</StyledContainer>
	);
};

export default SpellsAndManeuvers; 