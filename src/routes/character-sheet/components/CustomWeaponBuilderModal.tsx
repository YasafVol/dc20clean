import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	buildCustomWeapon,
	getCustomWeaponMaxPoints
} from '../../../lib/rulesdata/equipment/customWeapon';
import type { CustomWeapon } from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import { validateWeapon } from '../../../lib/rulesdata/equipment/validation/equipmentValidator';
import { customWeaponToWeapon } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation } from '../attackPresentation';
import {
	CustomWeaponBuilderBody,
	CustomWeaponBuilderButton,
	CustomWeaponBuilderContent,
	CustomWeaponBuilderFooter,
	CustomWeaponBuilderHeader,
	CustomWeaponBuilderPlaceholder,
	CustomWeaponBuilderPreview,
	CustomWeaponBuilderPreviewTitle,
	CustomWeaponBuilderSheetPane
} from '../styles/CustomWeaponBuilderModal.styles';
import {
	StyledFeaturePopupClose,
	StyledFeaturePopupOverlay,
	StyledFeaturePopupTitle
} from '../styles/FeaturePopup';
import { createAttackDataFromCustomWeapon } from '../weaponAttackData';
import CharacterCustomWeaponComposer, {
	createCharacterCustomWeaponDraft
} from './CharacterCustomWeaponComposer';
import WeaponAttackDetails from './WeaponAttackDetails';

interface CustomWeaponBuilderModalProps {
	onCreate: (weapon: CustomWeapon) => void;
	onClose: () => void;
}

export default function CustomWeaponBuilderModal({
	onCreate,
	onClose
}: CustomWeaponBuilderModalProps) {
	const { t } = useTranslation();
	const [draft, setDraft] = useState(createCharacterCustomWeaponDraft);
	const [weaponId] = useState(() => `custom-weapon-${Date.now()}`);
	const validation = useMemo(() => {
		if (!draft.weaponType || !draft.style || !draft.damageType) return null;
		return validateWeapon({
			weaponType: draft.weaponType,
			style: draft.style,
			secondaryStyle: draft.secondaryStyle ?? undefined,
			damageType: draft.damageType,
			properties: draft.properties,
			maxPoints: getCustomWeaponMaxPoints(draft.weaponType)
		});
	}, [draft.damageType, draft.properties, draft.secondaryStyle, draft.style, draft.weaponType]);
	const customWeapon = useMemo(() => {
		if (!draft.weaponType || !draft.style || !draft.damageType) return null;
		return buildCustomWeapon({
			id: weaponId,
			name: draft.name.trim() || t('characterSheet.customWeaponPreviewName'),
			weaponType: draft.weaponType,
			style: draft.style,
			secondaryStyle: draft.secondaryStyle ?? undefined,
			damageType: draft.damageType,
			secondaryDamageType: draft.secondaryDamageType ?? undefined,
			properties: draft.properties
		});
	}, [draft, t, weaponId]);
	const displayWeapon = customWeapon ? customWeaponToWeapon(customWeapon) : null;
	const previewAttack = customWeapon ? createAttackDataFromCustomWeapon(customWeapon) : null;
	const previewPresentation =
		previewAttack && displayWeapon
			? getAttackPresentation({ attack: previewAttack, weapon: displayWeapon })
			: null;
	const canAdvance =
		draft.step === 1
			? Boolean(draft.weaponType)
			: draft.step === 2
				? Boolean(draft.style)
				: draft.step === 3
					? Boolean(draft.damageType)
					: draft.step === 4
						? Boolean(validation?.isValid)
						: Boolean(customWeapon && draft.name.trim() && validation?.isValid);

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	const advance = () => {
		if (!canAdvance) return;
		if (draft.step < 5) {
			setDraft((current) => ({ ...current, step: (current.step + 1) as 2 | 3 | 4 | 5 }));
			return;
		}
		if (customWeapon) onCreate(customWeapon);
	};

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<CustomWeaponBuilderContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="custom-weapon-builder-title"
				data-testid="custom-weapon-builder"
				onClick={(event) => event.stopPropagation()}
			>
				<CustomWeaponBuilderHeader>
					<StyledFeaturePopupTitle id="custom-weapon-builder-title">
						{t('characterSheet.customWeaponTitle')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose
						type="button"
						aria-label={t('characterSheet.customWeaponClose')}
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</CustomWeaponBuilderHeader>

				<CustomWeaponBuilderBody>
					<CustomWeaponBuilderSheetPane>
						<CharacterCustomWeaponComposer draft={draft} onChange={setDraft} />
					</CustomWeaponBuilderSheetPane>
					<CustomWeaponBuilderPreview data-testid="custom-weapon-preview">
						<CustomWeaponBuilderPreviewTitle>
							{t('characterSheet.customWeaponLivePreview')}
						</CustomWeaponBuilderPreviewTitle>
						{previewAttack && displayWeapon && previewPresentation ? (
							<WeaponAttackDetails
								attack={previewAttack}
								weapon={displayWeapon}
								presentation={previewPresentation}
								headingIdPrefix="custom-weapon-preview"
								contained
							/>
						) : (
							<CustomWeaponBuilderPlaceholder>
								{t('characterSheet.customWeaponPreviewPrompt')}
							</CustomWeaponBuilderPlaceholder>
						)}
					</CustomWeaponBuilderPreview>
				</CustomWeaponBuilderBody>

				<CustomWeaponBuilderFooter>
					<CustomWeaponBuilderButton type="button" onClick={onClose}>
						{t('characterSheet.weaponPickerCancel')}
					</CustomWeaponBuilderButton>
					{draft.step > 1 ? (
						<CustomWeaponBuilderButton
							type="button"
							data-action-id="custom-weapon-back"
							onClick={() =>
								setDraft((current) => ({
									...current,
									step: (current.step - 1) as 1 | 2 | 3 | 4
								}))
							}
						>
							{t('characterSheet.customWeaponBack')}
						</CustomWeaponBuilderButton>
					) : null}
					<CustomWeaponBuilderButton
						type="button"
						$primary
						disabled={!canAdvance}
						data-action-id={draft.step === 5 ? 'custom-weapon-create' : 'custom-weapon-next'}
						onClick={advance}
					>
						{draft.step === 5
							? t('characterSheet.customWeaponCreate')
							: t('characterSheet.customWeaponNext')}
					</CustomWeaponBuilderButton>
				</CustomWeaponBuilderFooter>
			</CustomWeaponBuilderContent>
		</StyledFeaturePopupOverlay>
	);
}
