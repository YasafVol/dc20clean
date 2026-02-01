import React, { useState, useMemo } from 'react';
import type { SpellData } from '../../../types';
import type { Spell } from '../../../lib/rulesdata/schemas/spell.schema';
import { ALL_SPELLS as allSpells } from '../../../lib/rulesdata/spells-data';
import { SpellSchool } from '../../../lib/rulesdata/schemas/spell.schema';
import { useCharacterSpells, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import { logger } from '../../../lib/utils/logger';
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
	StyledBoldSpellCell,
	StyledFilterLabel,
	StyledSpellDescriptionContainer,
	StyledSpellDescriptionHeader,
	StyledSpellDescriptionContent,
	StyledSpellEffect,
	StyledSpellEnhancement,
	StyledSpellToggleContainer,
	StyledSpellToggleButton
} from '../styles/Spells';

export interface SpellsProps {
	onSpellClick: (spell: Spell) => void;
	readOnly?: boolean; // New prop for read-only display
	isMobile?: boolean;
}

const Spells: React.FC<SpellsProps> = ({
	onSpellClick: _onSpellClick,
	readOnly = false,
	isMobile
}) => {
	const { addSpell, removeSpell, updateSpell, state } = useCharacterSheet();
	const spells = useCharacterSpells();

	if (!state.character) {
		return <div>Loading spells...</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	const [schoolFilter, setSchoolFilter] = useState<string>('all');
	// Initialize with all spells expanded by default
	const [expandedSpells, setExpandedSpells] = useState<Set<string>>(() => {
		const expanded = new Set<string>();
		spells.forEach((spell) => {
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
		return allSpells.filter((spell) => spell.school === schoolFilter);
	}, [schoolFilter]);

	// Filter character's spells based on selected school
	const filteredCharacterSpells = useMemo(() => {
		if (schoolFilter === 'all') {
			return spells;
		}
		return spells.filter((spell) => {
			// Show spells that match the selected school, or empty spells (for adding new ones)
			return !spell.spellName || spell.school === schoolFilter;
		});
	}, [spells, schoolFilter]);

	const addSpellSlot = () => {
		const newSpell: SpellData = {
			id: `spell_${Date.now()}`,
			spellName: '',
			school: '',
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
			const selectedSpell = allSpells.find((spell) => spell.name === value);
			if (selectedSpell) {
				updateSpell(spell.id, 'spellName', selectedSpell.name);
				updateSpell(spell.id, 'school', selectedSpell.school);
				updateSpell(spell.id, 'cost', selectedSpell.cost);
				updateSpell(spell.id, 'range', selectedSpell.range);
				updateSpell(spell.id, 'duration', selectedSpell.duration);
				// Copy over additional properties for the popup
				if (selectedSpell.effects) updateSpell(spell.id, 'effects', selectedSpell.effects);
				if (selectedSpell.enhancements)
					updateSpell(spell.id, 'enhancements', selectedSpell.enhancements);
				if (selectedSpell.isRitual !== undefined)
					updateSpell(spell.id, 'isRitual', selectedSpell.isRitual);
				if (selectedSpell.spellPassive)
					updateSpell(spell.id, 'spellPassive', selectedSpell.spellPassive);

				// Automatically expand the spell to show description
				setExpandedSpells((prev) => {
					const newSet = new Set(prev);
					newSet.add(spell.id);
					return newSet;
				});
			} else {
				logger.warn('ui', 'Could not find spell in allSpells', { value });
			}
		} else {
			updateSpell(spell.id, field, value);
		}
	};

	const handleSchoolFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSchoolFilter(event.target.value);
	};

	const toggleSpellExpansion = (spellId: string) => {
		setExpandedSpells((prev) => {
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
		<StyledSpellsSection $isMobile={effectiveIsMobile} data-testid="spells-section">
			<StyledSpellsHeader $isMobile={effectiveIsMobile}>
				<StyledSpellsTitle $isMobile={effectiveIsMobile}>Spells</StyledSpellsTitle>
				{!readOnly && (
					<StyledSpellsControls $isMobile={effectiveIsMobile} data-testid="spells-controls">
						<StyledFilterLabel $isMobile={effectiveIsMobile}>Filter by School:</StyledFilterLabel>
						<StyledSchoolFilter
							$isMobile={effectiveIsMobile}
							value={schoolFilter}
							onChange={handleSchoolFilterChange}
							data-testid="spell-filter"
						>
							<option value="all">All Schools</option>
							{(Object.values(SpellSchool) as string[]).map((school) => (
								<option key={school} value={school}>
									{school}
								</option>
							))}
						</StyledSchoolFilter>
						<StyledAddSpellButton
							$isMobile={effectiveIsMobile}
							onClick={addSpellSlot}
							data-testid="add-spell"
							aria-label="Add Spell"
						>
							+ Add {schoolFilter !== 'all' ? `${schoolFilter} ` : ''}Spell
						</StyledAddSpellButton>
					</StyledSpellsControls>
				)}
			</StyledSpellsHeader>

			<StyledSpellsContainer $isMobile={effectiveIsMobile} data-testid="spells-container">
				<StyledSpellsHeaderRow $isMobile={effectiveIsMobile}>
					<span></span> {/* Empty column for remove button */}
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>Spell Name</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>School</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>Duration</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>AP Cost</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>MP Cost</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>Range</StyledHeaderColumn>
				</StyledSpellsHeaderRow>

				{filteredCharacterSpells.length === 0 ? (
					<StyledEmptyState $isMobile={effectiveIsMobile}>
						{schoolFilter !== 'all'
							? `No ${schoolFilter} spells found. ${readOnly ? '' : 'Click "Add Spell" to add spells to your character.'}`
							: readOnly
								? 'No spells known.'
								: 'No spells selected. Click "Add Spell" to add spells to your character.'}
					</StyledEmptyState>
				) : (
					filteredCharacterSpells.map((spell) => {
						// Get the original index for update operations
						const originalIndex = spells.findIndex((s) => s.id === spell.id);
						// Get the selected spell details for info display
						const selectedSpell = spell.spellName
							? allSpells.find((s) => s.name === spell.spellName)
							: null;

						return (
							<React.Fragment key={spell.id}>
								<StyledSpellRow $isMobile={effectiveIsMobile} data-testid={`spell-row-${spell.id}`}>
									{/* Remove Button - only show in edit mode */}
									{!readOnly && (
										<StyledRemoveButton
											$isMobile={effectiveIsMobile}
											onClick={() => removeSpellSlot(originalIndex)}
											data-testid={`remove-spell-${spell.id}`}
										>
											×
										</StyledRemoveButton>
									)}

									{/* Spell Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly ? (
										<StyledBoldSpellCell $isMobile={effectiveIsMobile} $boldMobile={true}>
											{spell.spellName || 'Unknown Spell'}
										</StyledBoldSpellCell>
									) : (
										<StyledSpellSelect
											$isMobile={effectiveIsMobile}
											value={spell.spellName}
											onChange={(e) => updateSpellField(originalIndex, 'spellName', e.target.value)}
											data-testid={`spell-name-${spell.id}`}
										>
											<option value="">Select Spell...</option>
											{/* Always include the currently selected spell, even if it doesn't match filter */}
											{spell.spellName &&
												!filteredSpells.find((s) => s.name === spell.spellName) && (
													<option key={spell.spellName} value={spell.spellName}>
														{spell.spellName}
													</option>
												)}
											{filteredSpells
												.filter((spellOption) => {
													// Don't show spells that are already selected by other spell slots
													const isAlreadySelected = spells.some(
														(existingSpell) =>
															existingSpell.spellName === spellOption.name &&
															existingSpell.id !== spell.id
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
									<StyledSpellCell $isMobile={effectiveIsMobile}>{spell.school}</StyledSpellCell>

									{/* Duration */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{spell.duration || '-'}
									</StyledSpellCell>

									{/* AP Cost */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{spell.cost?.ap || '-'}
									</StyledSpellCell>

									{/* MP Cost */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{spell.cost?.mp || '-'}
									</StyledSpellCell>

									{/* Range */}
									<StyledSpellCell $isMobile={effectiveIsMobile}></StyledSpellCell>
								</StyledSpellRow>

								{/* Expandable Description Section */}
								{selectedSpell && expandedSpells.has(spell.id) && (
									<StyledSpellDescriptionContainer $isMobile={effectiveIsMobile}>
										{/* Spell Name Header */}
										<StyledSpellDescriptionHeader $isMobile={effectiveIsMobile}>
											{selectedSpell.name}
										</StyledSpellDescriptionHeader>

										<StyledSpellDescriptionContent $isMobile={effectiveIsMobile}>
											<strong>Description:</strong>
											<br />
											{selectedSpell.effects?.map((effect, effectIndex) => (
												<StyledSpellEffect key={effectIndex} $isMobile={effectiveIsMobile}>
													{effect.title && <strong>{effect.title}:</strong>}
													<br />
													{effect.description}
												</StyledSpellEffect>
											)) || 'No description available.'}

											{selectedSpell.spellPassive && (
												<>
													<br />
													<strong>Spell Passive:</strong> {selectedSpell.spellPassive}
												</>
											)}

											{selectedSpell.enhancements?.length > 0 && (
												<>
													<br />
													<br />
													<strong>Enhancements:</strong>
													{selectedSpell.enhancements.map((enhancement, enhancementIndex) => (
														<StyledSpellEnhancement key={enhancementIndex}>
															<strong>{enhancement.name}</strong> ({enhancement.type}{' '}
															{enhancement.cost})
															<br />
															{enhancement.description}
														</StyledSpellEnhancement>
													))}
												</>
											)}
										</StyledSpellDescriptionContent>
									</StyledSpellDescriptionContainer>
								)}

								{/* Toggle Description Button */}
								{selectedSpell && (
									<StyledSpellToggleContainer>
										<StyledSpellToggleButton
											onClick={() => toggleSpellExpansion(spell.id)}
											data-testid={`toggle-spell-desc-${spell.id}`}
										>
											{expandedSpells.has(spell.id) ? 'Hide Description' : 'Show Description'}
										</StyledSpellToggleButton>
									</StyledSpellToggleContainer>
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
