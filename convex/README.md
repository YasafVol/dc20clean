# Convex Backend

This directory contains Convex backend configuration and server functions.

## Setup Instructions

When npm becomes available, run the following to initialize Convex:

```bash
# 1. Install Convex packages
npm install convex @convex-dev/auth

# 2. Initialize Convex (creates _generated/ directory)
npx convex dev

# 3. Rename draft files
mv schema.ts.draft schema.ts
mv characters.ts.draft characters.ts
mv auth.config.ts.draft auth.config.ts

# 4. Add environment variable to .env.local
echo "VITE_CONVEX_URL=<your-deployment-url>" >> ../.env.local
```

## Files

| File | Purpose |
|------|---------|
| `schema.ts.draft` | Database schema matching SavedCharacter type |
| `characters.ts.draft` | Character CRUD mutations and queries |
| `auth.config.ts.draft` | Authentication configuration |

## Schema

The schema defines:

- **users** - Authentication users (managed by Convex Auth)
- **characters** - Character data with full SavedCharacter structure

Characters are indexed by:
- `by_user` - Find all characters for a user
- `by_user_and_name` - Find character by name for a user

## Authentication

Using Convex Auth with email/password provider. OAuth providers (GitHub, Google) can be added later.
