import { ArrowRight, ExternalLink } from 'lucide-react';
import { productUpdates } from './updates';
import {
	Eyebrow,
	FeatureLink,
	Header,
	Lead,
	Log,
	LogHeader,
	Page,
	ReadLink,
	Shell,
	Title,
	UpdateActions,
	UpdateArea,
	UpdateCopy,
	UpdateDate,
	UpdateList,
	UpdateRow,
	UpdateSummary,
	UpdateTitle
} from './UpdatesIndex.styles';

export default function UpdatesIndex() {
	return (
		<Page>
			<Shell>
				<Header>
					<div>
						<Eyebrow>Release log</Eyebrow>
						<Title>What&apos;s New</Title>
					</div>
					<Lead>Product changes, newest first.</Lead>
				</Header>

				<Log aria-label="Product updates">
					<LogHeader aria-hidden="true">
						<span>Date</span>
						<span>Update</span>
						<span>Area</span>
						<span>Links</span>
					</LogHeader>

					<UpdateList>
						{productUpdates.map((update) => (
							<UpdateRow key={update.slug}>
								<UpdateDate dateTime={update.dateTime}>{update.date}</UpdateDate>
								<UpdateSummary>
									<UpdateTitle>{update.title}</UpdateTitle>
									<UpdateCopy>{update.excerpt}</UpdateCopy>
								</UpdateSummary>
								<UpdateArea>{update.area}</UpdateArea>
								<UpdateActions>
									<ReadLink to={update.updateHref}>
										Read <ArrowRight size={15} aria-hidden="true" />
									</ReadLink>
									<FeatureLink to={update.featureHref}>
										{update.featureLabel} <ExternalLink size={14} aria-hidden="true" />
									</FeatureLink>
								</UpdateActions>
							</UpdateRow>
						))}
					</UpdateList>
				</Log>
			</Shell>
		</Page>
	);
}
