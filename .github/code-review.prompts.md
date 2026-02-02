---
trigger: '/review'
purpose: 'Perform comprehensive code review with senior-level expertise'
category: 'Code Quality & Review'
---

# Code Review Prompts

**Purpose**: Standardize code reviews with senior-level expertise focusing on correctness, security, performance,
accessibility, and maintainability.

**Pattern**: Apply comprehensive review checklist with concrete, actionable feedback using blocking/non-blocking
classification.

---

## Command: Review Code

**Usage**: When you need to review code changes (PR, commit, or files).

**Prompt**:

```
Review code for:
- Files: [list of changed files or PR number]
- Focus: [optional: security/performance/accessibility/all]
- Depth: [quick/thorough]
```

**Agent Actions**:

1. **Acquire Context**:

- Read PR description, linked Jira tickets (ARG-####), user impact
- Load full diff (ignore whitespace-only changes)
- Understand architectural changes and affected modules

2. **Quality Gates**:

- Run build/lint/typecheck for affected modules
- Execute targeted unit tests
- Expand test scope only if high risk identified

3. **Deep Review** (focus areas in priority order):

- **Correctness**: Edge cases, null/undefined, error paths, race conditions, timeouts
- **Security**: Secrets in code/logs, unsafe eval/HTML, URL handling, auth checks
- **Performance**: Unnecessary renders, n+1 calls, memoization, large payloads, memory leaks
- **API/Contracts**: Breaking changes, prop validation, defaults, versioning
- **UX/Accessibility**: Keyboard nav, focus, ARIA, color contrast, hover-only traps
- **i18n**: No hard-coded strings, translation keys present, consistent casing
- **Tests**: Happy path + edge cases covered, minimal snapshot noise
- **Maintainability**: Naming, dead code, duplication, component size (<250 lines)

4. **Classify Issues**:

- 🚫 **Blocking**: Correctness/security/regression with concrete fix
- 💡 **Non-blocking**: Nits/performance/docs improvements
- 📋 **Follow-up**: Out-of-scope improvements for future

5. **Provide Feedback**:

- Concise, neutral, impersonal tone
- Concrete code suggestions in diff format
- Focus on issue + solution (don't restate obvious)
- Group similar issues to reduce noise

---

## Review Checklist

### Correctness & Reliability

**Check**:

- [ ] Edge cases handled (empty arrays, null, undefined)
- [ ] Error paths covered with try/catch or error boundaries
- [ ] Async operations handle race conditions and timeouts
- [ ] No unintended side effects in useEffect
- [ ] Proper cleanup in effects (return function)

**Example Issues**:

```javascript
// ❌ BAD - No null check
const userName = user.profile.name;

// ✅ GOOD - Safe access
const userName = user?.profile?.name || 'Unknown';
```

### Security ⚠️

**Check**:

- [ ] No secrets/tokens in code, config, or logs
- [ ] External links use `rel="noopener noreferrer"`
- [ ] No unsafe `dangerouslySetInnerHTML` or `eval()`
- [ ] Auth and permission checks present where required
- [ ] User input sanitized before rendering

**Example Issues**:

```javascript
// ❌ BAD - Unsafe external link
<a href={externalUrl} target="_blank">Link</a>

// ✅ GOOD - Safe with noopener
<a href={externalUrl} target="_blank" rel="noopener noreferrer">Link</a>
```

### Performance

**Check**:

- [ ] React.memo used for expensive components
- [ ] useMemo/useCallback prevent unnecessary recalculations
- [ ] No n+1 queries (batch API calls)
- [ ] Large lists use virtualization or pagination
- [ ] Images lazy loaded and optimized
- [ ] Code splitting with React.lazy for large components

**Example Issues**:

```javascript
// ❌ BAD - Recalculates on every render
const filteredItems = items.filter((item) => item.status === filter);

// ✅ GOOD - Memoized calculation
const filteredItems = useMemo(
	() => items.filter((item) => item.status === filter),
	[items, filter]
);
```

### API/Contracts

**Check**:

- [ ] No breaking changes to public APIs/props
- [ ] PropTypes or TypeScript definitions present
- [ ] Sensible defaults for optional props
- [ ] Backward compatibility maintained or versioned

**Example Issues**:

```javascript
// ❌ BAD - No PropTypes
const Button = ({ onClick, label, disabled }) => { ...
};

// ✅ GOOD - With PropTypes
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};
```

### UX/Accessibility

**Check**:

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus management correct (modals, dropdowns)
- [ ] ARIA attributes present where needed
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] No hover-only interactions (must work with keyboard)
- [ ] Loading/error/empty states handled

**Example Issues**:

```javascript
// ❌ BAD - Hover-only dropdown
<div onMouseEnter={showMenu}>Menu</div>

// ✅ GOOD - Keyboard accessible
<button onClick={toggleMenu} aria-expanded={isOpen}>
  Menu
</button>
```

### Internationalization

**Check**:

- [ ] No hard-coded user-facing strings
- [ ] Translation keys added to appropriate files
- [ ] Using `t` from `@cyberint/common-utils`
- [ ] Date/number formatting uses i18n utilities

**Example Issues**:

```javascript
// ❌ BAD - Hard-coded string
<h2>Alert Details</h2>;

// ✅ GOOD - Translated
import { alertsTranslate as t } from '@cyberint/common-utils';

<h2>{t('alert_card.title')}</h2>;
```

### Tests

**Check**:

- [ ] Happy path covered with unit tests
- [ ] 1-2 critical edge cases tested
- [ ] Snapshot tests minimal and intentional
- [ ] Test descriptions clear and specific
- [ ] Mocks used appropriately

**Example Issues**:

```javascript
// ❌ BAD - Vague test
test('it works', () => { ...
});

// ✅ GOOD - Descriptive test
test('renders error message when API call fails', () => {
  // Arrange, Act, Assert
});
```

### Maintainability

**Check**:

- [ ] Files under 250 lines (if longer, consider splitting)
- [ ] Components focused on single responsibility
- [ ] Clear, meaningful variable/function names
- [ ] No dead code or commented-out code
- [ ] No code duplication (DRY principle)
- [ ] Complex logic extracted to hooks/utils

**Example Issues**:

```javascript
// ❌ BAD - Complex component (500+ lines)
const AlertCard = () => {
  // API calls, state management, rendering all mixed
};

// ✅ GOOD - Modular structure
AlertCard /
  ├── index.jsx                 // Public API
├── AlertCard.jsx             // Main component (< 250 lines)
├── hooks /
  │   ├── useAlertData.js       // Data fetching
│   └── useAlertActions.js    // Action handlers
├── components /
  │   ├── AlertHeader.jsx
  │   └── AlertBody.jsx
  └── styled.js
```

---

## Comment Templates

### Good Feedback Examples

#### Blocking Issue (Security)

```
🚫 Add noopener to external link (security risk)

<a href={url} target="_blank" rel="noopener noreferrer">
  {label}
</a>

Without noopener, the new page can access window.opener and potentially
redirect the parent page (tabnabbing attack).
```

#### Blocking Issue (Correctness)

```
🚫 Handle null case to prevent crash

const userName = user?.profile?.name || 'Unknown';

Current code will throw if user.profile is null/undefined.
```

#### Non-blocking Suggestion (Performance)

```
💡 Consider memoizing this calculation

const filteredItems = useMemo(
  () => items.filter(item => item.status === filter),
  [items, filter]
);

This filter runs on every render. Memoization would improve performance
for large lists.
```

#### Non-blocking Suggestion (Maintainability)

```
💡 Extract this logic to custom hook

const { alerts, isLoading } = useAlertData(customerId);

This component is 300+ lines. Extracting data fetching to a hook would
improve readability and testability.
```

#### Follow-up Task

```
📋 Follow-up: Add loading skeleton

Current implementation shows blank space while loading. Consider adding
SkeletonBox from @cyberint/dsc for better UX.

Can be addressed in separate PR.
```

### Bad Feedback Examples

```
❌ BAD: "This function is doing too many things."
Why: Vague, no concrete suggestion.

✅ GOOD: "Extract API logic to custom hook:
const { data, loading, error } = useFetchData();
This separates concerns and improves testability."

---

❌ BAD: "You need to add error handling."
Why: Impersonal issue, lacks solution.

✅ GOOD: "🚫 Add error boundary:
try {
  return processData(data);
} catch (error) {
  logger.error('Processing failed', error);
  return fallbackValue;
}"

---

❌ BAD: "This looks wrong."
Why: Completely unhelpful.

✅ GOOD: "🚫 Fix infinite loop - missing dependency:
useEffect(() => {
  fetchData();
}, [fetchData]); // Add fetchData to deps or wrap in useCallback"
```

---

## Red Flags

Immediately flag these issues:

| Issue                          | Impact          | Action                       |
| ------------------------------ | --------------- | ---------------------------- |
| Files >500 lines               | Maintainability | 🚫 Split into modules        |
| Nested components >3 levels    | Complexity      | 🚫 Flatten structure         |
| Mixed concerns (API+UI+logic)  | Testability     | 🚫 Separate concerns         |
| Duplicate code                 | Maintainability | 💡 Extract to utility        |
| Generic names (`data`, `temp`) | Readability     | 💡 Use meaningful names      |
| Missing error handling         | Reliability     | 🚫 Add try/catch or boundary |
| Hard-coded strings             | i18n            | 🚫 Use translation keys      |
| `console.log` in code          | Production      | 💡 Remove debug logs         |
| Missing PropTypes              | Type safety     | 💡 Add PropTypes/TypeScript  |
| No keyboard accessibility      | a11y            | 🚫 Add keyboard handlers     |

---

## Review Workflow

### For AI Agents

1. **Retrieve Context**:

   ```bash
   # Get PR diff
   git diff origin/develop...feature-branch

   # Get changed files
   git diff --name-only origin/develop...feature-branch
   ```

2. **Run Quality Checks**:

   ```bash
   # Lint affected modules
   nx run alerts:lint --quiet

   # Run tests for affected modules
   nx run alerts:test --test-file=AlertCard.test

   # Type check
   nx run alerts:typecheck
   ```

3. **Post File-Anchored Comments**:

- Use concrete code suggestions in diff format
- Classify as blocking/non-blocking/follow-up
- Group similar issues to reduce noise
- Avoid duplicate comments across files

4. **Handle Failures**:

- Retry on transient failures (network, API rate limits)
- Skip validation if module has no tests configured
- Report infrastructure issues separately from code issues

5. **Security**:

- Never echo or reference secrets/tokens in comments
- Flag any credentials found in code immediately
- Verify .gitignore patterns for sensitive files

---

## Quick Reference

### Comment Classification

| Symbol | Type         | When to Use                         | Examples                                  |
| ------ | ------------ | ----------------------------------- | ----------------------------------------- |
| 🚫     | Blocking     | Security, correctness, regression   | Auth missing, null crash, breaking API    |
| 💡     | Non-blocking | Performance, maintainability, style | Missing memo, long file, naming           |
| 📋     | Follow-up    | Out-of-scope improvements           | Add skeleton, refactor utils, update docs |

### Project-Specific Commands

```bash
# Run tests for specific library
nx run alerts:test --test-file=Status.test

# Lint with auto-fix
nx run alerts:lint --quiet --fix

# Build affected modules
nx affected:build

# Run all checks for library
nx run alerts:lint && nx run alerts:test
```

### File Size Guidelines

| File Type | Ideal         | Maximum   | Action if Exceeded        |
| --------- | ------------- | --------- | ------------------------- |
| Component | 100-150 lines | 250 lines | Split into sub-components |
| Hook      | 50-75 lines   | 150 lines | Extract utilities         |
| Utility   | 50-100 lines  | 200 lines | Split by domain           |
| Test      | 150-200 lines | 400 lines | Group related tests       |

---

## Communication Philosophy

**Be Constructive**:

- Point out issues WITH solutions (show, don't just tell)
- Provide code examples in every comment
- Explain the "why" behind suggestions
- Use neutral, impersonal language ("Consider" not "You should")

**Prioritize Feedback**:

1. **Critical** 🚫: Security, correctness, breaking changes
2. **Important** 💡: Performance, maintainability, testability
3. **Nice-to-have** 📋: Style, consistency, future improvements

**Balance Pragmatism**:

- Know when "good enough" is acceptable
- Don't let perfect be the enemy of good
- Focus on high-impact improvements
- Suggest follow-ups for scope creep

---

**Related Instructions**:

- [reactjs.instructions.md](../instructions/reactjs.instructions.md) - React patterns and best practices
- [performance-optimization.instructions.md](../instructions/performance-optimization.instructions.md) - Performance
  guidelines
- [styled-components.instructions.md](../instructions/styled-components.instructions.md) - Styling patterns
- [design-system.instructions.md](../instructions/design-system.instructions.md) - DSC component usage
- [common-utils.instructions.md](../instructions/common-utils.instructions.md) - Utilities and translations
- [copilot-code-review.md](../copilot-code-review.md) - Code review playbook reference

**Last Updated**: 2025-11-21
