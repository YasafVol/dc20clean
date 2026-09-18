import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Maneuver } from '../../../lib/rulesdata/schemas/maneuver.schema';
import {
	formatManeuverCost,
	formatManeuverEnhancementCost
} from '../../../lib/rulesdata/martials/maneuverFormatting';
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
	PickerWeaponButton,
	PickerWeaponMeta,
	PickerWeaponName
} from '../styles/WeaponPickerModal.styles';
import {
	EnhancementCard,
	EnhancementCost,
	EnhancementHeading,
	EnhancementList,
	SpellCard,
	SpellCardHeader,
	SpellEffect,
	SpellSection,
	SpellSectionTitle,
	SpellStat,
	SpellStatLabel,
	SpellStats,
	SpellStatValue,
	SpellTitle,
	SpellTitleRow,
	SustainedBadge
} from '../styles/SpellPickerModal.styles';
import RichDescription from './RichDescription';

interface ManeuverPickerModalProps {
	maneuvers: Maneuver[];
	onAdd: (maneuver: Maneuver) => void;
	onClose: () => void;
}

export default function ManeuverPickerModal({
	maneuvers,
	onAdd,
	onClose
}: ManeuverPickerModalProps) {
	const { t } = useTranslation();
	const [selectedId, setSelectedId] = useState(maneuvers[0]?.id ?? '');
	const selectedManeuver = maneuvers.find((maneuver) => maneuver.id === selectedId) ?? null;

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<PickerContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="maneuver-picker-title"
				data-testid="maneuver-picker"
				onClick={(event) => event.stopPropagation()}
			>
				<PickerHeader>
					<StyledFeaturePopupTitle id="maneuver-picker-title">
						{t('characterSheet.maneuverPickerTitle')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose
						type="button"
						aria-label={t('characterSheet.maneuverPickerClose')}
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</PickerHeader>

				<PickerBody>
					<PickerListPane
						aria-labelledby="maneuver-picker-list-title"
						data-testid="maneuver-picker-list-pane"
					>
						<PickerPaneTitle id="maneuver-picker-list-title">
							{t('characterSheet.maneuverPickerAvailable')}
						</PickerPaneTitle>
						{maneuvers.length > 0 ? (
							<PickerList role="listbox" aria-label={t('characterSheet.maneuverPickerListLabel')}>
								{maneuvers.map((maneuver) => (
									<PickerWeaponButton
										key={maneuver.id}
										type="button"
										role="option"
										aria-selected={maneuver.id === selectedId}
										$selected={maneuver.id === selectedId}
										data-testid={`maneuver-picker-option-${maneuver.id}`}
										onClick={() => setSelectedId(maneuver.id)}
									>
										<PickerWeaponName>{maneuver.name}</PickerWeaponName>
										<PickerWeaponMeta>
											{maneuver.type} · {formatManeuverCost(maneuver.cost)}
										</PickerWeaponMeta>
									</PickerWeaponButton>
								))}
							</PickerList>
						) : (
							<PickerEmpty>{t('characterSheet.maneuverPickerEmpty')}</PickerEmpty>
						)}
					</PickerListPane>

					<PickerPreview data-testid="maneuver-picker-preview">
						{selectedManeuver ? (
							<SpellCard>
								<SpellCardHeader>
									<SpellTitleRow>
										<SpellTitle>{selectedManeuver.name}</SpellTitle>
										<SustainedBadge>{selectedManeuver.type}</SustainedBadge>
									</SpellTitleRow>
								</SpellCardHeader>

								<SpellStats>
									<SpellStat>
										<SpellStatLabel>{t('martialManual.cost')}</SpellStatLabel>
										<SpellStatValue>{formatManeuverCost(selectedManeuver.cost)}</SpellStatValue>
									</SpellStat>
									<SpellStat>
										<SpellStatLabel>{t('characterSheet.maneuverPickerRange')}</SpellStatLabel>
										<SpellStatValue>{selectedManeuver.range}</SpellStatValue>
									</SpellStat>
									<SpellStat>
										<SpellStatLabel>{t('characterSheet.maneuverPickerTiming')}</SpellStatLabel>
										<SpellStatValue>
											{selectedManeuver.isReaction
												? t('martialManual.reaction')
												: t('characterSheet.maneuverPickerAction')}
										</SpellStatValue>
									</SpellStat>
								</SpellStats>

								<SpellSection>
									<SpellSectionTitle>
										{t('characterSheet.maneuverPickerDescription')}
									</SpellSectionTitle>
									<SpellEffect>
										<RichDescription text={selectedManeuver.description} />
									</SpellEffect>
								</SpellSection>

								{selectedManeuver.trigger ? (
									<SpellSection>
										<SpellSectionTitle>{t('martialManual.trigger')}</SpellSectionTitle>
										<SpellEffect>
											<RichDescription text={selectedManeuver.trigger} />
										</SpellEffect>
									</SpellSection>
								) : null}

								{selectedManeuver.enhancements.length > 0 ? (
									<SpellSection>
										<SpellSectionTitle>{t('martialManual.enhancements')}</SpellSectionTitle>
										<EnhancementList>
											{selectedManeuver.enhancements.map((enhancement) => (
												<EnhancementCard key={enhancement.name}>
													<EnhancementHeading>
														<strong>{enhancement.name}</strong>
														<EnhancementCost>
															{formatManeuverEnhancementCost(enhancement)}
														</EnhancementCost>
													</EnhancementHeading>
													<RichDescription text={enhancement.description} />
													{enhancement.repeatable ? (
														<SustainedBadge>{t('martialManual.repeatable')}</SustainedBadge>
													) : null}
												</EnhancementCard>
											))}
										</EnhancementList>
									</SpellSection>
								) : null}
							</SpellCard>
						) : (
							<PickerPlaceholder>
								{t('characterSheet.maneuverPickerSelectPrompt')}
							</PickerPlaceholder>
						)}
					</PickerPreview>
				</PickerBody>

				<PickerFooter>
					<PickerActions style={{ width: '100%' }}>
						<PickerCancelButton type="button" onClick={onClose}>
							{t('characterSheet.maneuverPickerCancel')}
						</PickerCancelButton>
						<PickerConfirmButton
							type="button"
							disabled={!selectedManeuver}
							data-testid="maneuver-picker-confirm"
							onClick={() => selectedManeuver && onAdd(selectedManeuver)}
						>
							{t('characterSheet.maneuverPickerAdd')}
						</PickerConfirmButton>
					</PickerActions>
				</PickerFooter>
			</PickerContent>
		</StyledFeaturePopupOverlay>
	);
}
