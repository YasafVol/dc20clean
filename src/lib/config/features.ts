// Feature flags for enabling new systems during development
export const FEATURES = {
	NEW_EFFECT_SYSTEM:
		process.env.NODE_ENV === 'development' && process.env.VITE_NEW_EFFECTS === 'true'
};
