import React, { useState, useMemo } from 'react';
import type { ManeuverData } from '../../../types';
import type { Maneuver } from '../../../lib/rulesdata/maneuvers';
import { maneuvers as allManeuvers } from '../../../lib/rulesdata/martials/maneuvers';
import { useCharacterManeuvers, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledManeuversSection,
	StyledManeuversHeader,
	StyledManeuversTitle,
	StyledManeuversControls,
	StyledManeuversContainer,
	StyledManeuversHeaderRow,
	StyledManeuverHeaderColumn,
	StyledManeuverEmptyState,
	StyledManeuverRow,
	StyledManeuverRemoveButton,
	StyledManeuverSelect,
	StyledManeuverTypeFilter,
	StyledManeuverCell,
	StyledManeuverNameCell,
	StyledAddManeuverButton
} from '../styles/Maneuvers.styles';

export interface ManeuversProps {
	onManeuverClick: (maneuver: Maneuver) => void;
	readOnly?: boolean;
	isMobile?: boolean;
}

const Maneuvers: React.FC<ManeuversProps> = ({ onManeuverClick, readOnly = false, isMobile }) => {
	const { addManeuver, removeManeuver, state } = useCharacterSheet();
	const maneuvers = useCharacterManeuvers();

	if (!state.character) {
		return <div>Loading maneuvers...</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
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
		return maneuvers.filter((maneuver) => {
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
			const selectedManeuver = allManeuvers.find((maneuver) => maneuver.name === value);
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
		<StyledManeuversSection $isMobile={effectiveIsMobile}>
			<StyledManeuversHeader $isMobile={effectiveIsMobile}>
				<StyledManeuversTitle $isMobile={effectiveIsMobile}>Maneuvers</StyledManeuversTitle>
				<StyledManeuversControls $isMobile={effectiveIsMobile}>
					{!readOnly && (
						<>
							<StyledManeuverTypeFilter
								$isMobile={effectiveIsMobile}
								value={typeFilter}
								onChange={(e: any) => setTypeFilter(e.target.value)}
							>
								<option value="all">All Types</option>
								{getUniqueTypes().map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</StyledManeuverTypeFilter>
							<StyledAddManeuverButton data-testid="add-maneuver" $isMobile={effectiveIsMobile} onClick={addManeuverSlot}>
								+ Add Maneuver
							</StyledAddManeuverButton>
						</>
					)}
				</StyledManeuversControls>
			</StyledManeuversHeader>

			<StyledManeuversContainer $isMobile={effectiveIsMobile}>
				<StyledManeuversHeaderRow $isMobile={effectiveIsMobile}>
					<span></span> {/* Empty column for remove button */}
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						Maneuver
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						Type
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						Cost
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						Timing
					</StyledManeuverHeaderColumn>
				</StyledManeuversHeaderRow>

				{filteredCharacterManeuvers.length === 0 ? (
					<StyledManeuverEmptyState $isMobile={effectiveIsMobile}>
						{typeFilter !== 'all'
							? `No ${typeFilter} maneuvers found. ${readOnly ? '' : 'Click "Add Maneuver" to add maneuvers to your character.'}`
							: readOnly
								? 'No maneuvers selected'
								: 'No maneuvers added yet. Click "Add Maneuver" to get started.'}
					</StyledManeuverEmptyState>
				) : (
					filteredCharacterManeuvers.map((maneuver) => {
						// Get the original index for update operations
						const originalIndex = maneuvers.findIndex((m) => m.id === maneuver.id);
						const selectedManeuver = maneuver.name
							? allManeuvers.find((m) => m.name === maneuver.name)
							: null;

						return (
							<React.Fragment key={maneuver.id}>
								<StyledManeuverRow $isMobile={effectiveIsMobile}>
									{/* Remove Button - only show in edit mode */}
									{ !readOnly && (
										<StyledManeuverRemoveButton
											data-testid={`remove-maneuver-${maneuver.id}`}
											$isMobile={effectiveIsMobile}
											onClick={() => removeManeuverSlot(originalIndex)}
										>
											×
										</StyledManeuverRemoveButton>
									) }

									{/* Maneuver Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly ? (
										<StyledManeuverNameCell
											$isMobile={effectiveIsMobile}
											style={{ fontWeight: 'bold', color: '#2c3e50', cursor: 'pointer' }}
											onClick={() => {
												if (selectedManeuver) onManeuverClick(selectedManeuver);
											}}
										>
											{maneuver.name || 'Unknown Maneuver'}
										</StyledManeuverNameCell>
									) : (
										<StyledManeuverSelect
											data-testid="maneuver-name"
											$isMobile={effectiveIsMobile}
											value={maneuver.name || ''}
											onChange={(e: any) => updateManeuver(originalIndex, 'name', e.target.value)}
										>
											<option value="">Select Maneuver...</option>
											{/* Always include the currently selected maneuver, even if it doesn't match filter */}
											{maneuver.name &&
												!filteredManeuvers.find((m) => m.name === maneuver.name) && (
													<option key={maneuver.name} value={maneuver.name}>
														{maneuver.name}
													</option>
												)}
											{filteredManeuvers
												.filter((maneuverOption) => {
													// Don't show maneuvers that are already selected by other maneuver slots
													const isAlreadySelected = maneuvers.some(
														(existingManeuver) =>
															existingManeuver.name === maneuverOption.name &&
															existingManeuver.id !== maneuver.id
													);
													return !isAlreadySelected;
												})
												.map((m) => (
													<option key={m.name} value={m.name}>
														{m.name}
													</option>
												))}
										</StyledManeuverSelect>
									)}

									{/* Type */}
									<StyledManeuverCell $isMobile={effectiveIsMobile}>
										{maneuver.type || '-'}
									</StyledManeuverCell>

									{/* Cost */}
									<StyledManeuverCell $isMobile={effectiveIsMobile}>
										{maneuver.cost?.ap ? `${maneuver.cost.ap} AP` : '-'}
									</StyledManeuverCell>

									{/* Range/Reaction */}
									<StyledManeuverCell $isMobile={effectiveIsMobile} style={{ fontSize: '0.7rem' }}>
										{selectedManeuver?.isReaction ? 'Reaction' : 'Action'}
									</StyledManeuverCell>
								</StyledManeuverRow>

								{/* Expandable Description Section */}
								{selectedManeuver && expandedManeuvers.has(maneuver.id) && (
									<div
										style={{
											backgroundColor: '#f8f9fa',
											padding: '15px',
											border: '1px solid #e9ecef',
											borderTop: 'none',
											borderRadius: '0 0 5px 5px',
											marginBottom: '10px'
										}}
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												marginBottom: '10px'
											}}
										>
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
											<strong>{selectedManeuver.name}:</strong>
											<br />
											{selectedManeuver.description}
										</div>

										{/* Requirements */}
										{selectedManeuver.requirement && (
											<div style={{ marginBottom: '10px' }}>
												<strong style={{ color: '#8b4513' }}>Requirements:</strong>{' '}
												{selectedManeuver.requirement}
											</div>
										)}

										{/* Trigger */}
										{selectedManeuver.trigger && (
											<div style={{ marginBottom: '10px' }}>
												<strong style={{ color: '#8b4513' }}>Trigger:</strong>{' '}
												{selectedManeuver.trigger}
											</div>
										)}
									</div>
								)}

								{/* Show Description Button (when collapsed) */}
								{selectedManeuver && !expandedManeuvers.has(maneuver.id) && (
									<div
										style={{
											textAlign: 'center',
											padding: '5px',
											backgroundColor: '#f8f9fa',
											border: '1px solid #e9ecef',
											borderTop: 'none',
											borderRadius: '0 0 5px 5px',
											marginBottom: '10px'
										}}
									>
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
			</StyledManeuversContainer>
		</StyledManeuversSection>
	);
};

export default Maneuvers;
