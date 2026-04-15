<script lang="ts">
    import ColorPanel from './ColorPanel.svelte'
    import ColorSlider from './ColorSlider.svelte'
    import ColorInput from './ColorInput.svelte'
    import ColorPalette from './ColorPalette.svelte'
    import { parseColor, formatHex, rgbToHsl, rgbToOklch, hslToRgb, oklchToRgb } from './color.js'

    let {
        color = $bindable('#ff0000'),
        mode = $bindable('hsl' as 'hsl' | 'oklch'),
        showPalette = true,
    }: {
        color?: string
        mode?: 'hsl' | 'oklch'
        showPalette?: boolean
    } = $props()

    let parsed = $derived(parseColor(color))
    let hsl = $derived(rgbToHsl(parsed.r, parsed.g, parsed.b))
    let oklch = $derived(rgbToOklch(parsed.r, parsed.g, parsed.b))

    function onPanelChange(x: number, y: number) {
        if (mode === 'oklch') {
            const rgb = oklchToRgb(y, x * 0.4, oklch.h)
            color = formatHex({ ...rgb, a: 1 })
        } else {
            const rgb = hslToRgb(hsl.h, x, y)
            color = formatHex({ ...rgb, a: 1 })
        }
    }

    function onHueChange(v: number) {
        if (mode === 'oklch') {
            const rgb = oklchToRgb(oklch.l, oklch.c, v)
            color = formatHex({ ...rgb, a: 1 })
        } else {
            const rgb = hslToRgb(v, hsl.s, hsl.l)
            color = formatHex({ ...rgb, a: 1 })
        }
    }

    let panelX = $derived(mode === 'oklch' ? oklch.c / 0.4 : hsl.s)
    let panelY = $derived(mode === 'oklch' ? oklch.l : hsl.l)
    let hueValue = $derived(mode === 'oklch' ? oklch.h : hsl.h)
</script>

<div class="picker">
    <div class="main">
        <ColorPanel
            {mode}
            hue={hueValue}
            x={panelX}
            y={panelY}
            onchange={onPanelChange}
        />

        <ColorSlider
            channel={mode === 'oklch' ? 'oklch-hue' : 'hue'}
            value={hueValue}
            onchange={onHueChange}
        />
    </div>

    <div class="controls">
        <div class="mode-tabs">
            <button class:active={mode === 'hsl'} onclick={() => mode = 'hsl'}>HSL</button>
            <button class:active={mode === 'oklch'} onclick={() => mode = 'oklch'}>OKLCH</button>
        </div>

        <ColorInput {color} format="hex" />
        <ColorInput {color} format={mode === 'oklch' ? 'oklch' : 'hsl'} />
    </div>

    {#if showPalette}
        <ColorPalette
            compact
            selected=""
            onselect={(name, hex) => { color = hex }}
        />
    {/if}
</div>

<style>
    .picker {
        display: flex;
        flex-direction: column;

        @media (display-mode: browser) { gap: 1rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .main {
        display: flex;
        flex-direction: column;

        @media (display-mode: browser) { gap: 0.5rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .controls {
        display: flex;
        flex-direction: column;

        @media (display-mode: browser) { gap: 0.5rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .mode-tabs {
        display: flex;
        flex-direction: row;

        @media (display-mode: browser) { gap: 0.25rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .mode-tabs button {
        @media (display-mode: browser) {
            padding: 0.25rem 0.75rem;
            border: 1px solid #555;
            border-radius: 4px;
            background: transparent;
            color: inherit;
            cursor: pointer;
            font-size: 0.8rem;
        }

        @media (display-mode: terminal) {
            border: single;
            padding: 0 1cell;
        }
    }

    .mode-tabs button.active {
        @media (display-mode: browser) {
            background: #48cae4;
            color: #000;
            border-color: #48cae4;
        }

        @media (display-mode: terminal) {
            font-weight: bold;
            border: double;
        }
    }
</style>
