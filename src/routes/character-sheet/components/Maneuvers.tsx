import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ManeuverData } from '../../../types';
import type { Maneuver } from '../../../lib/rulesdata/martials/maneuvers';
import { maneuvers as allManeuvers } from '../../../lib/rulesdata/martials/maneuvers';
import {
	formatManeuverCost,
	formatManeuverEnhancementCost
} from '../../../lib/rulesdata/martials/maneuverFormatting';
import {
	useCharacterCalculatedData,
	useCharacterManeuvers,
	useCharacterSheet
} from '../hooks/CharacterSheetProvider';
import { calculateEnhancementStaminaSpend } from '../maneuverEnhancementSpend';
import { logger } from '../../../lib/utils/logger';
import DeleteButton from './shared/DeleteButton';
import RichDescription from './RichDescription';
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
	StyledAddManeuverButton,
	StyledManeuverDescriptionContainer,
	StyledManeuverDescriptionHeader,
	StyledManeuverDescriptionLabel,
	StyledManeuverDescriptionText,
	StyledManeuverMetaInfo,
	StyledManeuverEnhancement,
	StyledManeuverEnhancementCost,
	StyledManeuverEnhancementHeader,
	StyledManeuverEnhancements,
	StyledClickableNameCell,
	StyledTimingCell,
	StyledManeuverActions,
	StyledManeuverActionButton
} from '../styles/Maneuvers.styles';

const expandedManeuverSessionState = new Map<string, Set<string>>();

export interface ManeuversProps {
	onManeuverClick: (maneuver: Maneuver) => void;
	onManeuverUse?: (maneuver: ManeuverData) => void;
	readOnly?: boolean;
	isMobile?: boolean;
}

const Maneuvers: React.FC<ManeuversProps> = ({
	onManeuverClick: _onManeuverClick,
	onManeuverUse,
	readOnly = false,
	isMobile
}) => {
	const { t } = useTranslation();
	const { addManeuver, removeManeuver, state } = useCharacterSheet();
	const maneuvers = useCharacterManeuvers();
	const calculation = useCharacterCalculatedData();

	if (!state.character) {
		return <div>{t('characterSheet.maneuversLoading')}</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const expansionSessionKey = state.character.id;
	const [expandedManeuvers, setExpandedManeuvers] = useState<Set<string>>(() => {
		const cached = expandedManeuverSessionState.get(expansionSessionKey);
		if (!cached) return new Set();
		const currentManeuverIds = new Set(maneuvers.map((maneuver) => maneuver.id));
		return new Set([...cached].filter((maneuverId) => currentManeuverIds.has(maneuverId)));
	});
	const [editingManeuverIds, setEditingManeuverIds] = useState<Set<string>>(new Set());
	const [declaredEnhancements, setDeclaredEnhancements] = useState<
		Record<string, Record<string, number>>
	>({});

	useEffect(() => {
		expandedManeuverSessionState.set(expansionSessionKey, new Set(expandedManeuvers));
	}, [expandedManeuvers, expansionSessionKey]);

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
			range: '',
			isReaction: false,
			enhancements: [],
			notes: ''
		};
		addManeuver(newManeuver);
		setEditingManeuverIds((prev) => new Set(prev).add(newManeuver.id));
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
					range: selectedManeuver.range,
					description: selectedManeuver.description,
					isReaction: selectedManeuver.isReaction,
					trigger: selectedManeuver.trigger,
					enhancements: selectedManeuver.enhancements
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

	const handleManeuverRowClick = (event: React.MouseEvent<HTMLDivElement>, maneuverId: string) => {
		const target = event.target as HTMLElement;
		if (target.closest('button, select, input, textarea, a')) return;
		toggleManeuverExpansion(maneuverId);
	};

	const toggleManeuverEditing = (maneuverId: string) => {
		setEditingManeuverIds((prev) => {
			const next = new Set(prev);
			if (next.has(maneuverId)) {
				next.delete(maneuverId);
			} else {
				next.add(maneuverId);
			}
			return next;
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
								+ {t('characterSheet.maneuversAddManeuver')}
							</StyledAddManeuverButton>
						</>
					)}
				</StyledManeuversControls>
			</StyledManeuversHeader>

			<StyledManeuversContainer $isMobile={effectiveIsMobile}>
				<StyledManeuversHeaderRow $isMobile={effectiveIsMobile}>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.maneuversColumnName')}
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.maneuversColumnType')}
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.maneuversColumnCost')}
					</StyledManeuverHeaderColumn>
					<StyledManeuverHeaderColumn $isMobile={effectiveIsMobile}>
						{t('characterSheet.maneuversColumnTiming')}
					</StyledManeuverHeaderColumn>
					<span aria-hidden="true" />
				</StyledManeuversHeaderRow>

				{filteredCharacterManeuvers.length === 0 ? (
					<StyledManeuverEmptyState $isMobile={effectiveIsMobile}>
						{typeFilter !== 'all'
							? t('characterSheet.maneuversNoManeuversFilter', {
									type: typeFilter,
									action: readOnly ? '' : t('characterSheet.maneuversClickToAdd')
								})
							: readOnly
								? ''
								: t('characterSheet.maneuversNoManeuvers')}
					</StyledManeuverEmptyState>
				) : (
					filteredCharacterManeuvers.map((maneuver) => {
						// Get the original index for update operations
						const originalIndex = maneuvers.findIndex((m) => m.id === maneuver.id);
						const selectedManeuver = maneuver.name
							? allManeuvers.find((m) => m.name === maneuver.name || m.id === maneuver.id)
							: null;
						const maneuverDetails = selectedManeuver ?? maneuver;
						const maneuverEnhancements = maneuverDetails.enhancements ?? [];
						const isEditing = editingManeuverIds.has(maneuver.id);
						const enhancementCounts = declaredEnhancements[maneuver.id] ?? {};
						const enhancementSpend = calculateEnhancementStaminaSpend(
							maneuverEnhancements,
							enhancementCounts
						);
						const staminaSpendLimit = calculation?.stats.staminaSpendLimit ?? 0;
						const spendValid = enhancementSpend <= staminaSpendLimit;

						return (
							<React.Fragment key={maneuver.id}>
								<StyledManeuverRow
									$isMobile={effectiveIsMobile}
									data-testid={`maneuver-row-${maneuver.id}`}
									aria-expanded={expandedManeuvers.has(maneuver.id)}
									onClick={(event) => handleManeuverRowClick(event, maneuver.id)}
								>
									{/* Maneuver Name - show as text in read-only mode, dropdown in edit mode */}
									{readOnly || !isEditing ? (
										<StyledClickableNameCell $isMobile={effectiveIsMobile}>
											{maneuver.name || t('characterSheet.maneuversUnknownManeuver')}
										</StyledClickableNameCell>
									) : (
										<StyledManeuverSelect
											data-testid="maneuver-name"
											$isMobile={effectiveIsMobile}
											value={maneuver.name || ''}
											onChange={(e: any) => updateManeuver(originalIndex, 'name', e.target.value)}
										>
											<option value="">{t('characterSheet.maneuversSelectManeuver')}</option>
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
										{formatManeuverCost(maneuverDetails.cost)}
									</StyledManeuverCell>

									{/* Range/Reaction */}
									<StyledTimingCell $isMobile={effectiveIsMobile}>
										{maneuverDetails.isReaction
											? t('characterSheet.maneuversReaction')
											: t('characterSheet.maneuversAction')}
										{maneuverDetails.range ? ` • ${maneuverDetails.range}` : ''}
									</StyledTimingCell>

									<StyledManeuverActions>
										{!readOnly && onManeuverUse && (
											<StyledManeuverActionButton
												onClick={() => {
													onManeuverUse(maneuver);
													setDeclaredEnhancements((current) => ({
														...current,
														[maneuver.id]: {}
													}));
												}}
												disabled={!spendValid}
												title={
													spendValid
														? `Use maneuver with ${enhancementSpend} SP declared`
														: `Enhancements exceed SSL ${staminaSpendLimit}`
												}
											>
												Use
											</StyledManeuverActionButton>
										)}
										{!readOnly && (
											<StyledManeuverActionButton
												onClick={() => toggleManeuverEditing(maneuver.id)}
												aria-label={
													isEditing ? 'Finish Editing Maneuver Slot' : 'Edit Maneuver Slot'
												}
												title={isEditing ? 'Finish editing maneuver slot' : 'Edit maneuver slot'}
												data-testid={`edit-maneuver-${maneuver.id}`}
											>
												{isEditing ? <Check size={14} /> : <Pencil size={14} />}
											</StyledManeuverActionButton>
										)}
										{!readOnly && isEditing && (
											<DeleteButton
												onClick={(event) => {
													event.stopPropagation();
													removeManeuverSlot(originalIndex);
												}}
												title="Remove maneuver slot"
												$isMobile={effectiveIsMobile}
											/>
										)}
									</StyledManeuverActions>
								</StyledManeuverRow>

								{/* Expandable Description Section */}
								{maneuverDetails.name && expandedManeuvers.has(maneuver.id) && (
									<StyledManeuverDescriptionContainer $isMobile={effectiveIsMobile}>
										<StyledManeuverDescriptionHeader $isMobile={effectiveIsMobile}>
											<StyledManeuverDescriptionLabel $isMobile={effectiveIsMobile}>
												{maneuverDetails.name}
											</StyledManeuverDescriptionLabel>
											{selectedManeuver && (
												<Link
													to={`/martial-manual?maneuver=${encodeURIComponent(selectedManeuver.id)}`}
													className="text-sm font-semibold text-amber-400 hover:text-amber-300"
												>
													View full card
												</Link>
											)}
										</StyledManeuverDescriptionHeader>
										<StyledManeuverDescriptionText $isMobile={effectiveIsMobile}>
											<strong>{t('characterSheet.maneuversDescription')}:</strong>
											<br />
											<RichDescription text={maneuverDetails.description || ''} />
										</StyledManeuverDescriptionText>
										{/* Requirements */}
										{(maneuverDetails as any).requirement && (
											<StyledManeuverMetaInfo $isMobile={effectiveIsMobile}>
												<strong>{t('characterSheet.maneuversRequirements')}</strong>{' '}
												<RichDescription text={(maneuverDetails as any).requirement} />
											</StyledManeuverMetaInfo>
										)}

										{/* Trigger */}
										{maneuverDetails.trigger && (
											<StyledManeuverMetaInfo $isMobile={effectiveIsMobile}>
												<strong>{t('characterSheet.maneuversTrigger')}</strong>{' '}
												<RichDescription text={maneuverDetails.trigger} />
											</StyledManeuverMetaInfo>
										)}
										{maneuverEnhancements.length > 0 && (
											<StyledManeuverEnhancements $isMobile={effectiveIsMobile}>
												<StyledManeuverDescriptionLabel $isMobile={effectiveIsMobile}>
													Enhancements
												</StyledManeuverDescriptionLabel>
												{maneuverEnhancements.map((enhancement) => (
													<StyledManeuverEnhancement
														key={enhancement.name}
														$isMobile={effectiveIsMobile}
													>
														<StyledManeuverEnhancementHeader $isMobile={effectiveIsMobile}>
															<StyledManeuverEnhancementCost $isMobile={effectiveIsMobile}>
																{formatManeuverEnhancementCost(enhancement)}
															</StyledManeuverEnhancementCost>
															<strong>{enhancement.name}</strong>
															{enhancement.repeatable && <span>Repeatable</span>}
															<button
																type="button"
																onClick={() =>
																	setDeclaredEnhancements((current) => {
																		const counts = current[maneuver.id] ?? {};
																		const count = counts[enhancement.name] ?? 0;
																		return {
																			...current,
																			[maneuver.id]: {
																				...counts,
																				[enhancement.name]: enhancement.repeatable
																					? count + 1
																					: Number(count === 0)
																			}
																		};
																	})
																}
																className="ml-auto rounded border border-amber-500/40 px-2 py-1 text-xs"
															>
																Declare{' '}
																{enhancementCounts[enhancement.name]
																	? `×${enhancementCounts[enhancement.name]}`
																	: ''}
															</button>
														</StyledManeuverEnhancementHeader>
														<RichDescription text={enhancement.description} />
													</StyledManeuverEnhancement>
												))}
											</StyledManeuverEnhancements>
										)}
										{maneuverEnhancements.length > 0 && (
											<div
												className={`mt-2 text-sm ${spendValid ? 'text-slate-300' : 'text-red-400'}`}
											>
												Declared enhancement SP: {enhancementSpend} / SSL {staminaSpendLimit}
											</div>
										)}
									</StyledManeuverDescriptionContainer>
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
