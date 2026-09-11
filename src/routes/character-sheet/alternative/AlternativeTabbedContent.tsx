import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AttackData, FeatureData, InventoryItemData } from '../../../types';
import type { InventoryItem, Weapon } from '../../../lib/rulesdata/inventoryItems';
import ActiveConditionSummary from '../components/ActiveConditionSummary';
import ActiveConditionsTracker from '../components/ActiveConditionsTracker';
import AttackPopup from '../components/AttackPopup';
import Attacks from '../components/Attacks';
import ComplexFeatureHost from '../components/ComplexFeatureHost';
import EffectsRulesNotes from '../components/EffectsRulesNotes';
import FeaturePopup from '../components/FeaturePopup';
import Features from '../components/Features';
import Inventory from '../components/Inventory';
import InventoryPopup from '../components/InventoryPopup';
import Maneuvers from '../components/Maneuvers';
import PlayerNotes from '../components/PlayerNotes';
import Spells from '../components/Spells';
import { useCharacterConditions, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	TabBadge,
	TabButton,
	TabbedContent,
	TabList,
	TabPanel
} from './AlternativeTabbedContent.styles';
import AlternativeSectionDisclosure from './AlternativeSectionDisclosure';

type TabId = 'attacks' | 'spells' | 'inventory' | 'maneuvers' | 'features' | 'conditions' | 'notes';

export default function AlternativeTabbedContent() {
	const { t } = useTranslation();
	const {
		state,
		readOnly,
		handleSpellCast,
		handleManeuverUse,
		toggleActiveCondition,
		setActiveConditionStacks,
		updateInventory
	} = useCharacterSheet();
	const conditionStatuses = useCharacterConditions();
	const [activeTab, setActiveTab] = useState<TabId>('attacks');
	const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
	const [selectedAttack, setSelectedAttack] = useState<{
		attack: AttackData;
		weapon: Weapon | null;
	} | null>(null);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<{
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null>(null);

	const activeConditions = state.character?.characterState?.activeConditions ?? [];
	const activeConditionCount = useMemo(
		() => conditionStatuses.filter((status) => status.interactions?.length).length,
		[conditionStatuses]
	);
	const tabs: Array<{ id: TabId; label: string; badge?: number }> = [
		{ id: 'attacks', label: t('characterSheet.tabAttacks') },
		{ id: 'spells', label: t('characterSheet.tabSpells') },
		{ id: 'inventory', label: t('characterSheet.tabInventory') },
		{ id: 'maneuvers', label: t('characterSheet.tabManeuvers') },
		{ id: 'features', label: t('characterSheet.tabFeatures') },
		{
			id: 'conditions',
			label: t('characterSheet.tabConditions'),
			badge: activeConditionCount
		},
		{ id: 'notes', label: t('characterSheet.tabNotes') }
	];

	const updateCustomItem = (
		itemId: string,
		updates: Partial<Pick<InventoryItemData, 'description' | 'cost'>>
	) => {
		const items = state.character?.characterState?.inventory?.items ?? [];
		updateInventory(items.map((item) => (item.id === itemId ? { ...item, ...updates } : item)));
		setSelectedInventoryItem((current) => {
			if (!current || current.inventoryData.id !== itemId) return current;
			return {
				...current,
				inventoryData: { ...current.inventoryData, ...updates }
			};
		});
	};

	return (
		<>
			<TabbedContent aria-label="Character actions and details">
				<AlternativeSectionDisclosure
					id="alternative-details"
					title={t('characterSheet.sectionDetails')}
					inset
				>
					<TabList role="tablist" aria-label="Character content">
						{tabs.map((tab) => (
							<TabButton
								key={tab.id}
								type="button"
								role="tab"
								id={`alternative-tab-${tab.id}`}
								aria-selected={activeTab === tab.id}
								aria-controls={`alternative-panel-${tab.id}`}
								tabIndex={activeTab === tab.id ? 0 : -1}
								$active={activeTab === tab.id}
								onClick={() => setActiveTab(tab.id)}
							>
								{tab.label}
								{tab.badge ? <TabBadge>{tab.badge}</TabBadge> : null}
							</TabButton>
						))}
					</TabList>

					<TabPanel
						role="tabpanel"
						id={`alternative-panel-${activeTab}`}
						aria-labelledby={`alternative-tab-${activeTab}`}
					>
						{activeTab === 'attacks' && (
							<Attacks
								showTitle={false}
								explicitEditMode
								onAttackClick={(attack, weapon) => setSelectedAttack({ attack, weapon })}
							/>
						)}
						{activeTab === 'spells' && (
							<Spells
								showTitle={false}
								onSpellClick={() => {}}
								onSpellCast={handleSpellCast}
								readOnly={readOnly}
							/>
						)}
						{activeTab === 'inventory' && (
							<Inventory
								showTitle={false}
								showInfoHeader={false}
								explicitEditMode
								onItemClick={(inventoryData, item) =>
									setSelectedInventoryItem({ inventoryData, item })
								}
							/>
						)}
						{activeTab === 'maneuvers' && (
							<Maneuvers
								showTitle={false}
								onManeuverClick={() => {}}
								onManeuverUse={handleManeuverUse}
								readOnly={readOnly}
							/>
						)}
						{activeTab === 'features' && (
							<>
								<Features showTitle={false} onFeatureClick={setSelectedFeature} />
								<EffectsRulesNotes />
								<ComplexFeatureHost />
							</>
						)}
						{activeTab === 'conditions' && (
							<>
								<ActiveConditionsTracker
									showTitle={false}
									activeConditions={activeConditions}
									onToggleCondition={toggleActiveCondition}
									onSetConditionStacks={setActiveConditionStacks}
								/>
								<ActiveConditionSummary activeConditions={activeConditions} />
							</>
						)}
						{activeTab === 'notes' && <PlayerNotes showTitle={false} explicitEditMode />}
					</TabPanel>
				</AlternativeSectionDisclosure>
			</TabbedContent>

			<AttackPopup selectedAttack={selectedAttack} onClose={() => setSelectedAttack(null)} />
			<InventoryPopup
				selectedInventoryItem={selectedInventoryItem}
				onClose={() => setSelectedInventoryItem(null)}
				onUpdateCustomItem={updateCustomItem}
			/>
			<FeaturePopup feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
		</>
	);
}
