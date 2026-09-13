import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation } from '../attackPresentation';
import { createAttackDataFromWeapon } from '../weaponAttackData';
import {
	StyledFeaturePopupClose,
	StyledFeaturePopupOverlay,
	StyledFeaturePopupTitle
} from '../styles/FeaturePopup';
import {
	PickerActions,
	PickerBody,
	PickerCancelButton,
	PickerConfirmButton,
	PickerContent,
	PickerEmpty,
	PickerFooter,
	PickerHeader,
	PickerList,
	PickerListPane,
	PickerPaneTitle,
	PickerPlaceholder,
	PickerPreview,
	PickerSourceButton,
	PickerSourceSwitch,
	PickerWeaponButton,
	PickerWeaponMeta,
	PickerWeaponName
} from '../styles/WeaponPickerModal.styles';
import WeaponAttackDetails from './WeaponAttackDetails';

type WeaponSource = 'inventory' | 'catalog';

interface WeaponPickerModalProps {
	inventoryWeapons: Weapon[];
	catalogWeapons: Weapon[];
	onAdd: (weapon: Weapon) => void;
	onClose: () => void;
}

export default function WeaponPickerModal({
	inventoryWeapons,
	catalogWeapons,
	onAdd,
	onClose
}: WeaponPickerModalProps) {
	const { t } = useTranslation();
	const [source, setSource] = useState<WeaponSource>('inventory');
	const [selectedName, setSelectedName] = useState(inventoryWeapons[0]?.name ?? '');
	const visibleWeapons = source === 'inventory' ? inventoryWeapons : catalogWeapons;
	const selectedWeapon = visibleWeapons.find((weapon) => weapon.name === selectedName) ?? null;
	const previewAttack = selectedWeapon ? createAttackDataFromWeapon(selectedWeapon) : null;
	const previewPresentation =
		previewAttack && selectedWeapon
			? getAttackPresentation({ attack: previewAttack, weapon: selectedWeapon })
			: null;

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	const changeSource = (nextSource: WeaponSource) => {
		const nextWeapons = nextSource === 'inventory' ? inventoryWeapons : catalogWeapons;
		setSource(nextSource);
		setSelectedName((current) =>
			nextWeapons.some((weapon) => weapon.name === current) ? current : (nextWeapons[0]?.name ?? '')
		);
	};

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<PickerContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="weapon-picker-title"
				data-testid="weapon-picker"
				onClick={(event) => event.stopPropagation()}
			>
				<PickerHeader>
					<StyledFeaturePopupTitle id="weapon-picker-title">
						{t('characterSheet.weaponPickerTitle')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose
						type="button"
						aria-label={t('characterSheet.weaponPickerClose')}
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</PickerHeader>

				<PickerBody>
					<PickerListPane
						aria-labelledby="weapon-picker-list-title"
						data-testid="weapon-picker-list-pane"
					>
						<PickerPaneTitle id="weapon-picker-list-title">
							{source === 'inventory'
								? t('characterSheet.weaponPickerInventoryWeapons')
								: t('characterSheet.weaponPickerCatalogWeapons')}
						</PickerPaneTitle>
						{visibleWeapons.length > 0 ? (
							<PickerList role="listbox" aria-label={t('characterSheet.weaponPickerListLabel')}>
								{visibleWeapons.map((weapon) => (
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
							</PickerList>
						) : (
							<PickerEmpty>{t('characterSheet.weaponPickerEmptyInventory')}</PickerEmpty>
						)}
					</PickerListPane>

					<PickerPreview data-testid="weapon-picker-preview">
						{previewAttack && selectedWeapon && previewPresentation ? (
							<WeaponAttackDetails
								attack={previewAttack}
								weapon={selectedWeapon}
								presentation={previewPresentation}
								headingIdPrefix="weapon-picker"
								contained
							/>
						) : (
							<PickerPlaceholder>{t('characterSheet.weaponPickerSelectPrompt')}</PickerPlaceholder>
						)}
					</PickerPreview>
				</PickerBody>

				<PickerFooter>
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
					<PickerActions>
						<PickerCancelButton type="button" onClick={onClose}>
							{t('characterSheet.weaponPickerCancel')}
						</PickerCancelButton>
						<PickerConfirmButton
							type="button"
							disabled={!selectedWeapon}
							data-testid="weapon-picker-confirm"
							onClick={() => selectedWeapon && onAdd(selectedWeapon)}
						>
							{t('characterSheet.weaponPickerAdd')}
						</PickerConfirmButton>
					</PickerActions>
				</PickerFooter>
			</PickerContent>
		</StyledFeaturePopupOverlay>
	);
}
