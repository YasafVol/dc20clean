import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loadRulebookSearchIndex } from './rulebookLoaders';
import {
	getRulebookArticlePath,
	getRulebookGroup,
	searchRulebook,
	type RulebookSearchRecord
} from './rulebookData';
import * as S from './Rulebook.styles';

interface RulebookSearchResultsProps {
	query: string;
	onSelect: () => void;
}

export function RulebookSearchResults({ query, onSelect }: RulebookSearchResultsProps) {
	const { t } = useTranslation();
	const [records, setRecords] = useState<RulebookSearchRecord[]>();
	const [loadFailed, setLoadFailed] = useState(false);
	const results = useMemo(() => searchRulebook(records ?? [], query), [query, records]);

	useEffect(() => {
		let active = true;

		void loadRulebookSearchIndex()
			.then((loadedRecords) => {
				if (active) setRecords(loadedRecords);
			})
			.catch(() => {
				if (active) setLoadFailed(true);
			});

		return () => {
			active = false;
		};
	}, []);

	if (loadFailed) {
		return <S.StateMessage role="alert">{t('rulebook.searchLoadError')}</S.StateMessage>;
	}

	if (!records) {
		return <S.StateMessage aria-live="polite">{t('rulebook.loadingSearch')}</S.StateMessage>;
	}

	return (
		<S.ResultsPanel data-testid="rulebook-search-results">
			<S.ResultsHeader>
				<S.ResultsTitle>{t('rulebook.searchResults')}</S.ResultsTitle>
				<S.ResultCount aria-live="polite">
					{t('rulebook.matchCount', { count: results.length })}
				</S.ResultCount>
			</S.ResultsHeader>

			{results.length > 0 ? (
				<S.ResultsList>
					{results.map((result) => {
						const group = getRulebookGroup(result.groupId);
						const target = `${getRulebookArticlePath(result.articleId)}#${result.domId}`;

						return (
							<li key={result.id}>
								<S.ResultLink to={target} onClick={onSelect} data-result-id={result.id}>
									<S.ResultSource>
										{group?.title} / {result.articleTitle} /{' '}
										{t('rulebook.page', { page: result.sourcePage })}
									</S.ResultSource>
									<S.ResultTitle>{result.title}</S.ResultTitle>
									<S.ResultSnippet>{result.snippet}</S.ResultSnippet>
								</S.ResultLink>
							</li>
						);
					})}
				</S.ResultsList>
			) : (
				<S.EmptyState>{t('rulebook.noMatches')}</S.EmptyState>
			)}
		</S.ResultsPanel>
	);
}
