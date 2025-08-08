import React, { useState, useMemo } from 'react';
import type { SpellData, CharacterSheetData } from '../../../types';
import type { Spell } from '../../../lib/rulesdata/spells-data/types/spell.types';
import { allSpells } from '../../../lib/rulesdata/spells-data/spells';
import { SpellSchool } from '../../../lib/rulesdata/spells-data/types/spell.types';
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
	spells: SpellData[];
	setSpells: React.Dispatch<React.SetStateAction<SpellData[]>>;
	characterData: CharacterSheetData;
	onSpellClick: (spell: Spell) => void;
}

const Spells: React.FC<SpellsProps> = ({ spells, setSpells, characterData, onSpellClick }) => {
	const [schoolFilter, setSchoolFilter] = useState<string>('all');

	// Filter spells based on selected school
	const filteredSpells = useMemo(() => {
		if (schoolFilter === 'all') {
			return allSpells;
		}
		return allSpells.filter(spell => spell.school === schoolFilter);
	}, [schoolFilter]);

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
		setSpells((prev) => [...prev, newSpell]);
	};

	const removeSpellSlot = (spellIndex: number) => {
		setSpells((prev) => prev.filter((_, index) => index !== spellIndex));
	};

	const updateSpell = (index: number, field: keyof SpellData, value: any) => {
		setSpells((prev) => {
			const updated = [...prev];
			if (field === 'spellName' && value) {
				// When spell is selected, populate all fields from spell data
				const selectedSpell = allSpells.find(spell => spell.name === value);
				if (selectedSpell) {
					updated[index] = {
						...updated[index],
						spellName: selectedSpell.name,
						school: selectedSpell.school,
						isCantrip: selectedSpell.isCantrip,
						cost: selectedSpell.cost,
						range: selectedSpell.range,
						duration: selectedSpell.duration
					};
				}
			} else {
				updated[index] = { ...updated[index], [field]: value };
			}
			return updated;
		});
	};

	const handleSchoolFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSchoolFilter(event.target.value);
	};

	return (
		<StyledSpellsSection>
			<StyledSpellsHeader>
				<StyledSpellsTitle>Spells</StyledSpellsTitle>
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
					<StyledAddSpellButton onClick={addSpellSlot}>+ Add Spell</StyledAddSpellButton>
				</StyledSpellsControls>
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
					<StyledHeaderColumn>
						<StyledInfoIcon title="Spell details and description">i</StyledInfoIcon>
					</StyledHeaderColumn>
				</StyledSpellsHeaderRow>

				{spells.length === 0 ? (
					<StyledEmptyState>
						No spells selected. Click "Add Spell" to add spells to your character.
					</StyledEmptyState>
				) : (
					spells.map((spell, index) => {
						// Get the selected spell details for info display
						const selectedSpell = spell.spellName ? 
							allSpells.find(s => s.name === spell.spellName) : null;
							
						return (
							<StyledSpellRow key={spell.id}>
								{/* Remove Button */}
								<StyledRemoveButton onClick={() => removeSpellSlot(index)}>
									×
								</StyledRemoveButton>

								{/* Spell Name Dropdown */}
								<StyledSpellSelect
									value={spell.spellName}
									onChange={(e) => updateSpell(index, 'spellName', e.target.value)}
								>
									<option value="">Select Spell...</option>
									{filteredSpells.map((spellOption) => (
										<option key={spellOption.name} value={spellOption.name}>
											{spellOption.name}
										</option>
									))}
								</StyledSpellSelect>

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

								{/* Spell Info */}
								<StyledSpellCell style={{ fontSize: '0.6rem', textAlign: 'center' }}>
									{selectedSpell ? (
										<StyledInfoIcon onClick={() => onSpellClick(selectedSpell)}>
											i
										</StyledInfoIcon>
									) : (
										'-'
									)}
								</StyledSpellCell>
							</StyledSpellRow>
						);
					})
				)}
			</StyledSpellsContainer>
		</StyledSpellsSection>
	);
};

export default Spells;
