# SSC design system

This documents the existing SSC identity and the consistency improvements made to it. The app stays Persian, right to left, dark, and uses its existing logo, portal illustration, event photography, and coral-to-orchid accent. Product content, member details, and event data remain authoritative in their existing sources.

## Foundations

`app/globals.css` owns SSC tokens. `packages/ui` owns shared control behavior and exposes semantic component classes and data attributes; SSC supplies their visual treatment. Do not introduce a second component library or copy these controls into the app.

| Role | Token | Use |
| --- | --- | --- |
| Canvas | `--background` | Page and input backgrounds |
| Surface | `--surface` | Panels, cards, sidebar |
| Raised surface | `--surface-raised` | Secondary actions and selected navigation |
| Border | `--border` | Quiet panel and section boundaries |
| Control border | `--border-strong` | Form controls |
| Text | `--foreground` | Headings and primary content |
| Supporting text | `--muted` | Descriptions, help, metadata, placeholders |
| Accent | `--accent` | Links, current navigation, focus |
| Brand gradient | `--brand-gradient` | Primary actions only |
| Action foreground | `--accent-ink` | Dark text on the brand gradient |
| Feedback | `--danger`, `--success` | Errors and success feedback |

Legacy color names alias these tokens for compatibility. Prefer the semantic names in new work. New text uses solid colors; reserve the existing gradient for primary actions.

## Typography and rhythm

Use the local Vazirmatn font through `--font-vazirmatn`. Body text is 16px with generous Persian line height; metadata and control labels are 14px. Standard section headings are 30px. The homepage headline is 36px on small screens and 48px on large screens. Avoid oversized profile names, dashboard headings, and dense paragraphs set in bold.

`ssc-container` caps content at 76rem, with 20px mobile gutters and 32px desktop gutters. `ssc-section` supplies 64px vertical spacing. Group related controls with 8–16px gaps, separate content groups with 24–32px, and use 48–64px between larger sections. Control corners are 10px; panels are 16px. Reserve pills for small status labels and circular avatars.

## Components and behavior

- `Button` supports primary, secondary, outline, and text variants. Small controls still have a 44px touch target. Both `disable` (legacy) and `disabled` disable the native button. Loading also disables activation, exposes `aria-busy`, and preserves its accessible name and dimensions. The default type is `button`; form actions explicitly use `submit`.
- The registration/team step indicator uses the same surface, accent, and success tokens, Persian numerals, and `aria-current="step"`.
- `TextField` and `PhoneNumberField` use visible associated labels, native attributes, named help/error descriptions, and `aria-invalid`. Keep right-to-left labels; use left-to-right direction for email addresses and phone numbers. Phone entry uses a separate +98 prefix.
- Links navigate; buttons act. Do not put a button inside a link. Social icon links need names that identify their destination and person.
- Navigation uses a solid accent and quiet selected surface or underline. Mobile navigation uses native dialogs for focus containment, Escape, and focus restoration. Closed menus are absent from keyboard navigation.
- Task dialogs use `components/Modal.tsx` with a meaningful label and close handler. Native dialogs keep nested overlays above their parent and contain keyboard focus.
- Event cards use a responsive grid, square uncropped-layout poster frames, quiet ended badges, and a readable complete Persian date. Unavailable registrations render as text instead of a visually disabled link. Event loading failures and an empty event list have distinct recovery guidance.
- Member profiles use a borderless, centered composition with 128px circular portraits, names, muted roles, and unboxed social links with 44px touch targets. The homepage centers incomplete rows. Keep portrait, type, spacing, and social-link treatment consistent on the homepage and About page.
- Photo strips have an explicit pause control and pause on hover/focus. Reduced-motion users see static strips. No page entrance choreography.

## Checks

Build `@ssc/ui` after changing its sources because its public exports resolve to `dist`. Run the control regression checks with `pnpm --filter @ssc/web test:design`. Check the SSC and UI TypeScript projects and inspect the app at desktop and narrow mobile widths. Authentication-dependent dashboard operations require a real signed-in session for runtime verification.
