// This flag gates the draft legal pages and optional analytics-consent UI.
// It does not control whether product analytics is collected.
export const isLegalConsentFlowEnabled = import.meta.env.VITE_ENABLE_LEGAL_CONSENT_FLOW === 'true';
