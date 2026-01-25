# CI Failure Report

**Branch:** `010rules-01`  
**Last Run:** 2026-01-19T18:38:18Z  
**Run ID:** 21148148061  
**Status:** 4 of 5 jobs failing

---

## Executive Summary

The main CI pipeline (`.github/workflows/ci.yml`) is currently failing on the `010rules-01` branch. Only the **Build** job passes; all other jobs (Lint, Unit Tests, and all 4 E2E shards) are failing due to configuration issues and missing dependencies.

## Temporary CI Relaxation (0.10 Release)

CI checks are temporarily set to non-blocking so the 0.10 rules release can proceed. This will be reverted after finishing touches and stabilization.

| Job                      | Status | Duration |
| ------------------------ | ------ | -------- |
| Build                    | PASSED | 35s      |
| Lint                     | FAILED | 39s      |
| Unit Tests               | FAILED | 25s      |
| E2E (desktop, shard 1/2) | FAILED | 2m9s     |
| E2E (desktop, shard 2/2) | FAILED | 2m2s     |
| E2E (mobile, shard 1/2)  | FAILED | 30s      |
| E2E (mobile, shard 2/2)  | FAILED | 31s      |

---

## Failure Analysis

### 1. Lint Job

**Status:** FAILED  
**Exit Code:** 1

**Root Cause:**  
Prettier formatting check found **94 files** with code style issues.

**Error Message:**

```
Code style issues found in 94 files. Run Prettier with --write to fix.
```

**Affected Files (partial list):**

- `.superdesign/design_iterations/default_ui_darkmode.css`
- `CLAUDE.md`
- `convex/*` (generated files)
- `docs/systems/*.MD`
- `src/lib/services/*.ts`
- `src/routes/character-creation/*.tsx`
- `src/routes/character-sheet/**/*.tsx`
- Various test files

**Fix:**

```bash
npm run format
```

---

### 2. Unit Tests Job

**Status:** FAILED  
**Exit Code:** 1

**Root Cause:**  
Vitest is configured to use browser-based testing with Playwright (`@vitest/browser`), but the CI workflow does not install Playwright browsers before running unit tests.

**Configuration in `vitest.config.ts`:**

```typescript
test: {
    name: 'client',
    environment: 'browser',
    browser: {
        enabled: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
    }
}
```

**Error Message:**

```
Error: browserType.launch: Executable doesn't exist at
/home/runner/.cache/ms-playwright/chromium_headless_shell-1181/chrome-linux/headless_shell

╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
╚═════════════════════════════════════════════════════════════════════════╝
```

**Fix:**  
Add Playwright browser installation step before running unit tests in `ci.yml`.

---

### 3. E2E Mobile Shards (1/2 and 2/2)

**Status:** FAILED  
**Exit Code:** 1

**Root Cause:**  
The mobile project in `playwright.config.ts` uses iPhone 12 device emulation, which requires **WebKit** browser. However, the CI workflow only installs **chromium**.

**Configuration in `playwright.config.ts`:**

```typescript
{
    name: 'mobile',
    use: {
        ...devices['iPhone 12']  // Uses WebKit browser
    }
}
```

**CI Configuration:**

```yaml
- name: Install Playwright browsers (chromium only)
  run: npx playwright install chromium
```

**Error Message:**

```
Error: browserType.launch: Executable doesn't exist at
/home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh
```

**Failed Tests:**

- `e2e/01-import.e2e.spec.ts`
- `e2e/02-resources.e2e.spec.ts`
- `e2e/07-weapons.e2e.spec.ts`
- `e2e/08-items.e2e.spec.ts`
- `e2e/09-spells.e2e.spec.ts`
- `e2e/10-maneuvers.e2e.spec.ts`
- `e2e/11-currency.e2e.spec.ts`
- `e2e/12-exhaustion-info.e2e.spec.ts`
- `e2e/human-cleric.e2e.spec.ts`
- `e2e/hunter-beastborn.e2e.spec.ts`
- `e2e/spellblade-hybrid.e2e.spec.ts`

**Fix Options:**

1. **Option A:** Install WebKit in CI: `npx playwright install chromium webkit`
2. **Option B:** Change mobile project to use chromium with mobile viewport instead of WebKit

---

### 4. E2E Desktop Shards (1/2 and 2/2)

**Status:** FAILED  
**Exit Code:** 1

**Root Cause:**  
Tests are timing out (30s) waiting for UI elements. The `locator.click` operations fail because elements are not found within the timeout period.

**Error Message:**

```
Test timeout of 30000ms exceeded.
Error: locator.click: Test timeout of 30000ms exceeded.
```

**Failed Tests (all with 30.1s timeout):**
| Test File | Test Name |
|-----------|-----------|
| `01-import.e2e.spec.ts` | import fixture and open sheet |
| `02-resources.e2e.spec.ts` | resources and notes |
| `07-weapons.e2e.spec.ts` | weapons add update remove |
| `08-items.e2e.spec.ts` | items add and remove |
| `09-spells.e2e.spec.ts` | spells add filter delete |
| `10-maneuvers.e2e.spec.ts` | maneuvers add and delete |
| `12-exhaustion-info.e2e.spec.ts` | exhaustion and info buttons |

**Possible Causes:**

1. Test fixture file missing (`E2E_FIXTURE: ./test-character-gibble.json`)
2. Web server not starting properly
3. App not rendering/hydrating correctly
4. Actual UI bugs preventing element visibility

**Investigation Needed:**

- Verify `test-character-gibble.json` exists in the repository root
- Check if web server starts successfully before tests run
- Review screenshots in test artifacts for visual debugging

---

## Recommended CI Workflow Changes

### Fix 1: Add Playwright Install to Unit Tests Job

**File:** `.github/workflows/ci.yml`

**Current:**

```yaml
unit:
  name: Unit Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
    - name: Install deps
      run: npm ci
    - name: Run unit tests
      run: npm run test:unit -- --run
```

**Proposed:**

```yaml
unit:
  name: Unit Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
    - name: Install deps
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install chromium
    - name: Run unit tests
      run: npm run test:unit -- --run
```

### Fix 2: Install WebKit for Mobile E2E Tests

**File:** `.github/workflows/ci.yml`

**Current:**

```yaml
- name: Install Playwright browsers (chromium only)
  run: npx playwright install chromium
```

**Proposed:**

```yaml
- name: Install Playwright browsers
  run: npx playwright install chromium webkit
```

---

## Action Items Checklist

### Immediate Fixes (CI Infrastructure)

- [ ] **P0:** Run `npm run format` and commit formatted files
- [ ] **P0:** Add `npx playwright install chromium` step to Unit Tests job in `ci.yml`
- [ ] **P0:** Update E2E browser installation to include webkit: `npx playwright install chromium webkit`

### Investigation Required

- [ ] **P1:** Verify `test-character-gibble.json` fixture file exists
- [ ] **P1:** Review E2E desktop test screenshots from CI artifacts
- [ ] **P2:** Investigate why desktop tests timeout - check web server startup logs

### Optional Improvements

- [ ] **P3:** Consider using chromium for mobile tests (faster CI, simpler setup)
- [ ] **P3:** Add Playwright browser caching that includes webkit
- [ ] **P3:** Consider separating browser-based unit tests from pure Node tests

---

## Related Files

- `.github/workflows/ci.yml` - Main CI workflow
- `.github/workflows/e2e.yml` - Standalone E2E workflow (not failing)
- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration

---

## Links

- [GitHub Actions Run](https://github.com/YasafVol/dc20clean/actions/runs/21148148061)
- [Playwright Documentation](https://playwright.dev/docs/ci-intro)
- [Vitest Browser Mode](https://vitest.dev/guide/browser/)
