import React, { useState } from 'react';
import {
	SectionWrapper,
	Header,
	Title,
	ToggleIcon,
	Content,
	ActionContainer
} from './CollapsibleSection.styles';

type Props = {
	title: React.ReactNode;
	defaultExpanded?: boolean;
	expanded?: boolean; // Controlled mode for accordion behavior
	onToggle?: (expanded: boolean) => void; // Callback for accordion behavior
	selected?: boolean; // when the section is selected
	action?: React.ReactNode; // optional action button shown only when expanded
	children?: React.ReactNode; // content rendered when expanded
	'aria-label'?: string;
};

export const CollapsibleSection: React.FC<Props> = ({
	title,
	defaultExpanded = false,
	expanded: controlledExpanded,
	onToggle,
	selected = false,
	action,
	children,
	'aria-label': ariaLabel
}) => {
	const [internalExpanded, setInternalExpanded] = useState<boolean>(defaultExpanded);

	// Use controlled mode if expanded prop is provided, otherwise use internal state
	const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

	const toggle = () => {
		const newExpanded = !isExpanded;

		if (controlledExpanded !== undefined) {
			// Controlled mode - call the callback
			onToggle?.(newExpanded);
		} else {
			// Uncontrolled mode - update internal state
			setInternalExpanded(newExpanded);
		}
	};

	return (
		<SectionWrapper $selected={selected}>
			<Header
				onClick={toggle}
				aria-expanded={isExpanded}
				aria-label={ariaLabel ?? 'Toggle section'}
				$expanded={isExpanded}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggle();
					}
				}}
			>
				<Title $selected={selected} $expanded={isExpanded}>
					{title}
				</Title>

				<ActionContainer>
					{/* Only show action when expanded */}
					{isExpanded && action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
					<ToggleIcon aria-hidden>{isExpanded ? '▾' : '▸'}</ToggleIcon>
				</ActionContainer>
			</Header>{' '}
			{isExpanded ? (
				<Content $expanded={isExpanded} role="region" aria-hidden={false}>
					{children}
				</Content>
			) : null}
		</SectionWrapper>
	);
};

export default CollapsibleSection;
