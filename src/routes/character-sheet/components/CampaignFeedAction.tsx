import { useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { useAppAuth } from '../../../components/auth/AuthModeContext';
import { useCampaignNotifications } from '../hooks/useCampaignNotifications';
import { theme } from '../styles/theme';
import { CampaignFeedPanel } from './CampaignFeedPanel';

interface CampaignFeedTriggerProps {
	ariaLabel: string;
	content: ReactNode;
	onClick: () => void;
	title: string;
}

interface CampaignFeedActionProps {
	characterId: string;
	renderTrigger: (props: CampaignFeedTriggerProps) => ReactNode;
}

const Bell = styled.span`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;

const UnreadBadge = styled.span`
	position: absolute;
	top: -0.55rem;
	right: -0.65rem;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 16px;
	height: 16px;
	padding: 0 3px;
	background: ${theme.colors.accent.danger};
	color: #fff;
	border-radius: 9999px;
	font-size: 0.6rem;
	font-weight: 700;
	line-height: 1;
`;

function CampaignFeedActionInner({ characterId, renderTrigger }: CampaignFeedActionProps) {
	const { campaignName, events, unreadCount, markSeen, inCampaign } =
		useCampaignNotifications(characterId);
	const [feedOpen, setFeedOpen] = useState(false);

	if (!inCampaign) return null;

	const openFeed = () => {
		markSeen();
		setFeedOpen(true);
	};
	const label = unreadCount > 0 ? `Campaign feed, ${unreadCount} unread` : 'Campaign feed';
	const content = (
		<Bell>
			<span aria-hidden="true">🔔</span>
			{unreadCount > 0 ? (
				<UnreadBadge aria-hidden="true">{unreadCount > 99 ? '99+' : unreadCount}</UnreadBadge>
			) : null}
		</Bell>
	);

	return (
		<>
			{renderTrigger({ ariaLabel: label, content, onClick: openFeed, title: 'Campaign feed' })}
			{feedOpen && campaignName ? (
				<CampaignFeedPanel
					campaignName={campaignName}
					events={events}
					onClose={() => setFeedOpen(false)}
				/>
			) : null}
		</>
	);
}

export function CampaignFeedAction(props: CampaignFeedActionProps) {
	const { isConvexEnabled, isAuthenticated } = useAppAuth();
	if (!isConvexEnabled || !isAuthenticated) return null;
	return <CampaignFeedActionInner {...props} />;
}
