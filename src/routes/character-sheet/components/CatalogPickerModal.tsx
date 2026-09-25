import { useEffect, type ReactNode } from 'react';
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
	PickerFilterButton,
	PickerFilterList,
	PickerFooter,
	PickerHeader,
	PickerList,
	PickerListPane,
	PickerPaneTitle,
	PickerPreview,
	PickerSearchInput
} from '../styles/WeaponPickerModal.styles';

export interface CatalogPickerFilter {
	value: string;
	label: string;
}

interface CatalogPickerModalProps {
	idPrefix: string;
	testId: string;
	title: string;
	closeLabel: string;
	listTitle: string;
	listLabel: string;
	listPaneTestId: string;
	previewTestId: string;
	searchValue: string;
	searchLabel: string;
	searchPlaceholder: string;
	onSearchChange: (value: string) => void;
	filterValue: string;
	filterLabel: string;
	filters: CatalogPickerFilter[];
	onFilterChange: (value: string) => void;
	hasResults: boolean;
	emptyText: string;
	listContent: ReactNode;
	preview: ReactNode;
	footerLeading?: ReactNode;
	cancelLabel: string;
	confirmLabel: string;
	confirmDisabled: boolean;
	confirmTestId: string;
	onConfirm: () => void;
	onClose: () => void;
}

export default function CatalogPickerModal({
	idPrefix,
	testId,
	title,
	closeLabel,
	listTitle,
	listLabel,
	listPaneTestId,
	previewTestId,
	searchValue,
	searchLabel,
	searchPlaceholder,
	onSearchChange,
	filterValue,
	filterLabel,
	filters,
	onFilterChange,
	hasResults,
	emptyText,
	listContent,
	preview,
	footerLeading,
	cancelLabel,
	confirmLabel,
	confirmDisabled,
	confirmTestId,
	onConfirm,
	onClose
}: CatalogPickerModalProps) {
	const titleId = `${idPrefix}-title`;
	const listTitleId = `${idPrefix}-list-title`;

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
				aria-labelledby={titleId}
				data-testid={testId}
				onClick={(event) => event.stopPropagation()}
			>
				<PickerHeader>
					<StyledFeaturePopupTitle id={titleId}>{title}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose type="button" aria-label={closeLabel} onClick={onClose}>
						×
					</StyledFeaturePopupClose>
				</PickerHeader>

				<PickerBody>
					<PickerListPane aria-labelledby={listTitleId} data-testid={listPaneTestId}>
						<PickerPaneTitle id={listTitleId}>{listTitle}</PickerPaneTitle>
						<PickerSearchInput
							type="search"
							value={searchValue}
							aria-label={searchLabel}
							placeholder={searchPlaceholder}
							onChange={(event) => onSearchChange(event.target.value)}
						/>
						<PickerFilterList role="group" aria-label={filterLabel}>
							{filters.map((filter) => (
								<PickerFilterButton
									key={filter.value}
									type="button"
									$active={filter.value === filterValue}
									aria-pressed={filter.value === filterValue}
									onClick={() => onFilterChange(filter.value)}
								>
									{filter.label}
								</PickerFilterButton>
							))}
						</PickerFilterList>
						{hasResults ? (
							<PickerList role="listbox" aria-label={listLabel}>
								{listContent}
							</PickerList>
						) : (
							<PickerEmpty>{emptyText}</PickerEmpty>
						)}
					</PickerListPane>

					<PickerPreview data-testid={previewTestId}>{preview}</PickerPreview>
				</PickerBody>

				<PickerFooter>
					{footerLeading}
					<PickerActions>
						<PickerCancelButton type="button" onClick={onClose}>
							{cancelLabel}
						</PickerCancelButton>
						<PickerConfirmButton
							type="button"
							disabled={confirmDisabled}
							data-testid={confirmTestId}
							onClick={onConfirm}
						>
							{confirmLabel}
						</PickerConfirmButton>
					</PickerActions>
				</PickerFooter>
			</PickerContent>
		</StyledFeaturePopupOverlay>
	);
}
