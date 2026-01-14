# Convex Storage Migration Specification

## Overview

Replace the current localStorage-based character persistence with Convex cloud database, adding user authentication so characters are tied to user accounts.

**Status**: Prep work complete, npm-dependent work deferred

## Goals

1. **Cloud Persistence**: Characters saved to Convex database instead of browser localStorage
2. **User Authentication**: Email/password authentication via Convex Auth
3. **Cross-Device Access**: Users can access their characters from any device
4. **Data Safety**: No risk of losing characters due to browser data clearing

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

| File | Description |
|------|-------------|
| `schema.ts.draft` | Complete schema matching `SavedCharacter` type with indexes |
| `characters.ts.draft` | CRUD mutations and queries with auth checks |
| `auth.config.ts.draft` | Convex Auth with Password provider |
| `README.md` | Setup instructions |

### Storage Abstraction (`src/lib/storage/`)

| File | Description |
|------|-------------|
| `characterStorage.ts` | Storage interface definition |
| `localStorageAdapter.ts` | localStorage implementation (current) |
| `convexStorageAdapter.ts` | Convex implementation (placeholder) |
| `index.ts` | Auto-selector based on environment |

### Auth Components (`src/components/auth/`)

| File | Description |
|------|-------------|
| `SignIn.tsx` | Email/password sign-in form |
| `SignUp.tsx` | Registration form |
| `AuthGuard.tsx` | Route protection component |
| `UserMenu.tsx` | User info and sign-out |
| `index.ts` | Main export |

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

### 2. Protect Routes

Wrap protected routes with `AuthGuard`:

```tsx
import { AuthGuard } from './components/auth';

function App() {
  return (
    <AuthGuard>
      <Router>
        {/* Protected routes */}
      </Router>
    </AuthGuard>
  );
}
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

Using Convex Auth with Password provider:

- Email/password registration and sign-in
- Session management handled by Convex
- User ID linked to all character records

OAuth providers (GitHub, Google) can be added later.

## Migration Strategy

**No automatic migration** - this is a fresh start:

- Existing localStorage characters will not be migrated
- Users can export characters to JSON before migration
- Import functionality remains available

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CONVEX_URL` | Convex deployment URL |
| `VITE_USE_CONVEX` | Set to `true` to enable Convex storage |
| `VITE_BYPASS_AUTH` | Set to `true` for development without auth |

## Files Modified (When Integrating)

| File | Change |
|------|--------|
| `src/main.tsx` | Add Convex and Auth providers |
| `src/App.tsx` | Wrap with AuthGuard |
| `src/routes/character-creation/LoadCharacter.tsx` | Use storage abstraction |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | Use storage abstraction |
| `src/lib/services/characterCompletion.ts` | Use storage abstraction |

## Testing

- Auth components have built-in mock mode for development
- Set `VITE_BYPASS_AUTH=true` to skip authentication in dev
- Storage abstraction falls back to localStorage when Convex is unavailable

## References

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth](https://labs.convex.dev/auth)
- [SavedCharacter Interface](../src/lib/types/dataContracts.ts)
