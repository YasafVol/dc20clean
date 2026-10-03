# Back-office Playwright logbook — 2026-10-03

## Targets

1. Local Vite preview: `http://127.0.0.1:5179/back-office-preview`. This uses checkout system text and synthetic monsters.
2. Development backend: `https://giant-horse-540.convex.cloud`. Requests were anonymous and read-only.
3. PR #148 preview: `https://dc20clean-git-codex-back-office-yasafs-projects.vercel.app`. Vercel Authentication protects this deployment.

## Run

```bash
BACK_OFFICE_LOGBOOK=1 \
BACK_OFFICE_CONVEX_URL=https://giant-horse-540.convex.cloud \
BACK_OFFICE_PR_PREVIEW_URL=https://dc20clean-git-codex-back-office-yasafs-projects.vercel.app \
PLAYWRIGHT_BASE_URL=http://127.0.0.1:5179 \
PLAYWRIGHT_HTML_OPEN=never \
npx playwright test e2e/back-office-logbook.e2e.spec.ts --project=desktop --workers=1 --reporter=html
```

Result: **4 passed (3.4 s)**. The command generates a local HTML report at `playwright-report/index.html`; that generated report is not committed. The browser tests reported no uncaught page errors.

## Observations

1. **Systems, local preview:** The reader showed the generated 30-document catalog, ordinal `01` on the first document, full-text search for `normalizeCharacterStateForStorage`, one matching Database & Storage document, its Markdown, and an on-page outline. [Playwright screenshot](./back-office-playwright-2026-10-03/systems-search.jpg).
2. **Monsters, local preview:** Three synthetic records appeared; the Lurker filter left one. The Sample Cave Stalker stat block displayed its stored values and explicit local-only notice. No horizontal page overflow appeared at 390, 767, 768, 1199, or 1200 px. [Playwright screenshot](./back-office-playwright-2026-10-03/sample-monster.jpg).
3. **Backend, development:** Anonymous `backOffice:access` returned `false`. Anonymous `listSystems`, `getSystem`, and `listMonsters` returned errors with no result value. This proves those deployed reads reject a signed-out caller; it does not prove authenticated reviewer access.
4. **PR preview:** An anonymous request to `/back-office` received HTTP 302 to Vercel SSO. Playwright could not inspect the deployed app without preview access. This is an environment gate, not a pass for the app's sign-in flow.

## Review finding and remaining proof

1. The first screenshot review found `1 documents` after search. The label now reads `1 document`, and the final Playwright run asserts it.
2. Before merging, verify the deployed PR with a signed-in approved reviewer and a signed-in unapproved account. Confirm the production build targets the intended production Convex deployment. Local fixture screenshots and anonymous backend calls cannot establish those results.
