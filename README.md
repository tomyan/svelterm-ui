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

## Helpers

`fuzzyMatch` / `fuzzyFilter` (the picker's matching), and the colour
conversion functions (`parseColor`, `rgbToOklch`, …) are exported for
reuse.

MIT
