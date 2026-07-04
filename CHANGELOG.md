# Changelog

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
