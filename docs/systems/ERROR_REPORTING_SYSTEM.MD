# Error Reporting System

> Purpose: Define frontend error collection, deployment identity, source-map upload, and verification.
> Owns: Sentry startup, React error hooks, logger error forwarding, event sanitization, and source-map build configuration.
> Does not own: Product analytics, backend logging, session replay, performance tracing, legal approval, alert delivery, or provider retention.
> Authoritative source: `src/lib/monitoring/`, `src/main.tsx`, `src/lib/utils/logger.ts`, `vite.config.ts`, and Vercel Sentry integration variables.
> Related systems: `ANALYTICS_SYSTEM.MD`, `PRIVACY_AND_LEGAL_SYSTEM.MD`, `PROJECT_TECHNICAL_OVERVIEW.MD`, `TESTING_SYSTEM.MD`.
> Status: Active
> Last Updated: 2026-10-02

1. `src/main.tsx` imports the Sentry adapter before the app. A configured DSN initializes the SDK in production builds, including Vercel preview builds. Vite development stays disabled.
2. Vercel's integrated `SENTRY_DSN` takes precedence over legacy `VITE_SENTRY_DSN`. The build exposes only this public ingestion URL, environment, and release. `SENTRY_AUTH_TOKEN` remains build-only.
3. `VERCEL_ENV` supplies `production` or `preview`; `VERCEL_GIT_COMMIT_SHA` supplies the release. Local builds may explicitly set `VITE_APP_ENVIRONMENT` and `VITE_APP_RELEASE`; defaults are `development` and `local`.
4. The SDK captures unhandled browser errors and rejected promises. React 19 root hooks capture caught, uncaught, and recoverable React errors. `logger.error` forwards its operation message and context tag through the initialized SDK, without its data object or log-session identifier.
5. The sanitizer removes user data, extras, contexts, and breadcrumbs, strips request headers/body and URL credentials/query/hash, and normalizes private application routes. Message URLs, email addresses, and quoted values are redacted; messages are limited to 500 characters. Exception types and stack traces remain for diagnosis. Automatic exception messages may still contain unquoted text; application code must not embed user content in thrown errors. Sentry's default server-side scrubbing provides an additional boundary. The integrated project also prevents IP storage and removes `[$user.geo.**]` with an advanced `[Remove] [Anything]` rule; IP suppression alone still permits server-added geolocation.
6. Performance tracing and replay are not installed. Sentry's error SDK does not provide the application's structured log stream or backend monitoring. An empty Logs screen is not evidence that error capture failed.
7. When `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` are supplied together, the last Vite plugin uploads hidden source maps and deletes `dist/**/*.map` after upload. Upload failures fail the hosted build. Builds without upload credentials generate no maps.
8. Verify SDK delivery with a clearly labeled manual diagnostic and inspect environment, release, and sanitized event fields in Sentry. Verify source-map processing against the exact deployed asset and debug ID. Distinguish diagnostics from an organically occurring hosted-app exception; a missing character returns `Character not found` without logging an error. Do not create corrupt records or leave a public test-error button. Browser privacy preferences may suppress analytics; do not change them to make a check pass.
