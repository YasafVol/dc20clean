# DC20 Character Sheet Redesign Plan

## Executive Summary

Complete overhaul of the character sheet UI inspired by D&D Beyond's modern, clean approach while respecting DC20's unique mechanical complexity. Focus on **clarity, hierarchy, and usability**.

---

## Comparative Analysis

### D&D Beyond Strengths ✅

- **Visual Hierarchy**: Most important stats (HP, AC, Initiative) prominently displayed at top
- **Clean Layout**: Hexagonal ability scores are visually striking and intuitive
- **Card-Based Design**: Information grouped into clear, digestible cards
- **Modern Dark Theme**: Good contrast, easy on eyes, feels premium
- **Tab System**: Actions/Spells/Inventory in tabs reduces visual clutter
- **Generous White Space**: Breathing room makes information scannable
- **Skills Table**: Clean, organized, easy to read with proficiency indicators
- **Icons & Visual Indicators**: Enhance scannability without text overload

### DC20 Current Weaknesses ❌

- **Information Overload**: Everything visible at once, no progressive disclosure
- **Poor Visual Hierarchy**: Unclear where to look first - eyes wander aimlessly
- **Dated Color Scheme**: Beige/tan feels like parchment, not modern software
- **Vertical Sprawl**: Endless scrolling through Skills → Knowledge → Trades → Languages
- **Lost Combat Stats**: Critical info (Defenses, HP, AP) scattered across layout
- **No Visual Grouping**: Lacks cards/containers to organize related information
- **Huge Conditions Panel**: Takes massive space on right, rarely used in actual play
- **Weak Typography**: No clear size/weight hierarchy in text
- **Cluttered Tables**: Attacks/Inventory feel cramped and hard to parse

---

## Design Principles

1. **Hierarchy First**: Most-used information at top, least-used at bottom or hidden
2. **Progressive Disclosure**: Use tabs/accordions for secondary content
3. **Visual Breathing Room**: Generous spacing, clear grouping with cards
4. **Scannable at a Glance**: Key stats should be readable in 2 seconds
5. **Mobile-Friendly**: Responsive design that works on tablets in-game
6. **Respect Complexity**: DC20 has more systems than D&D - embrace it with better organization

---

## Proposed Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Character Identity + Quick Actions                     │
│  [Name] [Class/Level] [Ancestry] [Export PDF] [Revert] [Menu]  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  HERO SECTION: Critical Combat Stats (Always Visible)          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │   HP    │ │  MANA   │ │ STAMINA │ │ PRIME   │ │ COMBAT  │  │
│  │ ▂▂▂▂▂▂  │ │ ▂▂▂▂▂▂  │ │ ▂▂▂▂▂▂  │ │  CHA    │ │ MASTERY │  │
│  │  6/9    │ │  3/6    │ │  0/0    │ │   +3    │ │   +1    │  │
│  │ (+1 tmp)│ │         │ │         │ │         │ │         │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ PRECISION AD │ │ PRECISION DR │ │   AREA AD    │           │
│  │      12      │ │      0       │ │      12      │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ ACTION POINTS: ⓵ ⓶ ⓷ ⓸                                    ││
│  │ Attack: +4   Save DC: 14   Initiative: +1   Martial: +0   ││
│  └────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  THREE COLUMN LAYOUT                                            │
│ ┌──────────────┐ ┌─────────────────────┐ ┌───────────────────┐ │
│ │              │ │                     │ │                   │ │
│ │  LEFT COL    │ │   CENTER COLUMN     │ │   RIGHT COLUMN    │ │
│ │  Attributes  │ │   Combat & Actions  │ │   Features        │ │
│ │  & Skills    │ │                     │ │   & Resources     │ │
│ │              │ │                     │ │                   │ │
│ └──────────────┘ └─────────────────────┘ └───────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TABBED SECONDARY CONTENT                                       │
│  [⚔️ Attacks] [🎒 Inventory] [📜 Spells] [⚡ Maneuvers]        │
│  [✨ Features] [🎭 Conditions] [💰 Currency] [📝 Notes]        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Information Hierarchy

### 🔴 TOP PRIORITY (Always Visible in Hero Section)

- **HP / Mana / Stamina**: Resource pools with progress bars
- **Prime Attribute**: Large, clear display
- **Combat Mastery**: Level progression indicator
- **Defenses**: Precision AD, Area AD, Precision DR
- **Action Points**: Visual circles to track (like D&D Beyond's HD)
- **Combat Stats**: Attack, Save DC, Initiative, Martial Check

### 🟡 SECONDARY (Main Content Area - No Scroll)

- **Attributes**: Might, Agility, Charisma, Intelligence (card grid)
- **Core Skills**: Athletics, Acrobatics, Stealth, Animal, Insight, Influence, Investigation, Medicine, Survival
- **Death Threshold & Health Status**
- **Exhaustion Tracker**
- **Movement**: Speed, Jump Distance
- **Resources**: Rest Points, Grit Points

### 🟢 TERTIARY (Tabs/Accordions - Progressive Disclosure)

- **Attacks & Weapons**: Tab view with table
- **Inventory**: Tab view
- **Spells**: Tab with filters
- **Maneuvers**: Tab with filters
- **Features**: Tab with ancestry/class sections
- **Conditions Reference**: Tab (not always visible)
- **Knowledge Trades**: Collapsible section or tab
- **Practical Trades**: Collapsible section or tab
- **Languages**: Collapsible section or tab
- **Currency**: Small card or tab
- **Player Notes**: Tab or bottom section

---

## Color Palette

### Primary Colors

```css
--bg-primary: #1a1b26; /* Deep dark blue-black (main background) */
--bg-secondary: #24283b; /* Slightly lighter (card backgrounds) */
--bg-tertiary: #414868; /* Hover/active states */
--bg-elevated: #2c2e3e; /* Floating cards/modals */
```

### Accent Colors

```css
--accent-primary: #7dcfff; /* Cyan blue (primary actions, links) */
--accent-secondary: #bb9af7; /* Purple (secondary actions) */
--accent-warning: #e0af68; /* Warm gold (warnings, important info) */
--accent-danger: #f7768e; /* Coral red (HP loss, danger) */
--accent-success: #9ece6a; /* Green (healing, success) */
```

### Resource Colors

```css
--health: #f7768e; /* HP - Red */
--mana: #7aa2f7; /* Mana - Blue */
--stamina: #e0af68; /* Stamina - Gold/Orange */
--grit: #9ece6a; /* Grit - Green */
```

### Text Colors

```css
--text-primary: #c0caf5; /* Primary text (high contrast) */
--text-secondary: #9aa5ce; /* Secondary text (labels) */
--text-muted: #565f89; /* Disabled/hint text */
--text-inverse: #1a1b26; /* Text on light backgrounds */
```

### Attribute Colors (for differentiation)

```css
--might: #f7768e; /* Red - Physical */
--agility: #9ece6a; /* Green - Finesse */
--charisma: #e0af68; /* Gold - Social */
--intelligence: #7dcfff; /* Cyan - Mental */
```

### Semantic Colors

```css
--border-default: #3b4261; /* Default borders */
--border-focus: #7dcfff; /* Focused inputs */
--shadow-default: rgba(0, 0, 0, 0.4); /* Shadows */
--overlay: rgba(0, 0, 0, 0.7); /* Modals */
```

**Inspiration**: Tokyo Night color scheme (modern, popular, excellent contrast)

---

## Component Architecture

### Core Components

#### 1. **StatCard** (Reusable)

```tsx
<StatCard
	label="Hit Points"
	current={6}
	max={9}
	temp={1}
	color="health"
	size="large"
	showProgressBar
	editable
	onChange={(value) => updateHP(value)}
/>
```

- Used for: HP, Mana, Stamina, Rest Points, Grit Points
- Variants: large (hero), small (sidebar), editable, read-only
- Features: Progress bar, +/- buttons, temp values, manual input

#### 2. **AttributeCard**

```tsx
<AttributeCard
	attribute="charisma"
	value={3}
	save={3}
	skills={['animal', 'insight', 'influence']}
	isPrime
/>
```

- Square card with centered attribute abbreviation
- Save value displayed
- Click to expand skills list
- Visual indicator if Prime attribute

#### 3. **SkillRow**

```tsx
<SkillRow
	name="Influence"
	value={7}
	proficiency="expertise" // none | trained | expertise
	onRoll={() => rollSkill('influence')}
/>
```

- Icon for proficiency level
- Clickable to roll
- Tooltip for modifiers breakdown

#### 4. **CombatStatCard**

```tsx
<CombatStatCard
	stats={[
		{ label: 'Attack/Spell Check', value: 4, prefix: '+' },
		{ label: 'Save DC', value: 14 },
		{ label: 'Initiative', value: 1, prefix: '+' },
		{ label: 'Martial Check', value: 0, prefix: '+' }
	]}
/>
```

- Horizontal card showing all combat stats
- Icons for each stat type
- Hover for explanation

#### 5. **ActionPointTracker**

```tsx
<ActionPointTracker
	current={4}
	max={4}
	onSpend={(amount) => spendAP(amount)}
	onReset={() => resetAP()}
/>
```

- Visual circles like D&D Beyond Hit Dice
- Click to spend/reset
- Shows remaining vs max

#### 6. **WeaponRow** (for Attacks tab)

```tsx
<WeaponRow
	weapon={longpole}
	damage={{ base: '1 B', heavy: '3 B + Prone/Push', brutal: '4 B' }}
	onAttack={() => rollAttack(longpole)}
	onRemove={() => removeWeapon(longpole.id)}
/>
```

- Expandable row showing all damage types
- Tooltip for weapon properties
- Quick attack button

#### 7. **FeatureCard** (for Features tab)

```tsx
<FeatureCard
	title="Human Resolve"
	description="When you take damage..."
	source="Ancestry"
	icon="🛡️"
	onInfo={() => showFeatureModal('human-resolve')}
/>
```

- Collapsible sections by source (Ancestry/Class)
- Icon + title + description preview
- Click for full modal with details

#### 8. **TabPanel**

```tsx
<TabPanel
	tabs={[
		{ id: 'attacks', label: '⚔️ Attacks', badge: 3 },
		{ id: 'spells', label: '📜 Spells', badge: 1 },
		{ id: 'maneuvers', label: '⚡ Maneuvers', badge: 2 }
	]}
	activeTab={activeTab}
	onTabChange={setActiveTab}
>
	{/* Tab content */}
</TabPanel>
```

- Tab navigation with badges (counts)
- Smooth transitions
- Keyboard accessible

---

## Detailed Section Breakdown

### Hero Section (Always Visible)

**Purpose**: At-a-glance combat readiness

**Layout**: Horizontal rows of cards

**Contents**:

1. **Resource Cards Row**:
   - HP (large, red accent, +/- controls, temp HP sub-field)
   - Mana (large, blue accent, +/- controls)
   - Stamina (large, orange accent, +/- controls)
   - Prime Attribute (display only, highlighted)
   - Combat Mastery (display only)

2. **Defense Cards Row**:
   - Precision AD (editable, shows auto-calculated + override button)
   - Precision DR (editable)
   - Area AD (editable)

3. **Combat Stats Card**:
   - Action Points (visual bubbles)
   - Attack/Spell Check, Save DC, Initiative, Martial Check (horizontal)

**Visual Style**:

- Large text, bold numbers
- Progress bars for resources
- Color-coded by type
- Drop shadows for elevation
- Hover states with tooltips

---

### Left Column: Attributes & Skills

**Contents**:

1. **Attributes Grid** (2x2 cards):

   ```
   ┌──────┐ ┌──────┐
   │ MIG  │ │ AGI  │
   │  0   │ │  0   │
   └──────┘ └──────┘
   ┌──────┐ ┌──────┐
   │ CHA  │ │ INT  │
   │  3   │ │  2   │
   └──────┘ └──────┘
   ```

   - Click attribute card to expand/collapse skills
   - Attribute abbreviation centered, large
   - Save value below
   - Color-coded border

2. **Expanded Skills** (when attribute clicked):
   - List appears below attribute
   - Skill name + value + proficiency icon
   - Roll button on hover
3. **Awareness** (special - not tied to attribute):
   - Separate card at top
   - Same style as skills

**Collapsible Sections** (accordions):

- Knowledge Trades
- Practical Trades
- Languages

**Visual Style**:

- Cards with rounded corners
- Subtle shadows
- Hover: lift effect (transform: translateY(-2px))
- Active: border highlight

---

### Center Column: Combat & Actions

**Contents**:

1. **Death & Health Status Card**:
   - Current status label (Healthy/Bloodied/Dying)
   - Death threshold value
   - Color changes based on status

2. **Exhaustion Tracker**:
   - Visual bubbles (like AP)
   - Shows current level effect
   - Click to set level

3. **Movement Card**:
   - Move Speed
   - Jump Distance
   - Icons for each

4. **Tabbed Content**:
   - **Attacks Tab**: Weapon table with expandable rows
   - **Inventory Tab**: Item list with type filters
   - **Spells Tab**: Spell list with school filter
   - **Maneuvers Tab**: Maneuver list with type filter

**Visual Style**:

- Tabs with icon + label
- Badge counts on tabs
- Table rows with hover states
- Expandable rows for details
- +Add buttons for each section

---

### Right Column: Features & Reference

**Contents**:

1. **Resources Card** (small):
   - Rest Points (current/max)
   - Grit Points (current/max)
   - Compact display

2. **Features Tab**:
   - **Ancestry Traits** section (collapsible)
   - **Class Features** section (collapsible)
   - Each feature shows name + info icon
   - Click for modal with full description

3. **Conditions Tab** (moved from always-visible):
   - **Condition Interactions** (character-specific)
   - **Conditions Reference** (full list, searchable)
   - Filter by category buttons
   - Expandable cards for each condition

4. **Currency Card**:
   - Gold, Silver, Copper
   - +/- controls
   - Compact input fields

**Visual Style**:

- Compact cards
- Vertical stacking
- Scrollable if needed
- Less visual weight than center column

---

## Responsive Behavior

### Desktop (1440px+)

- Three-column layout as described
- Hero section full width
- All columns visible simultaneously

### Tablet (768px - 1439px)

- Two-column layout:
  - Left + Center combined
  - Right column sidebar
- Hero section full width
- Skills collapse by default

### Mobile (< 768px)

- Single column
- Hero section stacks vertically
- Tab-based navigation for main content
- Bottom navigation bar for quick access
- Attributes in 2x2 grid, always collapsed

---

## Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes

```css
--text-xs: 0.75rem; /* 12px - hints, labels */
--text-sm: 0.875rem; /* 14px - secondary text */
--text-base: 1rem; /* 16px - body text */
--text-lg: 1.125rem; /* 18px - emphasized */
--text-xl: 1.25rem; /* 20px - section headers */
--text-2xl: 1.5rem; /* 24px - card titles */
--text-3xl: 1.875rem; /* 30px - hero stats */
--text-4xl: 2.25rem; /* 36px - character name */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-tight: 1.25; /* Headings */
--leading-normal: 1.5; /* Body */
--leading-relaxed: 1.75; /* Spacious text */
```

---

## Spacing System

```css
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
```

**Usage**:

- Card padding: `--spacing-4` to `--spacing-6`
- Section gaps: `--spacing-6` to `--spacing-8`
- Button padding: `--spacing-3` horizontal, `--spacing-2` vertical
- Input padding: `--spacing-3`

---

## Shadows & Elevation

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3);
```

**Usage**:

- Cards: `--shadow-md`
- Hover: `--shadow-lg`
- Modals: `--shadow-xl`
- Buttons: `--shadow-sm`, `--shadow-md` on hover

---

## Animation & Transitions

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

**Usage**:

- Hover states: `--transition-fast`
- Tab changes: `--transition-base`
- Accordions: `--transition-slow`
- Modal open/close: `--transition-slow`

**Animations**:

- Fade in: Opacity 0 → 1
- Slide in: TranslateY(-10px) → 0
- Lift on hover: TranslateY(-2px) + shadow increase
- Pulse on update: Scale 1 → 1.05 → 1

---

## Accessibility Considerations

1. **Keyboard Navigation**:
   - All interactive elements focusable
   - Visible focus rings (2px accent-primary)
   - Tab order follows visual flow
   - Escape to close modals

2. **ARIA Labels**:
   - Buttons have descriptive labels
   - Input fields have associated labels
   - Tabs have proper ARIA attributes
   - Progress bars have ARIA values

3. **Color Contrast**:
   - All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
   - Interactive elements have 3:1 contrast with backgrounds
   - Focus states are high contrast

4. **Screen Reader Support**:
   - Semantic HTML (nav, main, section, article)
   - Live regions for updates (HP changes)
   - Status messages announced
   - Hidden content properly marked

5. **Motion Preferences**:
   - Respect `prefers-reduced-motion`
   - Disable animations for users who prefer it
   - Instant transitions instead of animated

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Set up new color tokens in theme
- [ ] Create base component library:
  - StatCard
  - AttributeCard
  - SkillRow
  - TabPanel
- [ ] Implement new layout structure (Hero + 3 columns)
- [ ] Apply new typography system

### Phase 2: Hero Section (Week 1)

- [ ] Resource cards (HP, Mana, Stamina)
- [ ] Defense cards
- [ ] Combat stats card
- [ ] Action point tracker
- [ ] Prime attribute display

### Phase 3: Left Column (Week 2)

- [ ] Attributes grid with expand/collapse
- [ ] Skills list integration
- [ ] Awareness card
- [ ] Knowledge/Trades/Languages accordions

### Phase 4: Center Column (Week 2)

- [ ] Death & Health status
- [ ] Exhaustion tracker
- [ ] Movement card
- [ ] Attacks tab with weapon table
- [ ] Inventory tab

### Phase 5: Right Column (Week 3)

- [ ] Resources card (Rest/Grit)
- [ ] Features tab with ancestry/class sections
- [ ] Currency card

### Phase 6: Tabbed Content (Week 3)

- [ ] Spells tab with filters
- [ ] Maneuvers tab with filters
- [ ] Conditions tab (moved from main)
- [ ] Notes tab

### Phase 7: Polish & Refinement (Week 4)

- [ ] Responsive breakpoints
- [ ] Animations & transitions
- [ ] Accessibility audit
- [ ] User testing & feedback
- [ ] Performance optimization

---

## Success Metrics

**Before** (Current DC20 Sheet):

- Time to find HP: ~2 seconds (scan required)
- Time to find Attack bonus: ~3 seconds (scrolling)
- Time to view all combat stats: ~5 seconds (scrolling)
- Skills visibility: Poor (scattered across long list)
- Overall clutter rating: 8/10 (very cluttered)

**After** (Redesigned Sheet):

- Time to find HP: <1 second (hero section)
- Time to find Attack bonus: <1 second (hero section)
- Time to view all combat stats: <1 second (no scrolling)
- Skills visibility: Good (organized by attribute)
- Overall clutter rating: 3/10 (clean, organized)

**Qualitative Goals**:

- Feels modern and professional
- Easy to use during combat
- Clear what to look at first
- Delightful interactions (hover, click, roll)
- Looks like a premium app, not a spreadsheet

---

## Notes & Considerations

1. **DC20 Uniqueness**:
   - More complex than D&D (Knowledge/Trades, multiple defenses, etc.)
   - Embrace this with better organization, not by hiding it
   - Use progressive disclosure for less-used features

2. **In-Game Usage**:
   - Combat requires quick access to HP, AP, Defenses, Attack
   - Outside combat: Skills, Features, Inventory more important
   - Design for both modes

3. **Design System Integration**:
   - Review existing MUI/Emotion setup
   - May need to create custom theme
   - Ensure consistency with existing components
   - Consider creating a dedicated design system doc

4. **Performance**:
   - Lots of interactive elements = potential performance issues
   - Use React.memo for expensive components
   - Virtualize long lists (conditions, spells)
   - Lazy load modals and tabs

5. **Migration Path**:
   - Create new route `/character/:id/new` for testing
   - Allow users to toggle between old/new
   - Gather feedback before full migration
   - Provide export/import for data safety

---

## Next Steps

1. **Get Approval**: Review this plan with team/user
2. **Prototype**: Create high-fidelity mockup in Figma (optional)
3. **Spike Work**: Test tab system and layout responsiveness
4. **Implementation**: Follow phase plan above
5. **Iterate**: User testing and refinement

---

_"The finest blades are forged with patience and precision. This sheet will be no different."_ — Gimli, Son of Glóin
