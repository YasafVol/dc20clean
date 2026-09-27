/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as backOffice from "../backOffice.js";
import type * as campaignCharacterConnections from "../campaignCharacterConnections.js";
import type * as campaigns from "../campaigns.js";
import type * as characters from "../characters.js";
import type * as encounters from "../encounters.js";
import type * as features from "../features.js";
import type * as http from "../http.js";
import type * as lib_backOfficeAccess from "../lib/backOfficeAccess.js";
import type * as monsters from "../monsters.js";
import type * as seed from "../seed.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  backOffice: typeof backOffice;
  campaignCharacterConnections: typeof campaignCharacterConnections;
  campaigns: typeof campaigns;
  characters: typeof characters;
  encounters: typeof encounters;
  features: typeof features;
  http: typeof http;
  "lib/backOfficeAccess": typeof lib_backOfficeAccess;
  monsters: typeof monsters;
  seed: typeof seed;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
