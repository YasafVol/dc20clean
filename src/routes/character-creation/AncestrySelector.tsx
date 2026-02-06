import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';
import { Check } from 'lucide-react';
import {
	Container,
	Header,
	Title,
	Subtitle,
	AncestryGrid,
	AncestryCard,
	CardHeader,
	IconWrapper,
	AncestryTitle,
	QuoteText,
	SelectedBadge
} from './AncestrySelector.styled';

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
		<Container>
			<Header>
				<Title>Choose Your Ancestry</Title>
				<Subtitle>Select up to 2 ancestries for your character.</Subtitle>
			</Header>

			<AncestryGrid>
				{ancestriesData.map((ancestry: IAncestry) => {
					const isSelected = selectedAncestries.includes(ancestry.id);

					return (
						<AncestryCard
							key={ancestry.id}
							$isSelected={isSelected}
							onClick={() => handleSelectAncestry(ancestry.id)}
							data-testid={`ancestry-card-${ancestry.id}`}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<CardHeader>
								<IconWrapper>{getAncestryIcon(ancestry.id)}</IconWrapper>
								<AncestryTitle $isSelected={isSelected}>{ancestry.name}</AncestryTitle>
							</CardHeader>
							<QuoteText $isSelected={isSelected}>
								"{getAncestryQuote(ancestry.id)}"
							</QuoteText>
							<p
								style={{
									fontSize: '0.875rem',
									color: 'rgba(169, 177, 214, 0.7)',
									lineHeight: '1.5',
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden'
								}}
							>
								{ancestry.description}
							</p>
							{isSelected && (
								<SelectedBadge>
									<Check size={16} />
								</SelectedBadge>
							)}
						</AncestryCard>
					);
				})}
			</AncestryGrid>
		</Container>
	);
}

export default AncestrySelector;
