import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppAuth } from '../auth/AuthModeContext';
import { useCurrentUser } from '../auth/CurrentUserContext';
import { isAnalyticsEnabled, updateAnalyticsContext } from '../../lib/analytics/posthog';
import { hasAnalyticsConsent, subscribeToAnalyticsConsent } from '../../lib/analytics/consent';
import { isLegalConsentFlowEnabled } from '../../lib/analytics/config';

export function PostHogLifecycle() {
	const location = useLocation();
	const { isConvexEnabled, isLoading } = useAppAuth();
	const currentUser = useCurrentUser();
	const consented = useSyncExternalStore(
		subscribeToAnalyticsConsent,
		hasAnalyticsConsent,
		() => false
	);
	const permitted = !isLegalConsentFlowEnabled || consented;
	const previousUserIdRef = useRef<string | null | undefined>(undefined);
	const previousPageRef = useRef<string | null>(null);

	const userId = currentUser?.userId ?? null;
	const isUserPending = isConvexEnabled && (isLoading || currentUser === undefined);
	const pageKey = `${location.pathname}${location.search}`;

	useEffect(() => {
		if (!isAnalyticsEnabled || !permitted || isUserPending) {
			if (!permitted) {
				previousUserIdRef.current = undefined;
				previousPageRef.current = null;
			}
			return;
		}

		const previousUserId = previousUserIdRef.current;
		const identityChanged = previousUserId !== userId;
		const pageChanged = previousPageRef.current !== pageKey;
		if (!identityChanged && !pageChanged) {
			return;
		}

		previousUserIdRef.current = userId;
		previousPageRef.current = pageKey;
		void updateAnalyticsContext({
			userId,
			accountCreatedAt: currentUser?.createdAt,
			previousUserId,
			pageUrl: pageChanged ? window.location.href : undefined
		});
	}, [permitted, currentUser?.createdAt, isUserPending, pageKey, userId]);

	return null;
}
