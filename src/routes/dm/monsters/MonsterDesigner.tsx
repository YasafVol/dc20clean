/**
 * Monster Designer Page
 *
 * Main editor for creating and editing monsters.
 * Uses MonsterBuilderProvider for state management.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useMonster, useMonsterMutations } from '../../../lib/hooks/useMonsters';
import { MonsterBuilderProvider, useMonsterBuilder } from '../../../lib/hooks/useMonsterBuilder';
import { MONSTER_TIERS, type MonsterTier } from '../../../lib/rulesdata/schemas/monster.schema';
import {
	getAllMonsterLevels,
	getLevelDisplayName
} from '../../../lib/rulesdata/dm/monsterStatistics';
import { StatPreview, RoleSelector, FeaturePointBuy, ActionBuilder } from './components';
import {
	PageContainer,
	Header,
	HeaderContent,
	HeaderLeft,
	HeaderRight,
	Title,
	MainContent,
	DesignerContainer,
	DesignerMain,
	DesignerSidebar,
	Section,
	SectionHeader,
	SectionTitle,
	SectionContent,
	FormRow,
	FormGroup,
	FormLabel,
	ValidationList,
	ValidationItem,
	ValidationIcon
} from './styles/MonsterStyles';

const LEVELS = getAllMonsterLevels();

const MonsterDesignerContent: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isNew = id === 'new';

	const { monster: existingMonster, isLoading: isLoadingMonster } = useMonster(
		isNew ? null : (id ?? null)
	);
	const { createMonster, updateMonster } = useMonsterMutations();

	const {
		state,
		setName,
		setDescription,
		setLevel,
		setTier,
		setRole,
		addFeature,
		removeFeature,
		addAction,
		updateAction,
		removeAction,
		loadMonster,
		dispatch
	} = useMonsterBuilder();

	const [isSaving, setIsSaving] = useState(false);

	// Load existing monster
	useEffect(() => {
		if (existingMonster && !isNew) {
			loadMonster(existingMonster);
		}
	}, [existingMonster, isNew, loadMonster]);

	const handleSave = async () => {
		if (!state.isValid) {
			alert('Please fix validation errors before saving.');
			return;
		}

		setIsSaving(true);
		try {
			if (isNew) {
				await createMonster(state.monster);
				navigate(`/dm/monsters/${state.monster.id}`, { replace: true });
			} else {
				await updateMonster(state.monster.id, state.monster);
			}
			dispatch({ type: 'MARK_SAVED' });
		} catch (error) {
			console.error('Failed to save monster:', error);
			alert('Failed to save monster. Please try again.');
		} finally {
			setIsSaving(false);
		}
	};

	const handleBack = () => {
		if (state.isDirty && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
			return;
		}
		navigate('/dm/monsters');
	};

	const handleFeatureChange = (featureIds: string[]) => {
		// Determine added/removed features
		const currentIds = new Set(state.monster.featureIds);
		const newIds = new Set(featureIds);

		for (const id of featureIds) {
			if (!currentIds.has(id)) {
				addFeature(id);
			}
		}
		for (const id of state.monster.featureIds) {
			if (!newIds.has(id)) {
				removeFeature(id);
			}
		}
	};

	const handleActionsChange = (actions: typeof state.monster.actions) => {
		// For simplicity, replace all actions
		// In a real implementation, you'd diff and dispatch individual actions
		const currentActions = state.monster.actions;

		// Remove actions not in new list
		for (const action of currentActions) {
			if (!actions.find((a) => a.id === action.id)) {
				removeAction(action.id);
			}
		}

		// Add/update actions in new list
		for (const action of actions) {
			const existing = currentActions.find((a) => a.id === action.id);
			if (!existing) {
				addAction(action);
			} else if (JSON.stringify(existing) !== JSON.stringify(action)) {
				updateAction(action.id, action);
			}
		}
	};

	if (!isNew && isLoadingMonster) {
		return (
			<PageContainer>
				<MainContent>
					<div className="py-12 text-center text-zinc-500">Loading monster...</div>
				</MainContent>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<Header>
				<HeaderContent>
					<HeaderLeft>
						<Button variant="secondary" onClick={handleBack}>
							← Back
						</Button>
						<Title>{isNew ? 'Create Monster' : 'Edit Monster'}</Title>
					</HeaderLeft>
					<HeaderRight>
						{state.isDirty && <span className="text-xs text-amber-400">Unsaved changes</span>}
						<Button variant="secondary" onClick={handleSave} disabled={!state.isValid || isSaving}>
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
					</HeaderRight>
				</HeaderContent>
			</Header>

			<MainContent>
				<DesignerContainer>
					{/* Main Editor */}
					<DesignerMain>
						{/* Basic Info */}
						<Section>
							<SectionHeader>
								<SectionTitle>Basic Info</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<FormRow>
									<FormGroup $flex={2}>
										<FormLabel>Name</FormLabel>
										<input
											type="text"
											value={state.monster.name}
											onChange={(e) => setName(e.target.value)}
											className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
											placeholder="Monster name"
										/>
									</FormGroup>
									<FormGroup>
										<FormLabel>Level</FormLabel>
										<select
											value={state.monster.level}
											onChange={(e) => setLevel(parseInt(e.target.value, 10))}
											className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										>
											{LEVELS.map((level) => (
												<option key={level} value={level}>
													{getLevelDisplayName(level)}
												</option>
											))}
										</select>
									</FormGroup>
									<FormGroup>
										<FormLabel>Tier</FormLabel>
										<select
											value={state.monster.tier}
											onChange={(e) => setTier(e.target.value as MonsterTier)}
											className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										>
											{MONSTER_TIERS.map((tier) => (
												<option key={tier} value={tier}>
													{tier.charAt(0).toUpperCase() + tier.slice(1)}
												</option>
											))}
										</select>
									</FormGroup>
								</FormRow>
								<FormGroup>
									<FormLabel>Description (optional)</FormLabel>
									<textarea
										value={state.monster.description ?? ''}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full resize-none rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
										rows={2}
										placeholder="Describe your monster..."
									/>
								</FormGroup>
							</SectionContent>
						</Section>

						{/* Role Selection */}
						<Section>
							<SectionHeader>
								<SectionTitle>Role</SectionTitle>
							</SectionHeader>
							<SectionContent>
								<RoleSelector value={state.monster.roleId} onChange={setRole} />
							</SectionContent>
						</Section>

						{/* Features */}
						<Section>
							<SectionHeader>
								<SectionTitle>Features</SectionTitle>
							</SectionHeader>
							<FeaturePointBuy
								selectedIds={state.monster.featureIds}
								maxPoints={state.monster.featurePointsMax}
								onChange={handleFeatureChange}
							/>
						</Section>

						{/* Actions */}
						<Section>
							<SectionHeader>
								<SectionTitle>Actions</SectionTitle>
							</SectionHeader>
							<ActionBuilder
								actions={state.monster.actions}
								baseDamage={state.monster.finalBaseDamage}
								onChange={handleActionsChange}
							/>
						</Section>
					</DesignerMain>

					{/* Sidebar */}
					<DesignerSidebar>
						{/* Stat Preview */}
						<StatPreview monster={state.monster} />

						{/* Validation */}
						{(state.errors.length > 0 || state.warnings.length > 0) && (
							<Section>
								<SectionHeader>
									<SectionTitle>Validation</SectionTitle>
								</SectionHeader>
								<SectionContent>
									<ValidationList>
										{state.errors.map((error, i) => (
											<ValidationItem key={`error-${i}`} $type="error">
												<ValidationIcon>✕</ValidationIcon>
												{error}
											</ValidationItem>
										))}
										{state.warnings.map((warning, i) => (
											<ValidationItem key={`warning-${i}`} $type="warning">
												<ValidationIcon>⚠</ValidationIcon>
												{warning}
											</ValidationItem>
										))}
									</ValidationList>
								</SectionContent>
							</Section>
						)}
					</DesignerSidebar>
				</DesignerContainer>
			</MainContent>
		</PageContainer>
	);
};

/**
 * Monster Designer with Provider wrapper
 */
export const MonsterDesigner: React.FC = () => {
	return (
		<MonsterBuilderProvider>
			<MonsterDesignerContent />
		</MonsterBuilderProvider>
	);
};

export default MonsterDesigner;
