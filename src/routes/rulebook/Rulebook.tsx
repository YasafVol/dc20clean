import { useDeferredValue, useState } from 'react';
import { BookOpenText, ListTree, Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RulebookArticleReader } from './RulebookArticleReader';
import { RulebookSearchResults } from './RulebookSearchResults';
import { RulebookTableOfContents } from './RulebookTableOfContents';
import { getRulebookArticle } from './rulebookData';
import * as S from './Rulebook.styles';

function Rulebook() {
	const { t } = useTranslation();
	const params = useParams();
	const articleId = params['*']?.replace(/^\/+|\/+$/g, '');
	const article = getRulebookArticle(articleId);
	const [searchTerm, setSearchTerm] = useState('');
	const deferredSearchTerm = useDeferredValue(searchTerm.trim());
	const isTableOfContents = !articleId;

	return (
		<S.PageContainer>
			<S.ContentWrapper>
				<S.Header>
					<S.Title>{t('rulebook.title')}</S.Title>
					<S.Subtitle>{t('rulebook.subtitle')}</S.Subtitle>
				</S.Header>

				<S.ControlsPanel aria-label={t('rulebook.controlsLabel')}>
					<S.TocControlLink to="/rulebook" aria-current={isTableOfContents ? 'page' : undefined}>
						<ListTree aria-hidden="true" />
						{t('rulebook.tableOfContentsShort')}
					</S.TocControlLink>

					<S.SearchShell>
						<Search aria-hidden="true" />
						<S.SearchInput
							type="search"
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder={t('rulebook.searchPlaceholder')}
							aria-label={t('rulebook.searchLabel')}
						/>
					</S.SearchShell>
				</S.ControlsPanel>

				<S.ReaderShell>
					{deferredSearchTerm ? (
						<RulebookSearchResults query={deferredSearchTerm} onSelect={() => setSearchTerm('')} />
					) : isTableOfContents ? (
						<RulebookTableOfContents />
					) : article ? (
						<RulebookArticleReader article={article} />
					) : (
						<S.DocumentPanel>
							<S.StateMessage role="alert">
								<BookOpenText aria-hidden="true" />
								{t('rulebook.articleNotFound')}
								<S.InlineLink to="/rulebook">{t('rulebook.returnToContents')}</S.InlineLink>
							</S.StateMessage>
						</S.DocumentPanel>
					)}
				</S.ReaderShell>
			</S.ContentWrapper>
		</S.PageContainer>
	);
}

export default Rulebook;
