/**
 * Tokyo Night Theme for DC20 Character Sheet
 * Modern, dark color palette with excellent contrast
 */

export const theme = {
	// Background colors - reference CSS variables
	colors: {
		bg: {
			primary: 'var(--bg-primary)',
			secondary: 'var(--bg-secondary)',
			tertiary: 'var(--bg-tertiary)',
			elevated: 'var(--bg-elevated)'
		},

		// Accent colors - reference CSS variables
		accent: {
			primary: 'var(--crystal-primary)',
			secondary: 'var(--crystal-secondary)',
			warning: 'var(--accent-warning)',
			danger: 'var(--accent-danger)',
		success: 'var(--accent-success)',
		info: 'var(--crystal-tertiary)',

		// Alpha variants for accent colors
		dangerAlpha10: 'var(--accent-danger-10)',
		dangerAlpha20: 'var(--accent-danger-20)',
		dangerAlpha30: 'var(--accent-danger-30)',
		dangerAlpha40: 'var(--accent-danger-40)',

		warningAlpha10: 'var(--accent-warning-10)',
		warningAlpha20: 'var(--accent-warning-20)',
		warningAlpha30: 'var(--accent-warning-30)',
		warningAlpha40: 'var(--accent-warning-40)',

		infoAlpha20: 'var(--crystal-tertiary-20)',
		infoAlpha30: 'var(--crystal-tertiary-30)',

		secondaryAlpha10: 'var(--crystal-secondary-10)',
		secondaryAlpha20: 'var(--crystal-secondary-20)',
		secondaryAlpha30: 'var(--crystal-secondary-30)',
		secondaryAlpha40: 'var(--crystal-secondary-40)'
	},

	// Resource colors - reference CSS variables
	resource: {
		health: 'var(--accent-danger)',
		mana: 'var(--crystal-tertiary)',
		stamina: 'var(--accent-warning)',
		grit: 'var(--accent-success)'
	},

		// Text colors - reference CSS variables
		text: {
			primary: 'var(--text-primary)',
			secondary: 'var(--text-secondary)',
			muted: 'var(--text-muted)',
			inverse: 'var(--bg-primary)'
		},

		// Attribute colors - reference CSS variables
		attribute: {
			might: 'var(--accent-danger)',
			agility: 'var(--accent-success)',
			charisma: 'var(--accent-warning)',
			intelligence: 'var(--crystal-primary)'
		},

		// Crystal/Icy theme colors (for dice roller and effects) - reference CSS variables
		crystal: {
			// Primary icy blue colors
			primary: 'var(--crystal-primary)',
			primaryLight: 'var(--crystal-primary-light)',
			primaryDark: 'var(--crystal-primary-dark)',

			// Secondary crystal colors
			secondary: 'var(--crystal-secondary)',
			tertiary: 'var(--crystal-tertiary)',

// RGBA variations for transparency effects - reference CSS variables
		primaryAlpha10: 'var(--crystal-primary-10)',
		primaryAlpha20: 'var(--crystal-primary-20)',
		primaryAlpha30: 'var(--crystal-primary-30)',
		primaryAlpha40: 'var(--crystal-primary-40)',
		primaryAlpha50: 'var(--crystal-primary-50)',
		primaryAlpha60: 'var(--crystal-primary-60)',
		primaryAlpha70: 'var(--crystal-primary-70)',
		primaryAlpha80: 'var(--crystal-primary-80)',
		primaryAlpha90: 'var(--crystal-primary-90)',

		secondaryAlpha30: 'var(--crystal-secondary-30)',
		secondaryAlpha50: 'var(--crystal-secondary-50)',
		secondaryAlpha60: 'var(--crystal-secondary-60)',
		secondaryAlpha70: 'var(--crystal-secondary-70)',
		secondaryAlpha80: 'var(--crystal-secondary-80)',
		secondaryAlpha90: 'var(--crystal-secondary-90)',
		secondaryAlpha100: 'var(--crystal-secondary)',

		tertiaryAlpha30: 'var(--crystal-tertiary-30)',
		tertiaryAlpha50: 'var(--crystal-tertiary-50)',
		tertiaryAlpha60: 'var(--crystal-tertiary-60)',
		tertiaryAlpha70: 'var(--crystal-tertiary-70)',
		tertiaryAlpha80: 'var(--crystal-tertiary-80)',

			// Dice-specific colors (for visual differentiation)
			dice: {
				d20: { bg: 'var(--crystal-primary-30)', text: 'var(--crystal-primary-light)' },
				d12: { bg: 'var(--crystal-tertiary-30)', text: 'var(--crystal-tertiary-light)' },
				d10: { bg: 'var(--accent-warning-25)', text: 'var(--accent-warning-light)' },
				d8: { bg: 'var(--accent-success-25)', text: 'var(--accent-success-light)' },
				d6: { bg: 'var(--accent-danger-25)', text: 'var(--accent-danger-light)' },
				d4: { bg: 'var(--crystal-tertiary-30)', text: 'var(--crystal-tertiary-light)' },
				default: { bg: 'var(--black-30)', text: 'var(--text-primary)' }
			},

			// Result state colors
			result: {
				critSuccess: 'var(--accent-success-light)',
				critSuccessBg: 'var(--crystal-primary-80)',
				critFail: 'var(--accent-danger-light)',
				critFailBg: 'var(--accent-danger-60)',
				max: 'var(--accent-success-light)',
				min: 'var(--crystal-tertiary-light)'
			},

			// Glow effects
			glow: {
				primary: 'var(--crystal-primary-60)',
				secondary: 'var(--crystal-primary-80)',
				ember: 'var(--crystal-primary-80)'
			}
		},

		// Semantic colors - reference CSS variables
		border: {
			default: 'var(--border-default)',
			focus: 'var(--crystal-primary)'
		}
	},

	// Typography
	typography: {
		fontFamily: {
			primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			mono: "'JetBrains Mono', 'Fira Code', monospace"
		},
		fontSize: {
			xs: '0.75rem', // 12px
			sm: '0.875rem', // 14px
			base: '1rem', // 16px
			lg: '1.125rem', // 18px
			xl: '1.25rem', // 20px
			'2xl': '1.5rem', // 24px
			'3xl': '1.875rem', // 30px
			'4xl': '2.25rem' // 36px
		},
		fontWeight: {
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700
		},
		lineHeight: {
			tight: 1.25,
			normal: 1.5,
			relaxed: 1.75
		}
	},

	// Spacing
	spacing: {
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		8: '2rem', // 32px
		10: '2.5rem', // 40px
		12: '3rem' // 48px
	},

	// Shadows
	shadows: {
		sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
		xl: '0 20px 25px rgba(0, 0, 0, 0.3)'
	},

	// Border radius
	borderRadius: {
		sm: '0.25rem',
		md: '0.5rem',
		lg: '0.75rem',
		xl: '1rem',
		full: '9999px'
	},

	// Transitions
	transitions: {
		fast: '150ms ease-in-out',
		base: '200ms ease-in-out',
		slow: '300ms ease-in-out'
	},

	// Z-index
	zIndex: {
		base: 0,
		dropdown: 1000,
		sticky: 1100,
		fixed: 1200,
		modalBackdrop: 1300,
		modal: 1400,
		popover: 1500,
		tooltip: 1600
	},

	// Responsive Breakpoints (px values)
	breakpoints: {
		mobile: 768,
		tablet: 1024,
		desktop: 1440,
		wide: 1920
	}
} as const;

export type Theme = typeof theme;

// Media Query Helpers - Reusable across all components
// Usage: ${media.mobile} { styles... }
export const media = {
	// Mobile-first approach: styles apply to this size and DOWN
	mobile: `@media (max-width: ${theme.breakpoints.mobile}px)`,

	// Tablet range: between mobile and desktop
	tablet: `@media (min-width: ${theme.breakpoints.mobile + 1}px) and (max-width: ${theme.breakpoints.tablet}px)`,

	// Tablet and below (mobile + tablet)
	tabletDown: `@media (max-width: ${theme.breakpoints.tablet}px)`,

	// Desktop and up
	desktop: `@media (min-width: ${theme.breakpoints.tablet + 1}px)`,

	// Wide screens
	wide: `@media (min-width: ${theme.breakpoints.wide}px)`,

	// Hover-capable devices (prevents hover effects on touch devices)
	hover: '@media (hover: hover) and (pointer: fine)'
} as const;
