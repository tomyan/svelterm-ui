# @svelterm/ui — design tokens and headless split

Lessons taken from shadcn/ui, adapted for the terminal (2026-07-05).
shadcn's coherence comes from two disciplines we can adopt today without
its copy-in distribution model (deferred until the platform stabilises):
a small semantic token system every component consumes, and a strict
split between headless behaviour (plain TS) and an editable skin
(thin `.svelte` files).

## The problem

Every component currently hardcodes its own palette: Dialog uses
`cyan` + `light-dark(#f5f5f0, #1a1d23)`, Tabs mixes `cyan`/`yellow` and
its own grays, List invents selection colours, Toaster picks
`green`/`red`/`cyan` per kind. Nothing themes together; changing the
accent means editing five files.

## Token system

Components consume tokens via `var(--svt-*, default)` — svelterm
resolves var() fallbacks, so defaults live inline and the package needs
no setup, no injected stylesheet, no Theme component. Custom properties
inherit, so overriding on `:root` themes the app and overriding on any
container themes a subtree.

| Token | Default | Used for |
|---|---|---|
| `--svt-background` | `light-dark(#f5f5f0, #1a1d23)` | panel/dialog/toast surfaces |
| `--svt-foreground` | terminal default fg | text on those surfaces |
| `--svt-accent` | `cyan` | titles, active tab, focus highlights |
| `--svt-muted` | `light-dark(#888888, #666666)` | secondary text, inactive items |
| `--svt-selection-background` | `light-dark(#d5e5f5, #26415c)` | selected list/picker rows |
| `--svt-selection-foreground` | `light-dark(#0a3055, #cfe6ff)` | text on selected rows |
| `--svt-success` | `green` | success toasts, positive status |
| `--svt-destructive` | `red` | error toasts, destructive actions |
| `--svt-warning` | `yellow` | warnings, attention states |
| `--svt-border` | `light-dark(#bbbbbb, #444444)` | component frame colour |
| `--svt-border-family` | `single` | border glyph family: single/rounded/double/heavy |

Terminal-specific departures from shadcn: no `--radius` (the border
*family* is the terminal's corner personality, so it's a first-class
token — `border: var(--svt-border-family, single)` resolves before
parsing and works today); colours may be ANSI names, hex, or
`light-dark()`, and defaults use `light-dark()` so both schemes work
untouched.

Deliberately small: eleven tokens. A component needing something outside
the set uses a hardcoded value until a second component needs it — tokens
are promoted by demand, not speculation.

Theming then looks like:

```css
:root {
    --svt-accent: magenta;
    --svt-border-family: rounded;
}
```

## Headless / skin split

Behaviour lives in plain TS modules; `.svelte` files stay thin and
presentational, safe to restyle (and later, eject). Already headless:
`fuzzy.ts` (matching), `toast.ts` (store). To extract:

- `list-navigation.ts` — index movement with wraparound, Home/End,
  type-ahead; shared by List, FuzzyPicker, and Tabs (which reimplement
  it separately today).
- `color.ts` stays the model for the ColorPicker family (already split).

Rule of thumb: a `.svelte` file contains markup, styles consuming
tokens, and event wiring — nothing you'd want to unit-test without a
renderer.

## Relationship to the site demo convention

The playground examples share informal vars (`--accent`, `--muted`,
`--accent-warm`). Package tokens are namespaced `--svt-` to avoid
colliding with user CSS; the demos can alias
(`--svt-accent: var(--accent)`) so both conventions coexist. Open
question below.

## Out of scope (deferred)

- Copy-in distribution (`npx svelterm add dialog`) and a registry —
  revisit when the renderer API stabilises; components stay eject-able
  via the headless split. shadcn's registry JSON format is the candidate
  when we get there.
- New components (form kit, virtualised list) — this design is about
  making the existing seven components one system first.

## Slices

Each slice: red tests → green → README/docs → CHANGELOG → staged
release. Tests work at the compiled-CSS level (the package has no
renderer dependency): they extract each component's `<style>` output and
assert every themable declaration reads `var(--svt-*, <default>)` with
the documented default, and that no themable colour/border value remains
hardcoded. Painted-cell verification happens manually in the svelterm
playground.

1. **Dialog on tokens** — smallest end-to-end proof: define the token
   table in README, convert Dialog, test `--svt-accent`/
   `--svt-border-family` overrides and unchanged defaults.
2. **Toaster + status tokens** — success/destructive/accent kinds theme
   from one place.
3. **List + FuzzyPicker selection tokens** — shared selection pair;
   extract `list-navigation.ts` while both files are open (first
   headless slice).
4. **Tabs** — accent/muted/border tokens; adopt `list-navigation.ts`
   for its key handling.
5. **ColorPicker family** — frame/labels on tokens (swatch colours are
   content, not theme).
6. **Theme recipes** — documented example palettes (e.g. mono, solarized)
   as copy-paste `:root` blocks in the README; validates the token set
   covers real theming without adding machinery.
