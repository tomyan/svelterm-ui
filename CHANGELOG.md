# Changelog

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
