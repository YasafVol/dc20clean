import React, { useState, useMemo } from 'react';
import type { ManeuverData } from '../../../types';
import type { Maneuver } from '../../../lib/rulesdata/martials/maneuvers';
import { maneuvers as allManeuvers } from '../../../lib/rulesdata/martials/maneuvers';
import { useCharacterManeuvers, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import { logger } from '../../../lib/utils/logger';
import { theme } from '../styles/theme';
import DeleteButton from './shared/DeleteButton';
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
	StyledManeuverSelect,
	StyledManeuverTypeFilter,
	StyledManeuverCell,
	StyledManeuverNameCell,
	StyledAddManeuverButton,
	StyledManeuverDescriptionContainer,
	StyledManeuverDescriptionHeader,
	StyledManeuverDescriptionLabel,
	StyledManeuverToggleButton,
	StyledManeuverDescriptionText,
	StyledManeuverMetaInfo,
	StyledManeuverDescriptionCollapsed,
	StyledClickableNameCell,
	StyledTimingCell
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

	logger.debug('ui', 'Maneuvers component received', {
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

	const expandAll = () => {
		const allManeuverIds = filteredCharacterManeuvers.map((m) => m.id);
		setExpandedManeuvers(new Set(allManeuverIds));
	};

	const collapseAll = () => {
		setExpandedManeuvers(new Set());
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
							<StyledAddManeuverButton
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
							</StyledAddManeuverButton>
							<StyledAddManeuverButton
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
							</StyledAddManeuverButton>

							<StyledAddManeuverButton
								data-testid="add-maneuver"
								$isMobile={effectiveIsMobile}
								onClick={addManeuverSlot}
							>
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
									{!readOnly && (
										<DeleteButton
											onClick={() => removeManeuverSlot(originalIndex)}
											$isMobile={effectiveIsMobile}
										/>
									)}

									{/* Maneuver Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly ? (
										<StyledClickableNameCell
											$isMobile={effectiveIsMobile}
											onClick={() => {
												if (selectedManeuver) onManeuverClick(selectedManeuver);
											}}
										>
											{maneuver.name || 'Unknown Maneuver'}
										</StyledClickableNameCell>
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
									<StyledTimingCell $isMobile={effectiveIsMobile}>
										{selectedManeuver?.isReaction ? 'Reaction' : 'Action'}
									</StyledTimingCell>
								</StyledManeuverRow>

								{/* Expandable Description Section */}
								{selectedManeuver && expandedManeuvers.has(maneuver.id) && (
									<StyledManeuverDescriptionContainer $isMobile={effectiveIsMobile}>
										<StyledManeuverDescriptionHeader $isMobile={effectiveIsMobile}>
											<StyledManeuverDescriptionLabel $isMobile={effectiveIsMobile}>
												Description:
											</StyledManeuverDescriptionLabel>
											<StyledManeuverToggleButton
												$isMobile={effectiveIsMobile}
												onClick={() => toggleManeuverExpansion(maneuver.id)}
											>
												Hide Description
											</StyledManeuverToggleButton>
										</StyledManeuverDescriptionHeader>
										<StyledManeuverDescriptionText $isMobile={effectiveIsMobile}>
											<strong>{selectedManeuver.name}:</strong>
											<br />
											{selectedManeuver.description}
										</StyledManeuverDescriptionText>
										{/* Requirements */}
										{selectedManeuver.requirement && (
											<StyledManeuverMetaInfo $isMobile={effectiveIsMobile}>
												<strong>Requirements:</strong> {selectedManeuver.requirement}
											</StyledManeuverMetaInfo>
										)}

										{/* Trigger */}
										{selectedManeuver.trigger && (
											<StyledManeuverMetaInfo $isMobile={effectiveIsMobile}>
												<strong>Trigger:</strong> {selectedManeuver.trigger}
											</StyledManeuverMetaInfo>
										)}
									</StyledManeuverDescriptionContainer>
								)}

								{/* Show Description Button (when collapsed) */}
								{selectedManeuver && !expandedManeuvers.has(maneuver.id) && (
									<StyledManeuverDescriptionCollapsed $isMobile={effectiveIsMobile}>
										<StyledManeuverToggleButton
											$isMobile={effectiveIsMobile}
											onClick={() => toggleManeuverExpansion(maneuver.id)}
										>
											Show Description
										</StyledManeuverToggleButton>
									</StyledManeuverDescriptionCollapsed>
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
