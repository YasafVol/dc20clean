import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Spell } from '../../../lib/rulesdata/schemas/spell.schema';
import { filterCatalogEntries } from '../catalogPickerFiltering';
import {
	formatSpellCost,
	formatSpellEnhancementCost
} from '../../../lib/rulesdata/spells-data/spellCost';
import {
	PickerPlaceholder,
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
import CatalogPickerModal, { type CatalogPickerFilter } from './CatalogPickerModal';
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
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');
	const [selectedId, setSelectedId] = useState(allowedSpells[0]?.id ?? '');
	const sourceSpells = source === 'allowed' ? allowedSpells : catalogSpells;
	const filters = useMemo<CatalogPickerFilter[]>(
		() => [
			{ value: 'all', label: t('characterSheet.pickerFilterAll') },
			...Array.from(new Set([...allowedSpells, ...catalogSpells].map((spell) => spell.school)))
				.sort((left, right) => left.localeCompare(right))
				.map((school) => ({ value: school, label: school }))
		],
		[allowedSpells, catalogSpells, t]
	);
	const visibleSpells = useMemo(
		() =>
			filterCatalogEntries(
				sourceSpells,
				search,
				filter,
				(spell) => spell.name,
				(spell) => spell.school
			),
		[filter, search, sourceSpells]
	);
	const selectedSpell = visibleSpells.find((spell) => spell.id === selectedId) ?? null;

	const changeSource = (nextSource: SpellSourceMode) => {
		const nextSpells = nextSource === 'allowed' ? allowedSpells : catalogSpells;
		const nextVisibleSpells = filterCatalogEntries(
			nextSpells,
			search,
			filter,
			(spell) => spell.name,
			(spell) => spell.school
		);
		setSource(nextSource);
		setSelectedId((current) =>
			nextVisibleSpells.some((spell) => spell.id === current)
				? current
				: (nextVisibleSpells[0]?.id ?? '')
		);
	};

	return (
		<CatalogPickerModal
			idPrefix="spell-picker"
			testId="spell-picker"
			title={t('characterSheet.spellPickerTitle')}
			closeLabel={t('characterSheet.spellPickerClose')}
			listTitle={
				source === 'allowed'
					? t('characterSheet.spellPickerAllowedSpells')
					: t('characterSheet.spellPickerAllSpells')
			}
			listLabel={t('characterSheet.spellPickerListLabel')}
			listPaneTestId="spell-picker-list-pane"
			previewTestId="spell-picker-preview"
			searchValue={search}
			searchLabel={t('characterSheet.spellPickerSearchLabel')}
			searchPlaceholder={t('characterSheet.spellPickerSearchPlaceholder')}
			onSearchChange={setSearch}
			filterValue={filter}
			filterLabel={t('characterSheet.spellPickerFilterLabel')}
			filters={filters}
			onFilterChange={setFilter}
			hasResults={visibleSpells.length > 0}
			emptyText={
				source === 'allowed' && allowedSpells.length === 0
					? t('characterSheet.spellPickerEmptyAllowed')
					: t('characterSheet.spellPickerNoMatches')
			}
			listContent={visibleSpells.map((spell) => (
				<PickerWeaponButton
					key={spell.id}
					type="button"
					role="option"
					aria-selected={spell.id === selectedId}
					$selected={spell.id === selectedId}
					data-testid={`spell-picker-option-${spell.id}`}
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
			preview={
				selectedSpell ? (
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
									<SpellMetadataLabel>{t('characterSheet.spellPickerSources')}</SpellMetadataLabel>
									<SpellMetadataValue>{selectedSpell.sources.join(', ')}</SpellMetadataValue>
								</SpellMetadataItem>
								<SpellMetadataItem>
									<SpellMetadataLabel>{t('characterSheet.spellPickerSchool')}</SpellMetadataLabel>
									<SpellMetadataValue>{selectedSpell.school}</SpellMetadataValue>
								</SpellMetadataItem>
								<SpellMetadataItem>
									<SpellMetadataLabel>{t('characterSheet.spellPickerTags')}</SpellMetadataLabel>
									<SpellMetadataValue>{selectedSpell.tags?.join(', ') || '—'}</SpellMetadataValue>
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
								<SpellSectionTitle>{t('characterSheet.spellPickerEnhancements')}</SpellSectionTitle>
								<EnhancementList>
									{selectedSpell.enhancements.map((enhancement) => (
										<EnhancementCard key={enhancement.id ?? enhancement.name}>
											<EnhancementHeading>
												<strong>{enhancement.name}</strong>
												<EnhancementCost>{formatSpellEnhancementCost(enhancement)}</EnhancementCost>
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
				)
			}
			footerLeading={
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
			}
			cancelLabel={t('characterSheet.spellPickerCancel')}
			confirmLabel={t('characterSheet.spellPickerAdd')}
			confirmDisabled={!selectedSpell}
			confirmTestId="spell-picker-confirm"
			onConfirm={() => selectedSpell && onAdd(selectedSpell)}
			onClose={onClose}
		/>
	);
}
