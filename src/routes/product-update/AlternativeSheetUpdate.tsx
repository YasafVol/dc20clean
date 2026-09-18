import type { CSSProperties } from 'react';
import {
	ChevronRight,
	Dices,
	Gauge,
	HeartPulse,
	Link2,
	LockKeyhole,
	MousePointerClick,
	Save,
	ShieldCheck,
	Smartphone,
	Sparkles
} from 'lucide-react';
import {
	Actions,
	Callout,
	CalloutIcon,
	CardCopy,
	CardTitle,
	Eyebrow,
	FeatureCard,
	FeatureGrid,
	Footer,
	Hero,
	HeroNote,
	IconFrame,
	Lead,
	Notice,
	Page,
	PickerCard,
	PickerGrid,
	PickerLabel,
	PickerList,
	PrimaryAction,
	SecondaryAction,
	Section,
	SectionHeading,
	SectionLead,
	SectionTitle,
	Shell,
	Timeline,
	TimelineCopy,
	TimelineDate,
	TimelineItem,
	Title
} from './AlternativeSheetUpdate.styles';

const highlights = [
	{
		icon: HeartPulse,
		title: 'Your table state, at a glance',
		copy: 'HP, temporary HP, Mana, Stamina, Rest, Grit, and Exhaustion stay together. Resources your character does not use stay out of the way.'
	},
	{
		icon: ShieldCheck,
		title: 'Combat without hunting',
		copy: 'Attack, Save DC, Initiative, movement, defenses, and damage reduction share one compact combat view with clearer Hit, Heavy, and Brutal tiers.'
	},
	{
		icon: Dices,
		title: 'Roll from the sheet',
		copy: 'Attributes, saves, skills, trades, and combat checks connect directly to the dice roller. Formula tooltips explain where key numbers come from.'
	},
	{
		icon: Gauge,
		title: 'Only relevant tools appear',
		copy: 'Spell and Maneuver tabs appear when the character can use them. Mana Spend Limit and Meta Magic guidance follow the same character capability data.'
	},
	{
		icon: Smartphone,
		title: 'Built to reflow',
		copy: 'Sections collapse, controls wrap, and dense combat information reorganizes for compact screens without dropping the details you need.'
	},
	{
		icon: Save,
		title: 'One character, one saved state',
		copy: 'The Primary and Alternative sheets use the same character record and autosave flow. Switching the presentation does not create a second copy.'
	}
];

const timeline = [
	{
		date: 'July 24',
		title: 'The new sheet takes shape',
		copy: 'The first alternative layout established a faster, card-based view of a saved character.'
	},
	{
		date: 'July 30',
		title: 'A complete playable presentation',
		copy: 'Resources, attributes, combat, actions, details, responsive layouts, and the saved-character entry point came together.'
	},
	{
		date: 'September 11–13',
		title: 'Attacks and campaign play mature',
		copy: 'Weapon details gained full rules context, formula help arrived, and campaign rosters began opening the exact connected character in either sheet.'
	},
	{
		date: 'September 14–18',
		title: 'Faster choices and active features',
		copy: 'Movement and defenses became denser, Rage became an active combat mode, and card-based pickers arrived for weapons, spells, and maneuvers.'
	}
];

const accent = (value: string) => ({ '--accent': value }) as CSSProperties;

export default function AlternativeSheetUpdate() {
	return (
		<Page>
			<Shell>
				<Hero>
					<Eyebrow>Player update · July–September 2026</Eyebrow>
					<Title>The new character sheet</Title>
					<Lead>
						A faster, clearer place to run your character at the table—built around the decisions
						and changes that matter during play.
					</Lead>
					<Actions>
						<PrimaryAction to="/load-character">
							Open your characters <ChevronRight size={18} aria-hidden="true" />
						</PrimaryAction>
						<SecondaryAction to="/create-character">Create a character</SecondaryAction>
					</Actions>
					<HeroNote>Choose Alternative Sheet from any saved, current-rules character.</HeroNote>
				</Hero>

				<Section aria-labelledby="highlights-title">
					<SectionHeading>
						<Eyebrow>What changed</Eyebrow>
						<SectionTitle id="highlights-title">Less sheet management. More play.</SectionTitle>
						<SectionLead>
							The alternative sheet reorganizes the same character into focused sections and keeps
							the most common table actions close at hand.
						</SectionLead>
					</SectionHeading>
					<FeatureGrid>
						{highlights.map(({ icon: Icon, title, copy }) => (
							<FeatureCard key={title}>
								<IconFrame>
									<Icon size={22} aria-hidden="true" />
								</IconFrame>
								<CardTitle>{title}</CardTitle>
								<CardCopy>{copy}</CardCopy>
							</FeatureCard>
						))}
					</FeatureGrid>
				</Section>

				<Section aria-labelledby="pickers-title">
					<SectionHeading>
						<Eyebrow>Faster choices</Eyebrow>
						<SectionTitle id="pickers-title">
							Choose from complete cards, not blank rows.
						</SectionTitle>
						<SectionLead>
							Add actions now open focused pickers. Compare the useful rules, choose once, and the
							complete entry lands on the sheet.
						</SectionLead>
					</SectionHeading>
					<PickerGrid>
						<PickerCard style={accent('#f7768e')}>
							<PickerLabel>Weapons</PickerLabel>
							<CardTitle>Inventory or full catalog</CardTitle>
							<PickerList>
								<li>Hit, Heavy, and Brutal damage</li>
								<li>Properties, weapon styles, and linked conditions</li>
								<li>Responsive list-and-detail selection</li>
							</PickerList>
						</PickerCard>
						<PickerCard style={accent('#bb9af7')}>
							<PickerLabel>Spells</PickerLabel>
							<CardTitle>Allowed spells or all spells</CardTitle>
							<PickerList>
								<li>School, tags, costs, range, and duration</li>
								<li>Sustained state, effects, passives, and enhancements</li>
								<li>Rules-aware allowed list for the next spell slot</li>
							</PickerList>
						</PickerCard>
						<PickerCard style={accent('#e0af68')}>
							<PickerLabel>Maneuvers</PickerLabel>
							<CardTitle>Full tactical preview</CardTitle>
							<PickerList>
								<li>Type, AP/SP cost, range, and timing</li>
								<li>Descriptions, triggers, and enhancements</li>
								<li>Already-known maneuvers stay out of the list</li>
							</PickerList>
						</PickerCard>
					</PickerGrid>
				</Section>

				<Section aria-labelledby="features-title">
					<Callout>
						<CalloutIcon>
							<Sparkles size={22} aria-hidden="true" />
						</CalloutIcon>
						<div>
							<Eyebrow>Features that change play</Eyebrow>
							<SectionTitle id="features-title">Rage now works from the combat panel.</SectionTitle>
							<SectionLead>
								Barbarians can switch Rage on or off with a two-state control, expand the complete
								rule, and see its damage, Precision Defense, and Might-save advantage reflected with
								a named source. This is the first active combat feature built into the sheet.
							</SectionLead>
						</div>
					</Callout>
				</Section>

				<Section aria-labelledby="table-title">
					<SectionHeading>
						<Eyebrow>At the table</Eyebrow>
						<SectionTitle id="table-title">The same character, wherever you open it.</SectionTitle>
					</SectionHeading>
					<FeatureGrid>
						<FeatureCard>
							<IconFrame>
								<Link2 size={22} aria-hidden="true" />
							</IconFrame>
							<CardTitle>Campaign-ready records</CardTitle>
							<CardCopy>
								A campaign connects to the character itself. The roster can open that exact record
								in the Primary or Alternative presentation.
							</CardCopy>
						</FeatureCard>
						<FeatureCard>
							<IconFrame>
								<LockKeyhole size={22} aria-hidden="true" />
							</IconFrame>
							<CardTitle>Safe shared viewing</CardTitle>
							<CardCopy>
								Other campaign members can inspect either sheet but cannot change the connected
								character. The owner keeps control of edits.
							</CardCopy>
						</FeatureCard>
						<FeatureCard>
							<IconFrame>
								<MousePointerClick size={22} aria-hidden="true" />
							</IconFrame>
							<CardTitle>Details when you ask for them</CardTitle>
							<CardCopy>
								Collapsible sections, nested weapon rules, condition details, and feature
								disclosures keep the default view compact without hiding the rules.
							</CardCopy>
						</FeatureCard>
					</FeatureGrid>
				</Section>

				<Section aria-labelledby="journey-title">
					<SectionHeading>
						<Eyebrow>From first shell to table-ready</Eyebrow>
						<SectionTitle id="journey-title">What landed, and when.</SectionTitle>
					</SectionHeading>
					<Timeline>
						{timeline.map(({ date, title, copy }) => (
							<TimelineItem key={date}>
								<TimelineDate>{date}</TimelineDate>
								<TimelineCopy>
									<h3>{title}</h3>
									<p>{copy}</p>
								</TimelineCopy>
							</TimelineItem>
						))}
					</Timeline>

					<Notice>
						<h3>Good to know</h3>
						<ul>
							<li>The Alternative Sheet is optional; the Primary Sheet remains available.</li>
							<li>
								Characters from older rules versions remain viewable, but only live resources and
								Exhaustion can be changed until the character is upgraded.
							</li>
							<li>Custom catalog creation still uses the existing dedicated tools.</li>
						</ul>
					</Notice>
				</Section>

				<Footer>
					<span>DC20Clean · Alternative Character Sheet update</span>
					<PrimaryAction to="/load-character">
						Try the new sheet <ChevronRight size={18} aria-hidden="true" />
					</PrimaryAction>
				</Footer>
			</Shell>
		</Page>
	);
}
