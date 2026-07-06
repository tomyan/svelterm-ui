# Changelog

## 0.3.1 — 2026-07-06

### Changed

- **Marked experimental.** README now carries a disclaimer: component
  APIs, markup, and design tokens may change without notice between
  releases; @svelterm/core is the stable surface. The interactive
  storybook is local-preview only in svelterm-site while that holds.

## 0.3.0 — 2026-07-05

All components on design tokens (slices 2–6 of DESIGN-tokens.md).

### Added

- **Toaster, List, FuzzyPicker, Tabs, and the colour-picker family**
  now consume the token set; defaults preserve each component's
  previous appearance exactly. Colour-picker browser-mode frames and
  labels theme from the same tokens (they are plain CSS vars).
- **`--svt-focus`** token — keyboard-focus highlight (default
  `yellow`); terminals have no hover, so focus is a first-class state.
- **`navigateList()`** — headless list keyboard navigation (arrows
  with wraparound per orientation, Home/End, Enter-to-activate),
  exported and now backing List, FuzzyPicker, and Tabs.
- **Tabs keyboard navigation** — ArrowLeft/ArrowRight move the active
  tab (previously mouse/Tab-focus only).
- **Theme recipes** — copy-paste monochrome and Solarized `:root`
  palettes in the README.


## 0.2.0 — 2026-07-05

Design tokens arrive (slice 1 of DESIGN-tokens.md).

### Added

- **Semantic design tokens** — components read `var(--svt-*, default)`
  custom properties, so they render identically with zero configuration
  and theme from a single `:root` block (or any subtree — custom
  properties inherit). The token set: `--svt-background`,
  `--svt-foreground`, `--svt-accent`, `--svt-muted`,
  `--svt-selection-background/-foreground`, `--svt-success`,
  `--svt-destructive`, `--svt-warning`, `--svt-border`, and the
  terminal-specific `--svt-border-family`
  (`single`/`rounded`/`double`/`heavy`).
- **Dialog on tokens** — first adopter: accent (border + title),
  background surface, and border family are themable; defaults preserve
  the previous appearance exactly.

## 0.1.1 — 2026-07-05

Re-release of 0.1.0 through the staged trusted-publishing pipeline with
provenance attestation (identical package contents).

## 0.1.0 — 2026-07-04

First component release. Distributed as `.svelte` source — consumers
compile it with their own renderer setup (terminal via `@svelterm/core`,
or the browser), like any Svelte library.

### Added

- **`Dialog`** — a floating modal (`<dialog open>`) with title and body;
  traps focus and closes on Escape, styled for both colour schemes.
- **`List`** — keyboard-navigable selectable list (arrow keys wrap,
  Enter selects), optional fixed height with scrolling, `bind:selected`.
- **`Tabs`** — a tab bar with an active panel; the panel snippet
  receives `(label, index)`.
- **`FuzzyPicker`** — a filter input over a subsequence-fuzzy-matched,
  score-ranked list; `onpick` fires on Enter or click.
- **`Toaster`** + **`toast()`** — a timed notification queue callable
  from anywhere, rendered top-right; info / success / error kinds.
- **`fuzzyMatch` / `fuzzyFilter`** — the matching helpers behind the
  picker, exported for reuse.

Every component is smoke-tested to compile under the svelterm custom
renderer. The colour-picker components from the initial spike ship
unchanged.
