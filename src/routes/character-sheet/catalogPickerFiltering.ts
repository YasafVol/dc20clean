export function filterCatalogEntries<T>(
	entries: T[],
	search: string,
	filter: string,
	getName: (entry: T) => string,
	getFilterValue: (entry: T) => string
): T[] {
	const normalizedSearch = search.trim().toLocaleLowerCase();
	return entries.filter(
		(entry) =>
			(filter === 'all' || getFilterValue(entry) === filter) &&
			(!normalizedSearch || getName(entry).toLocaleLowerCase().includes(normalizedSearch))
	);
}
