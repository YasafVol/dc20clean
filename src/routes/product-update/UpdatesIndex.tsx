import { ArrowRight, BookOpen, ExternalLink, Home, Layers3, Sparkles } from 'lucide-react';
import { latestProductUpdate, productUpdates } from './updates';
import {
	ActionLink,
	ArchiveNote,
	Eyebrow,
	Hero,
	HighlightList,
	Lead,
	MetaDivider,
	Page,
	Path,
	PathCopy,
	PathNumber,
	PathStep,
	PathStepLink,
	PathTitle,
	PrimaryAction,
	Section,
	SectionHeader,
	SectionLead,
	SectionTitle,
	SecondaryAction,
	Shell,
	Title,
	UpdateAside,
	UpdateCard,
	UpdateCopy,
	UpdateList,
	UpdateListCopy,
	UpdateListItem,
	UpdateListTitle,
	UpdateMeta,
	UpdateTitle
} from './UpdatesIndex.styles';

const pathSteps = [
	{
		label: 'Homepage',
		copy: 'See the latest release before you choose a tool.',
		href: '/menu',
		icon: Home
	},
	{
		label: "What's New",
		copy: 'Browse release notes in one stable, dated archive.',
		href: '/updates',
		icon: Layers3
	},
	{
		label: 'Update detail',
		copy: 'Understand what changed and why it matters at the table.',
		href: latestProductUpdate.updateHref,
		icon: BookOpen
	},
	{
		label: 'Try the change',
		copy: 'Open the live page where the new presentation is available.',
		href: latestProductUpdate.featureHref,
		icon: ExternalLink
	}
];

export default function UpdatesIndex() {
	return (
		<Page>
			<Shell>
				<Hero>
					<Eyebrow>DC20Clean · release notes</Eyebrow>
					<Title>What&apos;s New</Title>
					<Lead>
						A short, useful record of what changed in DC20Clean—and a direct path to the page where
						the change is ready to use.
					</Lead>
				</Hero>

				<Section aria-labelledby="path-title">
					<SectionHeader>
						<div>
							<Eyebrow>The path</Eyebrow>
							<SectionTitle id="path-title">From “new” to playable</SectionTitle>
							<SectionLead>
								Every release note points to the live feature, so the update is useful even after
								you finish reading it.
							</SectionLead>
						</div>
					</SectionHeader>
					<Path>
						{pathSteps.map(({ label, copy, href, icon: Icon }, index) => (
							<PathStep key={label}>
								<PathStepLink to={href} aria-label={`${label}: ${copy}`}>
									<PathNumber>{String(index + 1).padStart(2, '0')}</PathNumber>
									<PathTitle>
										<Icon size={16} aria-hidden="true" /> {label}
									</PathTitle>
									<PathCopy>{copy}</PathCopy>
								</PathStepLink>
							</PathStep>
						))}
					</Path>
				</Section>

				<Section aria-labelledby="latest-title">
					<SectionHeader>
						<div>
							<Eyebrow>Latest release</Eyebrow>
							<SectionTitle id="latest-title">Read the change, then use it.</SectionTitle>
						</div>
						<SecondaryAction to="/menu">Back to homepage</SecondaryAction>
					</SectionHeader>
					<UpdateCard>
						<div>
							<UpdateMeta>
								<span>{latestProductUpdate.kicker}</span>
								<MetaDivider aria-hidden="true">·</MetaDivider>
								<time dateTime={latestProductUpdate.dateTime}>{latestProductUpdate.date}</time>
							</UpdateMeta>
							<UpdateTitle>{latestProductUpdate.title}</UpdateTitle>
							<UpdateCopy>{latestProductUpdate.excerpt}</UpdateCopy>
							<HighlightList>
								{latestProductUpdate.highlights.map((highlight) => (
									<li key={highlight}>{highlight}</li>
								))}
							</HighlightList>
						</div>
						<UpdateAside>
							<PrimaryAction to={latestProductUpdate.updateHref}>
								Read the full update <ArrowRight size={17} aria-hidden="true" />
							</PrimaryAction>
							<ActionLink to={latestProductUpdate.featureHref}>
								{latestProductUpdate.featureLabel} <ExternalLink size={16} aria-hidden="true" />
							</ActionLink>
						</UpdateAside>
					</UpdateCard>
					<ArchiveNote>
						New releases will join this dated archive. Each entry should keep one clear “read” link
						and one direct link to the changed product surface.
					</ArchiveNote>
				</Section>

				<Section aria-labelledby="archive-title">
					<SectionHeader>
						<div>
							<Eyebrow>Archive</Eyebrow>
							<SectionTitle id="archive-title">All updates</SectionTitle>
							<SectionLead>
								Scan by date, headline, and the product surface that changed. New entries appear
								latest first.
							</SectionLead>
						</div>
					</SectionHeader>
					<UpdateList>
						{productUpdates.map((update) => (
							<UpdateListItem key={update.slug}>
								<div>
									<UpdateMeta>
										<span>{update.kicker}</span>
										<MetaDivider aria-hidden="true">·</MetaDivider>
										<time dateTime={update.dateTime}>{update.date}</time>
									</UpdateMeta>
									<UpdateListTitle>{update.title}</UpdateListTitle>
									<UpdateListCopy>{update.excerpt}</UpdateListCopy>
								</div>
								<UpdateAside>
									<PrimaryAction to={update.updateHref}>
										Read update <ArrowRight size={17} aria-hidden="true" />
									</PrimaryAction>
									<SecondaryAction to={update.featureHref}>{update.featureLabel}</SecondaryAction>
								</UpdateAside>
							</UpdateListItem>
						))}
					</UpdateList>
					<ArchiveNote>
						The archive currently contains {productUpdates.length} release. Each entry keeps one
						clear “read” link and one direct link to the changed product surface.
					</ArchiveNote>
				</Section>

				<Section aria-label="What this page is for">
					<SectionLead>
						<Sparkles size={16} aria-hidden="true" /> This is a reviewable content mockup: one real
						release is wired now, and the dated entry model leaves room for the next release without
						changing the navigation pattern.
					</SectionLead>
				</Section>
			</Shell>
		</Page>
	);
}
