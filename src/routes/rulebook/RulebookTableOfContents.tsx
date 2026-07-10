import { useTranslation } from 'react-i18next';

import {
	getRulebookArticle,
	getRulebookArticlePath,
	rulebookManifest,
	visibleRulebookGroups
} from './rulebookData';
import * as S from './Rulebook.styles';

export function RulebookTableOfContents() {
	const { t } = useTranslation();

	return (
		<S.DocumentPanel data-testid="rulebook-toc">
			<S.DocumentHeader>
				<div>
					<S.DocumentTitle>{t('rulebook.tableOfContents')}</S.DocumentTitle>
					<S.DocumentMeta>
						{t('rulebook.articleCount', { count: rulebookManifest.articles.length })}
					</S.DocumentMeta>
				</div>
			</S.DocumentHeader>

			<S.TocBody>
				{visibleRulebookGroups.map((group) => (
					<S.TocGroup key={group.id} aria-labelledby={`rulebook-group-${group.id}`}>
						<S.TocGroupHeader>
							<S.TocGroupTitle id={`rulebook-group-${group.id}`}>{group.title}</S.TocGroupTitle>
							<S.SourcePage>{t('rulebook.page', { page: group.sourcePage })}</S.SourcePage>
						</S.TocGroupHeader>
						<S.TocArticleList>
							{group.childIds.map((articleId) => {
								const article = getRulebookArticle(articleId);
								if (!article) return null;

								return (
									<li key={article.id}>
										<S.TocArticleLink
											to={getRulebookArticlePath(article.id)}
											data-article-id={article.id}
										>
											<span>{article.title}</span>
											<S.SourcePage>
												{t('rulebook.page', { page: article.sourcePage })}
											</S.SourcePage>
										</S.TocArticleLink>
									</li>
								);
							})}
						</S.TocArticleList>
					</S.TocGroup>
				))}
			</S.TocBody>
		</S.DocumentPanel>
	);
}
