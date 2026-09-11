---
target: entire GameCraft website
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-09-09T00-52-24Z
slug: apps-game-craft
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | Auth redirects and public anchors lack state/context. |
| 2 | Match System / Real World | 3/4 | Event language is plain, but planned-art labels are production-facing. |
| 3 | User Control and Freedom | 2/4 | Auth redirect loses intent; dashboard replaces history. |
| 4 | Consistency and Standards | 2/4 | Wayfinder, legacy tokens, and mixed-localization coexist. |
| 5 | Error Prevention | 2/4 | Recovery and consequences are not made clear. |
| 6 | Recognition Rather Than Recall | 3/4 | Labels are clear, but public navigation has no active route. |
| 7 | Flexibility and Efficiency | 2/4 | No task/status shortcuts for returning participants. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong system, but the home sequence is overlong. |
| 9 | Error Recovery | 2/4 | Raw errors and unauthorised states offer no clear action. |
| 10 | Help and Documentation | 2/4 | FAQ is disconnected from key first-time states. |
| **Total** | | **23/40** | **Needs focus** |

## Design Specificity Verdict

The homepage and dashboard frame feel authored for GameCraft: the owned vault, route, and signal-node language combines with the bilingual type stack and deep wayfinding palette. That authorship does not extend consistently to secondary public routes and states, which still read as themed Ant Design screens.

The detector reported 227 findings (147 warnings, 80 advisories): 147 `design-system-font`, 41 `design-system-font-size`, 26 `design-system-color`, and 13 `design-system-radius`. It ran in regex fallback because `htmlparser2`, `css-select`, `css-tree`, and `domutils` are unavailable. Most font findings are likely false positives from unused alternate font face sheets under `public/fonts/`; high-value source concentration is `app/globals.css`, `WelcomePopup.tsx`, `WorkshopCard.tsx`, `StickyBar.tsx`, and `CompetitionCard.tsx`.

## Overall Impression

There is a distinctive event world here, but its strongest material is concentrated in the shell. Make the first decision obvious and bring error, empty, and secondary routes into the same product story.

## What's Working

- The home page uses an original, coherent vault/route/node visual vocabulary instead of borrowed game assets.
- The dashboard becomes a calmer dark task surface with readable text and stable navigation.
- Locale support and mobile drawer patterns are treated as first-class interface concerns.

## Priority Issues

### [P1] Conversion hierarchy is vague

**Why it matters:** Newcomers encounter equally weighted programme anchors and social links without event essentials or a clear participation action.

**Fix:** Make registration the dominant hero action and pair it with date, place, eligibility, and a succinct next-step promise. Demote programme exploration and social links.

**Suggested command:** `$impeccable shape`

### [P1] The public journey is visually repetitive and feels unfinished

**Why it matters:** Five large `Artwork planned` slots interrupt scanning and reduce confidence that the event is ready.

**Fix:** Keep one honest hero placeholder; move the rest into unobtrusive section geometry until final artwork exists.

**Suggested command:** `$impeccable distill`

### [P1] Dashboard recovery and control are broken

**Why it matters:** An unauthenticated visitor is redirected home without explanation or return path; raw errors and empty states lack recovery actions.

**Fix:** Preserve the requested destination, explain the sign-in requirement, provide login/retry/contact actions, and translate all state copy.

**Suggested command:** `$impeccable harden`

### [P2] Navigation competes with the primary action

**Why it matters:** Every desktop public link is styled as a primary button, public routes have no active state, and dashboard routing replaces browser history.

**Fix:** Reserve the primary treatment for one conversion action, use calm active navigation, and use push navigation within the dashboard.

**Suggested command:** `$impeccable layout`

### [P2] The design system is inconsistently applied

**Why it matters:** Root legacy green/gold styling, localized wayfinding screens, literal English empty-state copy, and dispersed inline styles make the product feel partially migrated.

**Fix:** Consolidate public/dash tokens, localize all states, and replace one-off component styling with documented tokens.

**Suggested command:** `$impeccable document`

## Persona Red Flags

**Jordan (first-time student):** The hero does not clearly answer whether to register, browse the programme, or follow social channels; they may scroll rather than join.

**Mina (anxious Persian participant):** Redirects, English-only empty content, and raw error text make it unclear whether access, purchase, or the service itself failed.

**Alex (returning participant):** The dashboard offers same-weight event categories but no deadline/status shortcut, and history replacement makes route recovery less efficient.

## Minor Observations

- `height: 100vh` in the dashboard risks mobile browser-chrome clipping.
- The theme toggle does not make its current effect clear.
- Prominent default avatars can imply false personalization.

## Questions to Consider

- What should a newcomer decide in the first ten seconds: register, choose a programme, or join the community?
- Could the public site become a three-step journey: discover, enrol, make?
- What proof would make joining a team or paying feel safe before sign-in?
