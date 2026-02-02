/**
 * Tokyo Night Theme for DC20 Character Sheet
 * Modern, dark color palette with excellent contrast
 */

export const theme = {
	// Background colors
	colors: {
		bg: {
			primary: '#1A1B26',
			secondary: '#24283B',
			tertiary: '#414868',
			elevated: '#2C2E3E'
		},

		// Accent colors
		accent: {
			primary: '#7DCFFF',
			secondary: '#BB9AF7',
			warning: '#E0AF68',
			danger: '#F7768E',
			success: '#9ECE6A'
		},

		// Resource colors
		resource: {
			health: '#F7768E',
			mana: '#7AA2F7',
			stamina: '#E0AF68',
			grit: '#9ECE6A'
		},

		// Text colors
		text: {
			primary: '#C0CAF5',
			secondary: '#9AA5CE',
			muted: '#565F89',
			inverse: '#1A1B26'
		},

		// Attribute colors
		attribute: {
			might: '#F7768E',
			agility: '#9ECE6A',
			charisma: '#E0AF68',
			intelligence: '#7DCFFF'
		},

		// Crystal/Icy theme colors (for dice roller and effects)
		crystal: {
			// Primary icy blue colors
			primary: '#7DCFFF',
			primaryLight: '#c0e7ff',
			primaryDark: '#5aa3d9',

			// Secondary crystal colors
			secondary: '#7aa2f7',
			tertiary: '#9aa5ce',

			// RGBA variations for transparency effects
			primaryAlpha: {
				10: 'rgba(125, 207, 255, 0.1)',
				20: 'rgba(125, 207, 255, 0.2)',
				30: 'rgba(125, 207, 255, 0.3)',
				40: 'rgba(125, 207, 255, 0.4)',
				50: 'rgba(125, 207, 255, 0.5)',
				60: 'rgba(125, 207, 255, 0.6)',
				70: 'rgba(125, 207, 255, 0.7)',
				80: 'rgba(125, 207, 255, 0.8)',
				90: 'rgba(125, 207, 255, 0.9)'
			},
			secondaryAlpha: {
				30: 'rgba(90, 163, 217, 0.3)',
				50: 'rgba(90, 163, 217, 0.5)',
				60: 'rgba(90, 163, 217, 0.6)',
				70: 'rgba(90, 163, 217, 0.7)',
				80: 'rgba(90, 163, 217, 0.8)',
				90: 'rgba(90, 163, 217, 0.9)',
				100: 'rgba(90, 163, 217, 1)'
			},
			tertiaryAlpha: {
				30: 'rgba(122, 162, 247, 0.3)',
				50: 'rgba(122, 162, 247, 0.5)',
				60: 'rgba(122, 162, 247, 0.6)',
				70: 'rgba(122, 162, 247, 0.7)',
				80: 'rgba(122, 162, 247, 0.8)'
			},

			// Dice-specific colors (for visual differentiation)
			dice: {
				d20: { bg: 'rgba(125, 207, 255, 0.3)', text: '#c0e7ff' },
				d12: { bg: 'rgba(122, 162, 247, 0.3)', text: '#b8d0ff' },
				d10: { bg: 'rgba(251, 191, 36, 0.25)', text: '#ffe8a3' },
				d8: { bg: 'rgba(34, 197, 94, 0.25)', text: '#b3ffcc' },
				d6: { bg: 'rgba(239, 68, 68, 0.25)', text: '#ffb3b3' },
				d4: { bg: 'rgba(154, 165, 206, 0.3)', text: '#c8cfed' },
				default: { bg: 'rgba(139, 69, 19, 0.3)', text: '#ffffff' }
			},

			// Result state colors
			result: {
				critSuccess: '#b3ffcc',
				critSuccessBg: 'rgba(125, 207, 255, 0.8)',
				critFail: '#ffb3b3',
				critFailBg: 'rgba(239, 68, 68, 0.6)',
				max: '#b3ffcc',
				min: '#d4dbff'
			},

			// Glow effects
			glow: {
				primary: 'rgba(125, 207, 255, 0.6)',
				secondary: 'rgba(125, 207, 255, 0.8)',
				ember: 'rgba(125, 207, 255, 0.8)'
			}
		},

		// Semantic colors
		border: {
			default: '#3B4261',
			focus: '#7DCFFF'
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
	}
} as const;

export type Theme = typeof theme;
