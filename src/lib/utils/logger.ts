/**
 * Centralized Logger Service
 *
 * Provides structured logging with:
 * - Log levels (debug, info, warn, error)
 * - Context categories for filtering
 * - Session correlation
 * - Vercel Analytics integration
 * - Sentry error tracking integration
 *
 * @see docs/systems/LOGGING_SYSTEM.MD
 * @see docs/plannedSpecs/LOGGING_SPEC.md
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Log severity levels
 * - debug: Detailed information for debugging (dev only)
 * - info: General operational information
 * - warn: Warning conditions that should be reviewed
 * - error: Error conditions that need attention
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Log context categories for filtering and grouping
 */
export type LogContext =
	| 'storage' // localStorage/Convex operations
	| 'calculation' // Character calculation engine
	| 'auth' // Authentication flows
	| 'pdf' // PDF export operations
	| 'ui' // UI interactions and navigation
	| 'migration'; // Schema migration operations

/**
 * Structured log entry
 */
export interface LogEntry {
	level: LogLevel;
	context: LogContext;
	message: string;
	data?: Record<string, unknown>;
	timestamp: string;
	sessionId: string;
}

// ============================================================================
// Configuration
// ============================================================================

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3
};

/**
 * Get the minimum log level from environment
 * Default: 'debug' in development, 'warn' in production
 */
function getMinLogLevel(): LogLevel {
	const envLevel = import.meta.env.VITE_LOG_LEVEL as LogLevel | undefined;
	if (envLevel && LOG_LEVEL_PRIORITY[envLevel] !== undefined) {
		return envLevel;
	}
	return import.meta.env.DEV ? 'debug' : 'warn';
}

const MIN_LOG_LEVEL = getMinLogLevel();
const IS_DEV = import.meta.env.DEV;

// ============================================================================
// Session Management
// ============================================================================

/**
 * Generate a unique session ID for log correlation
 */
function generateSessionId(): string {
	const timestamp = Date.now().toString(36);
	const random = Math.random().toString(36).substring(2, 8);
	return `${timestamp}-${random}`;
}

// Session ID persists for the browser session
let sessionId: string | null = null;

function getSessionId(): string {
	if (!sessionId) {
		// Try to restore from sessionStorage for tab persistence
		const stored = sessionStorage.getItem('dc20_log_session_id');
		if (stored) {
			sessionId = stored;
		} else {
			sessionId = generateSessionId();
			sessionStorage.setItem('dc20_log_session_id', sessionId);
		}
	}
	return sessionId;
}

// ============================================================================
// Core Logging
// ============================================================================

/**
 * Check if a log level should be output
 */
function shouldLog(level: LogLevel): boolean {
	return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL];
}

/**
 * Format log message for console output
 */
function formatLogMessage(entry: LogEntry): string {
	const levelTag = entry.level.toUpperCase().padEnd(5);
	return `[${levelTag}][${entry.context}] ${entry.message}`;
}

/**
 * Core log function
 */
function log(level: LogLevel, context: LogContext, message: string, data?: object): void {
	if (!shouldLog(level)) {
		return;
	}

	const entry: LogEntry = {
		level,
		context,
		message,
		data: data as Record<string, unknown>,
		timestamp: new Date().toISOString(),
		sessionId: getSessionId()
	};

	// Console output
	const formattedMessage = formatLogMessage(entry);
	const consoleMethod = level === 'debug' ? 'log' : level;

	if (data && Object.keys(data).length > 0) {
		console[consoleMethod](formattedMessage, data);
	} else {
		console[consoleMethod](formattedMessage);
	}

	// Send errors to Sentry in production
	if (level === 'error' && !IS_DEV) {
		sendToSentry(entry);
	}
}

// ============================================================================
// Sentry Integration
// ============================================================================

/**
 * Send error to Sentry (lazy-loaded)
 */
function sendToSentry(entry: LogEntry): void {
	// Only send if Sentry DSN is configured
	if (!import.meta.env.VITE_SENTRY_DSN) {
		return;
	}

	// Dynamically import Sentry to avoid bundle bloat
	import('@sentry/react')
		.then((Sentry) => {
			Sentry.captureMessage(entry.message, {
				level: 'error',
				tags: {
					context: entry.context,
					sessionId: entry.sessionId
				},
				extra: entry.data
			});
		})
		.catch(() => {
			// Sentry not available, silently ignore
		});
}

/**
 * Set user context for Sentry
 */
function setUserContext(userId: string | null): void {
	if (!import.meta.env.VITE_SENTRY_DSN) {
		return;
	}

	import('@sentry/react')
		.then((Sentry) => {
			if (userId) {
				Sentry.setUser({ id: userId });
			} else {
				Sentry.setUser(null);
			}
		})
		.catch(() => {
			// Sentry not available
		});
}

// ============================================================================
// Vercel Analytics Integration
// ============================================================================

/**
 * Track custom event in Vercel Analytics
 */
function trackEvent(eventName: string, properties?: object): void {
	// Only track in production with analytics enabled
	if (IS_DEV || import.meta.env.VITE_ENABLE_ANALYTICS === 'false') {
		// Log in dev for debugging
		if (IS_DEV) {
			console.log(`[TRACK] ${eventName}`, properties);
		}
		return;
	}

	// Dynamically import analytics to avoid bundle bloat
	import('@vercel/analytics')
		.then(({ track }) => {
			track(eventName, properties);
		})
		.catch(() => {
			// Analytics not available
		});
}

// ============================================================================
// Public API
// ============================================================================

export const logger = {
	/**
	 * Debug level - Development only, suppressed in production
	 * Use for: Detailed debugging information, variable dumps, flow tracing
	 *
	 * @example
	 * logger.debug('storage', 'Loading character', { id: characterId });
	 */
	debug: (context: LogContext, message: string, data?: object): void => {
		log('debug', context, message, data);
	},

	/**
	 * Info level - Operational information
	 * Use for: Feature usage, successful operations, state changes
	 *
	 * @example
	 * logger.info('ui', 'Character creation complete', { classId, level });
	 */
	info: (context: LogContext, message: string, data?: object): void => {
		log('info', context, message, data);
	},

	/**
	 * Warn level - Warning conditions
	 * Use for: Validation failures, deprecated usage, recoverable issues
	 *
	 * @example
	 * logger.warn('calculation', 'Mastery cap exceeded', { skill, cap });
	 */
	warn: (context: LogContext, message: string, data?: object): void => {
		log('warn', context, message, data);
	},

	/**
	 * Error level - Error conditions (also sent to Sentry in production)
	 * Use for: Exceptions, failed operations, unrecoverable issues
	 *
	 * @example
	 * logger.error('pdf', 'Export failed', { characterId, error: err.message });
	 */
	error: (context: LogContext, message: string, data?: object): void => {
		log('error', context, message, data);
	},

	/**
	 * Track a custom event in Vercel Analytics
	 * Use for: Feature usage metrics, conversion tracking
	 *
	 * @example
	 * logger.track('pdf_export_completed', { characterId, sizeBytes });
	 */
	track: (eventName: string, properties?: object): void => {
		trackEvent(eventName, properties);
	},

	/**
	 * Set user context for Sentry (call after authentication)
	 *
	 * @example
	 * logger.setUser(userId); // After sign-in
	 * logger.setUser(null);   // After sign-out
	 */
	setUser: (userId: string | null): void => {
		setUserContext(userId);
	},

	/**
	 * Get current session ID for correlation
	 *
	 * @example
	 * const sessionId = logger.getSessionId();
	 */
	getSessionId: (): string => {
		return getSessionId();
	},

	/**
	 * Get current log configuration (for debugging)
	 */
	getConfig: (): { minLevel: LogLevel; isDev: boolean; sessionId: string } => {
		return {
			minLevel: MIN_LOG_LEVEL,
			isDev: IS_DEV,
			sessionId: getSessionId()
		};
	}
};

// Default export for convenience
export default logger;
