---
target: GameCraft authenticated dashboard (all routes)
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
timestamp: 2026-09-17T01-25-13Z
slug: apps-game-craft-app-locale-dashboard
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | Payment and checkout outcomes are transient rather than durable. |
| 2 | Match System / Real World | 3/4 | Persian payment/account language is sound; raw errors and placeholder content break trust. |
| 3 | User Control and Freedom | 2/4 | No undo/confirmation for cart removal or recoverable payment-progress state. |
| 4 | Consistency and Standards | 2/4 | Wallet is bespoke while other routes remain generic Ant Design utilities. |
| 5 | Error Prevention | 2/4 | Wallet validates amount; game upload and destructive cart actions lack guardrails. |
| 6 | Recognition Rather Than Recall | 2/4 | Empty states and icon-only mobile controls leave users to infer next steps. |
| 7 | Flexibility and Efficiency | 1/4 | No shortcuts, quick actions, drafts, or bulk cart handling. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Strong shell, but fragmented task surfaces and competing utility blocks. |
| 9 | Error Recovery | 2/4 | Wallet retries are good; other failures are toasts, console logs, or raw payloads. |
| 10 | Help and Documentation | 1/4 | High-stakes payment, credential, and upload tasks lack contextual help. |
| **Total** | | **19/40** | **Poor — major UX overhaul recommended** |

## Design Specificity Verdict

The wayfinder shell is recognizably GameCraft: the dark architectural palette, scarce blue route signal, and framed surfaces are grounded in the visual authority. The operation layer is uneven. Wallet feels designed for the product; events, team status, shopping bag, online account, and games are themed utilities with inconsistent interaction patterns. This is a strong perimeter around a fragmented participant workflow.

The detector reported 23 advisory findings: 13 undocumented-color findings and 10 off-ramp font-size findings, concentrated in `layout.module.css` and `wallet/page.module.css`. The semantic credit/debit colors and dense dashboard sizes look intentional, but they should become documented tokens. The 10rem watermark is deliberately decorative and should be sanctioned or replaced by a non-type treatment.

## Overall Impression

The dashboard is atmospheric enough to belong to GameCraft and the wallet is a credible task surface. It does not yet tell a participant what matters now, how to recover from a mistake, or what “done” looks like. The biggest opportunity is to turn the collection of account utilities into a status-led event journey.

## What's Working

- The shared dark vestibule, modest blue active-route signal, and solid raised surfaces align with the intended world without resorting to unreadable glass UI.
- Wallet is the interaction benchmark: balance, top-up validation, retry states, transaction direction, and responsive ledger behavior serve a real task clearly.
- Desktop ledger and mobile drawer preserve access across layouts, and the shell generally maintains readable contrast.

## Priority Issues

### [P0] Game submission is both unreachable and misleading

`/dashboard/games` is absent from navigation. Its form has no state or submit behavior while its preview is hard-coded placeholder content. It presents the event’s potential primary task as if it can be completed when it cannot. Implement a real validated draft/upload flow and surface it only when the event phase permits it, or explicitly label/remove it as unavailable. Suggested command: `$impeccable harden` followed by `$impeccable onboard`.

### [P1] There is no outcome-led participant journey

The default route opens to purchases, while teams, wallet, bag, and online account are disconnected destinations. No route establishes current event status, deadlines, or one recommended next action. Create an overview that answers “what should I do next?” and make empty states lead to a concrete action. Suggested command: `$impeccable shape`.

### [P1] Payment, account, and error flows do not create durable trust

Cart deletion has no confirmation or undo. Checkout and discount feedback depend on transient toasts. Clipboard failure is silent, team errors can expose arbitrary payloads, and payment departure lacks a recoverable pending/return state. Replace ephemeral feedback with inline state, retry, confirmation/undo, safe error language, and persisted payment status. Suggested command: `$impeccable harden`.

### [P1] The mobile header is usable but asks users to remember too much

The menu and home/back controls are icon-only; the variable `10vh` header is unstable; the drawer mixes preferences with route navigation and lacks contextual route identity. Use a fixed 60–64px header, accessible names/tooltips, retained page context, and a preferences group below the route list. Suggested command: `$impeccable adapt`.

### [P2] Route-level design language is inconsistent

Wallet uses a scoped task hierarchy; the other routes lean on globally themed Ant components and inline layout. This reads as “wallet plus a component catalog,” not one product with task-specific surfaces. Extract shared dashboard primitives for section headers, empty states, credential rows, checkout summaries, and upload forms, then migrate every route. Suggested command: `$impeccable extract` then `$impeccable layout`.

## Persona Red Flags

- **Alex, power user:** five equally weighted nav destinations plus logout offer no rapid route to the current task. There are no keyboard shortcuts, quick actions, or bulk cart operations.
- **Jordan, first-time participant:** an empty team status does not lead to finding or creating a team; purchased-event lists do not say what happens next; copied online credentials lack explanation or reassurance.
- **Casey, interrupted mobile payer:** icon-only header controls, external payment handoff, and transient toasts make it difficult to recover after interruption. Game inputs have no draft persistence or staged mobile flow.

## Minor Observations

- `DashboardNavigationCard` retains unused `locale`; online-account exports a component named `EventsPage`, both signs of ownership drift.
- Games combines an upload form with a realistic-looking but dummy preview, increasing cognitive load and risk of false confidence.
- Wallet’s quality should become the operational benchmark for other routes, not remain an exception.
- Team filtering and unkeyed map fragments merit a stability pass before users depend on team state.

## Questions to Consider

1. In the first ten seconds, should a participant know their next event, team readiness, or submission status? The dashboard must pick one primary answer.
2. If game submission is the culmination of GameCraft, why is it hidden from navigation and represented by a non-functional preview?
3. Would a first-time participant trust a payment redirect or copied live-session credential without a durable, recoverable confirmation?
