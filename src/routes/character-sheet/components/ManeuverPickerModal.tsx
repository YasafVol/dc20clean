import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Maneuver } from '../../../lib/rulesdata/schemas/maneuver.schema';
import {
	formatManeuverCost,
	formatManeuverEnhancementCost
} from '../../../lib/rulesdata/martials/maneuverFormatting';
import {
	PickerPlaceholder,
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
import CatalogPickerModal, { type CatalogPickerFilter } from './CatalogPickerModal';
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
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');
	const [selectedId, setSelectedId] = useState(maneuvers[0]?.id ?? '');
	const filters = useMemo<CatalogPickerFilter[]>(
		() => [
			{ value: 'all', label: t('characterSheet.pickerFilterAll') },
			...Array.from(new Set(maneuvers.map((maneuver) => maneuver.type)))
				.sort((left, right) => left.localeCompare(right))
				.map((type) => ({ value: type, label: type }))
		],
		[maneuvers, t]
	);
	const visibleManeuvers = useMemo(() => {
		const normalizedSearch = search.trim().toLocaleLowerCase();
		return maneuvers.filter(
			(maneuver) =>
				(filter === 'all' || maneuver.type === filter) &&
				(!normalizedSearch || maneuver.name.toLocaleLowerCase().includes(normalizedSearch))
		);
	}, [filter, maneuvers, search]);
	const selectedManeuver = visibleManeuvers.find((maneuver) => maneuver.id === selectedId) ?? null;

	return (
		<CatalogPickerModal
			idPrefix="maneuver-picker"
			testId="maneuver-picker"
			title={t('characterSheet.maneuverPickerTitle')}
			closeLabel={t('characterSheet.maneuverPickerClose')}
			listTitle={t('characterSheet.maneuverPickerAvailable')}
			listLabel={t('characterSheet.maneuverPickerListLabel')}
			listPaneTestId="maneuver-picker-list-pane"
			previewTestId="maneuver-picker-preview"
			searchValue={search}
			searchLabel={t('characterSheet.maneuverPickerSearchLabel')}
			searchPlaceholder={t('characterSheet.maneuverPickerSearchPlaceholder')}
			onSearchChange={setSearch}
			filterValue={filter}
			filterLabel={t('characterSheet.maneuverPickerFilterLabel')}
			filters={filters}
			onFilterChange={setFilter}
			hasResults={visibleManeuvers.length > 0}
			emptyText={
				maneuvers.length === 0
					? t('characterSheet.maneuverPickerEmpty')
					: t('characterSheet.maneuverPickerNoMatches')
			}
			listContent={visibleManeuvers.map((maneuver) => (
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
			preview={
				selectedManeuver ? (
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
							<SpellSectionTitle>{t('characterSheet.maneuverPickerDescription')}</SpellSectionTitle>
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
					<PickerPlaceholder>{t('characterSheet.maneuverPickerSelectPrompt')}</PickerPlaceholder>
				)
			}
			cancelLabel={t('characterSheet.maneuverPickerCancel')}
			confirmLabel={t('characterSheet.maneuverPickerAdd')}
			confirmDisabled={!selectedManeuver}
			confirmTestId="maneuver-picker-confirm"
			onConfirm={() => selectedManeuver && onAdd(selectedManeuver)}
			onClose={onClose}
		/>
	);
}
