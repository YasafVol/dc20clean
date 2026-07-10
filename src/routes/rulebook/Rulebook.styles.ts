import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../character-sheet/styles/theme';

export const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
	padding: 5.5rem ${theme.spacing[4]} ${theme.spacing[8]};

	@media (max-width: 640px) {
		padding: 5rem ${theme.spacing[3]} ${theme.spacing[6]};
	}
`;

export const ContentWrapper = styled.div`
	width: min(1120px, 100%);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const Header = styled.header`
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const Title = styled.h1`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const Subtitle = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.base};
	margin: 0;
`;

export const ControlsPanel = styled.section`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
	padding: ${theme.spacing[4]};
	display: grid;
	grid-template-columns: minmax(160px, 0.35fr) minmax(260px, 1fr);
	gap: ${theme.spacing[3]};
	align-items: center;

	@media (max-width: 680px) {
		grid-template-columns: 1fr;
	}
`;

export const TocControlLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	min-height: 44px;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	text-decoration: none;
	transition: all ${theme.transitions.fast};

	&[aria-current='page'],
	&:hover {
		border-color: ${theme.colors.accent.primary};
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}

	svg {
		width: 18px;
		height: 18px;
	}
`;

export const SearchShell = styled.label`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[3]};
	width: 100%;
	padding: 0 ${theme.spacing[4]};
	min-height: 44px;
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.muted};
	transition: all ${theme.transitions.fast};

	&:focus-within {
		border-color: ${theme.colors.border.focus};
		box-shadow: 0 0 0 2px ${theme.colors.accent.infoAlpha30};
	}

	svg {
		width: 18px;
		height: 18px;
		flex: 0 0 auto;
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	border: none;
	background: transparent;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	outline: none;

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

export const ReaderShell = styled.main`
	min-width: 0;
`;

export const DocumentPanel = styled.section`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
	overflow: hidden;
`;

export const DocumentHeader = styled.div`
	display: flex;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	align-items: center;
	padding: ${theme.spacing[5]} ${theme.spacing[6]};
	border-bottom: 1px solid ${theme.colors.border.default};

	@media (max-width: 640px) {
		align-items: flex-start;
		flex-direction: column;
		padding: ${theme.spacing[4]};
	}
`;

export const DocumentTitle = styled.h2`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0;
`;

export const DocumentMeta = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	margin: ${theme.spacing[1]} 0 0;
`;

export const TocBody = styled.div`
	padding: 0 ${theme.spacing[6]};

	@media (max-width: 640px) {
		padding: 0 ${theme.spacing[4]};
	}
`;

export const TocGroup = styled.section`
	padding: ${theme.spacing[6]} 0;

	& + & {
		border-top: 1px solid ${theme.colors.border.default};
	}
`;

export const TocGroupHeader = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	margin-bottom: ${theme.spacing[4]};
`;

export const TocGroupTitle = styled.h2`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
`;

export const SourcePage = styled.span`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	white-space: nowrap;
`;

export const TocArticleList = styled.ol`
	list-style: none;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[2]} ${theme.spacing[6]};
	margin: 0;
	padding: 0;

	@media (max-width: 720px) {
		grid-template-columns: 1fr;
	}
`;

export const TocArticleLink = styled(Link)`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: ${theme.spacing[3]};
	min-height: 40px;
	padding: ${theme.spacing[2]} 0;
	border-bottom: 1px solid transparent;
	color: ${theme.colors.text.primary};
	text-decoration: none;
	font-weight: ${theme.typography.fontWeight.medium};

	&:hover {
		color: ${theme.colors.accent.info};
		border-bottom-color: ${theme.colors.border.default};
	}
`;

export const ArticleHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	border-bottom: 1px solid ${theme.colors.border.default};

	@media (max-width: 640px) {
		align-items: flex-start;
		flex-direction: column;
		padding: ${theme.spacing[4]};
	}
`;

export const Breadcrumbs = styled.nav`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${theme.spacing[2]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};

	a {
		color: ${theme.colors.accent.info};
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
`;

export const ArticleOutline = styled.nav`
	padding: ${theme.spacing[5]} ${theme.spacing[6]};
	border-bottom: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.tertiary};

	@media (max-width: 640px) {
		padding: ${theme.spacing[4]};
	}
`;

export const OutlineTitle = styled.h2`
	margin: 0 0 ${theme.spacing[3]};
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	text-transform: uppercase;
	color: ${theme.colors.text.secondary};
`;

export const OutlineList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]} ${theme.spacing[4]};
	list-style: none;
	margin: 0;
	padding: 0;

	a {
		color: ${theme.colors.accent.info};
		font-size: ${theme.typography.fontSize.sm};
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
`;

export const MarkdownArticle = styled.article`
	max-width: 820px;
	margin: 0 auto;
	padding: ${theme.spacing[8]} ${theme.spacing[6]};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	line-height: ${theme.typography.lineHeight.relaxed};

	@media (max-width: 640px) {
		padding: ${theme.spacing[6]} ${theme.spacing[4]};
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${theme.colors.text.primary};
		line-height: ${theme.typography.lineHeight.tight};
		scroll-margin-top: ${theme.spacing[8]};
	}

	h1 {
		font-size: ${theme.typography.fontSize['2xl']};
		margin: 0 0 ${theme.spacing[6]};
	}

	h2 {
		font-size: ${theme.typography.fontSize.xl};
		margin: ${theme.spacing[8]} 0 ${theme.spacing[3]};
		padding-bottom: ${theme.spacing[2]};
		border-bottom: 1px solid ${theme.colors.border.default};
	}

	h3 {
		font-size: ${theme.typography.fontSize.lg};
		margin: ${theme.spacing[6]} 0 ${theme.spacing[3]};
	}

	h4,
	h5,
	h6 {
		font-size: ${theme.typography.fontSize.base};
		margin: ${theme.spacing[5]} 0 ${theme.spacing[2]};
	}

	p,
	ul,
	ol,
	blockquote,
	table,
	pre {
		margin: 0 0 ${theme.spacing[4]};
	}

	ul,
	ol {
		padding-left: ${theme.spacing[6]};
	}

	li + li {
		margin-top: ${theme.spacing[1]};
	}

	a {
		color: ${theme.colors.accent.info};
		text-underline-offset: 3px;
	}

	strong {
		font-weight: ${theme.typography.fontWeight.bold};
	}

	em {
		color: ${theme.colors.text.secondary};
	}

	blockquote {
		border-left: 3px solid ${theme.colors.accent.secondary};
		padding-left: ${theme.spacing[4]};
		color: ${theme.colors.text.secondary};
	}

	code {
		background: ${theme.colors.bg.tertiary};
		border: 1px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.sm};
		padding: 0 ${theme.spacing[1]};
	}

	pre {
		overflow-x: auto;
		padding: ${theme.spacing[4]};
		background: ${theme.colors.bg.tertiary};
		border: 1px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.md};
	}

	pre code {
		border: 0;
		padding: 0;
	}

	table {
		display: block;
		width: 100%;
		overflow-x: auto;
		border-collapse: collapse;
		font-size: ${theme.typography.fontSize.sm};
	}

	th,
	td {
		min-width: 96px;
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		border: 1px solid ${theme.colors.border.default};
		text-align: left;
		vertical-align: top;
	}

	th {
		background: ${theme.colors.bg.tertiary};
		font-weight: ${theme.typography.fontWeight.bold};
	}
`;

export const ArticleNavigation = styled.nav`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[4]};
	padding: ${theme.spacing[5]} ${theme.spacing[6]};
	border-top: 1px solid ${theme.colors.border.default};

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
		padding: ${theme.spacing[4]};
	}
`;

export const ArticleNavigationLink = styled(Link)<{ $align: 'left' | 'right' }>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => (props.$align === 'right' ? 'flex-end' : 'flex-start')};
	gap: ${theme.spacing[2]};
	min-width: 0;
	color: ${theme.colors.text.primary};
	text-align: ${(props) => props.$align};
	text-decoration: none;
	font-weight: ${theme.typography.fontWeight.semibold};

	small {
		display: block;
		color: ${theme.colors.text.muted};
		font-size: ${theme.typography.fontSize.xs};
		font-weight: ${theme.typography.fontWeight.normal};
	}

	svg {
		flex: 0 0 auto;
		width: 18px;
		height: 18px;
	}

	&:hover {
		color: ${theme.colors.accent.info};
	}
`;

export const ResultsPanel = styled.section`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
	padding: ${theme.spacing[5]};
`;

export const ResultsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	align-items: baseline;
	margin-bottom: ${theme.spacing[4]};
`;

export const ResultsTitle = styled.h2`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0;
`;

export const ResultCount = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const ResultsList = styled.ol`
	display: grid;
	gap: ${theme.spacing[3]};
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const ResultLink = styled(Link)`
	display: block;
	width: 100%;
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[4]};
	text-decoration: none;
	transition: all ${theme.transitions.fast};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		background: ${theme.colors.bg.elevated};
	}
`;

export const ResultTitle = styled.span`
	display: block;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	margin-bottom: ${theme.spacing[1]};
`;

export const ResultSource = styled.span`
	display: block;
	color: ${theme.colors.accent.info};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	margin-bottom: ${theme.spacing[2]};
`;

export const ResultSnippet = styled.span`
	display: block;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
`;

export const StateMessage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[3]};
	min-height: 220px;
	padding: ${theme.spacing[8]} ${theme.spacing[4]};
	color: ${theme.colors.text.secondary};
	text-align: center;

	svg {
		width: 28px;
		height: 28px;
	}
`;

export const EmptyState = styled.div`
	color: ${theme.colors.text.muted};
	text-align: center;
	padding: ${theme.spacing[8]} ${theme.spacing[4]};
`;

export const InlineLink = styled(Link)`
	color: ${theme.colors.accent.info};
`;
