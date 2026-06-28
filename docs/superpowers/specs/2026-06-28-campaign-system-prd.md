# Campaign System — Product Requirements (PRD)

> Status: Draft for review
> Date: 2026-06-28
> Audience: product / stakeholders / engineering
> Companion: `2026-06-28-campaign-system-technical-plan.md` (implementation detail)

---

## 1. Summary

Let a DM and players gather into a **campaign**: a shared space where everyone
can see each other's characters live (read-only), and where in-app notifications
fire when something noteworthy happens to a character (e.g. a character drops to
*well-bloodied*).

A campaign is created by a DM, who shares a join code / link. Friends who open
the link (signed in) join the campaign and pick which of their characters to
share. While in the campaign, every member sees a roster of all shared characters
with live status, can open any of them read-only, and receives a live event feed
plus toast notifications.

This is the **foundation** for ongoing multiplayer features (the well-bloodied
notification is one example event); the architecture is event-driven so new
shared interactions are added as new event types without new infrastructure.

## 2. Goals / Non-Goals

**Goals**
- DM/Co-DM/Player roles with a clear permission model.
- Create campaign, share one reusable join code/link, join by code, leave, kick.
- Members see a live roster of all members' shared characters (read-only).
- Open any shared character in a read-only character sheet.
- Live event feed + toast notifications; ship `well_bloodied` and `member_joined`
  as the first event types.

**Non-Goals (this release)**
- OS / browser push notifications (service workers). In-app only.
- Per-field privacy (hiding notes/inventory) — whole shared character is visible.
- Revocable per-invite tokens or join approval — single reusable code only.
- Dice rolling, initiative tracker.
- Sharing localStorage-only characters (see constraint below).

## 3. Constraints & Assumptions

- **Cloud + sign-in required.** Campaigns are a Convex feature. A user must be
  signed in and running in Convex mode to create/join campaigns. The menu entry
  is gated exactly like the existing DM Tools section.
- **Only cloud-stored characters can be shared.** Live sharing works by other
  members subscribing to the actual character document in Convex. A character
  that exists only in browser localStorage is invisible to others; sharing such
  a character requires it to be saved to the cloud first. The UI must make this
  explicit when a user tries to share a non-cloud character.
- **Read-only for non-owners.** A member viewing another member's character can
  never modify it; this is enforced on the backend (no mutation exists) and in
  the sheet UI (controls disabled).

## 4. Roles & Permissions

| Action | DM | Co-DM | Player |
| --- | --- | --- | --- |
| View campaign + all shared characters | ✅ | ✅ | ✅ |
| Share / unshare **own** character, leave campaign | ✅ | ✅ | ✅ |
| Rename campaign, regenerate join code | ✅ | ✅ | ❌ |
| Kick a member, promote/demote Co-DM | ✅ | ✅ | ❌ |
| Delete campaign, transfer ownership | ✅ | ❌ | ❌ |

- The creator is the **DM** (sole owner).
- DM may promote any player to **Co-DM** (manager) or demote them.
- New joiners are **Players** by default.

## 5. User Flows

### 5.1 Create a campaign (DM)
1. Menu → **Campaigns** → **My Campaigns** → **Create Campaign**.
2. Enter a name (optional description). Campaign is created; user becomes DM.
3. Campaign detail page shows a **join code** and a **copyable invite link**.

### 5.2 Invite & join (DM shares, friend joins)
1. DM copies the code or link and sends it (Discord, text, etc.).
2. Friend opens the link (or Menu → Campaigns → **Join Campaign** → paste code).
   - If not signed in / not in cloud mode → prompted to sign in first.
3. On valid code, friend joins as Player and lands on the campaign detail page.
4. If the code was regenerated, old codes/links no longer work (friend sees a
   clear "invalid or expired code" message).

### 5.3 Share a character
1. On the campaign detail page, member clicks **Share a character**.
2. Picker lists the member's cloud-stored characters. Selecting one adds it to
   the campaign roster. localStorage-only characters are shown disabled with a
   "save to cloud to share" hint.
3. Member can **unshare** any of their own characters at any time.

### 5.4 View the roster & a character (all members)
1. Campaign detail page shows a **members/characters roster table** (see §6.3).
2. Each shared character row shows live status (name, owner, class, level,
   current HP / max, a bloodied/well-bloodied indicator).
3. Clicking **View** opens that character in a **read-only** character sheet.
   Own characters open the normal editable sheet.

### 5.5 Live notifications (the well-bloodied example)
1. Player A is playing; during combat their character's current HP drops to ≤ ¼
   max → enters *well-bloodied*.
2. A's client records a `well_bloodied` event on the campaign.
3. Every other member's campaign view receives it live: a **toast** appears and
   the **event feed** gains an entry ("Gorok is well-bloodied"). No refresh.
4. The roster row for that character reflects the new status live regardless of
   the event.

### 5.6 Manage (DM / Co-DM)
- Rename campaign; regenerate join code (invalidates old).
- Kick a member (removes them and their shared characters from the roster).
- Promote/demote Co-DM.
- DM-only: delete the campaign.

### 5.7 Leave (any member)
- Member leaves; their shared characters drop off the roster. The DM cannot
  leave without deleting or transferring (transfer is a later feature; for now
  DM deletes).

## 6. UI Requirements

### 6.1 Navigation / menu
- New **Campaigns** section on the main Menu (`src/components/Menu.tsx`),
  rendered only when signed in + Convex mode (same gate as DM Tools).
- Two entries: **My Campaigns** (list) and **Join Campaign** (code entry).
- Localized labels in `src/i18n/locales/en.json` + `es.json`.

### 6.2 Pages
| Page | Route | Purpose |
| --- | --- | --- |
| Campaign list | `/campaigns` | Cards of campaigns the user belongs to, each with name, role badge, member count. "Create Campaign" + "Join by code". |
| Campaign detail | `/campaigns/:id` | Header (name, role, join code + copy, invite link), roster table, event feed, share-character action, DM/Co-DM controls. |
| Join by link | `/campaigns/join/:code` | Deep link; resolves code → joins → redirects to detail (or sign-in prompt). |
| Read-only sheet | reuse `/character/:id` in read-only mode (see tech plan) | View a co-member's character. |

### 6.3 Campaign detail — panels
1. **Header bar**: campaign name, your role badge, join code with copy button,
   "Copy invite link", and (DM/Co-DM) a "Regenerate code" action; (DM) "Delete".
2. **Roster table** (the "user table"): one row per shared character.
   Columns: Character name · Owner (You / member name) · Class · Level ·
   Current HP / Max · Status pill (Healthy / Bloodied / Well-Bloodied / Down) ·
   **View** button. Status + HP update live. Member-management actions
   (kick/promote) available to DM/Co-DM, grouped by member.
3. **Event feed panel**: reverse-chronological list of campaign events with
   timestamps and icons; live-updating. Toasts surface new events app-side.
4. **Share-character control**: opens a picker of the user's cloud characters.

### 6.4 Read-only character sheet
- Reuses the existing sheet UI with all edit affordances disabled (HP steppers,
  condition toggles, notes, inventory, attacks). A clear "Read-only — viewing
  <owner>'s character" banner.
- No auto-save runs in read-only mode.

### 6.5 Notifications UX
- Toast (reuse existing `Snackbar`) for new events while the user is anywhere in
  the app and a member of that campaign (scope detail in tech plan).
- Persistent feed in the campaign detail page provides history.

### 6.6 Empty / error states
- No campaigns yet → friendly empty state with Create / Join.
- Invalid/expired code → explicit message.
- Trying to share a localStorage-only character → "Save to cloud to share."
- Not signed in → sign-in prompt (reuse `SignIn` / `AuthGuard`).

## 7. Success Criteria
- A DM can create a campaign and a second user can join via the link in < 1 min.
- A shared character's HP change is visible to other members within ~1s (live).
- Dropping to well-bloodied produces a toast + feed entry for all other members.
- A non-owner cannot modify a viewed character through any path.
- Feature is invisible/disabled when not signed in or not in Convex mode.

## 8. Future (explicitly deferred)
Per-field privacy; invite tokens & approval; OS/browser push; character snapshot
mode; shared initiative/encounter integration; ownership transfer; more
event types (death, level-up, condition gained, long rest, etc.) — all added as
new event types on the same foundation.
