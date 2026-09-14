import { ChevronDown, ChevronUp } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { media, theme } from '../styles/theme';

const SectionHeader = styled.div<{ $inset: boolean }>`
	grid-column: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[3]};
	min-width: 0;
	padding: ${({ $inset }) =>
		$inset ? `${theme.spacing[3]} ${theme.spacing[4]}` : `0 0 ${theme.spacing[2]}`};
	${media.mobile} {
		padding: ${({ $inset }) =>
			$inset ? `${theme.spacing[3]} ${theme.spacing[4]}` : `0 0 ${theme.spacing[2]}`};
	}
`;

const SectionTitle = styled.h2`
	min-width: 0;
	margin: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
	text-transform: uppercase;
	letter-spacing: 0.08em;
`;

const DisclosureButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	padding: 0;
	background: transparent;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.secondary};
	cursor: pointer;

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
		color: ${theme.colors.accent.primary};
		outline: none;
	}
`;

const SectionContent = styled.div`
	display: contents;

	&[hidden] {
		display: none;
	}
`;

interface AlternativeSectionDisclosureProps {
	id: string;
	title: string;
	children: ReactNode;
	inset?: boolean;
}

export default function AlternativeSectionDisclosure({
	id,
	title,
	children,
	inset = false
}: AlternativeSectionDisclosureProps) {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(true);
	const titleId = `${id}-title`;
	const contentId = `${id}-content`;
	const actionLabel = t(
		expanded ? 'characterSheet.collapseSection' : 'characterSheet.expandSection',
		{ section: title }
	);

	return (
		<>
			<SectionHeader $inset={inset}>
				<SectionTitle id={titleId}>{title}</SectionTitle>
				<DisclosureButton
					type="button"
					aria-label={actionLabel}
					aria-expanded={expanded}
					aria-controls={contentId}
					title={actionLabel}
					onClick={() => setExpanded((current) => !current)}
				>
					{expanded ? (
						<ChevronUp size={16} aria-hidden="true" />
					) : (
						<ChevronDown size={16} aria-hidden="true" />
					)}
				</DisclosureButton>
			</SectionHeader>
			<SectionContent id={contentId} hidden={!expanded} aria-labelledby={titleId}>
				{children}
			</SectionContent>
		</>
	);
}
