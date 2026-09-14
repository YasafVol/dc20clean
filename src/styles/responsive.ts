export const breakpoints = {
	tablet: 768,
	desktop: 1200
} as const;

export const media = {
	mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
	tabletUp: `@media (min-width: ${breakpoints.tablet}px)`,
	tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
	tabletDown: `@media (max-width: ${breakpoints.desktop - 1}px)`,
	desktop: `@media (min-width: ${breakpoints.desktop}px)`,
	// Compatibility alias. Wide layouts now share the desktop threshold.
	wide: `@media (min-width: ${breakpoints.desktop}px)`,
	hover: '@media (hover: hover) and (pointer: fine)'
} as const;
