import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import type { CustomWeapon } from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import { getAttackPresentation } from '../attackPresentation';
import { filterCatalogEntries } from '../catalogPickerFiltering';
import { createAttackDataFromWeapon } from '../weaponAttackData';
import {
	PickerCreateCustomButton,
	PickerFooterLeading,
	PickerPlaceholder,
	PickerSourceButton,
	PickerSourceSwitch,
	PickerWeaponButton,
	PickerWeaponMeta,
	PickerWeaponName
} from '../styles/WeaponPickerModal.styles';
import CatalogPickerModal, { type CatalogPickerFilter } from './CatalogPickerModal';
import CustomWeaponBuilderModal from './CustomWeaponBuilderModal';
import WeaponAttackDetails from './WeaponAttackDetails';

type WeaponSource = 'inventory' | 'catalog';

interface WeaponPickerModalProps {
	inventoryWeapons: Weapon[];
	catalogWeapons: Weapon[];
	onAdd: (weapon: Weapon) => void;
	onAddCustom: (weapon: CustomWeapon) => void;
	onClose: () => void;
}

export default function WeaponPickerModal({
	inventoryWeapons,
	catalogWeapons,
	onAdd,
	onAddCustom,
	onClose
}: WeaponPickerModalProps) {
	const { t } = useTranslation();
	const [source, setSource] = useState<WeaponSource>('inventory');
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');
	const [selectedName, setSelectedName] = useState(inventoryWeapons[0]?.name ?? '');
	const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
	const sourceWeapons = source === 'inventory' ? inventoryWeapons : catalogWeapons;
	const visibleWeapons = useMemo(
		() =>
			filterCatalogEntries(
				sourceWeapons,
				search,
				filter,
				(weapon) => weapon.name,
				(weapon) => weapon.type
			),
		[filter, search, sourceWeapons]
	);
	const selectedWeapon = visibleWeapons.find((weapon) => weapon.name === selectedName) ?? null;
	const previewWeapon = selectedWeapon;
	const previewAttack = previewWeapon ? createAttackDataFromWeapon(previewWeapon) : null;
	const previewPresentation =
		previewAttack && previewWeapon
			? getAttackPresentation({ attack: previewAttack, weapon: previewWeapon })
			: null;
	const filters: CatalogPickerFilter[] = [
		{ value: 'all', label: t('characterSheet.pickerFilterAll') },
		{ value: 'Melee', label: t('characterSheet.weaponPickerFilterMelee') },
		{ value: 'Ranged', label: t('characterSheet.weaponPickerFilterRanged') }
	];

	const changeSource = (nextSource: WeaponSource) => {
		const nextWeapons = nextSource === 'inventory' ? inventoryWeapons : catalogWeapons;
		const nextVisibleWeapons = filterCatalogEntries(
			nextWeapons,
			search,
			filter,
			(weapon) => weapon.name,
			(weapon) => weapon.type
		);
		setSource(nextSource);
		setSelectedName((current) =>
			nextVisibleWeapons.some((weapon) => weapon.name === current)
				? current
				: (nextVisibleWeapons[0]?.name ?? '')
		);
	};

	if (isCustomBuilderOpen) {
		return (
			<CustomWeaponBuilderModal
				onCreate={(weapon) => {
					onAddCustom(weapon);
					setIsCustomBuilderOpen(false);
				}}
				onClose={() => setIsCustomBuilderOpen(false)}
			/>
		);
	}

	return (
		<CatalogPickerModal
			idPrefix="weapon-picker"
			testId="weapon-picker"
			title={t('characterSheet.weaponPickerTitle')}
			closeLabel={t('characterSheet.weaponPickerClose')}
			listTitle={
				source === 'inventory'
					? t('characterSheet.weaponPickerInventoryWeapons')
					: t('characterSheet.weaponPickerCatalogWeapons')
			}
			listLabel={t('characterSheet.weaponPickerListLabel')}
			listPaneTestId="weapon-picker-list-pane"
			previewTestId="weapon-picker-preview"
			searchValue={search}
			searchLabel={t('characterSheet.weaponPickerSearchLabel')}
			searchPlaceholder={t('characterSheet.weaponPickerSearchPlaceholder')}
			onSearchChange={setSearch}
			filterValue={filter}
			filterLabel={t('characterSheet.weaponPickerFilterLabel')}
			filters={filters}
			onFilterChange={setFilter}
			hasResults={visibleWeapons.length > 0}
			emptyText={
				source === 'inventory' && inventoryWeapons.length === 0
					? t('characterSheet.weaponPickerEmptyInventory')
					: t('characterSheet.weaponPickerNoMatches')
			}
			listContent={visibleWeapons.map((weapon) => (
				<PickerWeaponButton
					key={weapon.name}
					type="button"
					role="option"
					aria-selected={weapon.name === selectedName}
					$selected={weapon.name === selectedName}
					data-testid={`weapon-picker-option-${weapon.name}`}
					onClick={() => setSelectedName(weapon.name)}
				>
					<PickerWeaponName>{weapon.name}</PickerWeaponName>
					<PickerWeaponMeta>
						{weapon.handedness} · {weapon.type}
					</PickerWeaponMeta>
				</PickerWeaponButton>
			))}
			preview={
				previewAttack && previewWeapon && previewPresentation ? (
					<WeaponAttackDetails
						attack={previewAttack}
						weapon={previewWeapon}
						presentation={previewPresentation}
						headingIdPrefix="weapon-picker"
						contained
					/>
				) : (
					<PickerPlaceholder>{t('characterSheet.weaponPickerSelectPrompt')}</PickerPlaceholder>
				)
			}
			footerLeading={
				<PickerFooterLeading>
					<PickerSourceSwitch
						role="group"
						aria-label={t('characterSheet.weaponPickerSource')}
						data-testid="weapon-picker-source"
					>
						<PickerSourceButton
							type="button"
							$active={source === 'inventory'}
							aria-pressed={source === 'inventory'}
							onClick={() => changeSource('inventory')}
						>
							{t('characterSheet.weaponPickerInventory')}
						</PickerSourceButton>
						<PickerSourceButton
							type="button"
							$active={source === 'catalog'}
							aria-pressed={source === 'catalog'}
							onClick={() => changeSource('catalog')}
						>
							{t('characterSheet.weaponPickerFullList')}
						</PickerSourceButton>
					</PickerSourceSwitch>
					<PickerCreateCustomButton
						type="button"
						data-action-id="create-custom-weapon"
						onClick={() => setIsCustomBuilderOpen(true)}
					>
						{t('characterSheet.customWeaponCreateAction')}
					</PickerCreateCustomButton>
				</PickerFooterLeading>
			}
			cancelLabel={t('characterSheet.weaponPickerCancel')}
			confirmLabel={t('characterSheet.weaponPickerAdd')}
			confirmDisabled={!selectedWeapon}
			confirmTestId="weapon-picker-confirm"
			onConfirm={() => {
				if (selectedWeapon) onAdd(selectedWeapon);
			}}
			onClose={onClose}
		/>
	);
}
