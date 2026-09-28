import { ArrowRight, ExternalLink } from 'lucide-react';
import {
	Actions,
	CardCopy,
	CardTitle,
	Eyebrow,
	FeatureGrid,
	Hero,
	Lead,
	Page,
	PrimaryAction,
	SecondaryAction,
	Section,
	SectionHeading,
	SectionLead,
	SectionTitle,
	Shell,
	Title
} from './AlternativeSheetUpdate.styles';
import { ArtCard, ArtImage } from './CuratedArtUpdate.styles';

const examples = [
	{
		name: 'Custom gear',
		image: '/assets/curated/heroic-icons/icon-sword-01.png',
		copy: 'Pick an icon while creating a custom weapon, armor, shield, spell focus, or general item.'
	},
	{
		name: 'Inventory',
		image: '/assets/curated/heroic-icons/icon-book-01.png',
		copy: 'Give a freeform inventory item an icon so it is easier to recognize on your sheet.'
	},
	{
		name: 'Monsters and encounters',
		image: '/assets/curated/monsters-minions/beowulf-boss-04.png',
		copy: 'Choose creature art in Monster Designer. It follows the monster into its card and encounter slots.'
	}
];

export default function CuratedArtUpdate() {
	return (
		<Page>
			<Shell>
				<Hero>
					<Eyebrow>
						Product update · <time dateTime="2026-09-28">September 28, 2026</time>
					</Eyebrow>
					<Title>Art for your gear and monsters</Title>
					<Lead>
						Choose pixel art for the equipment and creatures you create. The same picker now works
						across your inventory, Equipage, and Monster Designer.
					</Lead>
					<Actions>
						<PrimaryAction to="/custom-equipment">
							Create equipment <ArrowRight size={18} aria-hidden="true" />
						</PrimaryAction>
						<SecondaryAction to="/dm/monsters">
							Open Monster Designer <ExternalLink size={16} aria-hidden="true" />
						</SecondaryAction>
					</Actions>
				</Hero>

				<Section aria-labelledby="art-highlights-title">
					<SectionHeading>
						<Eyebrow>What changed</Eyebrow>
						<SectionTitle id="art-highlights-title">
							A visual identity for your creations
						</SectionTitle>
						<SectionLead>
							Browse 40 item icons and 30 creature images. Search and filter the collection, preview
							your choice, or leave an item without art.
						</SectionLead>
					</SectionHeading>
					<FeatureGrid>
						{examples.map((example) => (
							<ArtCard key={example.name}>
								<ArtImage src={example.image} alt="" />
								<CardTitle>{example.name}</CardTitle>
								<CardCopy>{example.copy}</CardCopy>
							</ArtCard>
						))}
					</FeatureGrid>
				</Section>

				<Section aria-labelledby="dm-tools-title">
					<SectionHeading>
						<Eyebrow>DM Tools</Eyebrow>
						<SectionTitle id="dm-tools-title">
							Monster and encounter tools now match the app
						</SectionTitle>
						<SectionLead>
							Monster Designer and Encounter Planner now use the app’s shared theme. The art you
							choose appears in the monster’s preview, list card, and encounter slot.
						</SectionLead>
					</SectionHeading>
				</Section>
			</Shell>
		</Page>
	);
}
