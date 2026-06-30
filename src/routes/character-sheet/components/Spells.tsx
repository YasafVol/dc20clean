import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { SpellData } from '../../../types';
import type { Spell } from '../../../lib/rulesdata/schemas/spell.schema';
import { ALL_SPELLS as allSpells, getSpellById } from '../../../lib/rulesdata/spells-data';
import { RULES_ALIASES } from '../../../lib/rulesdata/versioning/aliases';
import { SpellSchool } from '../../../lib/rulesdata/schemas/spell.schema';
import { formatSpellEnhancementCost } from '../../../lib/rulesdata/spells-data/spellCost';
import { useCharacterSpells, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import { logger } from '../../../lib/utils/logger';
import DeleteButton from './shared/DeleteButton';
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
import { theme } from '../styles/theme';
import RichDescription from './RichDescription';

/** Sentinel dropdown value that switches a spell row into freeform custom mode. */
const CUSTOM_SPELL_VALUE = '__custom_spell__';

export function resolveCatalogSpell(spellName: string | null | undefined): Spell | undefined {
	const candidate = spellName?.trim();
	if (!candidate) return undefined;

	const directMatch =
		getSpellById(candidate) ??
		allSpells.find((spell) => spell.name.toLowerCase() === candidate.toLowerCase());
	if (directMatch) return directMatch;

	const spellAlias = RULES_ALIASES.find(
		(alias) =>
			alias.domain === 'spell' &&
			alias.toId &&
			alias.fromId.toLowerCase() === candidate.toLowerCase()
	);
	if (!spellAlias?.toId) return undefined;

	return (
		getSpellById(spellAlias.toId) ??
		allSpells.find((spell) => spell.name.toLowerCase() === spellAlias.toId?.toLowerCase())
	);
}

export function isCustomSpellName(spellName: string | null | undefined): boolean {
	return !!spellName?.trim() && !resolveCatalogSpell(spellName);
}

// Compact cell inputs used by custom spell rows. Sized to match the surrounding
// table cells so the row keeps the same column widths as catalog spells.
const SpellCellInput = styled.input`
	width: 100%;
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	padding: 2px 6px;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
	}
`;

const SpellDescriptionTextarea = styled.textarea`
	width: 100%;
	min-height: 80px;
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	padding: ${theme.spacing[2]};
	resize: vertical;
	font-family: inherit;

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
	}
`;

export interface SpellsProps {
	onSpellClick: (spell: Spell) => void;
	readOnly?: boolean; // New prop for read-only display
	isMobile?: boolean;
	onSpellCast?: (spell: SpellData) => void;
}

const Spells: React.FC<SpellsProps> = ({
	onSpellClick: _onSpellClick,
	readOnly = false,
	isMobile,
	onSpellCast
}) => {
	const { t } = useTranslation();
	const { addSpell, removeSpell, updateSpell, state } = useCharacterSheet();
	const spells = useCharacterSpells();

	if (!state.character) {
		return <div>{t('characterSheet.spellsLoading')}</div>;
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

	// Track which spell rows are in custom freeform mode. Re-derived from data on
	// load: any saved spell whose name doesn't match the catalog is custom.
	const [customSpellIds, setCustomSpellIds] = useState<Set<string>>(() => {
		const ids = new Set<string>();
		spells.forEach((spell) => {
			if (isCustomSpellName(spell.spellName)) {
				ids.add(spell.id);
			}
		});
		return ids;
	});

	useEffect(() => {
		setCustomSpellIds((prev) => {
			const next = new Set(prev);
			spells.forEach((spell) => {
				if (isCustomSpellName(spell.spellName)) {
					next.add(spell.id);
				}
			});
			return next;
		});
	}, [spells]);

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

		if (field === 'spellName' && value === CUSTOM_SPELL_VALUE) {
			// User picked "Custom Spell..." — flip this row into freeform mode and
			// clear any previously-selected catalog spell data.
			setCustomSpellIds((prev) => new Set(prev).add(spell.id));
			updateSpell(spell.id, 'spellName', '');
			updateSpell(spell.id, 'school', '');
			updateSpell(spell.id, 'cost', { ap: 0 });
			updateSpell(spell.id, 'range', '');
			updateSpell(spell.id, 'duration', '');
			updateSpell(spell.id, 'effects', undefined as any);
			updateSpell(spell.id, 'enhancements', undefined as any);
			updateSpell(spell.id, 'isRitual', false);
			updateSpell(spell.id, 'spellPassive', undefined as any);
			setExpandedSpells((prev) => new Set(prev).add(spell.id));
			return;
		}

		if (field === 'spellName' && value) {
			// When spell is selected, populate all fields from spell data
			const selectedSpell = resolveCatalogSpell(value);
			if (selectedSpell) {
				// Make sure we're not in custom mode anymore for this row
				setCustomSpellIds((prev) => {
					const next = new Set(prev);
					next.delete(spell.id);
					return next;
				});
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

	/** Update cost.ap / cost.mp on a spell row (keeps the cost object shape intact). */
	const updateSpellCost = (spellId: string, key: 'ap' | 'mp', value: number) => {
		const spell = spells.find((s) => s.id === spellId);
		if (!spell) return;
		const nextCost = { ...(spell.cost || { ap: 0 }), [key]: value };
		updateSpell(spellId, 'cost', nextCost);
	};

	/** Update the description text for a custom spell (uses effects[0].description). */
	const updateCustomSpellDescription = (spellId: string, description: string) => {
		updateSpell(spellId, 'effects', [{ description }] as any);
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

	const expandAll = () => {
		const allSpellIds = filteredCharacterSpells.map((spell) => spell.id);
		setExpandedSpells(new Set(allSpellIds));
	};

	const collapseAll = () => {
		setExpandedSpells(new Set());
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
							onClick={expandAll}
							style={{
								backgroundColor: '#059669',
								marginRight: '0.5rem',
								fontSize: '0.85rem',
								padding: '0.4rem 0.8rem'
							}}
							aria-label="Expand All"
						>
							▼ Expand All
						</StyledAddSpellButton>
						<StyledAddSpellButton
							$isMobile={effectiveIsMobile}
							onClick={collapseAll}
							style={{
								backgroundColor: '#dc2626',
								marginRight: '0.5rem',
								fontSize: '0.85rem',
								padding: '0.4rem 0.8rem'
							}}
							aria-label="Collapse All"
						>
							▲ Collapse All
						</StyledAddSpellButton>

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
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnName')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnSchool')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnDuration')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnAP')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnMP')}
					</StyledHeaderColumn>
					<StyledHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.spellsColumnRange')}
					</StyledHeaderColumn>
				</StyledSpellsHeaderRow>

				{filteredCharacterSpells.length === 0 ? (
					<StyledEmptyState $isMobile={effectiveIsMobile}>
						{schoolFilter !== 'all'
							? t('characterSheet.spellsNoSpellsFilter', {
									school: schoolFilter,
									action: readOnly ? '' : t('characterSheet.spellsClickToAdd')
								})
							: readOnly
								? t('characterSheet.spellsNoSpellsKnown')
								: t('characterSheet.spellsNoSpellsSelected')}
					</StyledEmptyState>
				) : (
					filteredCharacterSpells.map((spell) => {
						// Get the original index for update operations
						const originalIndex = spells.findIndex((s) => s.id === spell.id);
						// Get the selected spell details for info display
						const selectedSpell = resolveCatalogSpell(spell.spellName) ?? null;
						const isCustom = customSpellIds.has(spell.id);

						return (
							<React.Fragment key={spell.id}>
								<StyledSpellRow $isMobile={effectiveIsMobile} data-testid={`spell-row-${spell.id}`}>
									{/* Remove Button - only show in edit mode */}
									{!readOnly && (
										<DeleteButton
											onClick={() => removeSpellSlot(originalIndex)}
											$isMobile={effectiveIsMobile}
										/>
									)}

									{/* Spell Name */}
									{readOnly ? (
										<StyledBoldSpellCell $isMobile={effectiveIsMobile} $boldMobile={true}>
											{spell.spellName || 'Unknown Spell'}
										</StyledBoldSpellCell>
									) : isCustom ? (
										// Custom freeform spell — text input for the name
										<SpellCellInput
											type="text"
											value={spell.spellName}
											placeholder={t('characterSheet.spellsCustomNamePlaceholder')}
											onChange={(e) => updateSpell(spell.id, 'spellName', e.target.value)}
											autoFocus={!spell.spellName}
										/>
									) : (
										<StyledSpellSelect
											$isMobile={effectiveIsMobile}
											value={spell.spellName}
											onChange={(e) => updateSpellField(originalIndex, 'spellName', e.target.value)}
											data-testid={`spell-name-${spell.id}`}
										>
											<option value="">{t('characterSheet.spellsSelectSpell')}</option>
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
											<option value={CUSTOM_SPELL_VALUE}>
												{t('characterSheet.spellsCustomSpellOption')}
											</option>
										</StyledSpellSelect>
									)}

									{/* School */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{isCustom && !readOnly ? (
											<SpellCellInput
												type="text"
												value={spell.school}
												placeholder={t('characterSheet.spellsSchoolPlaceholder')}
												onChange={(e) => updateSpell(spell.id, 'school', e.target.value)}
											/>
										) : (
											spell.school
										)}
									</StyledSpellCell>

									{/* Duration */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{isCustom && !readOnly ? (
											<SpellCellInput
												type="text"
												value={spell.duration}
												placeholder="Instant"
												onChange={(e) => updateSpell(spell.id, 'duration', e.target.value)}
											/>
										) : (
											spell.duration || '-'
										)}
									</StyledSpellCell>

									{/* AP Cost */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{isCustom && !readOnly ? (
											<SpellCellInput
												type="number"
												min="0"
												value={spell.cost?.ap ?? 0}
												onChange={(e) =>
													updateSpellCost(spell.id, 'ap', parseInt(e.target.value) || 0)
												}
											/>
										) : (
											spell.cost?.ap || '-'
										)}
									</StyledSpellCell>

									{/* MP Cost */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{isCustom && !readOnly ? (
											<SpellCellInput
												type="number"
												min="0"
												value={spell.cost?.mp ?? 0}
												onChange={(e) =>
													updateSpellCost(spell.id, 'mp', parseInt(e.target.value) || 0)
												}
											/>
										) : (
											spell.cost?.mp || '-'
										)}
									</StyledSpellCell>

									{/* Range */}
									<StyledSpellCell $isMobile={effectiveIsMobile}>
										{isCustom && !readOnly ? (
											<SpellCellInput
												type="text"
												value={spell.range}
												placeholder="Self"
												onChange={(e) => updateSpell(spell.id, 'range', e.target.value)}
											/>
										) : (
											spell.range || ''
										)}
									</StyledSpellCell>

									{/* Cast Button */}
									{!readOnly && onSpellCast && (
										<button
											onClick={(e) => { e.stopPropagation(); onSpellCast(spell); }}
											style={{
												padding: '0.15rem 0.5rem',
												fontSize: '0.7rem',
												borderRadius: '4px',
												border: '1px solid #444',
												background: 'transparent',
												color: '#aaa',
												cursor: 'pointer',
												marginLeft: '0.5rem',
											}}
										>Cast</button>
									)}
								</StyledSpellRow>

								{/* Expandable Description Section — catalog spell */}
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
													<RichDescription text={effect.description} />
												</StyledSpellEffect>
											)) || 'No description available.'}

											{selectedSpell.spellPassive && (
												<>
													<br />
													<strong>Spell Passive:</strong>{' '}
													<RichDescription text={selectedSpell.spellPassive} />
												</>
											)}

											{selectedSpell.enhancements?.length > 0 && (
												<>
													<br />
													<br />
													<strong>Enhancements:</strong>
													{selectedSpell.enhancements.map((enhancement, enhancementIndex) => (
														<StyledSpellEnhancement key={enhancementIndex}>
															<strong>{enhancement.name}</strong> (
															{formatSpellEnhancementCost(enhancement)})
															<br />
															<RichDescription text={enhancement.description} />
														</StyledSpellEnhancement>
													))}
												</>
											)}
										</StyledSpellDescriptionContent>
									</StyledSpellDescriptionContainer>
								)}

								{/* Expandable Description Section — custom freeform spell */}
								{isCustom && expandedSpells.has(spell.id) && (
									<StyledSpellDescriptionContainer $isMobile={effectiveIsMobile}>
										<StyledSpellDescriptionHeader $isMobile={effectiveIsMobile}>
											{spell.spellName || t('characterSheet.spellsCustomHeader')}
										</StyledSpellDescriptionHeader>
										<StyledSpellDescriptionContent $isMobile={effectiveIsMobile}>
											<strong>{t('characterSheet.spellsDescriptionLabel')}</strong>
											{readOnly ? (
												<div style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
													{spell.effects?.[0]?.description || ''}
												</div>
											) : (
												<SpellDescriptionTextarea
													value={spell.effects?.[0]?.description || ''}
													placeholder={t('characterSheet.spellsCustomDescriptionPlaceholder')}
													onChange={(e) => updateCustomSpellDescription(spell.id, e.target.value)}
												/>
											)}
										</StyledSpellDescriptionContent>
									</StyledSpellDescriptionContainer>
								)}

								{/* Toggle Description Button — show for catalog and custom spells alike */}
								{(selectedSpell || isCustom) && (
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
