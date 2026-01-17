import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

// Helper to get all trait IDs for an ancestry
function getAncestryTraitIds(ancestryId: string): string[] {
	const ancestry = ancestriesData.find((a) => a.id === ancestryId);
	if (!ancestry) return [];
	return [...(ancestry.defaultTraitIds || []), ...(ancestry.expandedTraitIds || [])];
}

// Ancestry-specific icons using Unicode symbols and emojis
const ancestryIcons: { [key: string]: string } = {
	human: '👤',
	elf: '🧝‍♂️',
	dwarf: '🧔',
	halfling: '🧙‍♂️',
	dragonborn: '🐉',
	gnome: '🎭',
	'half-elf': '🧝‍♀️',
	'half-orc': '👹',
	tiefling: '😈',
	orc: '🗡️',
	goblin: '👺',
	kobold: '🦎',
	default: '🌟'
};

// Ancestry quotes
const ancestryQuotes: { [key: string]: string } = {
	human: 'Adaptable and ambitious, we forge our own destiny.',
	elf: 'Centuries of wisdom flow through our veins.',
	dwarf: 'Stone is our blood, mountains our home.',
	halfling: 'Small in stature, but great in courage.',
	dragonborn: 'We carry the might of dragons in our souls.',
	gnome: 'Curiosity and invention are the pillars of progress.',
	orc: 'Strength and honor - nothing less matters.',
	giantborn: 'We stand tall above the rest, unbowed by time.',
	angelborn: 'Divine light guides our path through darkness.',
	fiendborn: 'Darkness flows within, but our choices define us.',
	beastborn: "Nature's gifts shape our bodies and spirits.",
	penguinborn: 'We waddle with pride through ice and water.',
	gremlin: 'Small but fierce, we thrive in chaos.',
	goblin: 'Clever tactics over brute strength.',
	terraborn: 'Earth is our ally, stone our sanctuary.',
	shadowborn: 'We embrace the darkness others fear.',
	psyborn: "The mind's potential knows no limits.",
	default: 'A proud lineage with unique talents.'
};

function AncestrySelector() {
	const { state, dispatch } = useCharacter();

	const selectedAncestries: string[] = [];
	if (state.ancestry1Id) selectedAncestries.push(state.ancestry1Id);
	if (state.ancestry2Id) selectedAncestries.push(state.ancestry2Id);

	function handleSelectAncestry(ancestryId: string) {
		const isSelected = selectedAncestries.includes(ancestryId);

		if (isSelected) {
			// Deselect
			let newAncestry1Id = state.ancestry1Id;
			let newAncestry2Id = state.ancestry2Id;

			if (state.ancestry1Id === ancestryId) {
				newAncestry1Id = null;
			} else if (state.ancestry2Id === ancestryId) {
				newAncestry2Id = null;
			}

			// Get traits belonging to the deselected ancestry and remove them
			const traitsToRemove = new Set(getAncestryTraitIds(ancestryId));
			const currentTraits = state.selectedTraitIds || [];
			const filteredTraits = currentTraits.filter((traitId) => !traitsToRemove.has(traitId));

			// Also clear any trait choices for the removed traits
			const currentChoices = { ...state.selectedTraitChoices };
			for (const traitId of traitsToRemove) {
				// Remove any choices that start with this trait ID
				Object.keys(currentChoices).forEach((key) => {
					if (key.startsWith(`${traitId}-`)) {
						delete currentChoices[key];
					}
				});
			}

			dispatch({ type: 'SET_ANCESTRY', ancestry1Id: newAncestry1Id, ancestry2Id: newAncestry2Id });
			dispatch({ type: 'SET_TRAITS', selectedTraitIds: filteredTraits });
			dispatch({
				type: 'UPDATE_STORE',
				updates: { selectedTraitChoices: currentChoices }
			});
		} else {
			// Select
			if (!state.ancestry1Id) {
				dispatch({ type: 'SET_ANCESTRY', ancestry1Id: ancestryId, ancestry2Id: state.ancestry2Id });
			} else if (!state.ancestry2Id) {
				dispatch({ type: 'SET_ANCESTRY', ancestry1Id: state.ancestry1Id, ancestry2Id: ancestryId });
			}
		}
	}

	function getAncestryIcon(ancestryId: string): string {
		return ancestryIcons[ancestryId.toLowerCase()] || ancestryIcons.default;
	}

	function getAncestryQuote(ancestryId: string): string {
		return ancestryQuotes[ancestryId.toLowerCase()] || ancestryQuotes.default;
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Choose Your Ancestry</h2>
				<p className="text-muted-foreground text-lg">
					Select up to 2 ancestries for your character.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{ancestriesData.map((ancestry: IAncestry) => {
					const isSelected = selectedAncestries.includes(ancestry.id);

					return (
						<Card
							key={ancestry.id}
							className={cn(
								'group relative cursor-pointer overflow-hidden border-2 transition-all duration-200',
								isSelected
									? 'border-primary bg-primary/10 ring-primary shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1'
									: 'border-border hover:border-primary/50 bg-card/50 hover:bg-card hover:shadow-lg'
							)}
							onClick={() => handleSelectAncestry(ancestry.id)}
							data-testid={`ancestry-card-${ancestry.id}`}
						>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div
											className={cn(
												'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-2xl transition-colors',
												isSelected
													? 'border-primary bg-primary/20'
													: 'group-hover:border-primary/30'
											)}
										>
											{getAncestryIcon(ancestry.id)}
										</div>
										<CardTitle className="font-cinzel text-primary group-hover:text-primary-foreground/90 text-lg transition-colors">
											{ancestry.name}
										</CardTitle>
									</div>
									{isSelected && (
										<div className="bg-primary text-primary-foreground rounded-full p-1">
											<Check className="h-4 w-4" />
										</div>
									)}
								</div>
							</CardHeader>
							<CardContent>
								<div className="border-primary/30 group-hover:border-primary/60 mb-3 border-l-2 pl-3 transition-colors">
									<p className="text-primary/80 text-xs font-medium italic">
										"{getAncestryQuote(ancestry.id)}"
									</p>
								</div>
								<p className="text-muted-foreground group-hover:text-muted-foreground/90 line-clamp-3 text-sm leading-relaxed">
									{ancestry.description}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default AncestrySelector;
