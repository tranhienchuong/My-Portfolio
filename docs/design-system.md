# HC Portfolio Design System

## Direction

**Friendly Educational Neo-Brutalist AI** follows the visual language of the approved Educational Platform reference:

- Fredoka headings keep technical content approachable and recognizable.
- White cards, rounded ink borders, hard offset shadows, and pastel accents create the educational neo-brutalist character.
- Evidence remains prominent without turning the portfolio into a dark technical dashboard.

The system is light-first. Cream and white are the dominant surfaces; green, baby blue, coral, and lavender are accents. Large navy background sections are not part of the approved direction.

## Source of truth

The token pipeline is:

```text
tokens/design-tokens.json
        ↓ npm run build:tokens
src/styles/tokens.css
        ↓ semantic mapping
src/index.css (@theme)
        ↓
React components
```

Never edit `src/styles/tokens.css` directly. Change `tokens/design-tokens.json` and regenerate it.

## Token architecture

### Layer 1 — Primitive

Raw values without UI meaning:

- Color scales: cream, ink, slate, green, sky, coral, lavender, status colors.
- Spacing: a 4px-based scale from 4px to 96px.
- Typography: Fredoka, DM Sans, system monospace, responsive sizes and line heights.
- Shape: 12–24px radii plus pill.
- Borders: 1px and 2px.
- Shadows: 2px, 4px, and 6px hard offset shadows.
- Motion: 150ms, 200ms, and 300ms durations.

### Layer 2 — Semantic

Purpose aliases include:

- `background`, `surface`, `foreground`, `heading`, and `muted-foreground`.
- `primary`, `secondary`, `accent`, and `note`, each with a paired foreground.
- `success`, `warning`, and `destructive` status roles.
- `border`, `border-subtle`, `ring`, and `overlay`.
- Component/section spacing, font roles, motion roles, and radius roles.

### Layer 3 — Component

Components reference semantic tokens only:

- Button: variant backgrounds, paired foregrounds, border, radius, and shadow.
- Card: surface, foreground, border, radius, standard and emphasis shadows.
- Badge: background, foreground, border, and pill radius.
- Input: background, foreground, border, focus, error, and radius.
- Dialog: surface, overlay, border, radius, and shadow.
- Progress: track, indicator, and border.

## Accessibility contract

- Normal text must meet WCAG AA 4.5:1 contrast.
- UI boundaries and focus indicators must meet 3:1 contrast.
- Green `#22C55E` pairs with ink `#0F172A`, never white, for small text.
- Minimum interactive target: 44×44px.
- Focus must remain visible for keyboard users.
- Icon-only controls require an accessible label.
- Errors use text plus `aria-invalid`/`role="alert"`; color alone is insufficient.
- Animations must respect `prefers-reduced-motion`.
- Dialog and tabs use Radix primitives for focus management and keyboard behavior.

## Component specifications

### Button

Variants: `default`, `secondary`, `outline`, `ghost`, `link`, `destructive`.

Sizes: `sm` (44px), `default` (48px), `lg` (56px), `icon` (44×44px).

States:

| State | Treatment |
| --- | --- |
| Default | 2px ink border, 4px offset shadow |
| Hover | Translate 2px/2px and reduce the hard shadow from 4px to 2px, matching the approved reference |
| Active | Translate 4px and remove shadow |
| Focus | 2px semantic ring with 4px offset |
| Disabled | 50% opacity, no interaction |

### Card

Variants: `default`, `flat`, `feature`, `interactive`.

Tones: `surface`, `primary`, `secondary`, `accent`, `note`, `dark`.

Default padding is 24px; cards scale to 32px where their composition benefits from more space. Bordered clay cards translate 2px/2px and reduce their shadow from 6px to 4px on hover. Soft feature cards scale to 1.05. Cards never lift upward or increase their shadow.

### Badge

Variants: `default`, `primary`, `secondary`, `accent`, `note`, `success`, `warning`, `destructive`, `outline`.

Badges use monospace at 12px and always include readable text. Status icons are optional reinforcement.

### Input and Textarea

- Persistent visible label.
- 48px default input height.
- 2px border and 2px offset shadow.
- Focus ring and border use the semantic `ring` role.
- Invalid fields use `aria-invalid`, an error border, and an associated message.

### Tabs and Dialog

Tabs support arrow-key navigation through Radix. Dialog traps focus, closes with Escape, and returns focus to its trigger. Dialogs are responsive from a 32px viewport inset up to a 512px maximum width.

## Portfolio components

### `ProjectCard`

Use a wide split card with white content and a pastel visual panel. It accepts evidence metrics, technology tags, role context, and a destination link. A group project must state the contributor's scope.

### `MetricCard`

Use for measured outcomes with a short methodological note. Do not display unsupported marketing claims.

### `ArchitectureFlow`

Use a white rounded pipeline card with pastel sequential nodes. It reflows vertically on mobile and keeps meaningful text labels rather than relying on color.

### `ContactStrip`

Use at the end of a page. It groups Gmail, phone, Facebook, and GitHub destinations into consistent 44px+ controls.

## Responsive behavior

- 320–767px: single-column reading order; navigation is reduced; flow diagrams stack vertically.
- 768–1023px: denser component grids where content permits.
- 1024px and above: 12-column portfolio compositions and horizontal architecture flows.
- Content max width: 1200px.
- Page gutters: 16px mobile, 24px tablet/desktop.

Test at 320px, 375px, 768px, 1024px, and 1440px, plus 200% zoom.

## Commands

```bash
npm run build:tokens
npm run validate:tokens
npm run lint
npm run build
npm run dev
```
