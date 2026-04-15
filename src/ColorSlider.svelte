<script lang="ts">
    import { hslToRgb, oklchToRgb, type Color } from './color.js'

    let {
        channel = 'hue' as 'hue' | 'saturation' | 'lightness' | 'red' | 'green' | 'blue' | 'oklch-lightness' | 'oklch-chroma' | 'oklch-hue' | 'opacity',
        value = 0,
        hue = 0,
        saturation = 1,
        lightness = 0.5,
        color = '#ff0000',
        width = 30,
        onchange = undefined as ((value: number) => void) | undefined,
    }: {
        channel?: string
        value?: number
        hue?: number
        saturation?: number
        lightness?: number
        color?: string
        width?: number
        onchange?: (value: number) => void
    } = $props()

    function gradientStops(): string[] {
        const stops: string[] = []
        const n = Math.min(width, 20)
        for (let i = 0; i <= n; i++) {
            const t = i / n
            const c = colorAt(t)
            stops.push(`rgb(${c.r} ${c.g} ${c.b})`)
        }
        return stops
    }

    function colorAt(t: number): { r: number; g: number; b: number } {
        switch (channel) {
            case 'hue': return hslToRgb(t * 360, saturation, lightness)
            case 'saturation': return hslToRgb(hue, t, lightness)
            case 'lightness': return hslToRgb(hue, saturation, t)
            case 'red': return { r: Math.round(t * 255), g: 0, b: 0 }
            case 'green': return { r: 0, g: Math.round(t * 255), b: 0 }
            case 'blue': return { r: 0, g: 0, b: Math.round(t * 255) }
            case 'oklch-hue': return oklchToRgb(0.7, 0.15, t * 360)
            case 'oklch-lightness': return oklchToRgb(t, 0.15, hue)
            case 'oklch-chroma': return oklchToRgb(0.7, t * 0.4, hue)
            case 'opacity': return { r: 128, g: 128, b: 128 }
            default: return { r: 128, g: 128, b: 128 }
        }
    }

    function normalizedValue(): number {
        switch (channel) {
            case 'hue': case 'oklch-hue': return value / 360
            case 'saturation': case 'lightness': case 'oklch-lightness': case 'opacity': return value
            case 'oklch-chroma': return value / 0.4
            case 'red': case 'green': case 'blue': return value / 255
            default: return 0
        }
    }

    function valueAt(t: number): number {
        switch (channel) {
            case 'hue': case 'oklch-hue': return t * 360
            case 'oklch-chroma': return t * 0.4
            case 'red': case 'green': case 'blue': return Math.round(t * 255)
            default: return t
        }
    }

    let thumbPos = $derived(Math.round(normalizedValue() * (width - 1)))
</script>

<div class="slider">
    <div class="track">
        {#each { length: width } as _, i}
            {@const t = i / (width - 1)}
            {@const c = colorAt(t)}
            <span
                class="cell"
                class:thumb={i === thumbPos}
                style="background-color: rgb({c.r} {c.g} {c.b});"
                onclick={() => {
                    onchange?.(valueAt(t))
                }}
            >{i === thumbPos ? '▼' : ' '}</span>
        {/each}
    </div>
</div>

<style>
    .slider {
        display: flex;
        flex-direction: column;
    }

    .track {
        display: flex;
        flex-direction: row;
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (display-mode: browser) {
            width: 1em;
            height: 1.5em;
            font-size: 0.6rem;
            cursor: pointer;
        }

        @media (display-mode: terminal) {
            width: 1cell;
            height: 1cell;
        }
    }

    .cell:first-child {
        @media (display-mode: browser) { border-radius: 4px 0 0 4px; }
    }

    .cell:last-child {
        @media (display-mode: browser) { border-radius: 0 4px 4px 0; }
    }

    .thumb {
        font-weight: bold;
        color: white;
        text-shadow: 0 0 2px black;
    }
</style>
