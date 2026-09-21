# Analytics System

> Purpose: Define product-analytics collection, identity, privacy boundaries, event contracts, reporting semantics, and operational setup.
> Owns: PostHog client initialization, explicit pageview capture, acquisition attribution, authenticated identity, analytics event registration, privacy filtering, and analytics verification.
> Does not own: Application logs, error reporting, source user records, authorization, access-policy enforcement, legal determinations, final privacy-notice text, PostHog billing, or retention settings.
> Authoritative source: `src/lib/analytics/`, `src/components/analytics/PostHogLifecycle.tsx`, `src/components/auth/CurrentUserContext.tsx`, `convex/users.ts`, and analytics environment variables.
> Related systems: `PRIVACY_AND_LEGAL_SYSTEM.MD`, `DATABASE_SYSTEM.MD`, `CHARACTER_CREATION_FLOW.MD`, `PROJECT_TECHNICAL_OVERVIEW.MD`, `TESTING_SYSTEM.MD`.
> Status: Active
> Last Updated: 2026-09-21

## 1. Goals and Boundaries

1. The system answers five initial questions:
   1. How many people use the application?
   2. Which routes and major features do they use?
   3. Where did visits originate?
   4. How many visitors progress from a pageview through sign-in to character creation?
   5. When were identified accounts created?
2. The system deliberately does not provide:
   1. Session replay.
   2. Click or form autocapture.
   3. User-authored content analysis.
   4. Error or performance monitoring; Sentry remains the intended error-reporting boundary.
   5. Authorization decisions. Analytics data must never decide who can use a feature.

## 2. Provider and Control Plane

1. Product analytics uses PostHog Cloud EU.
2. Operational identifiers:
   1. Organization: `DC20Clean`.
   2. Project ID: `278381`.
   3. Ingestion host: `https://eu.i.posthog.com`.
   4. Authorized production URL: `https://dc20clean.vercel.app`.
3. The PostHog project token is a public, write-only browser token. It belongs in deployment configuration but must not be copied into documentation.
4. Production configuration is stored in Vercel. Analytics and the draft legal/consent flow have independent flags. Development and preview remain disabled unless a deliberate validation run supplies the variables. Neither flag constitutes legal approval.
5. Vercel Analytics is not part of the runtime. Do not run both providers without an explicit migration decision.

## 3. Runtime Architecture

The two event paths are:

```text
route or auth change
  -> PostHogLifecycle
  -> resolve anonymous or Convex identity
  -> build minimal pageview properties
  -> privacy sanitizer
  -> PostHog EU

registered product action
  -> logger.track
  -> event/property/value allowlist
  -> privacy sanitizer
  -> PostHog EU
```

1. `PostHogLifecycle` is mounted inside `BrowserRouter` and under the application auth providers.
2. The PostHog SDK is dynamically imported when analytics is enabled and a pageview or registered event needs capture. If the legal/consent flow is enabled, it additionally waits for a valid affirmative choice; a missing, refused, expired, or revision-stale choice keeps the SDK unloaded. With that flow disabled, no in-app choice is required. The SDK does not add to the initial application bundle when analytics is disabled.
3. Convex mode waits for both auth and `users.getCurrentUser` to resolve before the first pageview. This prevents an authenticated visit from first being recorded as anonymous and then split incorrectly.
4. Local-storage-only mode has no Convex identity and captures anonymous pageviews immediately.
5. Route changes are deduplicated by `pathname + search`. Hash-only changes are not separate pageviews.
6. The SDK is a singleton. React Strict Mode rerenders do not create duplicate pageviews because the lifecycle keeps the previous route and identity in refs.

## 4. Environment Contract

```dotenv
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LEGAL_CONSENT_FLOW=false
VITE_POSTHOG_PROJECT_TOKEN=phc_...
VITE_POSTHOG_HOST=https://eu.i.posthog.com
```

1. Analytics loads when `VITE_ENABLE_ANALYTICS=true` and a non-empty project token is present. If `VITE_ENABLE_LEGAL_CONSENT_FLOW=true`, it additionally requires a valid affirmative choice. When that flag is false, collection proceeds without an in-app consent choice.
2. `VITE_POSTHOG_HOST` defaults to the EU ingestion host.
3. All four values are browser-visible Vite configuration. None grants read or administrative access to PostHog.
4. To disable collection, set `VITE_ENABLE_ANALYTICS=false` and redeploy the frontend. Changing the legal/consent flag is not an analytics kill switch.

## 5. Identity Lifecycle

| Application state                                            | PostHog action                            | Result                                                               |
| ------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------- |
| Auth is unresolved                                           | None                                      | No event is sent until ownership is known.                           |
| Anonymous visitor                                            | Keep PostHog anonymous ID                 | Pageviews remain anonymous.                                          |
| User resolves as authenticated                               | `identify(Convex userId)`                 | Anonymous history is merged into the stable account identity.        |
| Different authenticated user replaces a persisted user       | `reset()`, then `identify(new userId)`    | Events from different accounts do not share one browser identity.    |
| Live authenticated user signs out                            | Capture `user_signed_out`, then `reset()` | Subsequent events use a fresh anonymous ID.                          |
| Signed-out load finds a stale authenticated PostHog identity | `reset()`                                 | The stale identity is cleared without claiming an observed sign-out. |

1. The only distinct ID supplied by the application is the stable Convex `userId`.
2. Email and display name are not sent to PostHog.
3. `users.getCurrentUser` returns `userId`, optional display name for application UI, and the Convex user document `_creationTime` as `createdAt`.
4. The lifecycle sends only `createdAt`, converted to ISO format as the `account_created_at` person property.
5. Invalid timestamps are ignored instead of breaking identity or pageview capture.
6. `undefined` means the current-user query is unresolved; `null` means it resolved without an authenticated user. Consumers must preserve this distinction.

## 6. Pageviews and Acquisition

1. Pageviews are captured explicitly after identity reconciliation.
2. The application supplies a minimal pageview envelope:
   1. Sanitized `$current_url` without query or hash.
   2. Sanitized `$pathname`.
   3. `$host`.
   4. Referrer origin and referring domain, or `$direct`.
   5. Valid `utm_source`, `utm_medium`, and `utm_campaign` values from the entry URL.
3. PostHog's automatic campaign and referrer persistence is disabled. This prevents raw URLs, query strings, referrer paths, and click identifiers from being stored in the SDK's local persistence.
4. Acquisition values must match `[A-Za-z0-9._-]`, begin with an alphanumeric character, and be at most 64 characters. Invalid values are dropped.
5. `utm_content`, `utm_term`, search keywords, and advertising click identifiers are dropped. They are not needed for the initial reporting questions and can contain personal or high-cardinality data.
6. Referrers are reduced to their origin. The referring domain remains available for source reporting; external path and query data do not.

### 6.1 Dynamic route normalization

| Runtime path                                    | Analytics path                                  |
| ----------------------------------------------- | ----------------------------------------------- |
| `/character/:id`                                | `/character/:id`                                |
| `/character/:id/edit`                           | `/character/:id/edit`                           |
| `/character/:id/levelup`                        | `/character/:id/levelup`                        |
| `/character2/:id`                               | `/character2/:id`                               |
| `/dm/monsters/:id`                              | `/dm/monsters/:id`                              |
| `/dm/encounters/:id`                            | `/dm/encounters/:id`                            |
| `/campaigns/join/:code`                         | `/campaigns/join/:code`                         |
| `/campaigns/:id`                                | `/campaigns/:id`                                |
| `/campaigns/:campaignId/character/:characterId` | `/campaigns/:campaignId/character/:characterId` |

1. The sanitizer applies to current, initial, session-entry, and previous-pageview URL/path properties. Only known static routes pass unchanged; rulebook subroutes reduce to `/rulebook/*`, and every unrecognized path reduces to `/other`. URL credentials, queries, and hashes are removed.
2. Every new route must be reviewed and added to the static allowlist or `PRIVATE_ROUTE_PATTERNS` with a focused test before it appears as a separate analytics path.

## 7. Custom Event Registry

`src/lib/analytics/posthog.ts` is the executable event contract. Unregistered events and properties are dropped.

| Event                           | Emission owner                                   | Allowed properties and values                                                     | Meaning                                                                                                            |
| ------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `sign_in_started`               | `SignIn` before Google auth starts               | `provider=google`; `feature=general\|cloud-save\|pdf-export`                      | A visitor initiated authentication.                                                                                |
| `sign_in_failed`                | `SignIn` when auth initiation throws             | Same as `sign_in_started`                                                         | Authentication failed before redirect or local completion. OAuth callback failures after redirect are not covered. |
| `authenticated_session_started` | Identity lifecycle                               | None                                                                              | An authenticated account resolved for this application load or identity transition.                                |
| `user_signed_out`               | Identity lifecycle                               | None                                                                              | A live authenticated identity became signed out before reset.                                                      |
| `character_creation_completed`  | `completeCharacter` after successful persistence | `class_id` and `ancestry_id`: safe IDs up to 64 characters; `level`: integer 1–20 | A new character was persisted successfully. Non-persisting builds used by level-up do not emit it.                 |

1. Allowed event values are validated, not merely property names.
2. Character names, player names, character record IDs, error text, notes, campaign names, and other free text are forbidden.
3. `logger.track` is a compatibility entry point. New callers still require an explicit registry change and tests.

## 8. Privacy Configuration

1. The SDK configuration explicitly disables:
   1. Autocapture.
   2. Automatic pageviews and page-leave events.
   3. Session recording.
   4. Exception and performance capture.
   5. Heatmaps and dead-click capture.
   6. Surveys, product tours, conversations, and external extension loading.
   7. Feature flags, remote decide calls, toolbar metrics, browser console-log capture, and network metrics.
   8. Automatic campaign and referrer persistence.
2. Additional constraints:
   1. Person profiles are created only for identified users.
   2. IP-based enrichment is disabled.
   3. Browser Do Not Track and Global Privacy Control signals are respected.
   4. Persistence is localStorage-only and cross-subdomain cookies are disabled.
   5. URL hashes are disabled at the SDK level and removed again by the privacy sanitizer.
   6. PostHog's personal-data masking remains enabled as defense in depth.
3. Standard non-content technical metadata may still accompany events: browser, browser version, operating system, device type, viewport/screen dimensions, language, SDK version, session ID, anonymous device/distinct ID, and event timestamp.
4. The application must never send saved game data or user-authored text.
5. Respecting Do Not Track does not replace the publication review below.

### 8.1 Publication review and flag behavior

The two deployment modes are intentional and must be reviewed independently:

1. `VITE_ENABLE_LEGAL_CONSENT_FLOW=false`: no consent dialog or preference control; `/privacy` and `/terms` redirect to `/menu`; their footer and sign-in links are absent. If analytics is enabled, PostHog starts without an in-app choice, including for a browser that previously refused analytics. This mode does **not** establish that collection is consent-exempt or legally approved. It also leaves no app-hosted privacy notice for visitors. Do not silently treat this switch as a privacy approval.
2. `VITE_ENABLE_LEGAL_CONSENT_FLOW=true`: the draft legal routes and links are visible. `ConsentManager` supplies a one-optional-category choice, stores a versioned choice for 182 days, and provides a footer preference control. The lifecycle and SDK adapter fail closed until the choice is valid. Withdrawal stops future capture and clears local PostHog identity, but cannot erase events already sent.

Before a production decision, the operator must resolve and document the applicable notice/consent basis, public disclosure, PostHog DPA, actual retention and deletion process, intended user ages, and contact/data-request path. The draft notices still contain unresolved facts and are not approved for publication. Set a product target of at most 13 months for identifiable raw analytics events, and verify provider enforcement or a deletion process. Browser verification must cover the selected mode, sign-in/out, Do Not Track, the event allowlist, and the independent feedback boundary. If enabling the consent mode, also test first visit, refusal, acceptance, return visit, withdrawal, expiry, and revision changes.

The existing privacy controls—EU hosting, project-level client-IP discard, event allowlists, route sanitization, and disabled replay/autocapture—remain required but do not resolve these decisions. Identifying visitors with a stable Convex user ID and storing a PostHog identifier in localStorage must not be described as anonymous audience measurement. PostHog's [GDPR guidance](https://posthog.com/docs/privacy/gdpr-compliance) recommends explicit consent for product analytics; [CNIL's audience-measurement exception](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications) has narrower conditions, including no cross-checking with customer records.

## 9. Reporting Contract

### 9.1 Built-in web analytics

Use the PostHog Web Analytics dashboard for:

1. Unique visitors, pageviews, and route usage.
2. Referring domains and safe UTM source/medium/campaign values.
3. Device and browser breakdowns.
4. Active hours and basic retention from pageview events.

Do not treat bounce rate, scroll depth, or exact session duration as authoritative. Those metrics depend on page-leave or autocapture signals intentionally disabled by this system.

### 9.2 Product insights

1. Acquisition: unique `$pageview` visitors by `$referring_domain`, `utm_source`, and `utm_medium`.
2. Activation funnel: `$pageview` → `sign_in_started` → `authenticated_session_started` → `character_creation_completed`.
3. Authenticated active users: unique identified users emitting `authenticated_session_started`, viewed daily, weekly, and monthly.
4. Feature usage: unique visitors by sanitized `$pathname`.
5. Signup history: identified people grouped by `account_created_at`.

### 9.3 Interpretation limits

1. Collection begins only after a deployment containing this system. Historical visits and acquisition sources cannot be reconstructed.
2. Existing accounts receive their real Convex creation timestamp when they next authenticate.
3. Do Not Track, Global Privacy Control, ad blockers, network failures, and disabled environments cause undercounting.
4. Referrer and UTM attribution is directional, not a complete causal account of how someone discovered the application.
5. Direct traffic can include visits whose referrer was unavailable.

## 10. Change Procedure

### 10.1 Add a custom event

1. Define the product question the event answers. Do not add events speculatively.
2. Add the event and the smallest property allowlist to `EVENT_PROPERTY_ALLOWLIST`.
3. Add strict value validation in `sanitizeEventProperty`.
4. Emit only after the user-visible action succeeds.
5. Add unit coverage proving allowed values pass and private/unregistered values are dropped.
6. Update the registry and reporting section in this document.

### 10.2 Add or change a route

1. Determine whether any path segment can contain an ID, join code, name, or user-controlled value.
2. Add a safe static route to `PUBLIC_ROUTES`, or a dynamic pattern to `PRIVATE_ROUTE_PATTERNS`, before the route ships if it needs its own analytics label. Otherwise it is grouped under `/other`.
3. Test current, initial, session-entry, and previous-pageview path normalization.
4. Confirm query strings and hashes remain absent from ingested events.

### 10.3 Change identity

1. Keep the Convex user ID as the sole stable distinct ID.
2. Never switch to email, display name, character ID, or device-specific application IDs.
3. Preserve identify-before-pageview and reset-before-anonymous-pageview ordering.
4. Add lifecycle tests for every new identity transition.

## 11. Verification and Operations

### 11.1 Automated verification

1. Privacy unit tests cover:
   1. Every dynamic route.
   2. Query/hash removal.
   3. Referrer-origin reduction.
   4. Campaign-value constraints.
   5. Search term and click-ID removal.
2. Client tests cover:
   1. Waiting for auth resolution.
   2. Initial identification and pageview context.
   3. Strict Mode/rerender deduplication.
   4. Logout identity handoff.
3. Analytics-client tests cover:
   1. Privacy configuration.
   2. Identity-before-pageview ordering.
   3. Reset-on-logout ordering.
   4. Event/property/value allowlisting.
   5. The SDK adapter runs in the server test project because its environment setup is process-backed; privacy and React lifecycle tests also run in the browser project.
4. Convex tests cover unauthenticated and authenticated `users.getCurrentUser` responses.
5. Character-completion tests prove only a successfully persisted new character emits `character_creation_completed`.

### 11.2 Production verification

After every analytics rollout:

1. Confirm the deployment's analytics token, host, enable flag, and independently chosen legal/consent flag. Verify that the operator resolved the publication review in Section 8.1 before collection.
2. Open a public route and verify one `$pageview` reaches project `278381`.
3. Open a dynamic route and verify no runtime ID, query string, or hash appears in the event.
4. Follow a safe UTM link and verify only source, medium, and campaign are present.
5. Authenticate and verify:
   1. The distinct ID is the Convex user ID.
   2. `account_created_at` is present.
   3. Email and display name are absent.
6. Sign out and verify the next pageview has a new anonymous identity.
7. Complete a new character and verify the registered event contains only its allowed properties.
8. Confirm no session recordings, autocapture events, exceptions, browser logs, or network metrics are arriving.

### 11.3 Failure behavior

1. SDK import or initialization failure is silent and must not block application behavior.
2. Analytics capture is fire-and-forget. Product actions never await PostHog delivery.
3. Invalid routes, attribution values, timestamps, events, or properties are dropped rather than sent unsafely.
4. If unexpected private data appears, disable analytics in Vercel, redeploy, then correct the sanitizer before re-enabling it.
