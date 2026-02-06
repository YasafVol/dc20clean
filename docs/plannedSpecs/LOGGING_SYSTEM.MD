# DC20Clean – Logging & Telemetry System

> **Status: WIP** – Implementation pending. See `docs/plannedSpecs/LOGGING_SPEC.md` for full specification.

> Purpose  
> Centralized logging, metrics collection, and error tracking for the DC20 Character Creator.

---

## 1. Overview

The logging system provides:

| Capability             | Service               | Status                        |
| ---------------------- | --------------------- | ----------------------------- |
| **Structured Logging** | Custom Logger Service | 🔄 WIP                        |
| **Usage Metrics**      | Vercel Analytics      | 🔄 WIP                        |
| **Error Tracking**     | Sentry                | 🔄 WIP                        |
| **Server Logs**        | Convex (built-in)     | ⏳ Pending Convex integration |

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         React App                               │
│                             │                                   │
│              ┌──────────────┼──────────────┐                    │
│              ▼              ▼              ▼                    │
│       ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│       │  Logger  │   │  Vercel  │   │  Sentry  │               │
│       │ Service  │   │ Analytics│   │   SDK    │               │
│       └──────────┘   └──────────┘   └──────────┘               │
│                                                                 │
│       Development:    Production:     Production:               │
│       Console output  Page metrics    Error capture             │
│                       Custom events   Stack traces              │
│                       Web Vitals      User context              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Log Levels

| Level   | Description             | Production          | Development |
| ------- | ----------------------- | ------------------- | ----------- |
| `debug` | Detailed debugging info | ❌ Suppressed       | ✅ Console  |
| `info`  | Operational information | ❌ Suppressed       | ✅ Console  |
| `warn`  | Warning conditions      | ✅ Console          | ✅ Console  |
| `error` | Error conditions        | ✅ Console + Sentry | ✅ Console  |

---

## 4. Log Contexts

Logs are categorized by context for filtering and analysis:

| Context       | Description                    | Key Events                       |
| ------------- | ------------------------------ | -------------------------------- |
| `storage`     | localStorage/Convex operations | Save, load, backup, migration    |
| `calculation` | Character calculation engine   | Calc complete, validation errors |
| `auth`        | Authentication flows           | Sign-in, sign-out, session       |
| `pdf`         | PDF export operations          | Export start, complete, fail     |
| `ui`          | UI interactions                | Stage changes, navigation        |
| `migration`   | Schema migrations              | Version upgrades, field changes  |

---

## 5. Logger API

**File**: `src/lib/utils/logger.ts` (WIP)

```typescript
import { logger } from '@/lib/utils/logger';

// Debug - development only
logger.debug('storage', 'Loading character', { id: characterId });

// Info - operational events
logger.info('ui', 'Character creation complete', { classId, level });

// Warn - recoverable issues
logger.warn('calculation', 'Mastery cap exceeded', { skill, cap });

// Error - failures (sent to Sentry in production)
logger.error('pdf', 'Export failed', { characterId, error: err.message });

// Track custom analytics event
logger.track('pdf_export_completed', { characterId, sizeBytes });
```

---

## 6. Critical Flow Instrumentation

### 6.1 Character Creation

| Event              | Level | Context | Data                              |
| ------------------ | ----- | ------- | --------------------------------- |
| Stage entered      | info  | ui      | `{ stage, characterId }`          |
| Validation warning | warn  | ui      | `{ message, field }`              |
| Creation complete  | info  | ui      | `{ characterId, classId, level }` |
| Creation abandoned | info  | ui      | `{ lastStage, duration }`         |

### 6.2 Character Calculation

| Event                | Level | Context     | Data                   |
| -------------------- | ----- | ----------- | ---------------------- |
| Calculation start    | debug | calculation | `{ classId, level }`   |
| Calculation complete | debug | calculation | `{ durationMs }`       |
| Validation error     | warn  | calculation | `{ code, details }`    |
| Calculation crash    | error | calculation | `{ error, buildData }` |

### 6.3 Storage Operations

| Event             | Level | Context | Data                        |
| ----------------- | ----- | ------- | --------------------------- |
| Characters loaded | info  | storage | `{ count, source }`         |
| Character saved   | info  | storage | `{ characterId, name }`     |
| Migration applied | info  | storage | `{ from, to, characterId }` |
| Parse/save failed | error | storage | `{ error, characterId }`    |

### 6.4 PDF Export

| Event           | Level | Context | Data                         |
| --------------- | ----- | ------- | ---------------------------- |
| Export started  | info  | pdf     | `{ characterId, version }`   |
| Export complete | info  | pdf     | `{ characterId, sizeBytes }` |
| Export failed   | error | pdf     | `{ characterId, error }`     |

### 6.5 Authentication

| Event            | Level | Context | Data                         |
| ---------------- | ----- | ------- | ---------------------------- |
| Sign-in started  | info  | auth    | `{ provider }`               |
| Sign-in success  | info  | auth    | `{ provider }`               |
| Sign-in failed   | error | auth    | `{ provider, error }`        |
| Feature gate hit | info  | auth    | `{ feature, authenticated }` |

---

## 7. Environment Configuration

| Variable                | Description             | Default                       |
| ----------------------- | ----------------------- | ----------------------------- |
| `VITE_LOG_LEVEL`        | Minimum log level       | `warn` (prod) / `debug` (dev) |
| `VITE_SENTRY_DSN`       | Sentry Data Source Name | (disabled if empty)           |
| `VITE_ENABLE_ANALYTICS` | Enable Vercel Analytics | `true`                        |

---

## 8. Metrics & Dashboards

### Vercel Analytics (Usage Metrics)

- Page views and navigation patterns
- Web Vitals (LCP, FID, CLS)
- Custom events (character creation, PDF export)
- Feature usage rates

### Sentry (Error Tracking)

- JavaScript exceptions with stack traces
- Error grouping and trends
- Browser/device context
- Session replay for errors

### Convex Dashboard (Future)

- Server function execution logs
- Query/mutation performance
- Authentication events
- Real-time log streaming

---

## 9. Key Files

| File                                | Purpose                  | Status      |
| ----------------------------------- | ------------------------ | ----------- |
| `src/lib/utils/logger.ts`           | Logger service           | 🔄 WIP      |
| `src/main.tsx`                      | Sentry & Analytics setup | 🔄 WIP      |
| `docs/plannedSpecs/LOGGING_SPEC.md` | Full implementation spec | ✅ Complete |

---

## 10. Related Systems

- **Database & Storage** — `docs/systems/DATABASE_SYSTEM.MD`
- **PDF Export** — `docs/systems/PDF_EXPORT_SYSTEM.MD`
- **Character Creation** — `docs/systems/CHARACTER_CREATION_FLOW.MD`
- **Calculation System** — `docs/systems/CALCULATION_SYSTEM.MD`
- **Convex Migration** — `docs/plannedSpecs/CONVEX_MIGRATION_SPEC.md`

---

> Last updated: 2026-01-15  
> Status: WIP  
> Maintainer: @DC20Clean-Team
