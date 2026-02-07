/**
 * Encounter Planner Page
 *
 * Main editor for creating and editing encounters.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEncounter, useEncounterMutations } from '../../../lib/hooks/useEncounters';
import {
	EncounterPlannerProvider,
	useEncounterPlanner
} from '../../../lib/hooks/useEncounterPlanner';
import { BudgetMeter, DifficultySelector, PartyConfigForm, MonsterSlots } from './components';
import { Button } from '../../../components/common/Button';
import {
	PageContainer,
	Header,
	HeaderContent,
	HeaderLeft,
	HeaderRight,
	Title,
	MainContent,
	PlannerContainer,
	PlannerMain,
	PlannerSidebar,
	Section,
	SectionHeader,
	SectionTitle,
	SectionContent,
	FormGroup,
	FormLabel,
	ValidationList,
	ValidationItem,
	ValidationIcon
} from './styles/EncounterStyles';

const EncounterPlannerContent: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const isNew = id === 'new';

	const { encounter: existingEncounter, isLoading: isLoadingEncounter } = useEncounter(
		isNew ? null : (id ?? null)
	);
	const { createEncounter, updateEncounter } = useEncounterMutations();

	const {
		encounter,
		isDirty,
		isValid,
		errors,
		warnings,
		budgetStatus,
		budgetPercentage,
		setName,
		setDescription,
		setPartySize,
		setPartyLevel,
		setDifficulty,
		setEnvironment,
		setGmNotes,
		addMonsterSlot,
		removeMonsterSlot,
		setSlotMonster,
		clearSlotMonster,
		setSlotQuantity,
		loadEncounter,
		dispatch
	} = useEncounterPlanner();

	const [isSaving, setIsSaving] = useState(false);

	// Load existing encounter
	useEffect(() => {
		if (existingEncounter && !isNew) {
			loadEncounter(existingEncounter);
		}
	}, [existingEncounter, isNew, loadEncounter]);

	const handleSave = async () => {
		if (errors.length > 0) {
			alert(t('dmTools.encounterPlanner.confirmDelete'));
			return;
		}

		setIsSaving(true);
		try {
			if (isNew) {
				await createEncounter(encounter);
				navigate(`/dm/encounters/${encounter.id}`, { replace: true });
			} else {
				await updateEncounter(encounter.id, encounter);
			}
			dispatch({ type: 'MARK_SAVED' });
		} catch (error) {
			console.error('Failed to save encounter:', error);
			alert('Failed to save encounter. Please try again.');
		} finally {
			setIsSaving(false);
		}
	};

	const handleBack = () => {
		if (isDirty && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
			return;
		}
		navigate('/dm/encounters');
	};

	if (!isNew && isLoadingEncounter) {
		return (
			<PageContainer>
				<MainContent>
					<div className="py-12 text-center text-zinc-500">{t('common.loading')}</div>
				</MainContent>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<Header>
				<HeaderContent>
					<HeaderLeft>
						<Button $variant="secondary" onClick={handleBack}>
						← {t('common.back')}
					</Button>
					<Title>{isNew ? t('dmTools.encounterPlanner.createEncounter') : 'Edit Encounter'}</Title>
					</HeaderLeft>
					<HeaderRight>
						{isDirty && <span className="text-xs text-amber-400">Unsaved changes</span>}
						<Button
							$variant="primary"
							onClick={handleSave}
							disabled={errors.length > 0 || isSaving}
						>
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
					</HeaderRight>
				</HeaderContent>
			</Header>

			<MainContent>
				<PlannerContainer>
					{/* Main Editor */}
					<PlannerMain>
						{/* Name & Description */}
						<Section>
							<SectionHeader>
							<SectionTitle>{t('dmTools.encounterPlanner.title')}</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<FormGroup>
								<FormLabel>{t('dmTools.monsterLab.name')}</FormLabel>
									<input
										type="text"
										value={encounter.name}
										onChange={(e) => setName(e.target.value)}
										className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										placeholder="Encounter name"
									/>
								</FormGroup>
								<FormGroup>
									<FormLabel>Description (optional)</FormLabel>
									<textarea
										value={encounter.description ?? ''}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full resize-none rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										rows={2}
										placeholder="Describe the encounter..."
									/>
								</FormGroup>
							</SectionContent>
						</Section>

						{/* Party Configuration */}
						<Section>
							<SectionHeader>
								<SectionTitle>Party</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<PartyConfigForm
									party={encounter.party}
									baseBudget={encounter.baseBudget}
									onSizeChange={setPartySize}
									onLevelChange={setPartyLevel}
								/>
							</SectionContent>
						</Section>

						{/* Difficulty */}
						<Section>
							<SectionHeader>
							<SectionTitle>{t('dmTools.encounterPlanner.difficulty')}</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<DifficultySelector
									value={encounter.difficulty}
									party={encounter.party}
									onChange={setDifficulty}
								/>
							</SectionContent>
						</Section>

						{/* Monster Slots */}
						<Section>
							<SectionHeader>
								<SectionTitle>Monsters</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<MonsterSlots
									slots={encounter.monsters}
									onAddSlot={addMonsterSlot}
									onRemoveSlot={removeMonsterSlot}
									onSetMonster={setSlotMonster}
									onClearMonster={clearSlotMonster}
									onSetQuantity={setSlotQuantity}
								/>
							</SectionContent>
						</Section>

						{/* Notes */}
						<Section>
							<SectionHeader>
								<SectionTitle>Notes</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<FormGroup>
									<FormLabel>Environment</FormLabel>
									<input
										type="text"
										value={encounter.environment ?? ''}
										onChange={(e) => setEnvironment(e.target.value)}
										className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										placeholder="Forest clearing, dungeon room, etc."
									/>
								</FormGroup>
								<FormGroup>
									<FormLabel>GM Notes</FormLabel>
									<textarea
										value={encounter.gmNotes ?? ''}
										onChange={(e) => setGmNotes(e.target.value)}
										className="w-full resize-none rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										rows={4}
										placeholder="Tactics, traps, environmental hazards..."
									/>
								</FormGroup>
							</SectionContent>
						</Section>
					</PlannerMain>

					{/* Sidebar */}
					<PlannerSidebar>
						{/* Budget Meter */}
						<BudgetMeter
							spent={encounter.spentBudget}
							budget={encounter.adjustedBudget}
							status={budgetStatus}
							percentage={budgetPercentage}
						/>

						{/* Validation */}
						{(errors.length > 0 || warnings.length > 0) && (
							<Section>
								<SectionHeader>
									<SectionTitle>Validation</SectionTitle>
								</SectionHeader>
								<SectionContent>
									<ValidationList>
										{errors.map((error, i) => (
											<ValidationItem key={`error-${i}`} $type="error">
												<ValidationIcon>✕</ValidationIcon>
												{error}
											</ValidationItem>
										))}
										{warnings.map((warning, i) => (
											<ValidationItem key={`warning-${i}`} $type="warning">
												<ValidationIcon>⚠</ValidationIcon>
												{warning}
											</ValidationItem>
										))}
									</ValidationList>
								</SectionContent>
							</Section>
						)}
					</PlannerSidebar>
				</PlannerContainer>
			</MainContent>
		</PageContainer>
	);
};

/**
 * Encounter Planner with Provider wrapper
 */
export const EncounterPlanner: React.FC = () => {
	return (
		<EncounterPlannerProvider>
			<EncounterPlannerContent />
		</EncounterPlannerProvider>
	);
};

export default EncounterPlanner;
