export function filterEquipmentPresets<T>(
	presets: readonly T[],
	query: string,
	getSearchTerms: (preset: T) => readonly string[]
): T[] {
	const tokens = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);

	if (tokens.length === 0) return [...presets];

	return presets.filter((preset) => {
		const haystack = getSearchTerms(preset).join(' ').toLocaleLowerCase();
		return tokens.every((token) => haystack.includes(token));
	});
}
