import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import type { CustomEquipment } from '../../../lib/rulesdata/equipment/schemas';
import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import type { InventoryItemData } from '../../../types';
import { sortByName } from '../catalogSorting';
import { filterCatalogEntries } from '../catalogPickerFiltering';
import {
	InventoryCustomInput,
	InventoryCustomTextarea,
	InventoryEquipLabel,
	InventoryInfoGrid,
	InventoryInfoItem,
	InventoryInfoLabel,
	InventoryInfoValue,
	InventoryPreviewCard,
	InventoryPreviewHeader,
	InventoryPreviewTitle,
	InventoryQuantity,
	InventoryQuantityButton,
	InventoryQuantityValue,
	InventorySetup,
	InventorySetupField,
	InventorySetupValue,
	InventoryTypeBadge
} from '../styles/InventoryPickerModal.styles';
import {
	PickerPlaceholder,
	PickerSourceButton,
	PickerSourceSwitch,
	PickerWeaponButton,
	PickerWeaponMeta,
	PickerWeaponName
} from '../styles/WeaponPickerModal.styles';
import { getInventoryItemCost } from '../utils/inventoryItemCost';
import { getInventoryItemInfo } from '../utils/inventoryItemInfo';
import CatalogPickerModal, { type CatalogPickerFilter } from './CatalogPickerModal';
import RichDescription from './RichDescription';

type InventorySource = 'catalog' | 'custom';

const INVENTORY_FILTER_ORDER = [
	'weapon',
	'armor',
	'shield',
	'spellFocus',
	'supply',
	'potion',
	'general',
	'freeform'
] as const;

type InventoryPickerOption =
	| { key: string; kind: 'catalog'; name: string; filterValue: string; item: InventoryItem }
	| {
			key: string;
			kind: 'equipment';
			name: string;
			filterValue: string;
			equipment: CustomEquipment;
	  }
	| { key: 'freeform'; kind: 'freeform'; name: string; filterValue: 'freeform' };

interface InventoryPickerModalProps {
	items: InventoryItem[];
	customEquipment: CustomEquipment[];
	onAdd: (item: InventoryItemData) => void;
	onClose: () => void;
}

function getCustomEquipmentType(category: CustomEquipment['category'], t: TFunction): string {
	const keys: Record<CustomEquipment['category'], string> = {
		weapon: 'characterSheet.inventoryPickerCustomWeapon',
		armor: 'characterSheet.inventoryPickerCustomArmor',
		shield: 'characterSheet.inventoryPickerCustomShield',
		spellFocus: 'characterSheet.inventoryPickerCustomSpellFocus',
		general: 'characterSheet.inventoryPickerCustomGeneral'
	};
	return t(keys[category]);
}

function getItemTypeLabel(itemType: InventoryItem['itemType'], t: TFunction): string {
	const keys: Record<InventoryItem['itemType'], string> = {
		Weapon: 'characterSheet.inventoryPickerWeapon',
		Armor: 'characterSheet.inventoryPickerArmor',
		Shield: 'characterSheet.inventoryPickerShield',
		'Adventuring Supply': 'characterSheet.inventoryPickerSupply',
		'Spell Focus': 'characterSheet.inventoryPickerSpellFocus',
		Potion: 'characterSheet.inventoryPickerPotion'
	};
	return t(keys[itemType]);
}

function getCatalogFilterValue(itemType: InventoryItem['itemType']): string {
	const values: Record<InventoryItem['itemType'], string> = {
		Weapon: 'weapon',
		Armor: 'armor',
		Shield: 'shield',
		'Adventuring Supply': 'supply',
		'Spell Focus': 'spellFocus',
		Potion: 'potion'
	};
	return values[itemType];
}

function getInventoryFilterLabel(value: string, t: TFunction): string {
	switch (value) {
		case 'weapon':
			return getItemTypeLabel('Weapon', t);
		case 'armor':
			return getItemTypeLabel('Armor', t);
		case 'shield':
			return getItemTypeLabel('Shield', t);
		case 'spellFocus':
			return getItemTypeLabel('Spell Focus', t);
		case 'supply':
			return getItemTypeLabel('Adventuring Supply', t);
		case 'potion':
			return getItemTypeLabel('Potion', t);
		case 'general':
			return t('characterSheet.inventoryPickerCustomGeneral');
		case 'freeform':
			return t('characterSheet.inventoryPickerCustomItem');
		default:
			return value;
	}
}

export default function InventoryPickerModal({
	items,
	customEquipment,
	onAdd,
	onClose
}: InventoryPickerModalProps) {
	const { t } = useTranslation();
	const catalogItems = useMemo(() => sortByName(items), [items]);
	const savedEquipment = useMemo(() => sortByName(customEquipment), [customEquipment]);
	const catalogOptions = useMemo<InventoryPickerOption[]>(
		() =>
			catalogItems.map((item) => ({
				key: `catalog:${item.itemType}:${item.name}`,
				kind: 'catalog',
				name: item.name,
				filterValue: getCatalogFilterValue(item.itemType),
				item
			})),
		[catalogItems]
	);
	const customOptions = useMemo<InventoryPickerOption[]>(
		() => [
			{
				key: 'freeform',
				kind: 'freeform',
				name: t('characterSheet.inventoryPickerCustomItem'),
				filterValue: 'freeform'
			},
			...savedEquipment.map((equipment) => ({
				key: `equipment:${equipment.id}`,
				kind: 'equipment' as const,
				name: equipment.name,
				filterValue: equipment.category,
				equipment
			}))
		],
		[savedEquipment, t]
	);
	const [source, setSource] = useState<InventorySource>('catalog');
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');
	const [selectedKey, setSelectedKey] = useState(catalogOptions[0]?.key ?? '');
	const [count, setCount] = useState(1);
	const [isEquipped, setIsEquipped] = useState(false);
	const [customName, setCustomName] = useState('');
	const [customDescription, setCustomDescription] = useState('');
	const [customCost, setCustomCost] = useState('-');
	const sourceOptions = source === 'catalog' ? catalogOptions : customOptions;
	const filters = useMemo<CatalogPickerFilter[]>(() => {
		const availableValues = new Set(
			[...catalogOptions, ...customOptions].map((option) => option.filterValue)
		);
		return [
			{ value: 'all', label: t('characterSheet.pickerFilterAll') },
			...INVENTORY_FILTER_ORDER.filter((value) => availableValues.has(value)).map((value) => ({
				value,
				label: getInventoryFilterLabel(value, t)
			}))
		];
	}, [catalogOptions, customOptions, t]);
	const visibleOptions = useMemo(
		() =>
			filterCatalogEntries(
				sourceOptions,
				search,
				filter,
				(option) => option.name,
				(option) => option.filterValue
			),
		[filter, search, sourceOptions]
	);
	const selectedOption = visibleOptions.find((option) => option.key === selectedKey) ?? null;

	const changeSource = (nextSource: InventorySource) => {
		const nextOptions = nextSource === 'catalog' ? catalogOptions : customOptions;
		const nextVisibleOptions = filterCatalogEntries(
			nextOptions,
			search,
			filter,
			(option) => option.name,
			(option) => option.filterValue
		);
		setSource(nextSource);
		setSelectedKey((current) =>
			nextVisibleOptions.some((option) => option.key === current)
				? current
				: (nextVisibleOptions[0]?.key ?? '')
		);
	};

	const getDraftData = (): InventoryItemData | null => {
		if (!selectedOption) return null;
		const id = `inventory_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
		if (selectedOption.kind === 'catalog') {
			return {
				id,
				itemType: selectedOption.item.itemType,
				itemName: selectedOption.item.name,
				count,
				cost: getInventoryItemCost(selectedOption.item, count),
				isEquipped
			};
		}
		if (selectedOption.kind === 'equipment') {
			return {
				id,
				itemType: 'Custom',
				itemName: selectedOption.equipment.name,
				count,
				cost: selectedOption.equipment.category === 'general' ? selectedOption.equipment.cost : '-',
				isEquipped,
				customEquipmentId: selectedOption.equipment.id,
				customEquipmentCategory: selectedOption.equipment.category
			};
		}
		const itemName = customName.trim();
		if (!itemName) return null;
		return {
			id,
			itemType: 'Custom',
			itemName,
			count,
			cost: customCost.trim() || '-',
			isEquipped,
			description: customDescription.trim() || undefined
		};
	};

	const renderPreview = () => {
		if (!selectedOption) {
			return (
				<PickerPlaceholder>{t('characterSheet.inventoryPickerSelectPrompt')}</PickerPlaceholder>
			);
		}

		if (selectedOption.kind === 'freeform') {
			return (
				<InventoryPreviewCard>
					<InventoryPreviewHeader>
						<InventoryPreviewTitle>
							{t('characterSheet.inventoryPickerCustomItem')}
						</InventoryPreviewTitle>
						<InventoryTypeBadge>{t('characterSheet.inventoryPickerCustom')}</InventoryTypeBadge>
					</InventoryPreviewHeader>
					<InventorySetupField>
						<span>{t('characterSheet.inventoryPickerName')}</span>
						<InventoryCustomInput
							value={customName}
							aria-label={t('characterSheet.inventoryPickerName')}
							placeholder={t('characterSheet.inventoryPickerNamePlaceholder')}
							onChange={(event) => setCustomName(event.target.value)}
						/>
					</InventorySetupField>
					<InventorySetupField>
						<span>{t('characterSheet.inventoryPickerDescription')}</span>
						<InventoryCustomTextarea
							value={customDescription}
							aria-label={t('characterSheet.inventoryPickerDescription')}
							placeholder={t('characterSheet.inventoryPickerDescriptionPlaceholder')}
							onChange={(event) => setCustomDescription(event.target.value)}
						/>
					</InventorySetupField>
					<InventorySetupField>
						<span>{t('characterSheet.inventoryPickerCost')}</span>
						<InventoryCustomInput
							value={customCost}
							aria-label={t('characterSheet.inventoryPickerCost')}
							placeholder={t('characterSheet.inventoryPickerCostPlaceholder')}
							onChange={(event) => setCustomCost(event.target.value)}
						/>
					</InventorySetupField>
					{renderSetup(false)}
				</InventoryPreviewCard>
			);
		}

		const draftData: InventoryItemData =
			selectedOption.kind === 'catalog'
				? {
						id: 'inventory-picker-preview',
						itemType: selectedOption.item.itemType,
						itemName: selectedOption.item.name,
						count,
						cost: getInventoryItemCost(selectedOption.item, count),
						isEquipped
					}
				: {
						id: 'inventory-picker-preview',
						itemType: 'Custom',
						itemName: selectedOption.equipment.name,
						count,
						cost:
							selectedOption.equipment.category === 'general' ? selectedOption.equipment.cost : '-',
						isEquipped,
						customEquipmentId: selectedOption.equipment.id,
						customEquipmentCategory: selectedOption.equipment.category
					};
		const info = getInventoryItemInfo(
			selectedOption.kind === 'catalog' ? selectedOption.item : null,
			draftData,
			false
		);
		const typeLabel =
			selectedOption.kind === 'catalog'
				? getItemTypeLabel(selectedOption.item.itemType, t)
				: getCustomEquipmentType(selectedOption.equipment.category, t);

		return (
			<InventoryPreviewCard>
				<InventoryPreviewHeader>
					<InventoryPreviewTitle>{selectedOption.name}</InventoryPreviewTitle>
					<InventoryTypeBadge>{typeLabel}</InventoryTypeBadge>
				</InventoryPreviewHeader>
				<InventoryInfoGrid>
					{info.map((entry) => (
						<InventoryInfoItem key={entry.label}>
							<InventoryInfoLabel>{entry.label}</InventoryInfoLabel>
							<InventoryInfoValue>
								{typeof entry.value === 'string' ? (
									<RichDescription text={entry.value} />
								) : (
									entry.value
								)}
							</InventoryInfoValue>
						</InventoryInfoItem>
					))}
				</InventoryInfoGrid>
				{renderSetup()}
			</InventoryPreviewCard>
		);
	};

	const renderSetup = (showCost = true) => (
		<InventorySetup>
			<InventorySetupField>
				<span id="inventory-picker-quantity-label">
					{t('characterSheet.inventoryPickerQuantity')}
				</span>
				<InventoryQuantity aria-labelledby="inventory-picker-quantity-label">
					<InventoryQuantityButton
						type="button"
						disabled={count === 1}
						aria-label={t('characterSheet.inventoryPickerDecreaseQuantity')}
						onClick={() => setCount((current) => Math.max(1, current - 1))}
					>
						−
					</InventoryQuantityButton>
					<InventoryQuantityValue>{count}</InventoryQuantityValue>
					<InventoryQuantityButton
						type="button"
						aria-label={t('characterSheet.inventoryPickerIncreaseQuantity')}
						onClick={() => setCount((current) => current + 1)}
					>
						+
					</InventoryQuantityButton>
				</InventoryQuantity>
			</InventorySetupField>
			<InventoryEquipLabel>
				<input
					type="checkbox"
					checked={isEquipped}
					onChange={(event) => setIsEquipped(event.target.checked)}
				/>
				{t('characterSheet.inventoryPickerEquipNow')}
			</InventoryEquipLabel>
			{showCost ? (
				<InventorySetupField>
					<span>{t('characterSheet.inventoryPickerCost')}</span>
					<InventorySetupValue>
						{selectedOption?.kind === 'catalog'
							? getInventoryItemCost(selectedOption.item, count)
							: selectedOption?.kind === 'equipment' &&
								  selectedOption.equipment.category === 'general'
								? selectedOption.equipment.cost
								: '-'}
					</InventorySetupValue>
				</InventorySetupField>
			) : null}
		</InventorySetup>
	);

	const handleConfirm = () => {
		const item = getDraftData();
		if (item) onAdd(item);
	};
	const canConfirm =
		!!selectedOption && (selectedOption.kind !== 'freeform' || customName.trim().length > 0);

	return (
		<CatalogPickerModal
			idPrefix="inventory-picker"
			testId="inventory-picker"
			title={t('characterSheet.inventoryPickerTitle')}
			closeLabel={t('characterSheet.inventoryPickerClose')}
			listTitle={
				source === 'catalog'
					? t('characterSheet.inventoryPickerCatalogTitle')
					: t('characterSheet.inventoryPickerCustomTitle')
			}
			listLabel={t('characterSheet.inventoryPickerListLabel')}
			listPaneTestId="inventory-picker-list-pane"
			previewTestId="inventory-picker-preview"
			searchValue={search}
			searchLabel={t('characterSheet.inventoryPickerSearchLabel')}
			searchPlaceholder={t('characterSheet.inventoryPickerSearchPlaceholder')}
			onSearchChange={setSearch}
			filterValue={filter}
			filterLabel={t('characterSheet.inventoryPickerFilterLabel')}
			filters={filters}
			onFilterChange={setFilter}
			hasResults={visibleOptions.length > 0}
			emptyText={t('characterSheet.inventoryPickerNoMatches')}
			listContent={visibleOptions.map((option) => {
				const meta =
					option.kind === 'catalog'
						? [getItemTypeLabel(option.item.itemType, t), getInventoryItemCost(option.item)]
								.filter((value) => value !== '-')
								.join(' · ')
						: option.kind === 'equipment'
							? getCustomEquipmentType(option.equipment.category, t)
							: t('characterSheet.inventoryPickerFreeformMeta');
				return (
					<PickerWeaponButton
						key={option.key}
						type="button"
						role="option"
						aria-selected={option.key === selectedKey}
						$selected={option.key === selectedKey}
						data-testid={`inventory-picker-option-${option.key}`}
						onClick={() => setSelectedKey(option.key)}
					>
						<PickerWeaponName>{option.name}</PickerWeaponName>
						<PickerWeaponMeta>{meta}</PickerWeaponMeta>
					</PickerWeaponButton>
				);
			})}
			preview={renderPreview()}
			footerLeading={
				<PickerSourceSwitch
					role="group"
					aria-label={t('characterSheet.inventoryPickerSource')}
					data-testid="inventory-picker-source"
				>
					<PickerSourceButton
						type="button"
						$active={source === 'catalog'}
						aria-pressed={source === 'catalog'}
						onClick={() => changeSource('catalog')}
					>
						{t('characterSheet.inventoryPickerCatalog')}
					</PickerSourceButton>
					<PickerSourceButton
						type="button"
						$active={source === 'custom'}
						aria-pressed={source === 'custom'}
						onClick={() => changeSource('custom')}
					>
						{t('characterSheet.inventoryPickerCustomItems')}
					</PickerSourceButton>
				</PickerSourceSwitch>
			}
			cancelLabel={t('characterSheet.inventoryPickerCancel')}
			confirmLabel={t('characterSheet.inventoryPickerAdd')}
			confirmDisabled={!canConfirm}
			confirmTestId="inventory-picker-confirm"
			onConfirm={handleConfirm}
			onClose={onClose}
		/>
	);
}
