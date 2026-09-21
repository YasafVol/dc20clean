// CookieConsent owns the persisted choice. This in-memory state stays false until
// its current, valid consent record has been read on this page load.
let analyticsConsent = false;
const listeners = new Set<() => void>();

export function hasAnalyticsConsent(): boolean {
	return analyticsConsent;
}

export function subscribeToAnalyticsConsent(listener: () => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function setAnalyticsConsent(consented: boolean): void {
	if (analyticsConsent === consented) return;
	analyticsConsent = consented;
	for (const listener of listeners) listener();
}
