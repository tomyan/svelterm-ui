# @svelterm/ui

Component library for [svelterm](https://svelterm.dev) — terminal and
browser from the same Svelte source.

Distributed as `.svelte` source: install it and compile with your own
renderer setup (nothing is pre-compiled, so the components pick up your
`@svelterm/core` version and your scoped-CSS pipeline).

```bash
npm install @svelterm/ui
```

## Components

- **`Dialog`** — floating modal with focus trap and Escape-to-close.
- **`List`** — keyboard-navigable selectable list with optional scrolling.
- **`Tabs`** — tab bar with an active panel snippet.
- **`FuzzyPicker`** — filter input over a fuzzy-matched, ranked list.
- **`Toaster`** + `toast()` — timed notifications, callable from anywhere.
- **Colour picker** — `ColorPicker` and its parts (swatch, palette,
  sliders, panel, input).

```svelte
<script>
    import { List, Toaster, toast } from '@svelterm/ui'
    let items = ['alpha', 'bravo', 'charlie']
    let selected = $state(0)
</script>

<List {items} bind:selected onselect={(item) => toast(`picked ${item}`)} />
<Toaster />
```

## Theming

Components read semantic design tokens via `var(--svt-*, default)`, so
they work with zero configuration and theme from one place. Custom
properties inherit: set tokens on `:root` to theme the app, or on any
container to theme a subtree.

```css
:root {
    --svt-accent: magenta;
    --svt-border-family: rounded;
}
```

| Token | Default | Used for |
|---|---|---|
| `--svt-background` | `light-dark(#f5f5f0, #1a1d23)` | panel/dialog/toast surfaces |
| `--svt-foreground` | terminal default | text on those surfaces |
| `--svt-accent` | `cyan` | titles, active tab, focus highlights |
| `--svt-muted` | `light-dark(#888888, #666666)` | secondary text, inactive items |
| `--svt-selection-background` | `light-dark(#d5e5f5, #26415c)` | selected rows |
| `--svt-selection-foreground` | `light-dark(#0a3055, #cfe6ff)` | text on selected rows |
| `--svt-success` | `green` | success toasts, positive status |
| `--svt-destructive` | `red` | error toasts, destructive actions |
| `--svt-warning` | `yellow` | warnings, attention states |
| `--svt-border` | `light-dark(#bbbbbb, #444444)` | component frame colour |
| `--svt-border-family` | `single` | border glyphs: `single`/`rounded`/`double`/`heavy` |

Values may be ANSI colour names, hex, or `light-dark()`. Adoption so
far: Dialog (accent, background, border-family — its border-family
default is `double`); remaining components migrate per
DESIGN-tokens.md.

## Helpers

`fuzzyMatch` / `fuzzyFilter` (the picker's matching), and the colour
conversion functions (`parseColor`, `rgbToOklch`, …) are exported for
reuse.

MIT
