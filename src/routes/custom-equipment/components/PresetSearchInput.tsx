interface PresetSearchInputProps {
	value: string;
	onChange: (value: string) => void;
	resultCount: number;
}

export default function PresetSearchInput({
	value,
	onChange,
	resultCount
}: PresetSearchInputProps) {
	return (
		<div className="mb-3">
			<label className="sr-only" htmlFor="equipment-preset-search">
				Search presets
			</label>
			<input
				id="equipment-preset-search"
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search presets by name, type, or property"
				className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
			/>
			<div className="mt-1 text-xs text-gray-500">
				{resultCount} {resultCount === 1 ? 'preset' : 'presets'}
			</div>
		</div>
	);
}
