import React, { useState, useMemo } from 'react';
import type { ManeuverData, CharacterSheetData } from '../../../types';
import type { Maneuver } from '../../../lib/rulesdata/maneuvers';
import { maneuvers as allManeuvers } from '../../../lib/rulesdata/maneuvers';
import { useCharacterManeuvers, useCharacterSheet } from '../hooks/CharacterSheetProvider';
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

export interface ManeuversProps {
	onManeuverClick: (maneuver: Maneuver) => void;
	readOnly?: boolean;
}

const Maneuvers: React.FC<ManeuversProps> = ({ onManeuverClick, readOnly = false }) => {
	const { addManeuver, removeManeuver, state } = useCharacterSheet();
	const maneuvers = useCharacterManeuvers();
	
	if (!state.character) {
		return <div>Loading maneuvers...</div>;
	}
	
	const characterData = state.character;
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [expandedManeuvers, setExpandedManeuvers] = useState<Set<string>>(() => {
		const expanded = new Set<string>();
		// Expand all maneuvers by default
		maneuvers.forEach(maneuver => {
			expanded.add(maneuver.id);
		});
		return expanded;
	});

	console.log('🔍 Maneuvers component received:', {
		maneuversCount: maneuvers.length,
		maneuvers: maneuvers.map(m => ({ id: m.id, name: m.name, type: m.type }))
	});

	// Filter maneuvers based on selected type
	const filteredManeuvers = useMemo(() => {
		if (typeFilter === 'all') {
			return allManeuvers;
		}
		return allManeuvers.filter(maneuver => maneuver.type === typeFilter);
	}, [typeFilter]);

	const addManeuverSlot = () => {
		const newManeuver: ManeuverData = {
			id: `maneuver_${Date.now()}`,
			name: '',
			type: 'Attack',
			cost: { ap: 0 },
			description: '',
			isReaction: false,
			notes: ''
		};
		addManeuver(newManeuver);
	};

	const removeManeuverSlot = (maneuverIndex: number) => {
		const maneuverToRemove = maneuvers[maneuverIndex];
		if (maneuverToRemove) {
			removeManeuver(maneuverToRemove.id);
		}
	};

	const updateManeuver = (index: number, field: keyof ManeuverData, value: any) => {
		setManeuvers((prev) => {
			const updated = [...prev];
			if (field === 'name' && value) {
				// When maneuver is selected, populate all fields from maneuver data
				const selectedManeuver = allManeuvers.find(maneuver => maneuver.name === value);
				if (selectedManeuver) {
					updated[index] = {
						...updated[index],
						name: selectedManeuver.name,
						type: selectedManeuver.type,
						cost: selectedManeuver.cost,
						description: selectedManeuver.description,
						isReaction: selectedManeuver.isReaction
					};
				}
			} else {
				updated[index] = { ...updated[index], [field]: value };
			}
			return updated;
		});
	};

	const toggleManeuverExpansion = (maneuverId: string) => {
		setExpandedManeuvers(prev => {
			const newSet = new Set(prev);
			if (newSet.has(maneuverId)) {
				newSet.delete(maneuverId);
			} else {
				newSet.add(maneuverId);
			}
			return newSet;
		});
	};

	const getUniqueTypes = () => {
		const types = new Set(allManeuvers.map(maneuver => maneuver.type));
		return Array.from(types).sort();
	};

	return (
		<StyledSpellsSection>
			<StyledSpellsHeader>
				<StyledSpellsTitle>Maneuvers</StyledSpellsTitle>
				<StyledSpellsControls>
					{!readOnly && (
						<>
							<StyledSchoolFilter
								value={typeFilter}
								onChange={(e) => setTypeFilter(e.target.value)}
							>
								<option value="all">All Types</option>
								{getUniqueTypes().map(type => (
									<option key={type} value={type}>{type}</option>
								))}
							</StyledSchoolFilter>
							<StyledAddSpellButton onClick={addManeuverSlot}>
								+ Add Maneuver
							</StyledAddSpellButton>
						</>
					)}
				</StyledSpellsControls>
			</StyledSpellsHeader>

			<StyledSpellsContainer>
				{maneuvers.length === 0 ? (
					<StyledEmptyState>
						{readOnly ? 'No maneuvers selected' : 'No maneuvers added yet. Click "Add Maneuver" to get started.'}
					</StyledEmptyState>
				) : (
					<>
						<StyledSpellsHeaderRow>
							<StyledHeaderColumn>Maneuver</StyledHeaderColumn>
							<StyledHeaderColumn>Type</StyledHeaderColumn>
							<StyledHeaderColumn>Cost</StyledHeaderColumn>
							<StyledHeaderColumn>Description</StyledHeaderColumn>
							{!readOnly && <StyledHeaderColumn>Actions</StyledHeaderColumn>}
						</StyledSpellsHeaderRow>

						{maneuvers.map((maneuver, index) => (
							<StyledSpellRow key={maneuver.id}>
								<StyledSpellCell>
									{readOnly ? (
										<span onClick={() => {
											const fullManeuver = allManeuvers.find(m => m.name === maneuver.name);
											if (fullManeuver) onManeuverClick(fullManeuver);
										}} style={{ cursor: 'pointer', color: '#2563eb' }}>
											{maneuver.name || 'Unnamed Maneuver'}
										</span>
									) : (
										<StyledSpellSelect
											value={maneuver.name || ''}
											onChange={(e) => updateManeuver(index, 'name', e.target.value)}
										>
											<option value="">Select a maneuver...</option>
											{filteredManeuvers.map(m => (
												<option key={m.name} value={m.name}>{m.name}</option>
											))}
										</StyledSpellSelect>
									)}
								</StyledSpellCell>
								<StyledSpellCell>{maneuver.type || '-'}</StyledSpellCell>
								<StyledSpellCell>{maneuver.cost?.ap ? `${maneuver.cost.ap} AP` : '-'}</StyledSpellCell>
								<StyledSpellCell>
									{maneuver.description ? (
										<div>
											<span 
												onClick={() => toggleManeuverExpansion(maneuver.id)}
												style={{ cursor: 'pointer', color: '#2563eb' }}
											>
												{expandedManeuvers.has(maneuver.id) ? '▼' : '▶'} 
												{maneuver.description.length > 50 
													? `${maneuver.description.substring(0, 50)}...` 
													: maneuver.description
												}
											</span>
											{expandedManeuvers.has(maneuver.id) && (
												<div style={{ marginTop: '5px', fontSize: '0.9em', color: '#666' }}>
													{maneuver.description}
												</div>
											)}
										</div>
									) : '-'}
								</StyledSpellCell>
								{!readOnly && (
									<StyledSpellCell>
										<StyledRemoveButton onClick={() => removeManeuverSlot(index)}>
											Remove
										</StyledRemoveButton>
									</StyledSpellCell>
								)}
							</StyledSpellRow>
						))}
					</>
				)}
			</StyledSpellsContainer>
		</StyledSpellsSection>
	);
};

export default Maneuvers;
