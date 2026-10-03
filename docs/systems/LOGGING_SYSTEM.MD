# Logging System

> Purpose: Define the shared frontend logger, console output, and forwarding boundaries.
> Owns: Log levels, context categories, tab correlation, console formatting, and the logger compatibility API.
> Does not own: PostHog collection contracts, Sentry sanitization and startup, backend logs, remote log storage, alerts, or provider retention.
> Authoritative source: `src/lib/utils/logger.ts`, `src/lib/analytics/posthog.ts`, and `src/lib/monitoring/sentry.ts`.
> Related systems: `ANALYTICS_SYSTEM.MD`, `ERROR_REPORTING_SYSTEM.MD`, `PROJECT_TECHNICAL_OVERVIEW.MD`, `TESTING_SYSTEM.MD`.
> Status: Active
> Last Updated: 2026-10-03

## 1. Runtime contract

1. `logger.debug`, `info`, `warn`, and `error` accept a context, operation message, and optional data object. Contexts are `storage`, `calculation`, `auth`, `pdf`, `ui`, and `migration`.
2. The minimum level defaults to `debug` in Vite development and `warn` in built deployments, including previews. A valid `VITE_LOG_LEVEL` overrides either default; debug is therefore not unconditionally disabled in production. Invalid values fall back to the default.
3. Accepted entries include an ISO timestamp and tab session identifier. Console output uses `[LEVEL][context] message` and passes the optional data object separately. Debug uses `console.log`; the other levels use their matching console method.
4. `dc20_log_session_id` in sessionStorage persists correlation across reloads of that tab. `getSessionId()` and `getConfig()` expose this local diagnostic state. It is not sent to Sentry or PostHog by the logger. Storage access is direct; the current logger does not provide a fallback when sessionStorage is unavailable.
5. An accepted `error` in a non-development build forwards only its operation message and context to the configured Sentry adapter. The data object, timestamp, and tab session identifier stay local. Keep messages static and free of user-authored content; the error-reporting system applies additional redaction.
6. `logger.track` calls the PostHog event adapter independently of the console threshold. Only registered events and validated properties pass. It does not upload console logs.
7. `logger.setUser` forwards the supplied ID to the Sentry adapter; its event sanitizer removes user data before transmission. PostHog identity is owned separately by its auth lifecycle.

## 2. Provider boundaries

1. Browser console output remains local. No batching, remote structured-log sink, or Vercel log drain is installed by this logger.
2. Sentry owns frontend exceptions, React errors, and forwarded logger errors. Its Logs product is not wired; an empty Logs screen does not indicate broken error capture.
3. PostHog owns explicit pageviews and the registered product actions. Console calls, warnings, arbitrary logger messages, and errors are not analytics events.
4. Existing direct `console.*` calls bypass the shared threshold and forwarding path. In particular, a direct `console.error` does not become a Sentry application-error event. Do not claim that every console line is centrally collected.
5. Convex backend logs remain in Convex; backend error ingestion, performance tracing, and replay are outside the current frontend wiring.
6. `docs/plannedSpecs/LOGGING_SPEC.md` is historical planning. Its proposed Vercel Analytics, batching, and broader console migration are not the shipped contract.

## 3. Maintenance and verification

1. Use a static operation message for failures and put local diagnostics in the optional console data object. Never add secrets to either field.
2. Adding an analytics action requires the event registry, value validation, focused tests, and the analytics specification to change together.
3. A Sentry delivery check must reach the configured hosted SDK and be found in the provider UI with the matching environment, release, and source mapping. A console line alone is insufficient evidence.
4. Preserve Do Not Track and Global Privacy Control in shipped code. Any explicitly approved diagnostic exception must remain confined to disposable test code and must be removed with that test deployment.
