import type { ChangeEventHandler, ReactNode } from 'react';
import { BookOpenText, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import {
	CatalogAddButton,
	CatalogDisplayControls,
	CatalogFilter,
	CatalogFilterLabel,
	CatalogReferenceLink,
	CatalogToolbarContainer,
	CatalogToolbarSpacer,
	CatalogUtilityButton
} from '../../styles/CatalogToolbar.styles';

interface CatalogToolbarProps {
	referenceTo: string;
	referenceLabel: string;
	filterLabel: string;
	filterValue: string;
	onFilterChange: ChangeEventHandler<HTMLSelectElement>;
	filterTestId?: string;
	children: ReactNode;
	onExpand: () => void;
	onCollapse: () => void;
	onAdd: () => void;
	addLabel: string;
	addTestId: string;
}

const CatalogToolbar = ({
	referenceTo,
	referenceLabel,
	filterLabel,
	filterValue,
	onFilterChange,
	filterTestId,
	children,
	onExpand,
	onCollapse,
	onAdd,
	addLabel,
	addTestId
}: CatalogToolbarProps) => (
	<CatalogToolbarContainer data-testid="catalog-toolbar">
		<CatalogReferenceLink to={referenceTo}>
			<BookOpenText aria-hidden="true" size={16} />
			{referenceLabel}
		</CatalogReferenceLink>
		<CatalogFilterLabel>
			<span>{filterLabel}</span>
			<CatalogFilter value={filterValue} onChange={onFilterChange} data-testid={filterTestId}>
				{children}
			</CatalogFilter>
		</CatalogFilterLabel>
		<CatalogToolbarSpacer />
		<CatalogDisplayControls role="group" aria-label="Row details">
			<CatalogUtilityButton type="button" onClick={onExpand} aria-label="Expand all">
				<ChevronDown aria-hidden="true" size={16} />
				Expand
			</CatalogUtilityButton>
			<CatalogUtilityButton type="button" onClick={onCollapse} aria-label="Collapse all">
				<ChevronUp aria-hidden="true" size={16} />
				Collapse
			</CatalogUtilityButton>
		</CatalogDisplayControls>
		<CatalogAddButton type="button" onClick={onAdd} data-testid={addTestId}>
			<Plus aria-hidden="true" size={16} />
			{addLabel}
		</CatalogAddButton>
	</CatalogToolbarContainer>
);

export default CatalogToolbar;
