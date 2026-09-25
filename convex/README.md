# Convex Backend

This directory contains Convex backend configuration and server functions.

## Setup Instructions

When npm becomes available, run the following to initialize Convex:

```bash
# 1. Install Convex packages
npm install convex @convex-dev/auth

# 2. Initialize Convex (creates _generated/ directory)
npx convex dev

# 3. Add environment variables to .env.local
echo "VITE_CONVEX_URL=<your-deployment-url>" >> ../.env.local
echo "VITE_USE_CONVEX=true" >> ../.env.local
```

Set `AUTH_SECRET` and `SITE_URL` as Convex deployment environment variables before
running `npx convex dev`; they do not belong in `.env.local`. Local deployments
need local-only values. To exercise sign-in, also configure `JWT_PRIVATE_KEY`,
`JWKS`, and the Google OAuth credentials on that deployment. Do not reuse
production secrets for local verification.

## Files

| File             | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `schema.ts`      | Database schema matching SavedCharacter type |
| `characters.ts`  | Character CRUD mutations and queries         |
| `auth.ts`        | Convex Auth actions (sign-in/out, store)     |
| `auth.config.ts` | Convex auth provider configuration           |

## Schema

The schema defines:

- **users** - Authentication users (managed by Convex Auth)
- **characters** - Character data with full SavedCharacter structure

Characters are indexed by:

- `by_user` - Find all characters for a user
- `by_user_and_name` - Find character by name for a user

## Authentication

Using Convex Auth with Google OAuth.
