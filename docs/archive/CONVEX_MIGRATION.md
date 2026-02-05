# Convex Storage Migration Specification

## Overview

Replace the current localStorage-based character persistence with Convex cloud database, adding user authentication so characters are tied to user accounts.

**Status**: Prep work complete, npm-dependent work deferred

---

## TODO Checklist

### Phase 1: npm & Convex Setup (requires npm access)

- [ ] `npm install convex @convex-dev/auth`
- [ ] `npx convex dev` (initialize Convex, get deployment URL)
- [ ] Rename `convex/*.draft` files to `.ts`
- [ ] Add `VITE_CONVEX_URL` to `.env.local`
- [ ] Set up Google OAuth credentials (Google Cloud Console)
- [ ] Add OAuth secrets to Convex Dashboard environment variables
- [ ] Add `AUTH_SECRET` to Convex Dashboard environment variables

### Phase 2: UI Integration (after Phase 1)

- [ ] **`src/main.tsx`** - Wrap app with `ConvexProvider` and `ConvexAuthProvider`
- [ ] **`src/components/auth/*.tsx`** - Uncomment Convex imports and replace mock hooks
- [ ] **`src/lib/storage/convexStorageAdapter.ts`** - Uncomment Convex imports and implement hooks
- [ ] **`src/routes/character-creation/LoadCharacter.tsx`** - Replace PDF export button with `FeatureGateButton`
- [ ] **`src/routes/character-creation/LoadCharacter.tsx`** - Add "Save to Cloud" button with `FeatureGateButton`
- [ ] **`src/components/Menu.tsx`** - Add `UserMenu` component to show logged-in user
- [ ] **`src/lib/services/characterCompletion.ts`** - Add cloud save option alongside localStorage

### Phase 3: Testing & Polish

- [ ] Test Google sign-in flow
- [ ] Test PDF export gate (shows sign-in, then exports)
- [ ] Test cloud save (shows sign-in, then saves to Convex)
- [ ] Test localStorage fallback when not signed in
- [ ] Verify characters sync across devices when signed in

---

## Goals

1. **Cloud Persistence**: Characters saved to Convex database instead of browser localStorage
2. **Social Authentication**: Google OAuth via Convex Auth (no email/password)
3. **Optional Auth**: App fully usable without login - auth only required for cloud save & PDF export
4. **Cross-Device Access**: Users can access their characters from any device
5. **Data Safety**: No risk of losing characters due to browser data clearing

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
├─────────────────────────────────────────────────────────────┤
│  App.tsx                                                    │
│    └── ConvexProvider                                       │
│          └── ConvexAuthProvider                             │
│                └── Routes                                   │
│                      ├── AuthGuard (protected routes)       │
│                      ├── CharacterSheetProvider             │
│                      └── Storage Abstraction Layer          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Convex Backend                           │
├─────────────────────────────────────────────────────────────┤
│  schema.ts          - Database schema                       │
│  characters.ts      - CRUD mutations & queries              │
│  auth.config.ts     - Authentication configuration          │
└─────────────────────────────────────────────────────────────┘
```

## Prep Work Complete

The following scaffolding files have been created and are ready for use once npm packages are installed:

### Convex Backend (`convex/`)

| File                   | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `schema.ts.draft`      | Complete schema matching `SavedCharacter` type with indexes |
| `characters.ts.draft`  | CRUD mutations and queries with auth checks                 |
| `auth.config.ts.draft` | Convex Auth with Google OAuth                               |
| `README.md`            | Setup instructions                                          |

### Storage Abstraction (`src/lib/storage/`)

| File                      | Description                           |
| ------------------------- | ------------------------------------- |
| `characterStorage.ts`     | Storage interface definition          |
| `localStorageAdapter.ts`  | localStorage implementation (current) |
| `convexStorageAdapter.ts` | Convex implementation (placeholder)   |
| `index.ts`                | Auto-selector based on environment    |

### Auth Components (`src/components/auth/`)

| File            | Description                                  |
| --------------- | -------------------------------------------- |
| `SignIn.tsx`    | Social login (Google) dialog                 |
| `AuthGuard.tsx` | Feature gate component + `FeatureGateButton` |
| `UserMenu.tsx`  | User avatar, info, and sign-out              |
| `index.ts`      | Main export                                  |

## Setup Instructions

When npm becomes available, run:

```bash
# 1. Install Convex packages
npm install convex @convex-dev/auth

# 2. Initialize Convex (creates _generated/ directory)
npx convex dev

# 3. Rename draft files
cd convex
mv schema.ts.draft schema.ts
mv characters.ts.draft characters.ts
mv auth.config.ts.draft auth.config.ts

# 4. Add environment variables to .env.local
VITE_CONVEX_URL=<url-from-convex-dev>
VITE_USE_CONVEX=true
```

## Integration Steps

After setup, the following changes are needed:

### 1. Wrap App with Providers (`src/main.tsx`)

```tsx
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConvexProvider client={convex}>
			<ConvexAuthProvider>
				<App />
			</ConvexAuthProvider>
		</ConvexProvider>
	</React.StrictMode>
);
```

### 2. Gate Features (Not Routes)

Use `FeatureGateButton` to gate specific features, NOT the whole app:

```tsx
import { FeatureGateButton } from './components/auth';

// In LoadCharacter.tsx - gate PDF export
<FeatureGateButton
  feature="pdf-export"
  onAction={() => handleExportPdf(character)}
  className="..."
>
  Export PDF
</FeatureGateButton>

// In CharacterCreation.tsx - gate cloud save
<FeatureGateButton
  feature="cloud-save"
  onAction={() => saveToCloud(character)}
  className="..."
>
  Save to Cloud
</FeatureGateButton>
```

### 3. Update Storage Consumers

The storage abstraction layer will automatically use Convex when `VITE_USE_CONVEX=true`:

```tsx
import { getDefaultStorage } from './lib/storage';

const storage = getDefaultStorage();
const characters = await storage.getAllCharacters();
```

## Schema Design

The Convex schema maps directly to the existing `SavedCharacter` TypeScript interface:

- **characters** table with full character data
- Indexed by `userId` for efficient per-user queries
- Indexed by `userId + finalName` for name lookups

See `convex/schema.ts.draft` for complete field definitions.

## Authentication

Using Convex Auth with **social OAuth only** (no email/password):

- **Google OAuth** - most users have a Google account
- Session management handled by Convex
- User ID linked to all character records

### Feature Gates

| Feature              | Without Auth      | With Auth  |
| -------------------- | ----------------- | ---------- |
| Create character     | ✅ (localStorage) | ✅ (cloud) |
| Edit character       | ✅                | ✅         |
| View character sheet | ✅                | ✅         |
| **Export PDF**       | ❌ (gated)        | ✅         |
| **Save to cloud**    | ❌ (gated)        | ✅         |
| Sync across devices  | ❌                | ✅         |

### OAuth Setup

**Google Cloud Console:**

1. Go to https://console.cloud.google.com/
2. Create project → APIs & Services → OAuth consent screen
3. Create credentials → OAuth client ID → Web application
4. Add redirect URI: `https://<your-convex-url>.convex.site/api/auth/callback/google`

5. New OAuth App

**Environment Variables (set in Convex Dashboard):**

```
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=your-random-secret
```

## Migration Strategy

**No automatic migration** - this is a fresh start:

- Existing localStorage characters will not be migrated
- Users can export characters to JSON before migration
- Import functionality remains available

## Environment Variables

| Variable           | Description                                |
| ------------------ | ------------------------------------------ |
| `VITE_CONVEX_URL`  | Convex deployment URL                      |
| `VITE_USE_CONVEX`  | Set to `true` to enable Convex storage     |
| `VITE_BYPASS_AUTH` | Set to `true` for development without auth |

## Files Modified (When Integrating)

| File                                                          | Change                        |
| ------------------------------------------------------------- | ----------------------------- |
| `src/main.tsx`                                                | Add Convex and Auth providers |
| `src/App.tsx`                                                 | Add UserMenu to header        |
| `src/routes/character-creation/LoadCharacter.tsx`             | Use storage abstraction       |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | Use storage abstraction       |
| `src/lib/services/characterCompletion.ts`                     | Use storage abstraction       |

## Testing

- Auth components have built-in mock mode for development
- Set `VITE_BYPASS_AUTH=true` to skip authentication in dev
- Storage abstraction falls back to localStorage when Convex is unavailable

## References

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth](https://labs.convex.dev/auth)
- [SavedCharacter Interface](../src/lib/types/dataContracts.ts)
