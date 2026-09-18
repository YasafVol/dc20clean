import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Spell } from '../../../lib/rulesdata/schemas/spell.schema';
import {
	formatSpellCost,
	formatSpellEnhancementCost
} from '../../../lib/rulesdata/spells-data/spellCost';
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
import {
	EnhancementCard,
	EnhancementCost,
	EnhancementHeading,
	EnhancementList,
	SpellCard,
	SpellCardHeader,
	SpellEffect,
	SpellMetadata,
	SpellMetadataItem,
	SpellMetadataLabel,
	SpellMetadataValue,
	SpellOptionHeading,
	SpellPassive,
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

type SpellSourceMode = 'allowed' | 'all';

interface SpellPickerModalProps {
	allowedSpells: Spell[];
	catalogSpells: Spell[];
	onAdd: (spell: Spell) => void;
	onClose: () => void;
}

export default function SpellPickerModal({
	allowedSpells,
	catalogSpells,
	onAdd,
	onClose
}: SpellPickerModalProps) {
	const { t } = useTranslation();
	const [source, setSource] = useState<SpellSourceMode>('allowed');
	const [selectedId, setSelectedId] = useState(allowedSpells[0]?.id ?? '');
	const visibleSpells = source === 'allowed' ? allowedSpells : catalogSpells;
	const selectedSpell = visibleSpells.find((spell) => spell.id === selectedId) ?? null;

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	const changeSource = (nextSource: SpellSourceMode) => {
		const nextSpells = nextSource === 'allowed' ? allowedSpells : catalogSpells;
		setSource(nextSource);
		setSelectedId((current) =>
			nextSpells.some((spell) => spell.id === current) ? current : (nextSpells[0]?.id ?? '')
		);
	};

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<PickerContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="spell-picker-title"
				data-testid="spell-picker"
				onClick={(event) => event.stopPropagation()}
			>
				<PickerHeader>
					<StyledFeaturePopupTitle id="spell-picker-title">
						{t('characterSheet.spellPickerTitle')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose
						type="button"
						aria-label={t('characterSheet.spellPickerClose')}
						onClick={onClose}
					>
						×
					</StyledFeaturePopupClose>
				</PickerHeader>

				<PickerBody>
					<PickerListPane
						aria-labelledby="spell-picker-list-title"
						data-testid="spell-picker-list-pane"
					>
						<PickerPaneTitle id="spell-picker-list-title">
							{source === 'allowed'
								? t('characterSheet.spellPickerAllowedSpells')
								: t('characterSheet.spellPickerAllSpells')}
						</PickerPaneTitle>
						{visibleSpells.length > 0 ? (
							<PickerList role="listbox" aria-label={t('characterSheet.spellPickerListLabel')}>
								{visibleSpells.map((spell) => (
									<PickerWeaponButton
										key={spell.id}
										type="button"
										role="option"
										aria-selected={spell.id === selectedId}
										$selected={spell.id === selectedId}
										data-testid={'spell-picker-option-' + spell.id}
										onClick={() => setSelectedId(spell.id)}
									>
										<SpellOptionHeading>
											<PickerWeaponName>{spell.name}</PickerWeaponName>
											{spell.sustained ? (
												<SustainedBadge>{t('characterSheet.spellPickerSustained')}</SustainedBadge>
											) : null}
										</SpellOptionHeading>
										<PickerWeaponMeta>
											{spell.school} · {formatSpellCost(spell.cost)}
										</PickerWeaponMeta>
									</PickerWeaponButton>
								))}
							</PickerList>
						) : (
							<PickerEmpty>{t('characterSheet.spellPickerEmptyAllowed')}</PickerEmpty>
						)}
					</PickerListPane>

					<PickerPreview data-testid="spell-picker-preview">
						{selectedSpell ? (
							<SpellCard>
								<SpellCardHeader>
									<SpellTitleRow>
										<SpellTitle>{selectedSpell.name}</SpellTitle>
										{selectedSpell.sustained ? (
											<SustainedBadge>{t('characterSheet.spellPickerSustained')}</SustainedBadge>
										) : null}
									</SpellTitleRow>
									<SpellMetadata>
										<SpellMetadataItem>
											<SpellMetadataLabel>
												{t('characterSheet.spellPickerSources')}
											</SpellMetadataLabel>
											<SpellMetadataValue>{selectedSpell.sources.join(', ')}</SpellMetadataValue>
										</SpellMetadataItem>
										<SpellMetadataItem>
											<SpellMetadataLabel>
												{t('characterSheet.spellPickerSchool')}
											</SpellMetadataLabel>
											<SpellMetadataValue>{selectedSpell.school}</SpellMetadataValue>
										</SpellMetadataItem>
										<SpellMetadataItem>
											<SpellMetadataLabel>{t('characterSheet.spellPickerTags')}</SpellMetadataLabel>
											<SpellMetadataValue>
												{selectedSpell.tags?.join(', ') || '—'}
											</SpellMetadataValue>
										</SpellMetadataItem>
									</SpellMetadata>
								</SpellCardHeader>

								<SpellStats>
									<SpellStat>
										<SpellStatLabel>{t('characterSheet.spellPickerCost')}</SpellStatLabel>
										<SpellStatValue>{formatSpellCost(selectedSpell.cost)}</SpellStatValue>
									</SpellStat>
									<SpellStat>
										<SpellStatLabel>{t('characterSheet.spellPickerRange')}</SpellStatLabel>
										<SpellStatValue>{selectedSpell.range}</SpellStatValue>
									</SpellStat>
									<SpellStat>
										<SpellStatLabel>{t('characterSheet.spellPickerDuration')}</SpellStatLabel>
										<SpellStatValue>{selectedSpell.duration}</SpellStatValue>
									</SpellStat>
								</SpellStats>

								<SpellSection>
									<SpellSectionTitle>{t('characterSheet.spellPickerEffects')}</SpellSectionTitle>
									{selectedSpell.effects.map((effect) => (
										<SpellEffect key={effect.title + effect.description}>
											{effect.title ? <strong>{effect.title}: </strong> : null}
											<RichDescription text={effect.description} />
										</SpellEffect>
									))}
								</SpellSection>

								{selectedSpell.spellPassive ? (
									<SpellSection>
										<SpellSectionTitle>{t('characterSheet.spellPickerPassive')}</SpellSectionTitle>
										<SpellPassive>
											<RichDescription text={selectedSpell.spellPassive} />
										</SpellPassive>
									</SpellSection>
								) : null}

								{selectedSpell.enhancements.length > 0 ? (
									<SpellSection>
										<SpellSectionTitle>
											{t('characterSheet.spellPickerEnhancements')}
										</SpellSectionTitle>
										<EnhancementList>
											{selectedSpell.enhancements.map((enhancement) => (
												<EnhancementCard key={enhancement.id ?? enhancement.name}>
													<EnhancementHeading>
														<strong>{enhancement.name}</strong>
														<EnhancementCost>
															{formatSpellEnhancementCost(enhancement)}
														</EnhancementCost>
													</EnhancementHeading>
													<RichDescription text={enhancement.description} />
												</EnhancementCard>
											))}
										</EnhancementList>
									</SpellSection>
								) : null}
							</SpellCard>
						) : (
							<PickerPlaceholder>{t('characterSheet.spellPickerSelectPrompt')}</PickerPlaceholder>
						)}
					</PickerPreview>
				</PickerBody>

				<PickerFooter>
					<PickerSourceSwitch
						role="group"
						aria-label={t('characterSheet.spellPickerSource')}
						data-testid="spell-picker-source"
					>
						<PickerSourceButton
							type="button"
							$active={source === 'allowed'}
							aria-pressed={source === 'allowed'}
							onClick={() => changeSource('allowed')}
						>
							{t('characterSheet.spellPickerAllowed')}
						</PickerSourceButton>
						<PickerSourceButton
							type="button"
							$active={source === 'all'}
							aria-pressed={source === 'all'}
							onClick={() => changeSource('all')}
						>
							{t('characterSheet.spellPickerAll')}
						</PickerSourceButton>
					</PickerSourceSwitch>
					<PickerActions>
						<PickerCancelButton type="button" onClick={onClose}>
							{t('characterSheet.spellPickerCancel')}
						</PickerCancelButton>
						<PickerConfirmButton
							type="button"
							disabled={!selectedSpell}
							data-testid="spell-picker-confirm"
							onClick={() => selectedSpell && onAdd(selectedSpell)}
						>
							{t('characterSheet.spellPickerAdd')}
						</PickerConfirmButton>
					</PickerActions>
				</PickerFooter>
			</PickerContent>
		</StyledFeaturePopupOverlay>
	);
}
