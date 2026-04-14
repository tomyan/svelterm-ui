# Color Picker Component Design

## Overview

A collection of colour components for SvelTERM that work identically in terminal and browser. The terminal renders colours using truecolor background/foreground on cell characters. The browser renders standard HTML+CSS.

## Colour Spaces

Three colour space modes, switchable:

- **RGB** — `rgb(r, g, b)` / `#rrggbb`. Direct channel control.
- **HSL** — `hsl(h, s%, l%)`. Intuitive hue/saturation/lightness.
- **OKLCH** — `oklch(L C H)`. Perceptually uniform — changing lightness doesn't shift perceived hue. Modern CSS, better for design systems. Lightness 0-1, Chroma 0-0.4, Hue 0-360.

OKLCH is the recommended default — it's what CSS is moving toward and produces more predictable results than HSL (where "50% lightness" looks wildly different between yellow and blue).

## Components

### ColorSwatch

A single colour cell. Shows a block of colour with an optional label.

```svelte
<ColorSwatch color="#48cae4" />
<ColorSwatch color="#48cae4" label="cyan" />
```

**Terminal**: a cell (or group of cells) with `background-color` set. Text label rendered on top if provided, with auto-contrast foreground.

**Browser**: a `<div>` with background colour and optional text.

Props:
- `color: string` — CSS colour value
- `label?: string` — text to display on the swatch
- `size?: number` — width in cells (terminal) / em (browser). Default: 1
- `selected?: boolean` — highlight border
- `onclick?: (color: string) => void`

### ColorPalette

Grid of named CSS colours, grouped by palette. Based on the Austin Gil groupings:

- Reds (indianred, crimson, firebrick, darkred, red, ...)
- Oranges (coral, tomato, orangered, darkorange, orange, ...)
- Yellows (gold, yellow, lightyellow, lemonchiffon, ...)
- Greens (greenyellow, chartreuse, limegreen, lime, ...)
- Cyans (aqua, cyan, lightcyan, paleturquoise, ...)
- Blues (deepskyblue, dodgerblue, cornflowerblue, royalblue, ...)
- Purples (lavender, thistle, plum, violet, orchid, ...)
- Pinks (pink, lightpink, hotpink, deeppink, mediumvioletred, ...)
- Browns (cornsilk, blanchedalmond, bisque, navajowhite, ...)
- Whites (white, snow, honeydew, mintcream, azure, ...)
- Grays (gainsboro, lightgray, silver, darkgray, gray, dimgray, ...)

```svelte
<ColorPalette onselect={(name, hex) => picked = hex} />
<ColorPalette group="blues" />
```

**Terminal**: grid of `ColorSwatch` cells. Each cell is 2-3 cells wide to show the colour clearly. Keyboard navigable. Selected colour highlighted with a border or inverse.

**Browser**: CSS grid of swatches with hover effects and labels.

Props:
- `group?: string` — show only one group. Default: all groups.
- `selected?: string` — currently selected colour name
- `onselect?: (name: string, hex: string) => void`
- `compact?: boolean` — smaller swatches, no labels

### ColorSlider

A single-axis colour slider. Renders as a horizontal bar showing the colour gradient for that channel.

```svelte
<ColorSlider channel="hue" value={180} onchange={(v) => hue = v} />
<ColorSlider channel="saturation" value={80} hue={180} onchange={(v) => sat = v} />
<ColorSlider channel="opacity" value={1} color="#48cae4" onchange={(v) => alpha = v} />
```

**Terminal**: a horizontal row of cells, each cell's background shows the colour at that position along the gradient. A marker character (e.g. `▼` or `│`) indicates the current value. Width adapts to available space.

**Browser**: a `<input type="range">` styled with a gradient background, or a custom div with gradient + draggable thumb.

Channels:
- `hue` — 0-360, rainbow gradient
- `saturation` — 0-100%, gradient from grey to full saturation at current hue
- `lightness` — 0-100%, gradient from black through colour to white
- `red`, `green`, `blue` — 0-255
- `oklch-lightness` — 0-1
- `oklch-chroma` — 0-0.4
- `oklch-hue` — 0-360
- `opacity` — 0-1, checkerboard underneath to show transparency

Props:
- `channel: string`
- `value: number`
- `color?: string` — context colour for relative gradients
- `hue?: number`, `saturation?: number`, `lightness?: number` — context for HSL channels
- `onchange?: (value: number) => void`
- `width?: number` — cells/em. Default: fills available.

### ColorPanel

A 2D colour picker surface. Shows a grid where X axis is one channel and Y axis is another.

```svelte
<ColorPanel
  xChannel="saturation" yChannel="lightness"
  hue={180}
  x={80} y={50}
  onchange={(x, y) => { sat = x; light = y }}
/>
```

**Terminal**: a grid of cells (e.g. 20x10), each cell's background is the colour at that (x, y) position. A crosshair marker shows the current selection. Keyboard arrows move the selection. Mouse click jumps to position.

**Browser**: a `<canvas>` or CSS gradient div with a draggable crosshair.

Common configurations:
- HSL: x=saturation (0-100%), y=lightness (100-0%), fixed hue
- OKLCH: x=chroma (0-0.4), y=lightness (1-0), fixed hue
- RGB: x=red (0-255), y=green (0-255), fixed blue

Props:
- `xChannel: string`, `yChannel: string`
- `x: number`, `y: number` — current selection
- `hue?: number` — fixed channel value (for HSL/OKLCH)
- `width?: number`, `height?: number` — grid size in cells
- `onchange?: (x: number, y: number) => void`

### ColorInput

Displays the current colour value in a selected format, with copy support.

```svelte
<ColorInput color="#48cae4" format="hex" />
<ColorInput color="#48cae4" format="rgb" />
<ColorInput color="#48cae4" format="oklch" />
```

**Terminal**: text display with the formatted value. A "copy" indicator or keybinding hint.

**Browser**: a text input with copy button.

Formats: `hex`, `rgb`, `hsl`, `oklch`, `name` (if the colour matches a CSS named colour)

Props:
- `color: string` — CSS colour value
- `format: 'hex' | 'rgb' | 'hsl' | 'oklch' | 'name'`
- `editable?: boolean` — allow typing in values
- `onchange?: (color: string) => void`

### ColorPicker

The full combined experience.

```svelte
<ColorPicker bind:color={selectedColor} />
```

Layout (terminal):
```
┌─────────────────────────────────────────┐
│ ████████████████████████ Selected: #48… │
│ ████ 2D Panel ████████  R [===----] 72  │
│ ████████████████████████ G [======-] 202│
│ ████████████████████████ B [======-] 228│
│                          A [========] 1 │
│ Hue:  [rainbow gradient========-----]   │
│                                         │
│ RGB | HSL | OKLCH          #48cae4 [⎘]  │
│                                         │
│ Named colours:                          │
│ ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐  │
│ │  ││  ││  ││  ││  ││  ││  ││  ││  │  │
│ └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘  │
│ cyan aqua teal ...                      │
└─────────────────────────────────────────┘
```

Props:
- `color: string` — bindable, the selected colour
- `mode?: 'rgb' | 'hsl' | 'oklch'` — initial colour space
- `showPalette?: boolean` — show named colours. Default: true
- `showOpacity?: boolean` — show opacity slider. Default: true
- `compact?: boolean` — minimal layout

## Colour Space Conversion

A pure TypeScript module (`color.ts`) handles conversions:

```typescript
interface Color {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
  a: number  // 0-1
}

function rgbToHsl(r, g, b): { h, s, l }
function hslToRgb(h, s, l): { r, g, b }
function rgbToOklch(r, g, b): { l, c, h }
function oklchToRgb(l, c, h): { r, g, b }
function parseColor(css: string): Color
function formatHex(color: Color): string
function formatRgb(color: Color): string
function formatHsl(color: Color): string
function formatOklch(color: Color): string
function contrastColor(bg: Color): '#000000' | '#ffffff'
function findNamedColor(color: Color): string | null
```

## Named Colour Data

A static data module (`named-colors.ts`) with all 148 CSS named colours organised by palette group:

```typescript
interface NamedColor {
  name: string
  hex: string
  group: string
}

const NAMED_COLORS: NamedColor[]
const GROUPS: string[]  // ['reds', 'oranges', 'yellows', ...]
```

Groupings follow the Austin Gil classification with minor adjustments for completeness.

## Terminal Rendering

The key terminal technique: use `background-color` on spaces to render colour blocks. A 2-cell-wide swatch is two space characters with the same background:

```css
.swatch {
  background-color: var(--swatch-color);
  color: var(--contrast-color);  /* for label text */
}
```

The 2D panel renders as a grid of cells, each with a computed background. This works in truecolor terminals (24-bit colour). For 256-colour terminals, the nearest colour is used automatically by the terminal.

## Implementation Plan

1. `color.ts` — colour space conversions and parsing
2. `named-colors.ts` — the 148 CSS colours with palette groups
3. `ColorSwatch` — the atomic colour display unit
4. `ColorSlider` — single channel control
5. `ColorPanel` — 2D colour surface
6. `ColorPalette` — named colour grid
7. `ColorInput` — value display and copy
8. `ColorPicker` — combined component
