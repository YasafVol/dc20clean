import React, { useState, useMemo } from 'react';
import type { ManeuverData } from '../../../types';
import type { Maneuver } from '../../../lib/rulesdata/maneuvers';
import { maneuvers as allManeuvers } from '../../../lib/rulesdata/martials/maneuvers';
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
	StyledSpellCell
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
	
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [expandedManeuvers, setExpandedManeuvers] = useState<Set<string>>(() => {
		const expanded = new Set<string>();
		// Start with all maneuvers collapsed
		return expanded;
	});

	console.log('🔍 Maneuvers component received:', {
		maneuversCount: maneuvers.length,
		maneuvers: maneuvers.map((m) => ({ id: m.id, name: m.name, type: m.type }))
	});

	// Filter maneuvers based on selected type
	const filteredManeuvers = useMemo(() => {
		if (typeFilter === 'all') {
			return allManeuvers;
		}
		return allManeuvers.filter((maneuver) => maneuver.type === typeFilter);
	}, [typeFilter]);

	// Filter character's maneuvers based on selected type
	const filteredCharacterManeuvers = useMemo(() => {
		if (typeFilter === 'all') {
			return maneuvers;
		}
		return maneuvers.filter(maneuver => {
			// Show maneuvers that match the selected type, or empty maneuvers (for adding new ones)
			return !maneuver.name || maneuver.type === typeFilter;
		});
	}, [maneuvers, typeFilter]);

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
		const maneuverToUpdate = maneuvers[index];
		if (!maneuverToUpdate) return;

		if (field === 'name' && value) {
			// When maneuver is selected, populate all fields from maneuver data
			const selectedManeuver = allManeuvers.find(maneuver => maneuver.name === value);
			if (selectedManeuver) {
				const updatedManeuver: ManeuverData = {
					...maneuverToUpdate,
					name: selectedManeuver.name,
					type: selectedManeuver.type,
					cost: selectedManeuver.cost,
					description: selectedManeuver.description,
					isReaction: selectedManeuver.isReaction
				};
				// Remove old and add updated
				removeManeuver(maneuverToUpdate.id);
				addManeuver(updatedManeuver);
			}
		} else {
			const updatedManeuver = { ...maneuverToUpdate, [field]: value };
			// Remove old and add updated
			removeManeuver(maneuverToUpdate.id);
			addManeuver(updatedManeuver);
		}
	};

	const toggleManeuverExpansion = (maneuverId: string) => {
		setExpandedManeuvers((prev) => {
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
		const types = new Set(allManeuvers.map((maneuver) => maneuver.type));
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
								{getUniqueTypes().map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</StyledSchoolFilter>
							<StyledAddSpellButton onClick={addManeuverSlot}>+ Add Maneuver</StyledAddSpellButton>
						</>
					)}
				</StyledSpellsControls>
			</StyledSpellsHeader>

			<StyledSpellsContainer>
				<StyledSpellsHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledHeaderColumn>Maneuver</StyledHeaderColumn>
					<StyledHeaderColumn>Type</StyledHeaderColumn>
					<StyledHeaderColumn>Cost</StyledHeaderColumn>
					<StyledHeaderColumn>Timing</StyledHeaderColumn>
				</StyledSpellsHeaderRow>

				{filteredCharacterManeuvers.length === 0 ? (
					<StyledEmptyState>
						{typeFilter !== 'all' 
							? `No ${typeFilter} maneuvers found. ${readOnly ? '' : 'Click "Add Maneuver" to add maneuvers to your character.'}`
							: readOnly ? 'No maneuvers selected' : 'No maneuvers added yet. Click "Add Maneuver" to get started.'
						}
					</StyledEmptyState>
				) : (
					filteredCharacterManeuvers.map((maneuver) => {
						// Get the original index for update operations
						const originalIndex = maneuvers.findIndex(m => m.id === maneuver.id);
						const selectedManeuver = maneuver.name ? 
							allManeuvers.find(m => m.name === maneuver.name) : null;
							
						return (
							<React.Fragment key={maneuver.id}>
								<StyledSpellRow>
									{/* Remove Button - only show in edit mode */}
									{!readOnly && (
										<StyledRemoveButton onClick={() => removeManeuverSlot(originalIndex)}>
											×
										</StyledRemoveButton>
									)}

									{/* Maneuver Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly ? (
										<StyledSpellCell 
											style={{ fontWeight: 'bold', color: '#2c3e50', cursor: 'pointer' }}
											onClick={() => {
												if (selectedManeuver) onManeuverClick(selectedManeuver);
											}}
										>
											{maneuver.name || 'Unknown Maneuver'}
										</StyledSpellCell>
									) : (
										<StyledSpellSelect
											value={maneuver.name || ''}
											onChange={(e) => updateManeuver(originalIndex, 'name', e.target.value)}
										>
											<option value="">Select Maneuver...</option>
											{/* Always include the currently selected maneuver, even if it doesn't match filter */}
											{maneuver.name && !filteredManeuvers.find(m => m.name === maneuver.name) && (
												<option key={maneuver.name} value={maneuver.name}>
													{maneuver.name}
												</option>
											)}
											{filteredManeuvers
												.filter(maneuverOption => {
													// Don't show maneuvers that are already selected by other maneuver slots
													const isAlreadySelected = maneuvers.some(existingManeuver => 
														existingManeuver.name === maneuverOption.name && existingManeuver.id !== maneuver.id
													);
													return !isAlreadySelected;
												})
												.map(m => (
													<option key={m.name} value={m.name}>{m.name}</option>
												))}
										</StyledSpellSelect>
									)}

									{/* Type */}
									<StyledSpellCell>{maneuver.type || '-'}</StyledSpellCell>

									{/* Cost */}
									<StyledSpellCell>{maneuver.cost?.ap ? `${maneuver.cost.ap} AP` : '-'}</StyledSpellCell>

									{/* Range/Reaction */}
									<StyledSpellCell style={{ fontSize: '0.7rem' }}>
										{selectedManeuver?.isReaction ? 'Reaction' : 'Action'}
									</StyledSpellCell>
								</StyledSpellRow>

								{/* Expandable Description Section */}
								{selectedManeuver && expandedManeuvers.has(maneuver.id) && (
									<div style={{
										backgroundColor: '#f8f9fa',
										padding: '15px',
										border: '1px solid #e9ecef',
										borderTop: 'none',
										borderRadius: '0 0 5px 5px',
										marginBottom: '10px'
									}}>
										<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
											<strong style={{ color: '#8b4513' }}>Description:</strong>
											<button
												onClick={() => toggleManeuverExpansion(maneuver.id)}
												style={{
													background: 'none',
													border: '1px solid #8b4513',
													color: '#8b4513',
													padding: '2px 8px',
													borderRadius: '3px',
													cursor: 'pointer',
													fontSize: '0.7rem'
												}}
											>
												Hide Description
											</button>
										</div>
										
										{/* Main Description */}
										<div style={{ marginBottom: '15px', lineHeight: '1.4' }}>
											<strong>{selectedManeuver.name}:</strong><br />
											{selectedManeuver.description}
										</div>

										{/* Requirements */}
										{selectedManeuver.requirement && (
											<div style={{ marginBottom: '10px' }}>
												<strong style={{ color: '#8b4513' }}>Requirements:</strong> {selectedManeuver.requirement}
											</div>
										)}

										{/* Trigger */}
										{selectedManeuver.trigger && (
											<div style={{ marginBottom: '10px' }}>
												<strong style={{ color: '#8b4513' }}>Trigger:</strong> {selectedManeuver.trigger}
											</div>
										)}
									</div>
								)}

								{/* Show Description Button (when collapsed) */}
								{selectedManeuver && !expandedManeuvers.has(maneuver.id) && (
									<div style={{
										textAlign: 'center',
										padding: '5px',
										backgroundColor: '#f8f9fa',
										border: '1px solid #e9ecef',
										borderTop: 'none',
										borderRadius: '0 0 5px 5px',
										marginBottom: '10px'
									}}>
										<button
											onClick={() => toggleManeuverExpansion(maneuver.id)}
											style={{
												background: 'none',
												border: '1px solid #8b4513',
												color: '#8b4513',
												padding: '2px 8px',
												borderRadius: '3px',
												cursor: 'pointer',
												fontSize: '0.7rem'
											}}
										>
											Show Description
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

export default Maneuvers;
