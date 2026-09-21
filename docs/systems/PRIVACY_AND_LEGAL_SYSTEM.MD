# Privacy and Legal System

> Purpose: Define the user-facing privacy choices, public legal-page wiring, feedback loading boundary, and release review for these features.
> Owns: Consent UI and persistence, legal-page presentation, public links, and the legal/consent feature flag.
> Does not own: Final legal determinations or attorney approval, Convex authentication, product telemetry event semantics, cloud retention settings, or account-deletion backend behavior.
> Authoritative source: `src/lib/analytics/config.ts`, `src/App.tsx`, `src/components/analytics/ConsentManager.tsx`, `src/lib/analytics/consent.ts`, `src/routes/legal/LegalPages.tsx`, `src/routes/legal/LegalPages.styles.ts`, `src/components/LegalFooter.tsx`, `src/components/auth/SignIn.tsx`, `src/components/UserbackFeedback.tsx`, `src/lib/feedback/userback.ts`, and `index.html`.
> Related systems: `ANALYTICS_SYSTEM.MD`, `DATABASE_SYSTEM.MD`, `PROJECT_TECHNICAL_OVERVIEW.MD`, `TESTING_SYSTEM.MD`.
> Status: Active technical implementation; legal copy remains draft and unapproved.
> Last Updated: 2026-09-21

## 1. Public surfaces

1. When `VITE_ENABLE_LEGAL_CONSENT_FLOW=true`, `/privacy` and `/terms` are public without authentication and linked from the global footer and Google sign-in UI. They share the app's dark indigo, gold, and blue document layout, with a prominent draft warning, readable sectioned article, and desktop in-page navigation. They are bilingual English/Spanish drafts with unresolved facts explicitly marked. When the flag is false, direct requests redirect to `/menu` and the links are hidden. Neither draft is approved legal text.
2. A separate cookie-policy page is not used. Essential browser storage and the optional PostHog localStorage identifier are described in the privacy notice and in the concise consent dialog.
3. The footer provides a Privacy settings button only when analytics and the legal/consent flow are both enabled. It opens the off-the-shelf CookieConsent preferences panel; essential storage is not switchable, analytics is optional in this mode. With the legal flow off and no configured feedback action, the footer is absent.
4. `LEGAL_NOTICE_VERSION` in the page and `ANALYTICS_NOTICE_REVISION` in the consent manager must be reviewed together. A material notice change increments the consent revision to request a fresh choice.

## 2. Consent boundary

1. `vanilla-cookieconsent` v3.1.0 renders the banner with equal-weight accept/refuse buttons and English/Spanish text. The `dc20clean_analytics_choice` preference cookie expires after 182 days and records its revision and choice timestamps. The cookie is an on-device preference record, not server-side proof of consent.
2. When the flow is enabled, in-memory analytics permission starts false on every load. The consent manager reads a valid, current-version cookie and notifies the analytics lifecycle. If permission is absent, refused, expired, or withdrawn, PostHog is not dynamically imported for new sessions or captures.
3. Once allowed, PostHog initializes opted out by default and explicitly opts in without an extra `$opt_in` event. On withdrawal the SDK clears user/session identity and opts out of persistence; in-flight app calls check permission again before sending. When an expired or invalid choice is found on a later visit, the app also removes stale, project-scoped PostHog storage without importing the SDK. Sign-in/out still follow the identity rules in `ANALYTICS_SYSTEM.MD`.
4. `VITE_ENABLE_LEGAL_CONSENT_FLOW` defaults to false and does not gate PostHog collection. With the flow off and analytics on, collection starts without an in-app choice, even if the visitor previously refused. The publication risks and browser acceptance cases are owned by `ANALYTICS_SYSTEM.MD` Section 8.1.

## 3. Feedback boundary

1. No Userback script loads from `index.html` or on application mount. A person explicitly opens the footer feedback control, sees a short disclosure, and chooses Continue before the script is requested.
2. Before opening Userback, only a normalized page type, storage provider, and auth/cloud booleans are set as application custom context. Character names/IDs, URL queries, element labels, and screen coordinates are not added to that custom context. The vendor widget can still observe the current page URL and technical browser context once loaded, and the person can choose to include private material in feedback or screenshots; the privacy notice says so.
3. Userback is not a PostHog analytics category. Review its widget configuration, storage, session-recording behavior, and provider terms before publication.

## 4. Publication checklist

1. Confirm operator legal identity, public privacy/contact address, jurisdictions and rights handling, intended ages, game-publisher attribution, and effective dates in both language versions.
2. Confirm actual retention/deletion procedures for account, game content, feedback, and analytics; provider locations and DPAs; whether the configured Sentry error path sends any production data; and how a user can make a data request. Do not promise a self-service deletion flow that does not exist.
3. Have owner/legal review the notices and Terms of Use; remove every `[REVIEW REQUIRED]`/`[REVISIÓN NECESARIA]` marker and draft banner, version the approved content, and re-check the runtime data flows.
4. Before production analytics, resolve the notice and consent basis and verify the chosen flag mode in a browser. The flag is not a legal-approval signal. After deployment, re-check the live pages and network requests.
