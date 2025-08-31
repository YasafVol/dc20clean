import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/_new_schema/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledAncestryIcon,
	StyledCardTitle,
	StyledCardDescription,
	StyledNewClassQuote
} from './styles/AncestrySelector.styles';
import { StyledNoSelection } from './styles/ClassFeatures.styles';

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
	human: "Adaptable and ambitious, we forge our own destiny.",
	elf: "Centuries of wisdom flow through our veins.",
	dwarf: "Stone is our blood, mountains our home.",
	halfling: "Small in stature, but great in courage.",
	dragonborn: "We carry the might of dragons in our souls.",
	gnome: "Curiosity and invention are the pillars of progress.",
	orc: "Strength and honor - nothing less matters.",
	giantborn: "We stand tall above the rest, unbowed by time.",
	angelborn: "Divine light guides our path through darkness.",
	fiendborn: "Darkness flows within, but our choices define us.",
	beastborn: "Nature's gifts shape our bodies and spirits.",
	penguinborn: "We waddle with pride through ice and water.",
	gremlin: "Small but fierce, we thrive in chaos.",
	goblin: "Clever tactics over brute strength.",
	terraborn: "Earth is our ally, stone our sanctuary.",
	shadowborn: "We embrace the darkness others fear.",
	psyborn: "The mind's potential knows no limits.",
	default: "A proud lineage with unique talents."
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

			dispatch({ type: 'SET_ANCESTRY', ancestry1Id: newAncestry1Id, ancestry2Id: newAncestry2Id });
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
		<StyledContainer>
			<StyledTitle>Choose Your Ancestry</StyledTitle>
			<StyledNoSelection style={{ margin: '-1.25rem 0 1.5rem', fontSize: '1.1rem', textAlign: 'center', width: '100%' }}>Select up to 2 ancestries for your character.</StyledNoSelection>
			<StyledGrid>
				{ancestriesData.map((ancestry: IAncestry) => (
					<StyledCard
						key={ancestry.id}
						$selected={selectedAncestries.includes(ancestry.id)}
						onClick={() => handleSelectAncestry(ancestry.id)}
					>
						<StyledCardHeader>
							<StyledAncestryIcon>{getAncestryIcon(ancestry.id)}</StyledAncestryIcon>
							<StyledCardTitle>{ancestry.name}</StyledCardTitle>
						</StyledCardHeader>
						<StyledNewClassQuote>
							{getAncestryQuote(ancestry.id)}
						</StyledNewClassQuote>
						<StyledCardDescription>{ancestry.description}</StyledCardDescription>
					</StyledCard>
				))}
			</StyledGrid>
		</StyledContainer>
	);
}

export default AncestrySelector;
