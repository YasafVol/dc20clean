import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RulebookMarkdown } from './RulebookMarkdown';
import { loadRulebookArticle } from './rulebookLoaders';
import {
	getRulebookAnchor,
	getRulebookArticleNeighbors,
	getRulebookArticlePath,
	getRulebookGroup,
	type RulebookArticle
} from './rulebookData';
import * as S from './Rulebook.styles';

interface RulebookArticleReaderProps {
	article: RulebookArticle;
}

export function RulebookArticleReader({ article }: RulebookArticleReaderProps) {
	const { t } = useTranslation();
	const location = useLocation();
	const [markdown, setMarkdown] = useState<string>();
	const [loadFailed, setLoadFailed] = useState(false);
	const group = getRulebookGroup(article.parentId);
	const { previous, next } = getRulebookArticleNeighbors(article.id);
	const outlineAnchors = article.childIds.flatMap((anchorId) => {
		const anchor = getRulebookAnchor(anchorId);
		return anchor ? [anchor] : [];
	});

	useEffect(() => {
		let active = true;
		setMarkdown(undefined);
		setLoadFailed(false);

		void loadRulebookArticle(article)
			.then((content) => {
				if (active) setMarkdown(content);
			})
			.catch(() => {
				if (active) setLoadFailed(true);
			});

		return () => {
			active = false;
		};
	}, [article]);

	useEffect(() => {
		if (!markdown || !location.hash) return;

		const animationFrame = requestAnimationFrame(() => {
			const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
			target?.scrollIntoView({ block: 'start' });
		});

		return () => cancelAnimationFrame(animationFrame);
	}, [location.hash, markdown]);

	return (
		<S.DocumentPanel data-testid="rulebook-article" data-article-id={article.id}>
			<S.ArticleHeader>
				<S.Breadcrumbs aria-label={t('rulebook.breadcrumbLabel')}>
					<Link to="/rulebook">{t('rulebook.tableOfContents')}</Link>
					<span aria-hidden="true">/</span>
					<span>{group?.title}</span>
				</S.Breadcrumbs>
				<S.DocumentMeta>{t('rulebook.page', { page: article.sourcePage })}</S.DocumentMeta>
			</S.ArticleHeader>

			{outlineAnchors.length > 0 && (
				<S.ArticleOutline aria-label={t('rulebook.onThisPage')}>
					<S.OutlineTitle>{t('rulebook.onThisPage')}</S.OutlineTitle>
					<S.OutlineList>
						{outlineAnchors.map((anchor) => (
							<li key={anchor.id}>
								<a href={`#${anchor.domId}`}>{anchor.title}</a>
							</li>
						))}
					</S.OutlineList>
				</S.ArticleOutline>
			)}

			{loadFailed ? (
				<S.StateMessage role="alert">{t('rulebook.articleLoadError')}</S.StateMessage>
			) : markdown ? (
				<RulebookMarkdown markdown={markdown} />
			) : (
				<S.StateMessage aria-live="polite">{t('rulebook.loadingArticle')}</S.StateMessage>
			)}

			<S.ArticleNavigation aria-label={t('rulebook.articleNavigation')}>
				{previous ? (
					<S.ArticleNavigationLink to={getRulebookArticlePath(previous.id)} $align="left">
						<ChevronLeft aria-hidden="true" />
						<span>
							<small>{t('common.previous')}</small>
							{previous.title}
						</span>
					</S.ArticleNavigationLink>
				) : (
					<span />
				)}

				{next && (
					<S.ArticleNavigationLink to={getRulebookArticlePath(next.id)} $align="right">
						<span>
							<small>{t('common.next')}</small>
							{next.title}
						</span>
						<ChevronRight aria-hidden="true" />
					</S.ArticleNavigationLink>
				)}
			</S.ArticleNavigation>
		</S.DocumentPanel>
	);
}
