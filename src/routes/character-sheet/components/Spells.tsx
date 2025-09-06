import React, { useState, useMemo } from 'react';
import type { SpellData, CharacterSheetData } from '../../../types';
import type { Spell } from '../../../lib/rulesdata/schemas/spell.schema';
import { allSpells } from '../../../lib/rulesdata/spells-data/spells';
import { SpellSchool } from '../../../lib/rulesdata/schemas/spell.schema';
import { useCharacterSpells, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledSpellsSection,
	StyledSpellsHeader,
	StyledSpellsTitle,
	StyledSpellsControls,
	StyledAddSpellButton,
	StyledSpellsContainer,
	StyledSpellsHeaderRow,
	StyledHeaderColumn,
	StyledEmptyState,
	StyledSpellRow,
	StyledRemoveButton,
	StyledSpellSelect,
	StyledSchoolFilter,
	StyledSpellCell,
	StyledInfoIcon
} from '../styles/Spells';

export interface SpellsProps {
	onSpellClick: (spell: Spell) => void;
	readOnly?: boolean; // New prop for read-only display
}

const Spells: React.FC<SpellsProps> = ({ onSpellClick, readOnly = false }) => {
	const { addSpell, removeSpell, updateSpell, state } = useCharacterSheet();
	const spells = useCharacterSpells();
	
	if (!state.character) {
		return <div>Loading spells...</div>;
	}
	
	const characterData = state.character;
	const [schoolFilter, setSchoolFilter] = useState<string>('all');
	// Initialize with all spells expanded by default
	const [expandedSpells, setExpandedSpells] = useState<Set<string>>(() => {
		const expanded = new Set<string>();
		spells.forEach(spell => {
			if (spell.spellName) {
				expanded.add(spell.id);
			}
		});
		return expanded;
	});

	// Filter spells based on selected school
	const filteredSpells = useMemo(() => {
		if (schoolFilter === 'all') {
			return allSpells;
		}
		return allSpells.filter(spell => spell.school === schoolFilter);
	}, [schoolFilter]);

	// Filter character's spells based on selected school
	const filteredCharacterSpells = useMemo(() => {
		if (schoolFilter === 'all') {
			return spells;
		}
		return spells.filter(spell => {
			// Show spells that match the selected school, or empty spells (for adding new ones)
			return !spell.spellName || spell.school === schoolFilter;
		});
	}, [spells, schoolFilter]);

	const addSpellSlot = () => {
		const newSpell: SpellData = {
			id: `spell_${Date.now()}`,
			spellName: '',
			school: '',
			isCantrip: false,
			cost: { ap: 0 },
			range: '',
			duration: '',
			isPrepared: false,
			notes: ''
		};
		addSpell(newSpell);
	};

	const removeSpellSlot = (spellIndex: number) => {
		const spellToRemove = spells[spellIndex];
		if (spellToRemove) {
			removeSpell(spellToRemove.id);
		}
	};

	const updateSpellField = (index: number, field: keyof SpellData, value: any) => {
		const spell = spells[index];
		if (!spell) return;
		
		if (field === 'spellName' && value) {
			// When spell is selected, populate all fields from spell data
			const selectedSpell = allSpells.find(spell => spell.name === value);
			if (selectedSpell) {
				updateSpell(spell.id, 'spellName', selectedSpell.name);
				updateSpell(spell.id, 'school', selectedSpell.school);
				updateSpell(spell.id, 'isCantrip', selectedSpell.isCantrip);
				updateSpell(spell.id, 'cost', selectedSpell.cost);
				updateSpell(spell.id, 'range', selectedSpell.range);
				updateSpell(spell.id, 'duration', selectedSpell.duration);
				// Copy over additional properties for the popup
				if (selectedSpell.effects) updateSpell(spell.id, 'effects', selectedSpell.effects);
				if (selectedSpell.enhancements) updateSpell(spell.id, 'enhancements', selectedSpell.enhancements);
				if (selectedSpell.isRitual !== undefined) updateSpell(spell.id, 'isRitual', selectedSpell.isRitual);
				if (selectedSpell.cantripPassive) updateSpell(spell.id, 'cantripPassive', selectedSpell.cantripPassive);
				
				// Automatically expand the spell to show description
				setExpandedSpells(prev => {
					const newSet = new Set(prev);
					newSet.add(spell.id);
					return newSet;
				});
			} else {
				console.warn('Could not find spell in allSpells:', value);
			}
		} else {
			updateSpell(spell.id, field, value);
		}
	};

	const handleSchoolFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSchoolFilter(event.target.value);
	};

	const toggleSpellExpansion = (spellId: string) => {
		setExpandedSpells(prev => {
			const newSet = new Set(prev);
			if (newSet.has(spellId)) {
				newSet.delete(spellId);
			} else {
				newSet.add(spellId);
			}
			return newSet;
		});
	};

	return (
		<StyledSpellsSection>
			<StyledSpellsHeader>
				<StyledSpellsTitle>Spells</StyledSpellsTitle>
				{!readOnly && (
					<StyledSpellsControls>
						<label style={{ fontSize: '0.8rem', color: '#8b4513', marginRight: '0.3rem' }}>
							Filter by School:
						</label>
						<StyledSchoolFilter value={schoolFilter} onChange={handleSchoolFilterChange}>
							<option value="all">All Schools</option>
							{(Object.values(SpellSchool) as string[]).map(school => (
								<option key={school} value={school}>
									{school}
								</option>
							))}
						</StyledSchoolFilter>
						<StyledAddSpellButton onClick={addSpellSlot}>
							+ Add {schoolFilter !== 'all' ? `${schoolFilter} ` : ''}Spell
						</StyledAddSpellButton>
					</StyledSpellsControls>
				)}
			</StyledSpellsHeader>

			<StyledSpellsContainer>
				<StyledSpellsHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledHeaderColumn>Spell Name</StyledHeaderColumn>
					<StyledHeaderColumn>School</StyledHeaderColumn>
					<StyledHeaderColumn>Type</StyledHeaderColumn>
					<StyledHeaderColumn>AP Cost</StyledHeaderColumn>
					<StyledHeaderColumn>MP Cost</StyledHeaderColumn>
					<StyledHeaderColumn>Range</StyledHeaderColumn>
				</StyledSpellsHeaderRow>

				{filteredCharacterSpells.length === 0 ? (
					<StyledEmptyState>
						{schoolFilter !== 'all' 
							? `No ${schoolFilter} spells found. ${readOnly ? '' : 'Click "Add Spell" to add spells to your character.'}`
							: readOnly ? 'No spells known.' : 'No spells selected. Click "Add Spell" to add spells to your character.'
						}
					</StyledEmptyState>
				) : (
					filteredCharacterSpells.map((spell) => {
						// Get the original index for update operations
						const originalIndex = spells.findIndex(s => s.id === spell.id);
						// Get the selected spell details for info display
						const selectedSpell = spell.spellName ? 
							allSpells.find(s => s.name === spell.spellName) : null;
							
						return (
							<React.Fragment key={spell.id}>
								<StyledSpellRow>
									{/* Remove Button - only show in edit mode */}
									{!readOnly && (
										<StyledRemoveButton onClick={() => removeSpellSlot(originalIndex)}>
											×
										</StyledRemoveButton>
									)}

									{/* Spell Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly ? (
										<StyledSpellCell style={{ fontWeight: 'bold', color: '#2c3e50' }}>
											{spell.spellName || 'Unknown Spell'}
										</StyledSpellCell>
									) : (
										<StyledSpellSelect
											value={spell.spellName}
											onChange={(e) => updateSpellField(originalIndex, 'spellName', e.target.value)}
										>
											<option value="">Select Spell...</option>
											{/* Always include the currently selected spell, even if it doesn't match filter */}
											{spell.spellName && !filteredSpells.find(s => s.name === spell.spellName) && (
												<option key={spell.spellName} value={spell.spellName}>
													{spell.spellName}
												</option>
											)}
											{filteredSpells
												.filter(spellOption => {
													// Don't show spells that are already selected by other spell slots
													const isAlreadySelected = spells.some(existingSpell => 
														existingSpell.spellName === spellOption.name && existingSpell.id !== spell.id
													);
													return !isAlreadySelected;
												})
												.map((spellOption) => (
													<option key={spellOption.name} value={spellOption.name}>
														{spellOption.name}
													</option>
												))}
										</StyledSpellSelect>
									)}

									{/* School */}
									<StyledSpellCell>{spell.school}</StyledSpellCell>

									{/* Type (Cantrip or Spell) */}
									<StyledSpellCell>
										{spell.isCantrip ? 'Cantrip' : 'Spell'}
									</StyledSpellCell>

								{/* AP Cost */}
								<StyledSpellCell>{spell.cost?.ap || '-'}</StyledSpellCell>

								{/* MP Cost */}
								<StyledSpellCell>{spell.cost?.mp || '-'}</StyledSpellCell>

									{/* Range */}
									<StyledSpellCell style={{ fontSize: '0.7rem' }}>
										{spell.range || '-'}
									</StyledSpellCell>

									
								</StyledSpellRow>

								{/* Expandable Description Section */}
								{selectedSpell && expandedSpells.has(spell.id) && (
									<div style={{
										color: '#333',
										padding: '10px',
										backgroundColor: '#f9f9f9',
										border: '1px solid #ddd',
										borderTop: 'none',
										borderRadius: '0 0 4px 4px',
										marginTop: '-0.5rem'
									}}>
										<div style={{ fontSize: '0.8rem' }}>
											<strong>Description:</strong>
											<br />
											{selectedSpell.effects?.map((effect, effectIndex) => (
												<div key={effectIndex} style={{ marginBottom: '0.5rem' }}>
													{effect.title && <strong>{effect.title}:</strong>}
													<br />
													{effect.description}
												</div>
											)) || 'No description available.'}

											{selectedSpell.cantripPassive && (
												<>
													<br />
													<strong>Cantrip Passive:</strong> {selectedSpell.cantripPassive}
												</>
											)}

											{selectedSpell.enhancements?.length > 0 && (
												<>
													<br />
													<br />
													<strong>Enhancements:</strong>
													{selectedSpell.enhancements.map((enhancement, enhancementIndex) => (
														<div key={enhancementIndex} style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
															<strong>{enhancement.name}</strong> ({enhancement.type} {enhancement.cost})
															<br />
															{enhancement.description}
														</div>
													))}
												</>
											)}
										</div>
									</div>
								)}

								{/* Toggle Description Button */}
								{selectedSpell && (
									<div style={{
										padding: '5px',
										textAlign: 'center',
										borderTop: '1px solid #eee',
										backgroundColor: '#fafafa',
										borderRadius: '0 0 4px 4px'
									}}>
										<button
											onClick={() => toggleSpellExpansion(spell.id)}
											style={{
												background: 'none',
												border: '1px solid #ccc',
												borderRadius: '4px',
												padding: '2px 8px',
												fontSize: '0.7rem',
												cursor: 'pointer',
												color: '#666'
											}}
										>
											{expandedSpells.has(spell.id) ? 'Hide Description' : 'Show Description'}
										</button>
									</div>
								)}
							</React.Fragment>
						);
					})
				)}
			</StyledSpellsContainer>
		</StyledSpellsSection>
	);
};

export default Spells;
