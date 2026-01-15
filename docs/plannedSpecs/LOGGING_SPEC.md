# Logging System Implementation Specification

## Overview

This specification details the implementation of a centralized logging system for the DC20 Character Creator, integrating Vercel Analytics for metrics, Sentry for error tracking, and preparing for future Convex server-side logging.

**Status**: Planned  
**Priority**: Medium  
**Dependencies**: None (Convex integration is additive)

---

## Goals

1. **Centralized Logging** - Replace 399+ scattered `console.*` calls with a unified logger service
2. **Environment-Aware** - Debug logs in development only; warnings/errors in production
3. **Metrics Collection** - Track feature usage via Vercel Analytics
4. **Error Tracking** - Capture JavaScript errors with context via Sentry
5. **Future-Ready** - Prepared for Convex server-side logging when integrated

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         React App                               │
│                             │                                   │
│              ┌──────────────┼──────────────┐                    │
│              ▼              ▼              ▼                    │
│       ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│       │  Logger  │   │  Vercel  │   │  Sentry  │               │
│       │ Service  │   │ Analytics│   │   SDK    │               │
│       └────┬─────┘   └────┬─────┘   └────┬─────┘               │
│            │              │              │                      │
│    ┌───────┴───────┐      │              │                      │
│    ▼               ▼      ▼              ▼                      │
│ Console         Buffer  Vercel       Sentry                     │
│ (Dev)           (Batch) Dashboard    Dashboard                  │
│                    │                                            │
│                    └──────► Convex Logs (Future)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Logger Service API

### File Location
`src/lib/utils/logger.ts`

### Type Definitions

```typescript
/**
 * Log severity levels
 * - debug: Detailed information for debugging (dev only)
 * - info: General operational information
 * - warn: Warning conditions that should be reviewed
 * - error: Error conditions that need attention
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Log context categories for filtering and grouping
 */
type LogContext = 
  | 'storage'      // localStorage/Convex operations
  | 'calculation'  // Character calculation engine
  | 'auth'         // Authentication flows
  | 'pdf'          // PDF export operations
  | 'ui'           // UI interactions and navigation
  | 'migration';   // Schema migration operations

/**
 * Structured log entry
 */
interface LogEntry {
  level: LogLevel;
  context: LogContext;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
  sessionId: string;
}
```

### Public API

```typescript
export const logger = {
  /**
   * Debug level - Development only, suppressed in production
   * Use for: Detailed debugging information, variable dumps, flow tracing
   */
  debug: (context: LogContext, message: string, data?: object) => void;

  /**
   * Info level - Operational information
   * Use for: Feature usage, successful operations, state changes
   */
  info: (context: LogContext, message: string, data?: object) => void;

  /**
   * Warn level - Warning conditions
   * Use for: Validation failures, deprecated usage, recoverable issues
   */
  warn: (context: LogContext, message: string, data?: object) => void;

  /**
   * Error level - Error conditions (also sent to Sentry)
   * Use for: Exceptions, failed operations, unrecoverable issues
   */
  error: (context: LogContext, message: string, data?: object) => void;

  /**
   * Track a custom event in Vercel Analytics
   * Use for: Feature usage metrics, conversion tracking
   */
  track: (event: string, properties?: object) => void;

  /**
   * Set user context for Sentry (after authentication)
   */
  setUser: (userId: string | null) => void;

  /**
   * Get current session ID for correlation
   */
  getSessionId: () => string;
};
```

---

## Service Integrations

### Vercel Analytics

**Package**: `@vercel/analytics`  
**Cost**: Free (included with Vercel hosting)

**Setup** (`src/main.tsx`):
```typescript
import { Analytics } from '@vercel/analytics/react';

// In render
<Analytics />
```

**Tracked Events**:
| Event | Properties | Trigger |
|-------|------------|---------|
| `character_creation_started` | `{ classId }` | User begins creation |
| `character_creation_completed` | `{ classId, level, duration }` | Character saved |
| `character_creation_abandoned` | `{ lastStage, duration }` | User leaves without saving |
| `pdf_export_started` | `{ characterId }` | Export button clicked |
| `pdf_export_completed` | `{ characterId, sizeBytes }` | PDF generated |
| `pdf_export_failed` | `{ characterId, error }` | Export error |
| `auth_signin_started` | `{ provider }` | Sign-in initiated |
| `auth_signin_completed` | `{ provider }` | Sign-in successful |

### Sentry

**Package**: `@sentry/react`  
**Cost**: Free tier (5,000 errors/month)

**Setup** (`src/main.tsx`):
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  enabled: import.meta.env.PROD,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Error Context**:
```typescript
Sentry.setTag('feature', 'pdf-export');
Sentry.setContext('character', {
  id: characterId,
  class: className,
  level: level,
});
```

### Convex (Future)

When Convex is integrated, add a logs table:

**Schema** (`convex/schema.ts`):
```typescript
logs: defineTable({
  level: v.string(),
  context: v.string(),
  message: v.string(),
  data: v.optional(v.any()),
  userId: v.optional(v.string()),
  sessionId: v.string(),
  timestamp: v.number(),
})
  .index('by_level', ['level'])
  .index('by_user', ['userId'])
  .index('by_session', ['sessionId'])
  .index('by_timestamp', ['timestamp'])
```

**Mutation** (`convex/logs.ts`):
```typescript
export const write = mutation({
  args: {
    level: v.string(),
    context: v.string(),
    message: v.string(),
    data: v.optional(v.any()),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    await ctx.db.insert('logs', {
      ...args,
      userId: identity?.subject,
      timestamp: Date.now(),
    });
  },
});
```

---

## Environment Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_LOG_LEVEL` | Minimum log level to output | `warn` (prod), `debug` (dev) |
| `VITE_SENTRY_DSN` | Sentry Data Source Name | (none - disabled) |
| `VITE_ENABLE_ANALYTICS` | Enable Vercel Analytics | `true` |
| `VITE_LOG_TO_CONVEX` | Send logs to Convex (future) | `false` |

### Log Level Filtering

| Environment | debug | info | warn | error |
|-------------|-------|------|------|-------|
| Development | ✅ | ✅ | ✅ | ✅ |
| Production | ❌ | ❌ | ✅ | ✅ |
| Production + Sentry | ❌ | ❌ | ✅ | ✅ + Sentry |

---

## Critical Flow Instrumentation

### Storage Operations (`src/lib/utils/storageUtils.ts`)

```typescript
// getAllSavedCharacters()
logger.info('storage', 'Loading characters from localStorage', { count });

// saveAllCharacters()
logger.info('storage', 'Saved characters to localStorage', { count });
logger.error('storage', 'Failed to save characters', { error: err.message });

// getCharacterById()
logger.debug('storage', 'Looking up character', { characterId });
logger.warn('storage', 'Character not found', { characterId });

// deserializeCharacterFromStorage()
logger.debug('storage', 'Deserializing character', { id, schemaVersion });
logger.info('storage', 'Migrated character schema', { id, from, to });
logger.error('storage', 'Failed to parse character', { error: err.message });

// backupCharacterData()
logger.info('storage', 'Character data backed up', { timestamp });

// restoreFromBackup()
logger.info('storage', 'Restored from backup', { success: true });
logger.warn('storage', 'No backup found to restore');
```

### Character Calculation (`src/lib/services/enhancedCharacterCalculator.ts`)

```typescript
// calculateCharacterWithBreakdowns()
const startTime = performance.now();
// ... calculation ...
logger.debug('calculation', 'Calculation complete', {
  classId,
  level,
  durationMs: performance.now() - startTime,
});

// Validation errors
logger.warn('calculation', 'Validation error', {
  code: 'MASTERY_CAP_EXCEEDED',
  details: error,
});

// Calculation failure
logger.error('calculation', 'Calculation failed', {
  classId,
  error: err.message,
});
```

### PDF Export (`src/lib/pdf/fillPdf.ts`)

```typescript
// fillPdfFromData()
logger.info('pdf', 'Export started', { characterId, version });
logger.track('pdf_export_started', { characterId });

// Success
logger.info('pdf', 'Export complete', { characterId, sizeBytes, durationMs });
logger.track('pdf_export_completed', { characterId, sizeBytes });

// Failure
logger.error('pdf', 'Export failed', { characterId, error: err.message });
logger.track('pdf_export_failed', { characterId, error: err.message });
```

### Authentication (`src/components/auth/`)

```typescript
// SignIn.tsx
logger.info('auth', 'Sign-in started', { provider });
logger.track('auth_signin_started', { provider });

logger.info('auth', 'Sign-in successful', { provider });
logger.track('auth_signin_completed', { provider });

logger.error('auth', 'Sign-in failed', { provider, error: err.message });

// AuthGuard.tsx
logger.info('auth', 'Feature gate triggered', { feature, authenticated });
```

### Character Creation (`src/routes/character-creation/CharacterCreation.tsx`)

```typescript
// Stage navigation
logger.info('ui', 'Creation stage changed', { from: prev, to: current, characterId });

// Character completion
logger.info('ui', 'Character creation complete', { characterId, className, level });
logger.track('character_creation_completed', { classId, level, durationMs });

// Abandonment (on unmount without save)
logger.info('ui', 'Character creation abandoned', { lastStage, durationMs });
logger.track('character_creation_abandoned', { lastStage, durationMs });
```

---

## Migration Checklist

### Phase 1: Setup
- [ ] Create `src/lib/utils/logger.ts`
- [ ] Install `@vercel/analytics`
- [ ] Install `@sentry/react`
- [ ] Add environment variables to `.env.example`
- [ ] Configure Sentry in `src/main.tsx`
- [ ] Add Vercel Analytics to `src/main.tsx`

### Phase 2: Instrument Core Services
- [ ] `src/lib/utils/storageUtils.ts` (29 console calls)
- [ ] `src/lib/services/characterCompletion.ts` (16 console calls)
- [ ] `src/lib/services/enhancedCharacterCalculator.ts` (8 console calls)
- [ ] `src/lib/services/spellAssignment.ts` (9 console calls)

### Phase 3: Instrument UI
- [ ] `src/routes/character-creation/CharacterCreation.tsx`
- [ ] `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- [ ] `src/components/auth/*.tsx`
- [ ] `src/lib/pdf/fillPdf.ts`

### Phase 4: Cleanup
- [ ] Search and replace remaining `console.log` calls
- [ ] Search and replace remaining `console.warn` calls
- [ ] Search and replace remaining `console.error` calls
- [ ] Add ESLint rule: `'no-console': ['error', { allow: [] }]`
- [ ] Remove emoji prefixes from log messages

### Phase 5: Verification
- [ ] Verify no console output in production build
- [ ] Verify Vercel Analytics receiving events
- [ ] Verify Sentry receiving errors (test with intentional error)
- [ ] Verify development logs appear correctly

---

## ESLint Configuration

Add to `eslint.config.js` after migration:

```javascript
{
  rules: {
    'no-console': ['error', { allow: [] }],
  },
  overrides: [
    {
      // Allow console in logger utility only
      files: ['src/lib/utils/logger.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      // Allow console in scripts
      files: ['scripts/**/*.ts', 'scripts/**/*.mjs'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
}
```

---

## Testing

### Unit Tests
- Logger correctly filters by log level
- Logger includes session ID in all entries
- Sentry integration captures errors with context
- Analytics events have correct properties

### Manual Testing
1. Set `VITE_LOG_LEVEL=debug` and verify all logs appear
2. Set `VITE_LOG_LEVEL=error` and verify only errors appear
3. Trigger an error and verify it appears in Sentry
4. Complete character creation and verify analytics event

---

## References

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Sentry React SDK](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Convex Logging](https://docs.convex.dev/production/logging)
- `docs/systems/DATABASE_SYSTEM.MD` - Storage architecture
- `docs/systems/PDF_EXPORT_SYSTEM.MD` - Export flow

---

> Last updated: 2026-01-15  
> Status: Planned  
> Maintainer: @DC20Clean-Team
